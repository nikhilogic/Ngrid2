import { INgrid2Row } from "./ngrid2Row";
import { Ngrid2DropdownFilter } from "./ngrid2DropdownFilter";

export class Ngrid2DefaultColumn
{   
    Name: string;
    isNgNgridColumnHide: boolean;
    isNgNgridSelected: boolean;        
    DisableFilter: boolean;
    dropDownFilterInput: string;
    readonly columnType: string = "Ngrid2DefaultColumn";
   

    DisplayName: () => string;  

    ClassFn: (r : INgrid2Row) => string ;

    CellClassFn: (r : INgrid2Row) => string ;

    TooltipFn: (r : INgrid2Row) => string ;

    BadgeFn: (r : INgrid2Row) => string ;
    BadgeClassFn: (r : INgrid2Row) => string ;
    BadgeUrlFn: (r : INgrid2Row) => string ;
    BadgeTargetFn: (r : INgrid2Row) => string ;
    

    IconFn: (r : INgrid2Row) => string ;

    FilterClassFn: (d : Ngrid2DropdownFilter) => string ;
    FilterIconFn: (d : Ngrid2DropdownFilter) => string ;
    FilterTextFn: (d : Ngrid2DropdownFilter) => string;
    
    NullOrEmptyFn: (r : INgrid2Row) => string;
}

export class Ngrid2ButtonColumn extends Ngrid2DefaultColumn
{
    readonly columnType: string = "Ngrid2ButtonColumn";
    ClickFn: (r : INgrid2Row) => void;
    DisabledFn: (r : INgrid2Row) => boolean;    
}

export class Ngrid2InputColumn extends Ngrid2ButtonColumn
{    
    readonly columnType: string = "Ngrid2InputColumn";
    InputTypeFn: (r : INgrid2Row) => string;    
}

export class Ngrid2SelectColumn extends Ngrid2ButtonColumn
{    
    readonly columnType: string = "Ngrid2SelectColumn";
    SelectFn: (r : INgrid2Row) => object[];
    SelectValue: string;
    SelectKey: string;
}

export class Ngrid2LinkColumn extends Ngrid2ButtonColumn
{    
    readonly columnType: string = "Ngrid2LinkColumn";
    UrlFn: (r : INgrid2Row) => string;
    
}

export class Ngrid2DateColumn extends Ngrid2ButtonColumn
{    
    readonly columnType: string = "Ngrid2DateColumn";
    DateFormatFn: (r : INgrid2Row) => string;    
}

export class Ngrid2NumberColumn extends Ngrid2ButtonColumn
{    
    columnType: string = "Ngrid2NumberColumn";
    DateFormatFn: (r : INgrid2Row) => string;    
}
//date
//number
//link