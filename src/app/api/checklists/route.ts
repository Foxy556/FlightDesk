import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/checklists — lista todos os templates
export async function GET() {
  try {
    const templates = await prisma.checklistTemplate.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(templates);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erro ao buscar checklists" }, { status: 500 });
  }
}

// POST /api/checklists — cria um novo template
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, description, items } = body;

    if (!title || !items) {
      return NextResponse.json({ error: "Título e itens são obrigatórios" }, { status: 400 });
    }

    const template = await prisma.checklistTemplate.create({
      data: {
        title,
        description: description ?? "",
        items: JSON.stringify(items),
      },
    });

    return NextResponse.json(template, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erro ao criar checklist" }, { status: 500 });
  }
}
