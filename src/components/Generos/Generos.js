import React, { useState, useEffect } from "react";
import axios from "axios";

// Componentes
import NovoGenero from "../NovoGenero/index";

// CSS
import "./index.css";

// Ícones
import {
  MdAddCircle,
  MdEdit,
  MdClear,
  MdCheck,
  MdDelete
} from "react-icons/md";

// Componente principal do arquivo
const Generos = () => {
  // HOOKS: useState
  const [data, setData] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [edit, setEdit] = useState(false);
  const [meuId, setMeuId] = useState("");
  const [name, setName] = useState("");

  // HOOK: useEffect
  useEffect(() => {
    axios.get("/api/genres").then(res => {
      setData(res.data.data);
    });
  }, [name, data]);

  // Função: deleta um gênero
  const deleteGenero = id => {
    axios.delete("/api/genres/" + id).then(res => {
      const filtrado = data.filter(item => item.id !== id);
      setData(filtrado);
    });
  };

  // Função: habilita o modo de edição
  const verificaEdicao = id => {
    setEdit(true);
    setMeuId(id);

    // Recupera os dados do gênero selecionado
    axios.get("/api/genres/" + id).then(res => {
      setName(res.data.name);
    });
  };

  // Função: habilita input para editar o gênero
  const onChange = evt => {
    setName(evt.target.value);
  };

  // Função: salva as alterações feitas pelo usuário
  const save = id => {
    axios
      .put("/api/genres/" + id, {
        name
      })
      .then(res => {
        // Fecha o modo de edição
        setEdit(false);
        setData(data);
      });
  };

  // Elementos
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
              {meuId === record.id && edit ? (
                <div>
                  <input type="text" value={name} onChange={onChange} />
                  <div className="buttons">
                    <button
                      title="Salvar"
                      type="button"
                      onClick={() => save(record.id)}
                    >
                      <MdCheck />
                    </button>

                    <button
                      title="Cancelar"
                      type="button"
                      onClick={() => setEdit(false)}
                    >
                      <MdClear />
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <p>{record.name}</p>
                  <div className="buttons">
                    <button
                      title="Editar"
                      type="button"
                      onClick={() => verificaEdicao(record.id)}
                    >
                      <MdEdit />
                    </button>

                    <button
                      title="Excluir"
                      type="button"
                      onClick={() => deleteGenero(record.id)}
                    >
                      <MdDelete />
                    </button>
                  </div>
                </div>
              )}
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
