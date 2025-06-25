import { useEffect, useState } from 'react';
import { Container, Table } from 'react-bootstrap';

export default function Relatorios() {
  const BASE_URL = 'http://localhost:3000';
  const [top10, setTop10] = useState<any[]>([]);
  const [top5, setTop5] = useState<any[]>([]);
  const [menos, setMenos] = useState<any[]>([]);
  const [genero, setGenero] = useState<any[]>([]);
  const [mais, setMais] = useState<any[]>([]);

  useEffect(() => {
    fetch(`${BASE_URL}/relatorios/top10-quantidade`).then(r => r.json()).then(setTop10);
    fetch(`${BASE_URL}/relatorios/top5-valor`).then(r => r.json()).then(setTop5);
    fetch(`${BASE_URL}/relatorios/menos-consumidores`).then(r => r.json()).then(setMenos);
    fetch(`${BASE_URL}/relatorios/genero`).then(r => r.json()).then(setGenero);
    fetch(`${BASE_URL}/relatorios/mais-consumidos`).then(r => r.json()).then(setMais);
  }, []);

  return (
    <Container className="py-4">
      <h3>Relatórios</h3>

      <h5 className="mt-4">Top 10 Clientes (por quantidade)</h5>
      <Table striped bordered size="sm">
        <thead><tr><th>Cliente ID</th><th>Total</th></tr></thead>
        <tbody>
          {top10.map((c, i) => (
            <tr key={i}><td>{c.clienteId}</td><td>{c._sum?.quantidade}</td></tr>
          ))}
        </tbody>
      </Table>

      <h5 className="mt-4">Top 5 Clientes (por valor)</h5>
      <Table striped bordered size="sm">
        <thead><tr><th>Cliente ID</th><th>Valor Total</th></tr></thead>
        <tbody>
          {top5.map((c, i) => (
            <tr key={i}><td>{c.clienteId}</td><td>R${parseFloat(c.valorTotal).toFixed(2)}</td></tr>
          ))}
        </tbody>
      </Table>

      <h5 className="mt-4">Clientes que menos consumiram</h5>
      <Table striped bordered size="sm">
        <thead><tr><th>Cliente ID</th><th>Total</th></tr></thead>
        <tbody>
          {menos.map((c, i) => (
            <tr key={i}><td>{c.clienteId}</td><td>{c._sum?.quantidade}</td></tr>
          ))}
        </tbody>
      </Table>

      <h5 className="mt-4">Consumo por Gênero</h5>
      <Table striped bordered size="sm">
        <thead><tr><th>Gênero</th><th>Produto/Serviço</th><th>Total</th></tr></thead>
        <tbody>
          {genero.map((g, i) => (
            <tr key={i}><td>{g.genero}</td><td>{g.nome}</td><td>{g.total}</td></tr>
          ))}
        </tbody>
      </Table>

      <h5 className="mt-4">Mais Consumidos</h5>
      <Table striped bordered size="sm">
        <thead><tr><th>Nome</th><th>Total</th></tr></thead>
        <tbody>
          {mais.map((m, i) => (
            <tr key={i}><td>{m.nome}</td><td>{m.total}</td></tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
