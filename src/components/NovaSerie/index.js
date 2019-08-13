import React, { useState } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

// react-strap
import { Modal, Button } from "react-bootstrap";

// componente
const NovaSerie = props => {
  // hooks
  const [name, setName] = useState("");
  const [success, setSuccess] = useState(false);

  // função: recupera nome da série
  const onChange = evt => {
    setName(evt.target.value);
  };

  // função: salva série na apo
  const save = () => {
    axios
      .post("/api/series", {
        name
      })
      .then(res => {
        setSuccess(true);
        return <Redirect to="/series" />;
      });
  };

  if (success) {
    return <Redirect to="/series" />;
  }

  // elementos
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Nova Série</Modal.Title>
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
              placeholder="Título da série"
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

export default NovaSerie;
