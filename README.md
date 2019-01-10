# NgNgrid2

This is a data grid using angular 7 with typescript
More info to come.

You can see the demo here: https://nikhilogic.github.io/ngNgrid2/ 

## To install the library in your project :

1.  Add npm package and dependencies
```Batchfile
npm install ngrid2
npm install @angular/http@latest
npm install @ng-bootstrap/ng-bootstrap@latest
npm install npm@latest
```

2. Add imports to your app.module.ts 
```typescript
    import { Ngrid2Module } from 'ngrid2';
    ...
    @NgModule({
    ...
    imports: [
        ...
        Ngrid2Module
    ],
    ...
    })
```

3. In your app.component.ts
```typescript
    //Import required types
    ...
    import { Ngrid2ButtonColumn, Ngrid2DefaultColumn, Ngrid2InputColumn, Ngrid2SelectColumn, Ngrid2LinkColumn,  Ngrid2DateColumn,Ngrid2DropdownFilter,INgrid2Row } from 'ngrid2';
    ...

    export class AppComponent implements OnInit {
    ...
     // define the variables used for the grid
     columnDefinitions : Ngrid2DefaultColumn[];    //Used for intializing the main columns for the grid
     rows : any[]; //used for setting the rows for the grid
     childColumndefinitions : Ngrid2DefaultColumn[];    //optional: used for setting child columns 
     childPropertynames:  string[];  // optional : used for specifying which property of the main row contains the child rows.
     ...
    
     
     //create column objects (example a button column)
     getButtonCol(): Ngrid2DefaultColumn {
        var btnCol : Ngrid2ButtonColumn = new Ngrid2ButtonColumn();
        btnCol.Name= "Col2",
        btnCol.isNgNgridColumnHide = false,
        btnCol.DisplayName = () => {
        return btnCol.Name;
        };
        btnCol.isNgNgridSelected = false;        
        btnCol.ClassFn  = (r: INgrid2Row) => {
        return "btn-" + r[btnCol.Name];
        };
        btnCol.CellClassFn = (r: INgrid2Row) => {
        return "";
        };
        btnCol.TooltipFn = (r: INgrid2Row) => {      
        return "hello";
        };
        btnCol.BadgeFn = (r: INgrid2Row) => {      
        return r.Index.toString();
        };
        btnCol.BadgeClassFn = (r: INgrid2Row) => {      
        return "badge-dark badge-pill";
        };
        btnCol.BadgeUrlFn = (r: INgrid2Row) => {      
        return "https=//www.bing.com"
        };
        btnCol.BadgeTargetFn = (r: INgrid2Row) => {      
        return "_top"; 
        };
        btnCol.IconFn = (r: INgrid2Row) => {
        return "far fa-play-circle";
        };
        btnCol.NullOrEmptyFn =  (r: INgrid2Row) => {      
        return "No Value";
        }        
        btnCol.FilterClassFn = (d: Ngrid2DropdownFilter) => {      
        return "bg-"  + d.DistinctValue ;
        };
        btnCol.FilterIconFn= (d: Ngrid2DropdownFilter) => {
        return "far fa-play-circle";
        };
        btnCol.NullOrEmptyFn =  (r: INgrid2Row) => {      
            return "No Value";
        }
        btnCol.ClickFn =  (r: INgrid2Row) => {
        alert("clicked");
        };
        btnCol.DisabledFn =  (r: INgrid2Row) => {
        return false;
        }
        return btnCol;
    }
...
 ngOnInit() {           
     
    //set the columns for the grid
    this.columnDefinitions = [];    
    this.rows = [];    
    this.childColumndefinitions = [];
    this.childPropertynames =["Children"];        

    //add column definition for the grid
    this.columnDefinitions.push(this.getButtonCol());

    //create a row for the grid
    var newrow : AppObj = new AppObj();
    newrow.Index = index;
    newrow.isNgNgridOpen = false;
    newrow.Col2  = "textonbutton";      
    
    //add the row to the grid
    this.rows.push(newrow); 
    ...
 }
```
4. In your HTML reference the grid like this

```html
<ng-ngrid2
[columnDefinitions]="columnDefinitions" 
[childColumndefinitions]="childColumndefinitions"
[rows]="rows" 
[showSettings]="false"
[childPropertynames]="childPropertynames"></ng-ngrid2>
```




