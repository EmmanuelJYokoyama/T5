import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Clientes from './pages/Clientes';
import Produtos from './pages/Produtos';
import Consumo from './pages/Consumo';
import Home from './pages/Home';
import Relatorios from './pages/Relatorios';
import { Container, Navbar, Nav } from 'react-bootstrap';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar bg="danger" variant="dark" expand="lg">
        <Container className="d-flex justify-content-between align-items-center">
          <Navbar.Brand href="/">WorldBeauty</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse>
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/clientes">Clientes</Nav.Link>
              <Nav.Link as={Link} to="/produtos">Produtos</Nav.Link>
              <Nav.Link as={Link} to="/consumo">Consumo</Nav.Link>
              <Nav.Link as={Link} to="/relatorios">Relatórios</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/produtos" element={<Produtos />} />
        <Route path="/consumo" element={<Consumo />} />
        <Route path="/relatorios" element={<Relatorios />} />
      </Routes>
    </BrowserRouter>
  );
}
