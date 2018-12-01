// Add-AppxPackage -register “C:\windows\SystemApps\Microsoft.MicrosoftEdgeDevToolsClient_8wekyb3d8bbwe\AppxManifest.xml” -DisableDevelopmentMode -Confirm:$false
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { Ngrid2FilterParams } from '../ngrid2FilterParams';
import { Ngrid2Filter } from '../ngrid2Filter';
import { Ngrid2DropdownFilter } from '../ngrid2DropdownFilter';
import { Ngrid2DefaultColumn } from '../ngrid2DefaultColumn';
import { NgbDropdown,NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { INgrid2Row } from '../ngrid2Row';

@Component({
  selector: 'app-ng-ngrid2',
  templateUrl: './ng-ngrid2.component.html',
  styleUrls: ['./ng-ngrid2.component.css'],
  animations: [
    trigger('stretchAnimate', [
      state('inactive', style({        
        transform: 'scale(1)'
      })),
      state('active',   style({        
        transform: 'scale(1.1)'
      })),
      transition('inactive => active', animate('100ms ease-in')),
      transition('active => inactive', animate('100ms ease-out'))
    ])
  ]  
})

export class NgNgrid2Component implements OnInit {
  @Output() gridFiltersChanged = new EventEmitter<Ngrid2FilterParams>();
  @Input() columnClass: string;
  @Input() showChildrenCount:boolean;
  @Input() columnDefinitions: Ngrid2DefaultColumn[];
  @Input() childColumndefinitions: Ngrid2DefaultColumn[]; 
  @Input() childPropertynames:  string[];
  @Input() rowFooterdefinitions:  object[];
  @Input() rows:  INgrid2Row[]; 
  @Input() rowsLoading: boolean;
  @Input() rowsLoadingText: string;
  @Input() gridPageSize: number;
  @Input() gridCurrentPage: number;
  @Input() gridSortColumn: string;
  @Input() gridChildrenSortColumn: string;
  @Input() gridSortOrder: boolean;  
  @Input() gridChildrenSortOrder: boolean;
  @Input() showRowNumbers: boolean;
  @Input() showRowSelector: boolean;
  @Input() gridHeightFixed: number;
  @Input() gridHeightStretchBottomOffset: number;
  //  notifyGridFiltersChanged: '&gridFiltersChanged', -- this is added in component
   // onDataImport: '&',
   // onDataExport: '&',
  //  addColumnFilters: '=?',
  @Input() showSettings:  boolean;
  //  rememberFilters: '=?'
  //dropDownFilterInput: string;
  @Input() filterPageSize: number;
  @Input() filterCurrentPage : number;  
  @Input() columnFilters: Map<string, Ngrid2Filter>;


  @Input() allRowsSelected: boolean;   
  @Input() pageSizeOptions: number[] = [1,5,10,15,20,25,50,100,500,1000];
  @Input() ngNgridStartDate: NgbDateStruct = this.calendar.getToday();
  @Input() ngNgridEndDate: NgbDateStruct = this.calendar.getToday();


  //ngNgridDropdownFilteredObjects = new Map<string,object[]>();

  distinctColValues = new Map<string,Ngrid2DropdownFilter[]>();

  isSorted(col: Ngrid2DefaultColumn):  boolean {
    return ( this.gridSortColumn == col.Name);   
  }
  /*
    * Grid Sorting
    * Checks if the child column is sorted to render the icon indicators
    */
    isChildSorted(sortCol: Ngrid2DefaultColumn):  boolean {
        return (this.gridChildrenSortColumn == sortCol.Name);
    }

  changeSort(col: Ngrid2DefaultColumn) : void {
      this.gridSortOrder = !this.gridSortOrder;
      this.gridSortColumn = col.Name;
    }

    /*
    * Grid Sorting
    * Toggle the sort on the child tables
    */
    changeChildSort(sortCol: Ngrid2DefaultColumn) : void {
        this.gridChildrenSortOrder = !this.gridChildrenSortOrder;
        this.gridChildrenSortColumn = sortCol.Name;
    }

  isColFilterApplied(colName):  boolean {
    var x1 = (this.columnFilters.get(colName) != null);
    //console.info("isColFilterApplied "+ colName + " " + x1);    
    return x1;
  }
 
    
  constructor(private calendar: NgbCalendar) { }
    
    /*
    * Grid scrolling
    * Sets the scroll area as per the stretch bottom offset or fixed height defined 
    */
    setGridTableStyle() : object 
    {
        var topPosition = document.getElementById('ngGridToolbar').getBoundingClientRect().bottom;
        var bottomPosition = 0;
        if (this.gridHeightStretchBottomOffset != null) {
            bottomPosition = this.gridHeightStretchBottomOffset;                
        }
        else {
            bottomPosition = window.innerHeight - this.gridHeightFixed - document.getElementById('ngGridToolbar').getBoundingClientRect().top;
        }
        //console.info("top=" + topPosition + " bottom=" + bottomPosition);
        return { top: topPosition + 'px', bottom: bottomPosition + 'px' };
    };

    getStyle() : object {
        if (this.gridHeightStretchBottomOffset != null) {
            //stretch to window                
            return { height: window.innerHeight - document.getElementById('ngGridToolbar').getBoundingClientRect().top - this.gridHeightStretchBottomOffset + 'px', width: 100 + '%' };
        }
        else {
            return { height: this.gridHeightFixed + 'px', width: 100 + '%' };
        }
    }

  toggleRowsSelect() : void{
    this.allRowsSelected = !this.allRowsSelected;
  }

  getRowClass(row: INgrid2Row) : string 
  {
    if (row.isNgNgridMarkedForDelete) {
        return 'table-danger';
    }
    else if (row.isNgNgridMarkedForNew) {
        return 'table-success';
    }
    else if (row.isNgNgridDirty){
        return 'table-warning';
    }
    else if (row.isNgNgridUpdated){
        return 'ngngrid-animaterow';
    }
    else if (row.isNgNgridSelected) {
        return 'table-info';
    }
    return '';
  }

  childRowsCount(row: INgrid2Row) : number
  {    
    var childRecCount = 0;
    for (var i = 0; i < this.childPropertynames.length; i++) {
        var tempChildRows = this.getValueFromPropertyString(row, this.childPropertynames[i]);
        childRecCount += tempChildRows ? tempChildRows.length : 0;
    }
    return childRecCount;
  }

  canShowRecord(row :INgrid2Row) :boolean {    
    
    if (this.columnFilters != null) {                
        var rowMatched = true;
        this.columnFilters.forEach((v: Ngrid2Filter,k : string) => {            
            //console.info("canShowRecord " + JSON.stringify(v));                       
            var filtersForCol = v.Filters;
            var colMatched = false;
            for (var j = 0; j < filtersForCol.length; j++) {                

                var field = null;
                if (k.indexOf('.') <= -1) {

                    field = row[k];
                }
                else {
                    var splitProp = k.split('.');
                    field = row[splitProp[0]][splitProp[1]];
                }
                if (typeof field == 'object') {                    
                    field = JSON.stringify(field)
                }
                else {                    
                    field = field.toString();                    
                }                            
                if (field.toLowerCase().trim() == filtersForCol[j].trim()) {                               
                    colMatched = true;
                    break;//out of the filter for that column
                }
            }
            rowMatched = rowMatched && colMatched;
        });

                
        return rowMatched;
        
    }
    return true; //no filters for the row
}

  filteredRows(): INgrid2Row[]
  {      

    
    var startingPos = (this.gridCurrentPage-1) * this.gridPageSize;
    // console.info("startingPos "  + startingPos);
    // console.info("this.gridPageSize " + this.gridPageSize);    
    var endingPos = +this.gridPageSize + startingPos;    
    // console.info("endingPos " + endingPos);
    var rowsFiltered =  this.rows.slice(startingPos,endingPos );

    return rowsFiltered.filter( r => this.canShowRecord(r)).sort((r1,r2) => 
        {   
            if(!this.gridSortOrder)         
            {
                var rt = r1;
                r1 = r2;
                r2 = rt;
            }

            if (r1[this.gridSortColumn] < r2[this.gridSortColumn])
                return -1;

            if (r1[this.gridSortColumn] > r2[this.gridSortColumn])
                return 1;
            
            return 0;
        }
     );    
  }
  
  getChildRows(row: INgrid2Row, childColName: string): INgrid2Row[] {
      console.info(childColName);
    //return this.getValueFromPropertyString(row, childColName).sort((r1,r2) => 
    return row[childColName].sort((r1,r2) => 
        {   
            if(!this.gridChildrenSortOrder)         
            {
                var rt = r1;
                r1 = r2;
                r2 = rt;
            }

            if (r1[this.gridChildrenSortColumn] < r2[this.gridChildrenSortColumn])
                return -1;

            if (r1[this.gridChildrenSortColumn] > r2[this.gridChildrenSortColumn])
                return 1;
            
            return 0;
        }
    );  
  }


getValueFromPropertyString(row : INgrid2Row, propString: string) : string {
  var objValue = null;
  if (propString != null) {
      var arrSplitSortProp = propString.split('.');
      for (var i = 0; i < arrSplitSortProp.length; i++) {
          if (i == 0) {
              objValue = row[arrSplitSortProp[i]];
          }
          else if (objValue == null) {
              break;
          }
          else {
              objValue = objValue[arrSplitSortProp[i]];
          }
      }
  }
  return objValue;
}

getColValue(col: Ngrid2DefaultColumn, row: INgrid2Row) : string
{
  return this.getValueFromPropertyString(row, col.Name);
}

showObject(o): string
{
   var s = JSON.stringify(o,null,4);
 //  console.info(s);
  return s;
}

setColValue (col: Ngrid2DefaultColumn, row : INgrid2Row, value):void  {

  if (col.Name != null) {
      var arrSplitSortProp = col.Name.split('.');
      var arrayLen = arrSplitSortProp.length;

      if (arrayLen == 1) {
          //row[arrSplitSortProp[0]] = value;
          row[arrSplitSortProp[0]] =value;
      }
      else {
          var tempObj = null;
          for (var i = 0; i < arrayLen; i++) {
              if (i == 0) {
                  //tempObj = row[arrSplitSortProp[i]];
                  tempObj = row[arrSplitSortProp[i]];
              }
              else if (tempObj == null) {
                  break;
              }
              else if (i == arrayLen - 1) {
                  tempObj[arrSplitSortProp[i]] = value;
              }
              else {
                  tempObj = tempObj[arrSplitSortProp[i]];
              }
          }
      }
  }
}
 /*
  * Grid paging
  * Calculates the total number of pages to set in the pagination control
  */
  gridTotalPages(): number {
    //console.info("gridObj.rows.length "  + this.rows.length);
    //console.info("gridObj.gridPageSize "  + this.gridPageSize);
    return Math.ceil(this.rows.length / this.gridPageSize);
  }

  totalPages(rowLength: number, pageSize: number): number {
    return Math.ceil(rowLength / pageSize);
  }
  
  clearAllFilters() :void {
    console.info("clearAllFilters()");
    this.columnFilters.clear();    
    this.gridFiltersChanged.emit( {ColumnName:"", Filters: [], IsAdded : true });
  }

  anyFiltersExist() : boolean  {

    return true;
  }

    /*
    * Grid Filters
    * Gets the distinct values in the rows for that column. The distinct Value is an object with three properties :
    *  1. DistinctValue -  which is the actual value of the object property in the row
    *  2. DistinctCount - count of the distinct value (grouping)
    *  3. DisplayValue -  How the value is displayed in the filter
    */
  generateDistinctColValues(col :Ngrid2DefaultColumn, rowSet :INgrid2Row[]) : Ngrid2DropdownFilter[]  {
    //console.info("generateDistinctColValues");        
    var distinctValues:Ngrid2DropdownFilter[] = [];
    //Iterate over the rows for that column to group distinct values
    for (var i = 0, len = rowSet.length ; i < len; i++) {
        var colValue = this.getColValue(col, rowSet[i]);        
        if (colValue != null) {
            var matchFound = false;
            //look for colValue in DistinctValue
            for (var j = 0; j < distinctValues.length; j++) {
                var disValueString = distinctValues[j].DistinctValue;
                var colValueString = colValue;
                if (typeof disValueString == 'object') {
                    disValueString = JSON.stringify(disValueString);
                }
                if (typeof colValueString == 'object') {
                    colValueString = JSON.stringify(colValueString);
                }                        
                if (disValueString == colValueString) {
                    //Value already exists; so increment the counter in the distinctValues array for that value.
                    matchFound = true;
                    distinctValues[j].DistinctCount += 1;
                    break;
                }
            }
            if (!matchFound) {
                //new value found add to the distinctValues array
                var colDisplayValue = null;
                if (col.FilterTextFn) {
                    colDisplayValue =  col.FilterTextFn({ DistinctValue: colValue, DistinctCount: -1 , Filters:[], DisplayValue:"" });
                }
                else {
                    colDisplayValue = colValue;
                    if (typeof colDisplayValue == 'object') {
                        colDisplayValue = JSON.stringify(colDisplayValue);
                    }                           
                }                                                
                if (this.getColumnType(col) == 'Ngrid2DateColumn') {
                    //colDisplayValue = col.FilterDateFormatFn ? $filter('date')(colDisplayValue, col.FilterDateFormatFn(null)) : $filter('date')(colDisplayValue);
                    //TODO
                }

                distinctValues.push({ DistinctValue: colValue, DistinctCount: 1, DisplayValue: colDisplayValue,Filters:[] });
            }
        }
    }

    distinctValues.sort(function (p, n) {
        if (p.DistinctValue < n.DistinctValue) { return -1; }
        if (p.DistinctValue > n.DistinctValue) { return 1; }
        return 0;
    });
    return distinctValues;
  };
  


   /*
    * Grid Filters
    * Sets the distinct values for the list in the column on expanding the filter menu
    */
    setDistinctColValuesFiltered (col: Ngrid2DefaultColumn) : void
    {    
        //console.info("setDistinctColValuesFiltered");        
        var filteredRows = this.rows;// this.gridFilteredRows;
        var vTempFilter = this.columnFilters.get(col.Name);
        //Populate distinct values from the entire rows if this is the first filter applied or no other filter applied            
        if (filteredRows.length == this.rows.length || (vTempFilter != null && vTempFilter.IsFirstFilter)) {
            this.distinctColValues.set(col.Name , this.generateDistinctColValues(col, this.rows));
        }
        else if (!this.isColFilterApplied(col.Name)) {
            // populate the filter list only when the filter does not already exist for the rows and we are not the first filtered column                
            this.distinctColValues.set(col.Name,this.generateDistinctColValues(col, filteredRows));
        }            
    }

  ondropDownToggle(isOpen: boolean,c: Ngrid2DefaultColumn) : void
  {
    //console.info("ondropDownToggle :" + isOpen);
    if (isOpen) {
      this.setDistinctColValuesFiltered(c);
      //$timeout(function () { document.getElementById(e).focus(); }, 100);
    }
  }

  ngrid2DropdownFilteredObjects(col: Ngrid2DefaultColumn) : Ngrid2DropdownFilter[] 
  {
    
    var x = this.distinctColValues.get(col.Name);
    //console.info("ngrid2DropdownFilteredObjects " + col.Name + " "  + JSON.stringify(x) );
    var f = x;
    if(x != null && col.dropDownFilterInput != null)
    {
        //apply filter
        f  = x.filter(p => p.DisplayValue.toString().indexOf(col.dropDownFilterInput) > -1);
        //col.dropDownFilterInput = f;
    }
    //console.info("ngrid2DropdownFilteredObjects!!!! " + JSON.stringify(f));
    return f;    
  }


  isColFiltered(colName: string, filterString: string) : boolean {      
    //console.info("isColFiltered filter count for column:" + colName + " filter string:" + filterString + " " + this.columnFilters.size);
    if (this.columnFilters == null || this.columnFilters.size == 0) return false;
    if (filterString != null) {
        if (typeof filterString == 'object') {
            filterString = JSON.stringify(filterString);
        }                
        //console.info("isColFiltered- 111");
        filterString = filterString.toString().toLowerCase();
        //console.info("isColFiltered- end");
        var vTempFilter = this.columnFilters.get(colName);

        if (vTempFilter != null) {
            var cmp = (vTempFilter.Filters.indexOf(filterString) > -1);
            //logDebug('org:' + this.columnFilters[colName] + ' filter:' + filterString + ' cmp:'+ cmp);
            
            return cmp;
        }
    }
    else {
        return false;
    }
}

/*
* Grid Filters
* Sets or removes the filters for columns
*/
  addColumnFilters(colName: string, filters, ignoreIfExists: boolean): void {

    //console.info("addColumnFilters " + JSON.stringify(this.columnFilters));
      if (filters != null) {
          var filtersAdded = [];
          var filtersRemoved = [];

          for (var i = 0; i < filters.length; i++) {

              var filterString = filters[i];
              //var col = null;
              //for (var j = 0; j < scope.columnDefinitions.length; j++) {
              //    if (scope.columnDefinitions[j].Name == colName) {
              //        col = scope.columnDefinitions[j];
              //        break;
              //    }
              //}

              if (typeof filterString ==  'object') {
                  filterString = JSON.stringify(filterString);
              }
              
              filterString = filterString.toString().trim().toLowerCase();
                                  
              //Is this the first filter?
              var firstFilter = false;
              if (Object.keys(this.columnFilters).length <= 0) {
                  firstFilter = true;
              }
              
              var vFilterTemp = this.columnFilters.get(colName);              
              //initialise the ColumnFilter object
              if (vFilterTemp == null) {                              
                  vFilterTemp = {IsFirstFilter:false,Filters:[]}                   
                  this.columnFilters.set(colName,vFilterTemp);
                  //console.info("gridObj.columnFilters " + JSON.stringify(this.columnFilters.size));
              }              
              //Does the filter exists -if it exists toggle it . if it dosent then add it               
              var posFilter = vFilterTemp.Filters.indexOf(filterString);
              if (posFilter == -1) {

                  //item  not found - add it
                  vFilterTemp.Filters.push(filterString);
                  //Is this column already the FirstFilter?
                  if (!vFilterTemp.IsFirstFilter) {
                    vFilterTemp.IsFirstFilter = firstFilter;
                  }
                  filtersAdded.push(filterString);
              }
              else if (!ignoreIfExists) {

                  //item exists toggle - remove it
                  vFilterTemp.Filters.splice(posFilter, 1);
                  if (vFilterTemp.Filters.length == 0) {
                      this.columnFilters.delete(colName);
                      //set the first filter to the next immediate column
                      //TODO:  check this logic was replaced by simple
                      this.columnFilters[0].IsFirstFilter = true;
                  }
                  filtersRemoved.push(filterString);
              }
          }

          if (filtersAdded.length > 0) {
              //notify hosting control that filters have changed
              this.gridFiltersChanged.emit( {ColumnName:colName, Filters: filtersAdded, IsAdded : true });
          }
          if (filtersRemoved.length > 0) {
              //notify hosting control that filters have changed
              this.gridFiltersChanged.emit({ColumnName:colName,Filters: filtersRemoved, IsAdded:false});
          }
      }
  }

  addColFilters(col: Ngrid2DefaultColumn): void  {
    //console.info("addColFilters " + this.ngrid2DropdownFilteredObjects.length);
    var filtersAdded = [];
    //apply the filters for all values which are filtered in drop down list      
    var dropdownColFilterList  = this.ngrid2DropdownFilteredObjects(col);
    //console.info(JSON.stringify(dropdownColFilterList));

    for (var i = 0; i < dropdownColFilterList.length; i++) {

        this.addColumnFilters(col.Name, [dropdownColFilterList[i].DistinctValue],false);
        filtersAdded.push(dropdownColFilterList[i].DistinctValue);
    }
    //notify parent control that filters have changed                    
    this.gridFiltersChanged.emit( {ColumnName:col.Name, Filters: filtersAdded, IsAdded : true });
    //console.info("****************");
}

removeColFilters(col: Ngrid2DefaultColumn) : void {
    //console.info("removeColFilters");
    //clear all filters
    this.columnFilters.delete(col.Name);
    //delete this.columnFilters[col.Name];    
    this.gridFiltersChanged.emit( {ColumnName:col.Name, Filters: [''], IsAdded : false });
}

  dropdownFilterKeyPress(event: KeyboardEvent,c: Ngrid2DefaultColumn,d: NgbDropdown): void 
  {            
    //console.info("dropdownFilterKeyPress");
    if (event.keyCode == 13) {                
        if (this.isColFilterApplied(c.Name)) {            
            this.removeColFilters(c);
        }
        this.addColFilters(c);        
        d.close();
        c.dropDownFilterInput = "";
        //stopping enter from being propagated to parent dom elements.
        event.preventDefault();
    }    
 }

    /*
    * Customized from  https://msdn.microsoft.com/library/cc836466(v=vs.94).aspx
    * The reviver function is often used to transform JSON representation of International Organization for Standardization (ISO) date strings into
    * Coordinated Universal Time (UTC) format Date objects. This example uses JSON.parse to deserialize an ISO-formatted date string. The dateReviver 
    * function returns Date objects for members that are formatted like ISO date strings.
    */
    dateReviver(dateString: string): Date {
        var a;           
        a = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z*$/.exec(dateString);
        if (a) {
            return new Date(+a[1], +a[2] - 1, +a[3], +a[4],
                            +a[5], +a[6]);
        }            
        return null;
    };
 
 updateDateRangeFilter (col: Ngrid2DefaultColumn, StartRange: Date  , EndRange: Date) {
    if (StartRange != null && EndRange != null) {
        //for date range set end date to last moment of that day        
        EndRange.setHours(23);
        EndRange.setMinutes(59);
        EndRange.setSeconds(59);
        var distinctValues = this.distinctColValues.get(col.Name);
        var colFilters = [];
        for (var i = 0; i < distinctValues.length; i++) {                    
            var objToCompare = this.dateReviver(distinctValues[i].DistinctValue);
            
            if (objToCompare >= StartRange && objToCompare <= EndRange) {                
                colFilters.push(distinctValues[i].DistinctValue);
            }                    
        }
        if (colFilters.length > 0) {
            this.addColumnFilters(col.Name, colFilters,false);
        }
    }
}

 getColumnType(c: Ngrid2DefaultColumn): string 
 {
     //
     // NOTE: bug in angular prod deployment prevents use of this
     // return c.constructor.name;
     //
     return c.columnType;
 }

 compareFn(selVa1: object, selVal2: object): boolean {
    var x =  JSON.stringify(selVa1) == JSON.stringify(selVal2);    
    return x;
}

getRowIcon(index: number, row: INgrid2Row) : string {
    if (index == 0) {
        if (row.isNgNgridMarkedForDelete) {
            return 'fas fa-minus-square';
        }
        else if (row.isNgNgridMarkedForNew) {
            return 'fas fa-plus-square';
        }
        else if (row.isNgNgridDirty) {
            return 'fas fa-edit';
        }
    }            
}


  ngOnInit() {    
    // ng-init="newInputVal = getColValue(c,row)" 
    //console.info("ngInInit");
    this.rows.forEach(r => {
      this.columnDefinitions.forEach(c => 
      {
        var colType = this.getColumnType(c);
        if(colType == 'Ngrid2InputColumn')
        {
          r.InputBind  = this.getColValue(c,r);
        }
        else if (colType == 'Ngrid2SelectColumn')
        {            
          r.SelectBind  = this.getColValue(c,r);          
        }
        
        r.Children.forEach(childRow => {
            this.childColumndefinitions.forEach(childCol => 
            {
                var childColType = this.getColumnType(childCol);
                if(childColType == 'Ngrid2InputColumn')
                {
                    childRow.InputBind  = this.getColValue(childCol,childRow);
                }
                else if (childColType == 'Ngrid2SelectColumn')
                {   
                    childRow.SelectBind  = this.getColValue(childCol,childRow);
                }
            });
        });                
        c.DisableFilter = false;
      })      
    });
    this.gridCurrentPage =1;
    this.gridPageSize = 5;   
    this.filterPageSize=15;
    this.filterCurrentPage=1;    
    this.gridHeightStretchBottomOffset = 0;
    this.columnFilters = new Map<string,Ngrid2Filter>() ;
  }
}
