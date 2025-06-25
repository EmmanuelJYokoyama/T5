import { Request, Response } from "express";
import prisma from "../services/prisma";

export const top10MaisConsumiram = async (_: Request, res: Response) => {
  const resultado = await prisma.consumo.groupBy({
    by: ['clienteId'],
    _sum: { quantidade: true },
    orderBy: { _sum: { quantidade: 'desc' } },
    take: 10
  });
  res.json(resultado);
};

export const top10MenosConsumiram = async (_: Request, res: Response) => {
  const resultado = await prisma.consumo.groupBy({
    by: ['clienteId'],
    _sum: { quantidade: true },
    orderBy: { _sum: { quantidade: 'asc' } },
    take: 10
  });
  res.json(resultado);
};

export const top5PorValor = async (_: Request, res: Response) => {
  const resultado = await prisma.$queryRawUnsafe(`
    SELECT c.clienteId, SUM(p.preco * c.quantidade) AS valorTotal
    FROM Consumo c
    JOIN Produto p ON p.id = c.produtoId
    GROUP BY c.clienteId
    ORDER BY valorTotal DESC
    LIMIT 5;
  `);
  res.json(resultado);
};

export const porGenero = async (_: Request, res: Response) => {
  const resultado = await prisma.$queryRawUnsafe(`
    SELECT cl.genero, pr.nome, SUM(c.quantidade) AS total
    FROM Consumo c
    JOIN Cliente cl ON cl.id = c.clienteId
    JOIN Produto pr ON pr.id = c.produtoId
    GROUP BY cl.genero, pr.nome
    ORDER BY cl.genero;
  `);
  res.json(resultado);
};

export const maisConsumidos = async (_: Request, res: Response) => {
  const resultado = await prisma.$queryRawUnsafe(`
    SELECT p.nome, SUM(c.quantidade) AS total
    FROM Consumo c
    JOIN Produto p ON p.id = c.produtoId
    GROUP BY p.nome
    ORDER BY total DESC
    LIMIT 10;
  `);
  res.json(resultado);
};
