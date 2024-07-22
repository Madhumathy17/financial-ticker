import App from "./App.js";

function getHeader() : HTMLElement {
    const header = document.createElement("header");
    header.innerText = "Madhu's Financial Ticker"
    return header;
}

function getFooter() : HTMLElement {
    const footer = document.createElement("footer");
    footer.innerText = "© " + new Date().getFullYear() +  " Copyright, Madhumathy Shanmugha Sundaram"
    return footer;
}

function buildMainApp() {
    const element= document.getElementById("app");

    if (element) {
        element.appendChild(getHeader())
        const app = new App(element);
        element.appendChild(getFooter())
    }
}

buildMainApp();