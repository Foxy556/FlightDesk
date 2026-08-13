import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// POST /api/checklists/[id]/execute — inicia ou salva uma execução
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: templateId } = await params;
    const body = await req.json();
    const { operatorName, completedItems, status } = body;

    // Find or create a default "system" user for demo purposes
    let operator = await prisma.user.findFirst({ where: { email: "operator@flightdesk.app" } });
    if (!operator) {
      operator = await prisma.user.create({
        data: {
          name: operatorName ?? "Operador Padrão",
          email: "operator@flightdesk.app",
          role: "OPERATOR",
        },
      });
    }

    const execution = await prisma.checklistExecution.create({
      data: {
        templateId,
        operatorId: operator.id,
        status: status ?? "IN_PROGRESS",
        completedAt: status === "COMPLETED" ? new Date() : null,
      },
    });

    return NextResponse.json(execution, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erro ao registrar execução" }, { status: 500 });
  }
}
