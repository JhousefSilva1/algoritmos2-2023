import React from "react";
import Graph from "../components/Graph/Graph";
import Header from "../components/header/Header";

import Toolbar from "../components/Toolbar/Toolbar";
import Footer from "../components/footer/Footer";
import Modal from "../components/Modal/Modal";
import { generateMatrix } from '../utils/adjacencyMatrix';
import { setAdjacencyMatrix, setMatrixLabels, setMatrixDisplay } from "../redux/actions/adjacencyMatrix";
import { setDisplay } from '../redux/actions/modalStyle';

import { useSelector, useDispatch } from "react-redux";

const Main = () => {
    // Utilizar hooks de Redux para obtener datos del estado global
    const dispatch = useDispatch();
    const currentIndex = useSelector((state) => state.currentIndex);
    const data = useSelector((state) => state.cytoscapeData[currentIndex]);

    const onClick = () => {
        try {
            // Generar matriz de adyacencia a partir de los elementos del gráfico
            const { adjacencyMatrix, indexes } = generateMatrix(data.elements);
            // Actualizar el estado global con la matriz y etiquetas
            dispatch(setAdjacencyMatrix(adjacencyMatrix));
            dispatch(setMatrixLabels(Array.from(indexes)));
            dispatch(setMatrixDisplay(true));
            dispatch(setDisplay("block"));
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="container">
            <Modal />
            <Header title="Diseño de Grafos"/>
            <Graph />
            <Toolbar />
            <Footer btnText="Generar matriz de adyacencia" onClick={onClick} dir="/doc.pdf"/>
        </div>
    );
};

export default Main;
