import {Snaps, SnapShotData} from "../utils/SnapshotCsvReader.js";
import {makeTdElement} from "./common.js";
import RenderElement from "./RenderElement.js";
import {DataChange} from "./LineChart.js";

export default class SnapshotRow extends RenderElement{

    private readonly data : SnapShotData
    private readonly iconElement : HTMLElement;
    private readonly priceElement : HTMLElement;
    private readonly priceChangeElement : HTMLElement;
    private readonly priceChangePercentElement : HTMLElement;
    private readonly dataChanges: DataChange[]

    constructor(parentElement: HTMLElement,data : SnapShotData, time: Date) {
        super(parentElement, "tr");
        this.data = data;
        this.dataChanges = [{
            price: data.price,
            time: time
        }]


        this.iconElement = makeTdElement("")
        this.priceElement = makeTdElement(this.data.price + "");
        this.priceChangeElement = makeTdElement(this.data.change + "")
        this.priceChangePercentElement = makeTdElement(this.data.changePercentage + "")

        this.render();
    }

    private render(){

        this.element.classList.add("snap-show-view")
        this.element.appendChild(makeTdElement(this.data.name))
        this.element.appendChild(makeTdElement(this.data.companyName))

        this.element.appendChild(this.iconElement)
        this.element.appendChild(this.priceElement)
        this.element.appendChild(this.priceChangeElement)
        this.element.appendChild(this.priceChangePercentElement)
        this.element.appendChild(makeTdElement(this.data.marketCap))

        this.updateColorBasedOnChange(this.data.change)
    }

    public getIndex() : number {
        return this.data.index;
    }

    public update(snap : Snaps, time : Date) : void {
        if(!this.isValidSnap(snap)){
            return
        }

        this.dataChanges.push({
            price: snap.price,
            time: time
        })

        this.priceElement.innerText = snap.price + ""
        this.priceChangeElement.innerText = snap.change + ""
        this.priceChangePercentElement.innerText = snap.changePercentage + ""

        this.updateColorBasedOnChange(snap.change)

        console.log("TODO: trend data for " + this.data.name + ": ")
        console.log(this.dataChanges)

    }

    updateColorBasedOnChange(change: number){
        this.iconElement.setAttribute("class", "")
        if(change > 0){
            this.iconElement.classList.add('ticker__price__up')
        }else if (change < 0) {
            this.iconElement.classList.add('ticker__price__down')
        }
    }

    isValidSnap(snap : Snaps) : boolean{
        return !isNaN(snap.price)
    }

}