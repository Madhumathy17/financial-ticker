import {getLoader} from "./components/Loader.js";
import {SnapshotCsvReader} from "./utils/SnapshotCsvReader.js";
import {makeErrorElement} from "./components/common.js";
import SnapshotViewer from "./components/SnapshotViewer.js";
import RenderElement from "./components/RenderElement.js";
import {DeltaCsvReader, DeltaData} from "./utils/DeltaCsvReader.js";

export default class App extends RenderElement{

    private readonly loader :HTMLElement;
    private dataViewer: SnapshotViewer | undefined;
    private deltaCsvReader: DeltaCsvReader;

    constructor(parentElement : HTMLElement) {
        super(parentElement, "div")
        this.element.classList.add("main")
        this.deltaCsvReader = new DeltaCsvReader();
        this.loader = getLoader()
        this.render();
    }

    render(){
        this.element.appendChild(this.loader);
        const snapShotCsvReader = new SnapshotCsvReader();
        snapShotCsvReader.getSnapshotData()
            .then( data =>  {
                this.dataViewer = new SnapshotViewer(this.element, data);
                this.loader.remove();

                // debounce from delta
                this.readFromDelta()
            })
            .catch(() => this.element.appendChild(makeErrorElement()));
    }

    readFromDelta() : void{
        console.log("start delta parsing")
        this.deltaCsvReader.getDeltaData()
            .then( data =>
                {
                    this.sleep(0, data)
                }
            );
    }

    sleep(currIndex: number, data : DeltaData[]){
        if(currIndex >= data.length){
            this.readFromDelta();
        }
        else{
            console.log("emitting update")
            const d = data[currIndex]
            setTimeout(() =>{
                this.dataViewer?.update(d.snaps)
                this.sleep(currIndex+1, data)
                }, d.waitTime)
        }
    }



}

