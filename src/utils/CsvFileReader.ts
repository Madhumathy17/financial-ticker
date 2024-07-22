
export interface CsvRow {
    Columns: string[]
}

export const defaultDelimiter = ',';

export class CsvReader {
    private readonly path: string;
    private readonly delimiter: string;

    public constructor(path: string, delimiter: string) {
        this.path = path;
        this.delimiter = delimiter;
    }

    protected async readFile(): Promise<CsvRow[]> {
        return readFromFile(this.path, this.delimiter);
    }
}



const readFromFile = async (filePath : string, delimiter : string) : Promise<CsvRow[]> => {
    return fetch(filePath)
        .then(response => response.text())
        .then(data => convertFileContentsToRows(data, delimiter));
}

const convertFileContentsToRows = (fileContents : string, delimiter : string) : CsvRow[]  => {
    return fileContents.split('\r\n').map(line => convertStringToCsvRow(line, delimiter))
}

const convertStringToCsvRow = (csvRow : string, delimiter : string) : CsvRow => {
    return {
        Columns : csvRow.split(delimiter).map(d => d.trim())
    }
}