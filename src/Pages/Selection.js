import React, { useState, useRef } from "react";
import "../Styles/selection.css";
import Header from "../components/header/Header";

import Footer from "../components/footer/Footer";
import Button from "../components/Button/Button";
import AnimationContainer from "../components/AnimationContainer/AnimationContainer";
import { arregloRandomico, convertirArregloNumeros, execTimeSelectionSort } from "../utils/algorithms/sortTime";

const Selection = ({ complexity, animation }) => {
    const [numbers, setNumbers] = useState([]);
    const [indexes, setIndexes] = useState([]);
    const [result, setResult] = useState({});
    const [numbersText, setNumbersText] = useState("");

    const generateRandom = () => {
        const cant = prompt("Ingrese la cantidad de números", "1000");
        const min = prompt("Ingrese el valor minimo", "0");
        const max = prompt("Ingrese el valor maximo", "10000");
        const decimales = prompt("Ingrese la cantidad de decimales", "0");
        const input = arregloRandomico(
            Number(cant),
            Number(min),
            Number(max),
            Number(decimales)
        );
        setNumbersText(input.toString());
    };

    const setText = (e) => {
        e.preventDefault();
        setNumbersText(e.target.value);
    };

    const sort = () => {
        let newInput;
        if(!(numbersText instanceof Array)) {
            newInput = convertirArregloNumeros(numbersText);
        } else {
            newInput = numbersText;
        }
        const resultObject = execTimeSelectionSort(newInput);
        setNumbersText(resultObject.result.toString());
        setResult(resultObject);
    };

    const showAnimation = () => {
        setNumbers(result[0].array);

        const loop = (index) => {
            if (index < result.length - 1) {
                setTimeout(() => {
                    setNumbers(result[index].array);
                }, 333);
                setTimeout(() => {
                    setIndexes(result[index + 1].indexes);
                }, 666);
                setTimeout(() => {
                    loop(index + 1);
                }, 1000);
            } else {
                setTimeout(() => {
                    setNumbers(result[result.length - 1].array);
                }, 333);
                setTimeout(() => {
                    setIndexes([]);
                }, 666);
            }
        };

        loop(0);
    };

    const inputRef = useRef(null);

    const fileChange = (e) => {
        console.log(e.target.files[0]);
        if (e.target.files) {
            const fr = new FileReader();
            fr.onload = () => {
                const importedData = JSON.parse(fr.result);
                setNumbersText(importedData);
            };
            fr.readAsText(e.target.files[0]);
        }
    };

    const importFromJSON = () => {
        inputRef.current.click();
    };

    const exportToJSON = () => {
        const data = JSON.stringify(convertirArregloNumeros(numbersText));
        const filename = "data.json";
        const fileType = "text/json";

        const blob = new Blob([data], { type: fileType });
        const a = document.createElement("a");
        a.download = filename;
        a.href = window.URL.createObjectURL(blob);
        const clickEvt = new MouseEvent("click", {
            view: window,
            bubbles: true,
            cancelable: true,
        });
        a.dispatchEvent(clickEvt);
        a.remove();
    };

    return (
        <div className="container">
            <Header title="Selection Sort" logo="/img/latam_logo.png" />
            <div className="container-textarea">
                <textarea row="200000" cols="5000" value={numbersText} onChange={setText} />
                <div className="button-container--vertical">
                    <Button text="Generar Aleatorios" onClick={generateRandom}/>
                    <Button text="Ordenar" onClick={sort} />
                    { animation ? <Button text="Animación" onClick={showAnimation}/> : null }
                    <button title="Guardar" onClick={exportToJSON}>Guardar</button>
                    <button title="Importar" onClick={importFromJSON}>
                        Importar
                        <input
                            ref={inputRef}
                            type="file"
                            name="file"
                            className="input--hidden"
                            onChange={fileChange}
                            accept="text/json"
                        />
                    </button>
                </div>
            </div>
            <div className="time-container">
                <div className="theory-time">
                    <h4>Tiempo Teórico</h4>
                    <h5>
                    {complexity} = { result.theoreticalTime ? result.theoreticalTime + " ms." : null }
                    </h5>
                </div>

                <div className="real-time">
                    <h4>Tiempo Real</h4>
                    <h5>t = { result.realTime ? result.realTime + " ms." : null }</h5>
                </div>
                <AnimationContainer numbers={numbers} indexes={indexes} />
            </div>

            <Footer btnText="" dir="/Sort_MU.pdf" />
        </div>
    );
};

export default Selection;
