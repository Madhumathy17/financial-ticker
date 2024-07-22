export default abstract class RenderElement {

    protected readonly element : HTMLElement;

    constructor(parentElement: HTMLElement, tagName : string){
        this.element = document.createElement(tagName);
        parentElement.appendChild(this.element)
    }

}