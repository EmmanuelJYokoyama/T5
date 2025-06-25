import { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button, Table, Alert } from 'react-bootstrap';

interface Produto {
  id: number;
  nome: string;
  preco: number;
  tipo: 'produto' | 'servico';
}

export default function Produtos() {
  const BASE_URL = 'http://localhost:3000'; // <-- BACKEND PORTA CORRETA
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [tipo, setTipo] = useState<'produto' | 'servico'>('produto');
  const [editando, setEditando] = useState<number | null>(null);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  // GET: Buscar todos os produtos
  async function carregar() {
    setCarregando(true);
    try {
      const response = await fetch(`${BASE_URL}/produtos`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      setProdutos(data);
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
      setErro('Erro ao carregar produtos.');
    }
    setCarregando(false);
  };

  // POST ou PUT: Criar ou editar produto
  async function salvar() {
    if (!nome || !preco || isNaN(parseFloat(preco))) {
      return alert('Preencha todos os campos corretamente!');
    }

    const payload = {
      nome,
      preco: parseFloat(preco),
      tipo,
    };

    try {
      if (editando !== null) {
        // PUT: Atualizar produto existente
        await fetch(`${BASE_URL}/produtos/${editando}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        setProdutos(prev =>
          prev.map(p => (p.id === editando ? { ...p, ...payload } : p))
        );
      } else {
        // POST: Criar novo produto
        const response = await fetch(`${BASE_URL}/produtos`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        const novoProduto = await response.json();
        setProdutos(prev => [...prev, novoProduto]);
      }

      setNome('');
      setPreco('');
      setTipo('produto');
      setEditando(null);
      setErro(null);
    } catch (error) {
      console.error('Erro ao salvar produto:', error);
      setErro('Erro ao salvar produto. Verifique os dados e tente novamente.');
    }
  }

  // DELETE: Excluir produto
  const excluir = async (id: number) => {
    try {
      await fetch(`${BASE_URL}/produtos/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setProdutos(prev => prev.filter(p => p.id !== id));
    } catch (error) {
      console.error('Erro ao excluir produto:', error);
      setErro('Erro ao excluir produto. Tente novamente.');
    }
  };

  const editar = (p: Produto) => {
    setNome(p.nome);
    setPreco(p.preco.toString());
    setTipo(p.tipo);
    setEditando(p.id);
  };

  useEffect(() => {
    carregar();
  }, []);

  return (
    <Container className="py-4">
      <h3 className="text-dark mb-4">Cadastro de Produtos e Serviços</h3>

      {erro && <Alert variant="danger">{erro}</Alert>}

      <Form className="mb-4">
        <Row className="g-3">
          <Col md={4}>
            <Form.Control
              placeholder="Nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </Col>
          <Col md={3}>
            <Form.Control
              placeholder="Preço"
              type="number"
              value={preco}
              onChange={(e) => setPreco(e.target.value)}
            />
          </Col>
          <Col md={3}>
            <Form.Select value={tipo} onChange={(e) => setTipo(e.target.value as 'produto' | 'servico')}>
              <option value="produto">Produto</option>
              <option value="servico">Serviço</option>
            </Form.Select>
          </Col>
          <Col md={2}>
            <Button variant="success" className="w-100" onClick={salvar}>
              {editando ? 'Atualizar' : 'Cadastrar'}
            </Button>
          </Col>
        </Row>
      </Form>

      {produtos.length === 0 ? (
        <Alert variant="info" className="text-center">Nenhum produto cadastrado.</Alert>
      ) : (
        <Table bordered hover responsive size="sm" className="align-middle text-center">
          <thead className="table-light">
            <tr>
              <th>Nome</th>
              <th>Preço</th>
              <th>Tipo</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {produtos.map((p) => (
              <tr key={p.id}>
                <td>{p.nome}</td>
                <td>R${p.preco.toFixed(2)}</td>
                <td>{p.tipo === 'produto' ? 'Produto' : 'Serviço'}</td>
                <td>
                  <Button
                    variant="outline-warning"
                    size="sm"
                    className="me-2"
                    onClick={() => editar(p)}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => excluir(p.id)}
                  >
                    Excluir
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}
