import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

// Componentes
import Header from "./components/Header/index";
import Series from "./components/Series/index";
import Generos from "./components/Generos/Generos";

// CSS
import "./App.css";

// Componente página principal
const Home = () => {
  return (
    <div>
      <Header />
      <div class="container-home">
        <Generos />
        <Series />
      </div>
    </div>
  );
};

// Componente principal do arquivo
function App() {
  return (
    <div className="body">
      <Router>
        <Route path="/" exact component={Home} />
      </Router>
    </div>
  );
}

export default App;
