import React from "react";

import Header from "./components/Header/index";
import Generos from "./components/Generos/Generos";
import NovoGenero from "./components/NovoGenero/index";
import EditarGenero from "./EditarGenero";

import Series from "./components/Series/index";
import NovaSerie from "./components/NovaSerie/index";
import InfoSerie from "./components/EditarSerie/InfoSerie";

import "./App.css";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

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

function App() {
  return (
    <div className="body">
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/generos" exact component={Generos} />
          <Route path="/generos/novo" exact component={NovoGenero} />
          <Route path="/generos/:id" exact component={EditarGenero} />
          <Route path="/series" exact component={Series} />
          <Route path="/series/novo" exact component={NovaSerie} />
          <Route path="/series/:id" exact component={InfoSerie} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
