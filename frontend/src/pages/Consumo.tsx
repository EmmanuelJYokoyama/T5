import { useEffect, useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';

interface Cliente {
  id: number;
  nome: string;
}

interface Produto {
  id: number;
  nome: string;
}

const BASE_URL = 'http://localhost:3000';

export default function Consumo() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [clienteId, setClienteId] = useState<number | null>(null);
  const [produtoId, setProdutoId] = useState<number | null>(null);
  const [quantidade, setQuantidade] = useState<number>(1);
  const [mensagem, setMensagem] = useState<string | null>(null);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    fetchClientes();
    fetchProdutos();
  }, []);

  const fetchClientes = async () => {
    try {
      const res = await fetch(`${BASE_URL}/clientes`);
      const data = await res.json();
      setClientes(data);
    } catch {
      setErro('Erro ao carregar clientes.');
    }
  };

  const fetchProdutos = async () => {
    try {
      const res = await fetch(`${BASE_URL}/produtos`);
      const data = await res.json();
      setProdutos(data);
    } catch {
      setErro('Erro ao carregar produtos.');
    }
  };

  const registrarConsumo = async () => {
    if (!clienteId || !produtoId || quantidade <= 0) {
      setErro('Preencha todos os campos corretamente.');
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/consumos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clienteId, produtoId, quantidade }),
      });

      if (!res.ok) throw new Error();

      setMensagem('Consumo registrado com sucesso.');
      setClienteId(null);
      setProdutoId(null);
      setQuantidade(1);
      setErro(null);
    } catch {
      setErro('Erro ao registrar consumo.');
    }
  };

  return (
    <Container className="py-4">
      <h3 className="text-primary mb-4">Registrar Consumo</h3>

      {erro && <Alert variant="danger">{erro}</Alert>}
      {mensagem && <Alert variant="success">{mensagem}</Alert>}

      <Form.Group className="mb-3">
        <Form.Label>Cliente</Form.Label>
        <Form.Select
          value={clienteId ?? ''}
          onChange={(e) => setClienteId(Number(e.target.value))}
        >
          <option value="">Selecione...</option>
          {clientes.map((c) => (
            <option key={c.id} value={c.id}>
              {c.nome}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Produto ou Serviço</Form.Label>
        <Form.Select
          value={produtoId ?? ''}
          onChange={(e) => setProdutoId(Number(e.target.value))}
        >
          <option value="">Selecione...</option>
          {produtos.map((p) => (
            <option key={p.id} value={p.id}>
              {p.nome}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Quantidade</Form.Label>
        <Form.Control
          type="number"
          min={1}
          value={quantidade}
          onChange={(e) => setQuantidade(Number(e.target.value) || 1)}
        />
      </Form.Group>

      <Button onClick={registrarConsumo}>Registrar</Button>
    </Container>
  );
}
