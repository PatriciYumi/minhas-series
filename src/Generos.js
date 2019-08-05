import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Generos = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('/api/genres').then(res => {
            setData(res.data.data)
        });
    }, [])

    const deleteGenero = id => {
        axios.delete('/api/genres/' + id)
        .then(res => {
            const filtrado = data.filter(item => item.id !== id);
            setData(filtrado);
        })
    }

    const renderizaLinha = record => {
        return(
            <tr key={record.id}>
                <th scope="row">{record.id}</th>
                <td>{record.name}</td>
                <td>
                    <button className="btn btn-danger" onClick={() => deleteGenero(record.id)}>Deletar</button>
                    <Link className="btn btn-warning" to={'/generos/' + record.id}>Editar</Link>
                </td>
            </tr>
        );
    }

    if (data.length === 0) {
        return(
            <div className="container">
                <h1>Gêneros</h1>
                <Link to="/generos/novo" className="btn btn-primary">Novo Gênero</Link>

                <div className="alert alert-warning" role="alert">
                    Ainda não existem gêneros cadastrados!
                </div>
            </div>
        );
    }

    return (
        <div className="container">
            <h1>Generos</h1>

            <Link to="/generos/novo" className="btn btn-primary">Novo Gênero</Link>

            <table className="table">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Gênero</th>
                        <th scope="col">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(renderizaLinha)}
                </tbody>
            </table>
        </div>
    );
}

export default Generos;