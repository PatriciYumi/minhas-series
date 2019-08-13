import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// componentes
import NovoGenero from "../NovoGenero/index";

// css
import "./index.css";

// Ícon
import { MdAddCircle, MdEdit, MdClear } from "react-icons/md";

const Generos = () => {
  const [data, setData] = useState([]);
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    axios.get("/api/genres").then(res => {
      setData(res.data.data);
    });
  }, []);

  const deleteGenero = id => {
    axios.delete("/api/genres/" + id).then(res => {
      const filtrado = data.filter(item => item.id !== id);
      setData(filtrado);
    });
  };

  return (
    <div className="container-generos">
      <div className="nav">
        <h5>Gêneros</h5>

        <button type="button" onClick={() => setModalShow(true)}>
          <MdAddCircle style={{ fontSize: "20px", marginRight: "10px" }} />
          Novo
        </button>
      </div>

      <NovoGenero show={modalShow} onHide={() => setModalShow(false)} />

      {data.length > 0 ? (
        <ul>
          {data.map(record => (
            <li key={record.id}>
              {record.name}
              <div className="buttons">
                <button title="Editar" type="button">
                  <MdEdit />
                </button>
                <button
                  title="Deletar"
                  type="button"
                  onClick={() => deleteGenero(record.id)}
                >
                  <MdClear />
                </button>

                {/*
                <Link className="btn btn-warning" to={"/generos/" + record.id}>
                  <MdEdit />
                  Editar
                </Link>*/}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>"Não possuem gêneros cadastrados"</p>
      )}
    </div>
  );
};

export default Generos;
