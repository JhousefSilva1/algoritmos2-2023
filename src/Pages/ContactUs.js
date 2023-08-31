import React from "react";
import FooterContact from "../components/FooterContact/FooterContact";
import Contacts from "../components/Contacts/Contacts";
import Header from "../components/header/Header";

const ContactUs = () => {
    return (
        <div className="container">
            <Header title="Diseño de Grafos"/>
            <Contacts />
            <FooterContact />
        </div>
    );
};

export default ContactUs;
