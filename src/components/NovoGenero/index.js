import React, { useState } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

// CSS
import { Modal, Button } from "react-bootstrap";

// Componente principal do arquivo
const NovoGenero = props => {
  // HOOKS: useState
  const [name, setName] = useState("");
  const [success, setSuccess] = useState(false);

  // Função: habilita input para digitar o nome
  const onChange = evt => {
    setName(evt.target.value);
  };

  // Função: cadastra o nome do gênero
  const save = () => {
    axios
      .post("/api/genres", {
        name
      })
      .then(res => {
        setSuccess(true);
      });
  };

  if (success) {
    return <Redirect to="/" />;
  }

  // Elementos
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Novo Gênero
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div className="form-group">
            <label htmlFor="name">Nome</label>
            <input
              type="email"
              value={name}
              onChange={onChange}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Nome do gênero"
            />
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <button type="button" onClick={save} className="btn btn-primary">
          Salvar
        </button>
        <Button className="btn btn-secondary" onClick={props.onHide}>
          Cancelar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NovoGenero;
