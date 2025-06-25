import { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button, Table, Alert, Card } from 'react-bootstrap';

interface Cliente {
  id: number;
  nome: string;
  email: string;
  genero: string;
}

export default function Clientes() {
  const BASE_URL = 'http://localhost:3000';
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [genero, setGenero] = useState('');
  const [editando, setEditando] = useState<number | null>(null);

  const carregar = async () => {
    const response = await fetch(`${BASE_URL}/clientes`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await response.json();
    setClientes(data);
  };

  const salvar = async () => {
    if (!nome || !email || !genero) return alert('Preencha todos os campos!');
    const payload = { nome, email, genero };

    if (editando !== null) {
      await fetch(`${BASE_URL}/clientes/${editando}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    } else {
      await fetch(`${BASE_URL}/clientes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    }

    setNome('');
    setEmail('');
    setGenero('');
    setEditando(null);
    carregar();
  };

  const editar = (c: Cliente) => {
    setNome(c.nome);
    setEmail(c.email);
    setGenero(c.genero);
    setEditando(c.id);
  };

  const excluir = async (id: number) => {
    await fetch(`${BASE_URL}/clientes/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });
    carregar();
  };

  useEffect(() => {
    carregar();
  }, []);

  return (
    <Container className="py-4 d-flex justify-content-center">
      <Card style={{ width: '100%', padding: '2rem' }}>
        <h4 className="mb-4 text-center text-dark">Cadastro de Clientes</h4>

        <Form className="mb-4">
          <Row className="g-3">
            <Col md={4}>
              <Form.Control
                placeholder="Nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </Col>
            <Col md={4}>
              <Form.Control
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
              />
            </Col>
            <Col md={3}>
              <Form.Select value={genero} onChange={(e) => setGenero(e.target.value)}>
                <option value="">Selecione o Gênero</option>
                <option value="Masculino">Masculino</option>
                <option value="Feminino">Feminino</option>
                <option value="Outro">Outro</option>
              </Form.Select>
            </Col>
            <Col md={1}>
              <Button variant="success" onClick={salvar} className="w-150">
                {editando ? 'Salvar' : 'Cadastrar'}
              </Button>
            </Col>
          </Row>
        </Form>

        {clientes.length === 0 ? (
          <Alert variant="info" className="text-center">Nenhum cliente cadastrado.</Alert>
        ) : (
          <Table bordered hover responsive size="sm" className="align-middle text-center">
            <thead className="table-light">
              <tr>
                <th>Nome</th>
                <th>Email</th>
                <th>Gênero</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {clientes.map((c) => (
                <tr key={c.id}>
                  <td>{c.nome}</td>
                  <td>{c.email}</td>
                  <td>{c.genero}</td>
                  <td>
                    <Button variant="outline-warning" size="sm" className="me-2" onClick={() => editar(c)}>Editar</Button>
                    <Button variant="outline-danger" size="sm" onClick={() => excluir(c.id)}>Excluir</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Card>
    </Container>
  );
}
