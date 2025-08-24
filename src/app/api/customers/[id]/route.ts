export const runtime = "nodejs";
export const dynamic = "force-dynamic";
import { NextRequest } from "next/server";
import { deleteCustomer, getCustomer, updateCustomer } from "@/src/lib/db";
export async function GET(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  const item = await getCustomer(params.id);
  if (!item) return new Response("Not found", { status: 404 });
  return Response.json(item);
}
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const patch = await req.json();
  const updated = await updateCustomer(params.id, patch);
  if (!updated) return new Response("Not found", { status: 404 });
  return Response.json(updated);
}
export async function DELETE(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  const ok = await deleteCustomer(params.id);
  return new Response(null, { status: ok ? 204 : 404 });
}
