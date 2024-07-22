import {CsvReader, CsvRow, defaultDelimiter} from "./CsvFileReader.js";

export interface SnapShotData extends Snaps {
    name:string
    companyName:string
    marketCap: string
}

export interface Snaps {
    index: number
    price: number
    change: number
    changePercentage: number
}

const filePath : string = "assets/snapshot.csv";
export const snapPriceIdx : number = 2;
export const snapPriceChangeIdx : number = 3;
export const snapPriceChangePercentIdx : number = 4;

export class SnapshotCsvReader extends CsvReader {

    constructor() {
        super(filePath, defaultDelimiter);
    }

    public async getSnapshotData () : Promise<SnapShotData[]> {
        return this.readFile()
            .then( rows => rows
                .filter( (d,i) => i > 0 && d.Columns.some(x => x.length > 0))
                .map((row,i) => getSnapShotFromRow(row, i))
            );
    }

}

function getSnapShotFromRow(row : CsvRow, i : number) : SnapShotData {
    return {
        index: i,
        name : row.Columns[0],
        companyName : row.Columns[1],
        price : Number.parseFloat(row.Columns[snapPriceIdx]),
        change : Number.parseFloat(row.Columns[snapPriceChangeIdx]),
        changePercentage : Number.parseFloat(row.Columns[snapPriceChangePercentIdx]),
        marketCap : row.Columns[5],
    }
}