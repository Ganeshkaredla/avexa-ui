export const runtime = "nodejs";
export const dynamic = "force-dynamic";
import { NextRequest } from "next/server";
import { deleteDraft, getDraft, upsertDraft } from "@/src/lib/db";
export async function GET(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  const d = await getDraft(params.id);
  if (!d) return new Response("Not found", { status: 404 });
  return Response.json(d);
}
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await req.json();
  const d = await upsertDraft(params.id, body?.data || {});
  return Response.json(d);
}
export async function DELETE(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  const ok = await deleteDraft(params.id);
  return new Response(null, { status: ok ? 204 : 404 });
}
