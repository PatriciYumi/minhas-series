// Componente contém a sessão com as séries cadastradas

// Dependências
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// CSS
import "./index.css";
import { Badge } from "reactstrap";

// Ícon
import { MdAddCircle, MdEdit, MdClear } from "react-icons/md";

const Series = () => {
  // Variáveis
  const [data, setData] = useState([]);

  // Funções
  useEffect(() => {
    axios.get("/api/series").then(res => {
      setData(res.data.data);
    });
  }, []);

  const deleteSerie = id => {
    axios.delete("/api/series/" + id).then(res => {
      const filtrado = data.filter(item => item.id !== id);
      setData(filtrado);
    });
  };

  if (data.length === 0) {
    return (
      <div className="container">
        <h1>Séries</h1>

        <Link to="/series/novo" className="btn btn-primary">
          Nova Série
        </Link>

        <div className="alert alert-warning" role="alert">
          Ainda não existem séries cadastradas!
        </div>
      </div>
    );
  }

  return (
    <div className="container-series">
      <div className="nav">
        <h3>Séries</h3>

        <Link to="/series/novo" className="btn-series">
          <MdAddCircle className="add" style={{ fontSize: "32px" }} />
          Nova Série
        </Link>
      </div>

      {data.length > 0 ? (
        <ul>
          {data.map(record => (
            <li
              style={{
                height: "auto",
                backgroundImage: `url('${record.background}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat"
              }}
            >
              <div className="info-background">
                <div className="info-conteudo">
                  <img
                    className="img-info-serie"
                    src={record.poster}
                    alt={"Poster " + record.name}
                  />

                  <div className="dados-info-serie">
                    <h4>{record.name}</h4>
                    <p>
                      <strong>Gênero: </strong>
                      {record.genre}
                    </p>
                    <Badge className="badge" color="success">
                      Assistido
                    </Badge>
                    <Badge color="warning">Para assistir</Badge>

                    <button
                      className="btn btn-danger"
                      onClick={() => deleteSerie(record.id)}
                    >
                      <MdClear />
                      Deletar
                    </button>
                    <Link
                      className="btn btn-warning"
                      to={"/series/" + record.id}
                    >
                      <MdEdit />
                      Editar
                    </Link>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        "Vazio!"
      )}
    </div>
  );
};

export default Series;
