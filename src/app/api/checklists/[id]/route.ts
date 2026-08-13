import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/checklists/[id] — busca um template específico
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const template = await prisma.checklistTemplate.findUnique({
      where: { id },
      include: { executions: { orderBy: { startedAt: "desc" }, take: 5 } },
    });

    if (!template) {
      return NextResponse.json({ error: "Checklist não encontrado" }, { status: 404 });
    }

    return NextResponse.json(template);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erro ao buscar checklist" }, { status: 500 });
  }
}

// DELETE /api/checklists/[id] — remove um template
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.checklistTemplate.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erro ao remover checklist" }, { status: 500 });
  }
}
