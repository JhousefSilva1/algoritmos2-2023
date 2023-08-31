import React, { useEffect } from "react";
import Header from "../components/header/Header";

import Title from "../components/Title";
import Card from "../components/Card";
import { useHistory } from "react-router-dom";
import "../Styles/home.css";

const Home = ({ deletePoppers }) => {
    // Llama a la función deletePoppers cuando el componente se monta o cuando deletePoppers cambia.
    useEffect(() => {
        deletePoppers();
    }, [deletePoppers]);

    const history = useHistory();

    // Redirige a la ruta "/grafos/main" cuando se llama a openGraphs.
    const openGraphs = () => {
        history.push("/grafos/main");
    };

    // Redirige a la ruta "/grafos/johnson" cuando se llama a openJohnson.
    const openJohnson = () => {
        history.push("/grafos/johnson");
    };

    return (
        <div>
            <Header title={"Implementación  de  Algoritmos"} logo={""} />
            <Title text={"Grafos"} />
            <div className="card-wrapper" style={{ paddingBottom: "1rem" }}>
                <Card
                    subtitle="Generación de Grafos"
                    img="/img/Card/grafos.png"
                    buttonText="Generar"
                    onClick={openGraphs}
                />
                <Card
                    subtitle="Johnson"
                    img="/img/Card/johnson.png"
                    buttonText="Johnson"
                    onClick={openJohnson}
                />
            </div>
        </div>
    );
};

export default Home;
