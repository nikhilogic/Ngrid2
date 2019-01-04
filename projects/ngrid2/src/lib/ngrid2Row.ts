
export interface INgrid2Row {    
    isNgNgridOpen: boolean;
    Index : number;
    isNgNgridMarkedForDelete: boolean;
    isNgNgridMarkedForNew: boolean;
    isNgNgridDirty: boolean;
    isNgNgridSelected: boolean;
    isNgNgridUpdated: boolean;
    Children: INgrid2Row[];
  }