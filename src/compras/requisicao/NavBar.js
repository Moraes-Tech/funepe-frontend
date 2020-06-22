import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Nav, NavDropdown, Navbar } from 'react-bootstrap';

import { signOut } from '../../store/modules/auth/actions';
import logo from '../../assets/logo-funepe.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function NavBar() {
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();
  const dataSistema = new Date().toDateString();

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Navbar bg="success" expand="lg">
      <Navbar.Brand href="/home">
        <img
          className="img-fluid rounded mx-auto mb-1"
          src={logo}
          alt="logo"
          width={100}
          height={100}
        />{' '}
        COMPRAS
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/requisicao">Requisição</Nav.Link>
          <Nav.Link href="/requisicao">Orçamento</Nav.Link>
          <NavDropdown title="Configurações" id="basic-nav-dropdown">
            <NavDropdown.Item href="/formcategoria">
              Categorias
            </NavDropdown.Item>
            <NavDropdown.Item href="/formdepartamento">
              Departamentos
            </NavDropdown.Item>
            <NavDropdown.Item href="/formempresa">Empresas</NavDropdown.Item>
            <NavDropdown.Item href="/formfornecedor">
              Fornecedores
            </NavDropdown.Item>
            <NavDropdown.Item href="/formmarca">Marcas</NavDropdown.Item>
            <NavDropdown.Item href="/formproduto">Produtos</NavDropdown.Item>
            <NavDropdown.Item href="/formservico">Serviços</NavDropdown.Item>
            <NavDropdown.Item href="/formmedida">
              Unidades de Medida
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/formtipoempresa">
              Tipo de Empresa
            </NavDropdown.Item>
            <NavDropdown.Item href="/formtipoforn">
              Tipo de Fornecedor
            </NavDropdown.Item>
            <NavDropdown.Item href="/formtipotel">
              Tipo de Telefone
            </NavDropdown.Item>
          </NavDropdown>
          <Nav.Link onClick={handleSignOut} href="/">
            Sair
          </Nav.Link>
        </Nav>
        <Navbar.Text>
          Logado:{' '}
          <a href="/login">
            {user.username !== undefined
              ? `${user.username.toUpperCase()}`
              : dataSistema}
          </a>
        </Navbar.Text>
      </Navbar.Collapse>
    </Navbar>
  );
}