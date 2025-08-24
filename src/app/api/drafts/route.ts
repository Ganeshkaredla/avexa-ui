export const runtime = "nodejs";
export const dynamic = "force-dynamic";
import { NextRequest } from "next/server";
import { listDrafts, upsertDraft } from "@/src/lib/db";
export async function GET() {
  const drafts = await listDrafts();
  return Response.json(drafts);
}
export async function POST(req: NextRequest) {
  const body = await req.json();
  const draft = await upsertDraft(body?.id, body?.data || {});
  return Response.json(draft, { status: 201 });
}
