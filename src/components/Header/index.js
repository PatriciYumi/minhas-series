// Componente contém a navbar no topo da página

// Dependências
import React from "react";

// CSS
import "./index.css";

// Ícone
import { MdWhatshot } from "react-icons/md";

// Componente principal do arquivo
const Header = () => {
  // Elementos
  return (
    <div className="main-header">
      <div className="logo">
        <MdWhatshot style={{ color: "#059cdb" }} />
      </div>
      <h3>minhas séries</h3>
    </div>
  );
};

export default Header;
