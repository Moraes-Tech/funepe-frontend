import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';

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
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand href="/home">
        <img
          className="img-fluid rounded mx-auto mb-1"
          src={logo}
          alt="logo"
          width={100}
          height={100}
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <NavDropdown title="Configurações" id="basic-nav-dropdown">
            <NavDropdown.Item href="/usuario">Usuários</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/tipoarquivo">
              Tipos de Arquivos
            </NavDropdown.Item>
            <NavDropdown.Item href="/tipodocumento">
              Tipos de Documentos
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/cadastros">Cadastros</NavDropdown.Item>
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
