import React, { useState } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

// react-strap
import { Modal, Button } from "react-bootstrap";

const NovoGenero = props => {
  const [name, setName] = useState("");
  const [success, setSuccess] = useState(false);

  const onChange = evt => {
    setName(evt.target.value);
  };

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
