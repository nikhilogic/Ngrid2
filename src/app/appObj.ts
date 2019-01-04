import { INgrid2Row } from "ngrid2";

export class AppObj implements INgrid2Row
{
    Children: INgrid2Row[];    
    isNgNgridOpen: boolean;
    Index: number;
    isNgNgridMarkedForDelete: boolean;
    isNgNgridMarkedForNew: boolean;
    isNgNgridDirty: boolean;
    isNgNgridSelected: boolean;
    isNgNgridUpdated: boolean;

    Col1: string;
    Col2: string;
    Col3: string;
    Col4 : object;
    Col5 : string;      
    Col6 : Date;
    Col7 : number;
}