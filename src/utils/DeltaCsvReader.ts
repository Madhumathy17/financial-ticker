import {CsvReader, CsvRow, defaultDelimiter} from "./CsvFileReader.js";
import {
    snapPriceChangeIdx,
    snapPriceChangePercentIdx,
    snapPriceIdx,
    Snaps
} from "./SnapshotCsvReader.js";

export interface DeltaData {
    snaps: Snaps[]
    waitTime: number
}


const filePath : string = "assets/deltas.csv";

export class DeltaCsvReader extends CsvReader {

    constructor() {
        super(filePath, defaultDelimiter);
    }

    public async getDeltaData () : Promise<DeltaData[]> {
        const deltaDataArray : DeltaData[] = []
        let currentIndex = 0;
        let currentSnapShots : Snaps[] = []
        await this.readFile()
            .then( rows => rows.forEach((row) => {
                if(!this.isWaitTimeRow(row)){
                    const d = getSnapFromRow(row, currentIndex++)
                    currentSnapShots.push(d);
                }else{
                    const delta : DeltaData = {
                        waitTime: Number(row.Columns[0]),
                        snaps: currentSnapShots,
                    }
                    deltaDataArray.push(delta);
                    currentIndex = 0
                    currentSnapShots= []
                }
            }));
        return deltaDataArray;
    }

    private isWaitTimeRow (row : CsvRow) : boolean {
        if(row.Columns.length == 0){
            return false;
        }
        const firstCol = row.Columns[0];
        if(firstCol.length < 1){
            return false;
        }

        return this.isPositiveInt(firstCol);
    }

    private isPositiveInt(firstCol: string) {
        return Number.isInteger(Number(firstCol)) && Number(firstCol) > 0;
    }
}

function getSnapFromRow(row : CsvRow, i : number) : Snaps {
    return {
        index: i,
        price : Number.parseFloat(row.Columns[snapPriceIdx]),
        change : Number.parseFloat(row.Columns[snapPriceChangeIdx]),
        changePercentage : Number.parseFloat(row.Columns[snapPriceChangePercentIdx]),
    }
}