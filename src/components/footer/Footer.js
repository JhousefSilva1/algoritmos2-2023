import React from 'react';
import { useHistory } from "react-router-dom";
import Button from '../Button/Button';
import './Footer.css';

const Footer = ({ btnText, onClick, dir }) => {
    const history = useHistory();


    const openManual = () => {
        console.log("HOLA");
        const newWindow = window.open("https://github.com/JhousefSilva1/algoritmos2-2023", "_blank", "noopener,noreferrer");
        if(newWindow) {
            newWindow.opener = null;
        }
    }

    if(btnText !== ""){

        return (
            <div>
                <div className="footer">
                    <div className="button-container">
                        {<Button text="Repo gitHub" onClick={openManual}/>}
                        <Button text={btnText} onClick={onClick}/>
                        {/* <Button text="Contáctanos" onClick={redirectToContactUs}/> */}
                    </div>
                </div>
            </div>
            );
    }
    else{
        return (
            <div>
                <div className="footer">
                    <div className="button-container">
                        {<Button text="Repo gitHub" onClick={openManual}/>
                        /*<Button text="Contáctanos" onClick={redirectToContactUs}/> */}
                    </div>
                </div>
            </div>
            );
    }


};

export default Footer;