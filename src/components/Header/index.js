// Componente contém a navbar no topo da página

// Dependências
import React from "react";

// CSS
import "./index.css";

// Ícone
import { MdWhatshot } from "react-icons/md";

const Header = () => {
  return (
    <div className="main-header">
      <div className="logo">
        <MdWhatshot style={{ color: "#F2B500" }} />
      </div>
      <h3>minhas séries</h3>
      {/*
      <Navbar color="light" light expand="md">
        <div className="container">
          <NavbarBrand tag={Link} to="/">
            <FaFastForward />
            Minhas Séries
          </NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={open} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink tag={Link} to="/series">
                  Séries
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/generos">
                  Gêneros
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </div>
</Navbar>
*/}
    </div>
  );
};

export default Header;
