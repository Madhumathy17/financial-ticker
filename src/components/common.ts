

export function makeTdElement(data:string) : HTMLElement {
    const span = document.createElement("td");
    span.textContent = data
    return span;
}

export function makeErrorElement() : HTMLElement {
    const el  = makeElement("Error", "span");
    el.className = "error";
    return el;
}

export function makeElement(data:string, tagName : string) : HTMLElement {
    const span = document.createElement(tagName);
    span.textContent = data
    return span;
}