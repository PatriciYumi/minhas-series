// Componente contém a sessão com as séries cadastradas

// Dependências
import React, { useState, useEffect } from "react";
import axios from "axios";

// Componente cadastra nova série
import NovaSerie from "../NovaSerie/index";

// CSS
import "./index.css";
import { Badge } from "reactstrap";

// Icons
import {
  MdAddCircle,
  MdEdit,
  MdClear,
  MdCheck,
  MdDelete
} from "react-icons/md";

// Componente principal do arquivo
const Series = () => {
  // HOOKS: useState
  const [data, setData] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [edit, setEdit] = useState(false);
  const [genres, setGenres] = useState([]);
  const [genreId, setGenreId] = useState([]);
  const [meuId, setMeuId] = useState("");
  const [form, setForm] = useState({
    name: ""
  });

  // HOOK: useEffect
  useEffect(() => {
    axios.get("/api/series").then(res => {
      setData(res.data.data);
    });
  }, [data]);

  // Função: deleta série
  const deleteSerie = id => {
    axios.delete("/api/series/" + id).then(res => {
      const filtrado = data.filter(item => item.id !== id);
      setData(filtrado);
    });
  };

  // Função: habilita o modo de edição
  const verificaEdicao = (id, genre) => {
    setEdit(true);
    setMeuId(id);

    // Recupera os gêneros da API com todos os gêneros cadastrados
    axios.get("/api/genres").then(res => {
      setGenres(res.data.data);
      const genres = res.data.data;

      // Associa o gênero da série selecionada com um dos gêneros cadastrados na API
      const encontrado = genres.find(value => genre === value.name);
      if (encontrado) {
        setGenreId(encontrado.id);
      }
    });

    // Recupera os dados da série selecionada para edição
    axios.get("/api/series/" + id).then(res => {
      setForm(res.data);
      const form = res.data;
      console.log(form.data);
    });
  };

  // Função: habilita input de seleção de gêneros
  const onChangeGenre = evt => {
    setGenreId(evt.target.value);
  };

  // Função: habilita inputs do formulário do tipo texto
  const onChange = field => evt => {
    setForm({
      ...form,
      [field]: evt.target.value
    });
  };

  // Função: habilita inputs do formulário do tipo radio
  const seleciona = value => () => {
    setForm({
      ...form,
      status: value
    });
  };

  // Função: salva as alterações feitas pelo usuário
  const save = id => {
    axios
      .put("/api/series/" + id, {
        ...form,
        genre_id: genreId
      })
      .then(res => {
        // Fecha o modo de edição
        setEdit(false);
        // Recarrega a página via useEffect
        setData(data);
      });
  };

  // Elementos
  return (
    <div className="container-series">
      <div className="nav">
        <h3>Séries</h3>

        <button type="button" onClick={() => setModalShow(true)}>
          <MdAddCircle className="add" style={{ fontSize: "28px" }} />
          Nova Série
        </button>
      </div>

      {/* Componente traz uma janela modal para cadastro de nova série */}
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
              {meuId === record.id && edit ? (
                <div className="info-background">
                  <div className="info-conteudo">
                    <img
                      className="img-info-serie"
                      src={record.poster}
                      alt={"Poster " + record.name}
                    />

                    <div className="dados-info-serie">
                      <form>
                        <input
                          type="text"
                          value={form.name}
                          onChange={onChange("field")}
                        />
                        <p>
                          <strong>Gênero: </strong>
                          <select onChange={onChangeGenre} value={genreId}>
                            {genres.map(genre => (
                              <option key={genre.id} value={genre.id}>
                                {genre.name}
                              </option>
                            ))}
                          </select>
                        </p>

                        <div className="radio-area">
                          <input
                            type="radio"
                            checked={form.status === "ASSISTIDO"}
                            name="status"
                            id="assistido"
                            value="ASSISTIDO"
                            onChange={seleciona("ASSISTIDO")}
                          />
                          <label htmlFor="assistido">Assistido</label>
                        </div>

                        <div className="radio-area">
                          <input
                            type="radio"
                            checked={form.status === "PARA_ASSISTIR"}
                            name="status"
                            id="paraAssitir"
                            value="PARA_ASSISTIR"
                            onChange={seleciona("PARA_ASSISTIR")}
                          />
                          <label htmlFor="paraAssistir">Para assistir</label>
                        </div>

                        <div className="action-buttons">
                          <button onClick={() => setEdit(false)}>
                            <MdClear
                              style={{
                                fontSize: "24px",
                                paddingRight: "6px",
                                fontWeight: "bold"
                              }}
                            />
                            Cancelar
                          </button>
                          <button type="button" onClick={() => save(form.id)}>
                            <MdCheck
                              style={{
                                fontSize: "24px",
                                paddingRight: "6px",
                                fontWeight: "bold"
                              }}
                            />
                            Salvar
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              ) : (
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
                      {record.status === "ASSISTIDO" && (
                        <Badge className="badge" color="success">
                          Assistido
                        </Badge>
                      )}
                      {record.status === "PARA_ASSISTIR" && (
                        <Badge className="badge" color="warning">
                          Para assistir
                        </Badge>
                      )}
                      <div className="action-buttons">
                        <button onClick={() => deleteSerie(record.id)}>
                          <MdDelete
                            style={{
                              fontSize: "24px",
                              paddingRight: "6px",
                              fontWeight: "bold"
                            }}
                          />
                          Deletar
                        </button>
                        <button
                          onClick={() =>
                            verificaEdicao(record.id, record.genre)
                          }
                        >
                          <MdEdit
                            style={{
                              fontSize: "24px",
                              paddingRight: "6px",
                              fontWeight: "bold"
                            }}
                          />
                          Editar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
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
