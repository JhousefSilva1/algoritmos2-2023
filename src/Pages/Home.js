import React, { useEffect } from "react";
import Header from "../components/header/Header";

import Title from "../components/Title";
import Card from "../components/Card";
import { useHistory } from "react-router-dom";
import "../Styles/home.css";

const Home = ({ deletePoppers }) => {
    useEffect(() => {
        deletePoppers();
    }, [deletePoppers]);

    const history = useHistory();

    const openGraphs = () => {
        history.push("/grafos/main");
    };

    const openJohnson = () => {
        history.push("/grafos/johnson");
    };

    const openAsignacion = () => {
        history.push("/grafos/asignacion");
    };

    // Sort
    const openSelectionSort = () => {
        history.push("/sort/selection");
    };

    return (
        <div>
            <Header title={"Implementación  de  Algoritmos"} logo={""} />
            <Title text={"Grafos"} />
            <div className="card-wrapper" style={{ paddingBottom: "1rem" }}>
                <Card
                    subtitle="Generación de Grafos"
                    img="/img/Card/grafos.png"
                    text="Representación de los grafos aplicados a la empresa LATAM"
                    buttonText="Grafos"
                    onClick={openGraphs}
                />
                <Card
                    subtitle="Johnson"
                    img="/img/Card/johnson.png"
                    text="Algoritmo de Johnson"
                    buttonText="Johnson"
                    onClick={openJohnson}
                />
                <Card
                    subtitle="Asignación"
                    img="/img/Card/asignacion.png"
                    text="Algoritmo de Asignación"
                    buttonText="Asignación"
                    onClick={openAsignacion}
                />
            </div>
            <Title text={"Algoritmos de Ordenamiento"} />
            <div className="card-wrapper" style={{ paddingBottom: "5rem" }}>
                <Card
                    subtitle="Selection Sort"
                    img="/img/Card/selection_sort.png"
                    text="Representación de los grafos aplicados a la empresa LATAM"
                    buttonText="Selection Sort"
                    onClick={openSelectionSort}
                />

            </div>


        </div>
    );
};

export default Home;
