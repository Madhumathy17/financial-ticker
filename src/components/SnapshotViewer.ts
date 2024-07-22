import {Snaps, SnapShotData} from '../utils/SnapshotCsvReader.js'
import {makeElement} from "./common.js";
import SnapshotRow from "./SnapshotRow.js";
import RenderElement from "./RenderElement.js";

export default class SnapshotViewer extends RenderElement{

    private readonly snapShots : SnapShotData[];
    private readonly snapShotElements : SnapshotRow[];
    private readonly lastUpdateElement : HTMLElement;

    constructor(parentElement : HTMLElement, snapShots : SnapShotData[]) {
        super(parentElement, "div");
        this.snapShots = snapShots;

        const headerElement = document.createElement("tr")
        headerElement.classList.add("snap-show-view")
        headerElement.appendChild(makeElement("Name", "th"))
        headerElement.appendChild(makeElement("Company Name", "th"))
        headerElement.appendChild(makeElement("", "th"))
        headerElement.appendChild(makeElement("Price", "th"))
        headerElement.appendChild(makeElement("Change", "th"))
        headerElement.appendChild(makeElement("Change %", "th"))
        headerElement.appendChild(makeElement("Market Cap", "th"))

        const container = document.createElement("table")
        container.classList.add("ticker__container")
        container.appendChild(headerElement)

        this.element.appendChild(container)

        const time = new Date()
        this.snapShotElements = this.snapShots.map( s => new SnapshotRow(container,s, time));

        this.lastUpdateElement = makeElement(this.getLastUpdateTimeText(), "p")
        this.lastUpdateElement.classList.add("text-right")
        this.lastUpdateElement.classList.add("padding-right-10")
        this.lastUpdateElement.classList.add("blink-text")
        this.element.appendChild(this.lastUpdateElement)

    }

    public update(deltaData : Snaps[]) : void {
        const time = new Date()
        this.snapShotElements.forEach(snap => {
            const deltaForSnap = deltaData.find(d => d.index === snap.getIndex());
            if(deltaForSnap){
                snap.update(deltaForSnap, time);
            }
        })
        this.lastUpdateElement.innerText = this.getLastUpdateTimeText()
        this.lastUpdateElement.classList.add("blink-text")
    }


    getLastUpdateTimeText() : string{
        return "Last updated at " + (new Date()).toLocaleString()
    }


}



