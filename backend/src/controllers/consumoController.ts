import { Request, Response } from "express";
import prisma from "../services/prisma";

const registrar = async (req: Request, res: Response) => {
  try {
    const { clienteId, produtoId, quantidade } = req.body;

    if (
      typeof clienteId !== "number" ||
      typeof produtoId !== "number" ||
      typeof quantidade !== "number" ||
      quantidade <= 0
    ) {
      return res.status(400).json({
        error: "clienteId, produtoId e quantidade válidos são obrigatórios.",
      });
    }

    const consumo = await prisma.consumo.create({
      data: {
        clienteId,
        produtoId,
        quantidade,
      },
    });

    res.status(201).json(consumo);
  } catch (error: any) {
    console.error("Erro ao registrar consumo:", error);
    res.status(500).json({ error: "Erro interno ao registrar consumo." });
  }
};

const listar = async (_req: Request, res: Response) => {
  try {
    const consumos = await prisma.consumo.findMany({
      include: {
        cliente: { select: { id: true, nome: true } },
        produto: { select: { id: true, nome: true } },
      },
    });
    res.status(200).json(consumos);
  } catch (error) {
    console.error("Erro ao listar consumos:", error);
    res.status(500).json({ error: "Erro interno ao listar consumos." });
  }
};

export { registrar, listar };
