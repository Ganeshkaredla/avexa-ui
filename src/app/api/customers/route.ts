export const runtime = "nodejs";
export const dynamic = "force-dynamic";
import { NextRequest } from "next/server";
import { createCustomer, listCustomers } from "@/src/lib/db";
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") || "";
  const status = (searchParams.get("status") || "all") as any;
  const page = Number(searchParams.get("page") || "1");
  const pageSize = Number(searchParams.get("pageSize") || "10");
  const res = await listCustomers({ q, status, page, pageSize });
  return Response.json(res);
}
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, phone, dob, documentId, profile, status } = body;
  if (!name || !email || !phone || !dob || !documentId) {
    return new Response(JSON.stringify({ error: "Missing fields" }), {
      status: 400,
    });
  }
  const created = await createCustomer({
    name,
    email,
    phone,
    dob,
    documentId,
    profile,
    status: status || "submitted",
    createdAt: "",
    updatedAt: "",
  } as any);
  return Response.json(created, { status: 201 });
}
