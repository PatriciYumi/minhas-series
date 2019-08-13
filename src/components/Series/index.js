// Componente contém a sessão com as séries cadastradas

// Dependências
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// componentes
import NovaSerie from "../NovaSerie/index";

// CSS
import "./index.css";
import { Badge } from "reactstrap";

// Ícon
import { MdAddCircle, MdEdit, MdClear } from "react-icons/md";

const Series = () => {
  // hooks
  const [data, setData] = useState([]);
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    axios.get("/api/series").then(res => {
      setData(res.data.data);
    });
  }, []);

  // função: deleta série
  const deleteSerie = id => {
    axios.delete("/api/series/" + id).then(res => {
      const filtrado = data.filter(item => item.id !== id);
      setData(filtrado);
    });
  };

  // elementos
  return (
    <div className="container-series">
      <div className="nav">
        <h4>Séries</h4>

        <button type="button" onClick={() => setModalShow(true)}>
          <MdAddCircle className="add" style={{ fontSize: "28px" }} />
          Nova Série
        </button>
      </div>

      <NovaSerie show={modalShow} onHide={() => setModalShow(false)} />

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

                    <div className="action-buttons">
                      <button onClick={() => deleteSerie(record.id)}>
                        <MdClear
                          style={{
                            fontSize: "24px",
                            paddingRight: "6px",
                            fontWeight: "bold"
                          }}
                        />
                        Deletar
                      </button>
                      <button>
                        <Link
                          className="link-button"
                          to={"/series/" + record.id}
                        >
                          <MdEdit
                            style={{
                              fontSize: "24px",
                              paddingRight: "6px",
                              fontWeight: "bold"
                            }}
                          />
                          Editar
                        </Link>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="empty">
          <h6>Ainda não existem séries cadastradas! =(</h6>
        </div>
      )}
    </div>
  );
};

export default Series;
