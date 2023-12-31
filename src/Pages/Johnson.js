import React from "react";
import { useDispatch } from "react-redux";
import Graph from "../components/Graph/Graph";
import Header from "../components/header/Header";

import Toolbar from "../components/Toolbar/Toolbar";
import Footer from "../components/footer/Footer";
import Modal from "../components/Modal/Modal";
import { useSelector } from "react-redux";
import { johnsonsAlgorithm } from "../utils/algorithms/johnsons";
import popper from "cytoscape-popper";
import cytoscape from "cytoscape";
import { generateMatrix } from "../utils/adjacencyMatrix";
import {
    setAdjacencyMatrix,
    setMatrixLabels,
    setMatrixDisplay,
} from "../redux/actions/adjacencyMatrix";
import { setDisplay } from "../redux/actions/modalStyle";

import "../Styles/johnson.css";

// Importar la librería cytoscape y el módulo 'popper'
cytoscape.use(popper);

const Johnson = () => {
    // Utilizar hooks de Redux para obtener datos del estado global
    const dispatch = useDispatch();
    const currentIndex = useSelector((state) => state.currentIndex);
    const data = useSelector((state) => state.cytoscapeData[currentIndex]);

    const onClick = () => {
        // Ejecutar algoritmo y actualizar el estado global
        const { adjacencyMatrix, indexes } = generateMatrix(data.elements);
        dispatch(setAdjacencyMatrix(adjacencyMatrix));
        dispatch(setMatrixLabels(Array.from(indexes)));
        dispatch(setMatrixDisplay(true));
        dispatch(setDisplay("block"));
        console.log("click");
        const johnsonData = johnsonsAlgorithm({ adjacencyMatrix, indexes });
        console.log(johnsonData);

        // Crear instancia de cytoscape y agregar elementos al gráfico
        const cy = cytoscape({
            container: document.getElementById("cy"),
            style: data.style,
            zoomingEnabled: false,
            userZoomingEnabled: true,
            panningEnabled: true,
            userPanningEnabled: true,
        });
        if (data.elements) {
            if (data.elements.nodes) {
                data.elements.nodes.forEach((element) => {
                    cy.add(element);
                });
            }
            if (data.elements.edges) {
                data.elements.edges.forEach((element) => {
                    cy.add(element);
                });
            }
        }

        // Funciones para crear poppers en nodos y aristas
        const makePopperNode = (node, earlyStart, latestFinish, isCritical) => {
            // Crear y mostrar el popper en el nodo
            // Contiene información de si es crítico
            const popper = node.popper({
                content: () => {
                    const div = document.createElement("div");
                    div.classList.add("popper-div");
                    div.innerHTML = `<table class="${
                        isCritical ? "node node--critical" : "node"
                    }">
                                    <tr>
                                        <td>${earlyStart}</td>
                                        <td>${latestFinish}</td>
                                    </tr>
                               </table>`;
                    document.body.appendChild(div);
                    return div;
                },
                popper: {
                    placement: "bottom",
                },
            });
            return popper;
        };
        
        const makePopperEdge = (edge, value) => {
            // Crear y mostrar el popper en la arista
            // Contiene información del valor 'h'
            const popper = edge.popper({
                content: () => {
                    const div = document.createElement("div");
                    div.classList.add("popper-div");
                    div.innerHTML = "h = " + value;
                    document.body.appendChild(div);
                    return div;
                },
                popper: {
                    placement: "bottom",
                },
            });
            return popper;
        };
        var nodeCritical = " ";
        //Agregando los popper a cada nodo
        johnsonData.nodes.forEach((e) => {
            //Obtenemos la referencia del nodo del cy declarado
            const node = cy.getElementById(e.label);
            //Se envia la referencia del nodo y los valores de los poppers
            const popperNode = makePopperNode(
                node,
                e.earlyStart,
                e.latestFinish,
                e.isCritical
            );
            if (e.isCritical) {
                nodeCritical = nodeCritical + e.label + ", ";
            }
            let updateNode = () => {
                popperNode.update();
            };
            node.on("position", updateNode);
            cy.on("render", updateNode);
        });

        //Agregando los poppers a cada edge
        johnsonData.edges.forEach((e) => {
            //Concatenamos el valor del source y target para obtener el id
            const edge = cy.getElementById(
                e.source[0] + "-" + e.destination[0]
            );
            //Aca igual se envia la referencia del edge y el valor de la holgura
            const popperEdge = makePopperEdge(edge, e.slag);
            let updateEdge = () => {
                popperEdge.update();
            };
            edge.connectedNodes().on("position", updateEdge);
            cy.on("render", updateEdge);
        });

        //CUADRO INDICA CAMINO CRITICO
        const popper = cy.popper({
            content: () => {
                const div = document.createElement("div");
                div.classList.add("popper-div");
                div.innerHTML = `<div>CAMINO CRITICO  <p class="square"> ${nodeCritical} </p></div>`;
                document.body.appendChild(div);
                return div;
            },
            renderedPosition: () => ({ x: 0, y: 0 }),
            popper: {
                placement: "bottom",
            },
        });
    };
    // Renderización del componente
    return (
        <div className="container">
            <Modal />
            <Header title="Algoritmo Johnson"/>
            <Graph />
            <Toolbar />
            <Footer btnText="Ejecutar Algoritmo de Johnson" onClick={onClick} dir="/doc.pdf"/>
        </div>
    );
};

export default Johnson;
