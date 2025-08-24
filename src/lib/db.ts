import { promises as fs } from "fs";
import path from "path";
const DB_PATH = path.join(process.cwd(), "data", "db.json");
export type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  dob: string;
  documentId: string;
  profile?: { address?: string; notes?: string };
  status: "draft" | "submitted" | "approved" | "rejected";
  createdAt: string;
  updatedAt: string;
};
export type Draft = {
  id: string;
  data: Partial<Customer>;
  createdAt: string;
  updatedAt: string;
};
type DB = { customers: Customer[]; drafts: Draft[] };
async function ensureDb() {
  try {
    await fs.access(DB_PATH);
  } catch {
    const initial: DB = { customers: [], drafts: [] };
    await fs.mkdir(path.dirname(DB_PATH), { recursive: true });
    await fs.writeFile(DB_PATH, JSON.stringify(initial, null, 2), "utf-8");
  }
}
async function read(): Promise<DB> {
  await ensureDb();
  const raw = await fs.readFile(DB_PATH, "utf-8");
  return JSON.parse(raw) as DB;
}
async function write(db: DB) {
  await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2), "utf-8");
}
export async function listCustomers(params?: {
  q?: string;
  status?: Customer["status"] | "all";
  page?: number;
  pageSize?: number;
}) {
  const { q = "", status = "all", page = 1, pageSize = 10 } = params || {};
  const db = await read();
  let items = db.customers;
  const query = q.trim().toLowerCase();
  if (query) {
    items = items.filter(
      (c) =>
        c.name.toLowerCase().includes(query) ||
        c.email.toLowerCase().includes(query) ||
        c.phone.includes(query) ||
        c.documentId.toLowerCase().includes(query)
    );
  }
  if (status !== "all") {
    items = items.filter((c) => c.status === status);
  }
  const total = items.length;
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  return { items: items.slice(start, end), total };
}
export async function getCustomer(id: string) {
  const db = await read();
  return db.customers.find((c) => c.id === id) || null;
}
export async function createCustomer(
  data: Omit<Customer, "id" | "createdAt" | "updatedAt">
) {
  const db = await read();
  const now = new Date().toISOString();
  const item: Customer = {
    ...data,
    id: crypto.randomUUID(),
    createdAt: now,
    updatedAt: now,
  };
  db.customers.unshift(item);
  await write(db);
  return item;
}
export async function updateCustomer(id: string, patch: Partial<Customer>) {
  const db = await read();
  const idx = db.customers.findIndex((c) => c.id === id);
  if (idx === -1) return null;
  db.customers[idx] = {
    ...db.customers[idx],
    ...patch,
    updatedAt: new Date().toISOString(),
  };
  await write(db);
  return db.customers[idx];
}
export async function deleteCustomer(id: string) {
  const db = await read();
  const before = db.customers.length;
  db.customers = db.customers.filter((c) => c.id !== id);
  await write(db);
  return db.customers.length < before;
}
export async function getDraft(id: string) {
  const db = await read();
  return db.drafts.find((d) => d.id === id) || null;
}
export async function listDrafts() {
  const db = await read();
  return db.drafts;
}
export async function upsertDraft(
  id: string | undefined,
  data: Partial<Customer>
) {
  const db = await read();
  const now = new Date().toISOString();
  if (id) {
    const idx = db.drafts.findIndex((d) => d.id === id);
    if (idx !== -1) {
      db.drafts[idx] = {
        ...db.drafts[idx],
        data: { ...db.drafts[idx].data, ...data },
        updatedAt: now,
      };
      await write(db);
      return db.drafts[idx];
    }
  }
  const draft = {
    id: crypto.randomUUID(),
    data,
    createdAt: now,
    updatedAt: now,
  };
  db.drafts.unshift(draft);
  await write(db);
  return draft;
}
export async function deleteDraft(id: string) {
  const db = await read();
  const before = db.drafts.length;
  db.drafts = db.drafts.filter((d) => d.id != id);
  await write(db);
  return db.drafts.length < before;
}
