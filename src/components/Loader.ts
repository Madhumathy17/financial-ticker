export function getLoader(): HTMLElement {
    const container = document.createElement("div");
    container.classList.add("loader");
    container.innerText = "Loading..."
    return container;
}

export function hideLoader(loader : HTMLElement) {
    loader.remove()
}