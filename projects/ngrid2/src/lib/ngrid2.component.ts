
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbCalendar, NgbDateStruct, NgbDropdown, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Ngrid2DataParams } from './ngrid2DataParams';
import { Ngrid2DateColumn, Ngrid2DefaultColumn, Ngrid2NumberColumn, Ngrid2SelectColumn } from './ngrid2DefaultColumn';
import { Ngrid2DropdownFilter } from './ngrid2DropdownFilter';
import { Ngrid2Filter } from './ngrid2Filter';
import { Ngrid2FilterParams } from './ngrid2FilterParams';
import { Ngrid2Modal } from './ngrid2Modal.component';
import { INgrid2Row } from './ngrid2Row';

@Component({
    selector: 'ng-ngrid2',
    templateUrl: './ngrid2.component.html',
    styleUrls: ['./ngrid2.component.css'],
    animations: [
        trigger('stretchAnimate', [
            state('inactive', style({
                transform: 'scale(1)'
            })),
            state('active', style({
                transform: 'scale(1.1)'
            })),
            transition('inactive => active', animate('100ms ease-in')),
            transition('active => inactive', animate('100ms ease-out'))
        ])
    ]
})

export class Ngrid2Component implements OnInit {
    @Output() gridFiltersChanged = new EventEmitter<Ngrid2FilterParams>();
    @Input() columnClass: string;
    @Input() showChildrenCount: boolean;
    @Input() columnDefinitions: Ngrid2DefaultColumn[];
    @Input() childColumndefinitions: Ngrid2DefaultColumn[];
    @Input() childPropertynames: string[];
    @Input() rowFooterdefinitions: object[];
    @Input() rows: INgrid2Row[];
    @Input() rowsLoading: boolean;
    @Input() rowsLoadingText: string;
    @Input() rowsLoadingPercent: number;
    @Input() gridPageSize: number = 5;
    @Input() gridCurrentPage: number = 1;
    @Input() gridSortColumn: string;
    @Input() gridChildrenSortColumn: string;
    @Input() gridSortOrder: boolean;
    @Input() gridChildrenSortOrder: boolean;
    @Input() showRowNumbers: boolean;
    @Input() showRowSelector: boolean;
    @Input() gridHeightFixed: number;
    @Input() gridHeightStretchBottomOffset: number = 0;
    //  notifyGridFiltersChanged: '&gridFiltersChanged', -- this is added in component
    @Output() onDataImport = new EventEmitter<Ngrid2DataParams>();
    @Output() onDataExport = new EventEmitter<Ngrid2DataParams>();
    // onDataExport: '&',
    //  addColumnFilters: '=?',
    @Input() showSettings: boolean = false;
    //  rememberFilters: '=?'
    //dropDownFilterInput: string;
    @Input() filterPageSize: number = 15;
    @Input() filterCurrentPage: number = 1;
    @Input() columnFilters: Map<string, Ngrid2Filter>;


    @Input() allRowsSelected: boolean;
    @Input() pageSizeOptions: number[] = [1, 5, 10, 15, 20, 25, 50, 100, 500, 1000];
    @Input() ngNgridStartDate: NgbDateStruct = this.calendar.getToday();
    @Input() ngNgridEndDate: NgbDateStruct = this.calendar.getToday();

    @Input() columnHeaderClass: string = 'bg-primary text-light';


    //ngNgridDropdownFilteredObjects = new Map<string,object[]>();

    distinctColValues = new Map<string, Ngrid2DropdownFilter[]>();

    isSorted(col: Ngrid2DefaultColumn): boolean {
        return (this.gridSortColumn == col.Name);
    }
    /*
      * Grid Sorting
      * Checks if the child column is sorted to render the icon indicators
      */
    isChildSorted(sortCol: Ngrid2DefaultColumn): boolean {
        return (this.gridChildrenSortColumn == sortCol.Name);
    }

    changeSort(col: Ngrid2DefaultColumn): void {
        this.gridSortOrder = !this.gridSortOrder;
        this.gridSortColumn = col.Name;
    }

    /*
    * Grid Sorting
    * Toggle the sort on the child tables
    */
    changeChildSort(sortCol: Ngrid2DefaultColumn): void {
        this.gridChildrenSortOrder = !this.gridChildrenSortOrder;
        this.gridChildrenSortColumn = sortCol.Name;
    }

    isColFilterApplied(colName): boolean {
        var x1 = (this.columnFilters.get(colName) != null);
        //console.info("isColFilterApplied "+ colName + " " + x1);    
        return x1;
    }


    constructor(private calendar: NgbCalendar, private modalService: NgbModal) { }

    /*
    * Grid scrolling
    * Sets the scroll area as per the stretch bottom offset or fixed height defined 
    */
    setGridTableStyle(): object {
        var topPosition = document.getElementById('ngGridToolbar').getBoundingClientRect().bottom;
        //var topPosition= document.getElementById('ngGridToolbar').clientHeight;
        var bottomPosition = 0;
        //console.info("1 top=" + topPosition + " bottom=" + bottomPosition);
        if (this.gridHeightStretchBottomOffset != null) {
            bottomPosition = this.gridHeightStretchBottomOffset;
            //console.info("2.1 top=" + topPosition + " bottom=" + bottomPosition);
        }
        else {
            bottomPosition = window.innerHeight - this.gridHeightFixed - document.getElementById('ngGridToolbar').getBoundingClientRect().top;
            //console.info("2.2 top=" + topPosition + " bottom=" + bottomPosition);
        }
        //console.info("3 top=" + topPosition + " bottom=" + bottomPosition);
        return { top: topPosition + 'px', bottom: bottomPosition + 'px' };
    };

    getStyle(): object {

        // console.info("getStyle Called");
        if (this.gridHeightStretchBottomOffset != null) {
            //console.info("getStyle Called height:" +  (window.innerHeight - document.getElementById('ngGridToolbar').getBoundingClientRect().top - this.gridHeightStretchBottomOffset));
            //stretch to window                
            return { height: window.innerHeight - document.getElementById('ngGridToolbar').getBoundingClientRect().top - this.gridHeightStretchBottomOffset + 'px', width: 100 + '%' };
        }
        else {
            //console.info("getStyle else called height: " + this.gridHeightFixed);
            return { height: this.gridHeightFixed + 'px', width: 100 + '%' };
        }
    }

    toggleRowsSelect(): void {
        this.allRowsSelected = !this.allRowsSelected;
    }
    isAnyRowSelected(): boolean {
        for (var i = 0; i < this.rows.length; i++) {
            if (this.rows[i].isNgNgridSelected) {
                //console.info("rowselected");
                return true;
            }
        }
        //console.info("rowNOTselected");
        return false;
    }

    getRowClass(row: INgrid2Row): string {
        if (row.isNgNgridMarkedForDelete) {
            return 'table-danger';
        }
        else if (row.isNgNgridMarkedForNew) {
            return 'table-success';
        }
        else if (row.isNgNgridDirty) {
            return 'table-warning';
        }
        else if (row.isNgNgridUpdated) {
            return 'ngngrid-animaterow';
        }
        else if (row.isNgNgridSelected) {
            return 'table-info';
        }
        return '';
    }

    childRowsCount(row: INgrid2Row): number {
        var childRecCount = 0;
        for (var i = 0; i < this.childPropertynames.length; i++) {
            var tempChildRows = this.getValueFromPropertyString(row, this.childPropertynames[i]);
            childRecCount += tempChildRows ? tempChildRows.length : 0;
        }
        return childRecCount;
    }

    canShowRecord(row: INgrid2Row): boolean {

        if (this.columnFilters != null) {
            var rowMatched = true;
            this.columnFilters.forEach((v: Ngrid2Filter, k: string) => {
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

    filteredRows(): INgrid2Row[] {


        var startingPos = (this.gridCurrentPage - 1) * this.gridPageSize;
        // console.info("startingPos "  + startingPos);
        // console.info("this.gridPageSize " + this.gridPageSize);    
        var endingPos = +this.gridPageSize + startingPos;
        // console.info("endingPos " + endingPos);
        var rowsFiltered = this.rows.slice(startingPos, endingPos);

        return rowsFiltered.filter(r => this.canShowRecord(r)).sort((r1, r2) => {
            if (!this.gridSortOrder) {
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
        return row[childColName].sort((r1, r2) => {
            if (!this.gridChildrenSortOrder) {
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


    getValueFromPropertyString(row: INgrid2Row, propString: string): string {
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

    getColValue(col: Ngrid2DefaultColumn, row: INgrid2Row): string {
        return this.getValueFromPropertyString(row, col.Name);
    }

    showObject(o): string {
        var s = JSON.stringify(o, null, 4);
        //  console.info(s);
        return s;
    }

    
    setColValue(col: Ngrid2DefaultColumn, row: INgrid2Row,value: any): void {

        if(col.columnType == 'Ngrid2SelectColumn')
        {
            var  indexSelect : number = value as number;
            var colSelect : Ngrid2SelectColumn  =  col as Ngrid2SelectColumn;
            value = colSelect.SelectFn(row)[indexSelect];
        }

        if (col.Name != null) {
            var arrSplitSortProp = col.Name.split('.');
            var arrayLen = arrSplitSortProp.length;

            if (arrayLen == 1) {
                //row[arrSplitSortProp[0]] = value;
                row[arrSplitSortProp[0]] = value;
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

    clearAllFilters(): void {
        console.info("clearAllFilters()");
        this.columnFilters.clear();
        this.gridFiltersChanged.emit({ ColumnName: "", Filters: [], IsAdded: true });
    }

    anyFiltersExist(): boolean {
        if (this.columnFilters == null || this.columnFilters.size == 0) return false;
        // for (var prop in this.columnFilters) {
        //     if (this.columnFilters[prop] != null) return true;
        // }
        // return false;
        return true;
    }

    /*
    * Grid Filters
    * Gets the distinct values in the rows for that column. The distinct Value is an object with three properties :
    *  1. DistinctValue -  which is the actual value of the object property in the row
    *  2. DistinctCount - count of the distinct value (grouping)
    *  3. DisplayValue -  How the value is displayed in the filter
    */
    generateDistinctColValues(col: Ngrid2DefaultColumn, rowSet: INgrid2Row[]): Ngrid2DropdownFilter[] {
        //console.info("generateDistinctColValues");        
        var distinctValues: Ngrid2DropdownFilter[] = [];
        //Iterate over the rows for that column to group distinct values
        for (var i = 0, len = rowSet.length; i < len; i++) {
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
                        colDisplayValue = col.FilterTextFn({ DistinctValue: colValue, DistinctCount: -1, Filters: [], DisplayValue: "" });
                    }
                    else {
                        colDisplayValue = colValue;
                        if (typeof colDisplayValue == 'object') {
                            colDisplayValue = JSON.stringify(colDisplayValue);
                        }
                    }
                    //TODO
                    // if (col.columnType == 'Ngrid2DateColumn') {
                    //     //colDisplayValue = col.FilterDateFormatFn ? $filter('date')(colDisplayValue, col.FilterDateFormatFn(null)) : $filter('date')(colDisplayValue);
                    //     //TODO
                    // }

                    distinctValues.push({ DistinctValue: colValue, DistinctCount: 1, DisplayValue: colDisplayValue, Filters: [] });
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
    setDistinctColValuesFiltered(col: Ngrid2DefaultColumn): void {
        //console.info("setDistinctColValuesFiltered");        
        var filteredRows = this.rows;// this.gridFilteredRows;
        var vTempFilter = this.columnFilters.get(col.Name);
        //Populate distinct values from the entire rows if this is the first filter applied or no other filter applied            
        if (filteredRows.length == this.rows.length || (vTempFilter != null && vTempFilter.IsFirstFilter)) {
            this.distinctColValues.set(col.Name, this.generateDistinctColValues(col, this.rows));
        }
        else if (!this.isColFilterApplied(col.Name)) {
            // populate the filter list only when the filter does not already exist for the rows and we are not the first filtered column                
            this.distinctColValues.set(col.Name, this.generateDistinctColValues(col, filteredRows));
        }
    }

    ondropDownToggle(isOpen: boolean, c: Ngrid2DefaultColumn): void {
        //console.info("ondropDownToggle :" + isOpen);
        if (isOpen) {
            this.setDistinctColValuesFiltered(c);
            //$timeout(function () { document.getElementById(e).focus(); }, 100);
        }
    }

    ngrid2DropdownFilteredObjects(col: Ngrid2DefaultColumn): Ngrid2DropdownFilter[] {

        var x = this.distinctColValues.get(col.Name);
        //console.info("ngrid2DropdownFilteredObjects " + col.Name + " "  + JSON.stringify(x) );
        var f = x;
        if (x != null && col.dropDownFilterInput != null) {
            //apply filter
            f = x.filter(p => p.DisplayValue.toString().indexOf(col.dropDownFilterInput) > -1);
            //col.dropDownFilterInput = f;
        }
        //console.info("ngrid2DropdownFilteredObjects!!!! " + JSON.stringify(f));
        return f;
    }


    isColFiltered(colName: string, filterString: string): boolean {
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

        console.info("addColumnFilters " + JSON.stringify(this.columnFilters));
        console.info("filters " + JSON.stringify(filters));
        if (filters != null) {
            var filtersAdded = [];
            var filtersRemoved = [];

            for (var i = 0; i < filters.length; i++) {

                var filterString = filters[i];
                console.info("filterString: " + filterString);
                //var col = null;
                //for (var j = 0; j < scope.columnDefinitions.length; j++) {
                //    if (scope.columnDefinitions[j].Name == colName) {
                //        col = scope.columnDefinitions[j];
                //        break;
                //    }
                //}

                if (typeof filterString == 'object') {
                    filterString = JSON.stringify(filterString);
                }

                filterString = filterString.toString().trim().toLowerCase();

                //Is this the first filter?
                var firstFilter = false;
                if (Object.keys(this.columnFilters).length <= 0) {
                    firstFilter = true;
                }

                console.info("firstfilter: " + firstFilter);

                var vFilterTemp = this.columnFilters.get(colName);
                console.info("vFilterTemp: "  + JSON.stringify(vFilterTemp));
                //initialise the ColumnFilter object
                if (vFilterTemp == null) {                    
                    vFilterTemp = { IsFirstFilter: false, Filters: [] }
                    this.columnFilters.set(colName, vFilterTemp);
                    console.info("this.columnFilters " + JSON.stringify(this.columnFilters));
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
                this.gridFiltersChanged.emit({ ColumnName: colName, Filters: filtersAdded, IsAdded: true });
            }
            if (filtersRemoved.length > 0) {
                //notify hosting control that filters have changed
                this.gridFiltersChanged.emit({ ColumnName: colName, Filters: filtersRemoved, IsAdded: false });
            }
        }
    }

    addColFilters(col: Ngrid2DefaultColumn): void {
        //console.info("addColFilters " + this.ngrid2DropdownFilteredObjects.length);
        var filtersAdded = [];
        //apply the filters for all values which are filtered in drop down list      
        var dropdownColFilterList = this.ngrid2DropdownFilteredObjects(col);
        //console.info(JSON.stringify(dropdownColFilterList));

        for (var i = 0; i < dropdownColFilterList.length; i++) {

            this.addColumnFilters(col.Name, [dropdownColFilterList[i].DistinctValue], false);
            filtersAdded.push(dropdownColFilterList[i].DistinctValue);
        }
        //notify parent control that filters have changed                    
        this.gridFiltersChanged.emit({ ColumnName: col.Name, Filters: filtersAdded, IsAdded: true });
        //console.info("****************");
    }

    removeColFilters(col: Ngrid2DefaultColumn): void {
        //console.info("removeColFilters");
        //clear all filters
        this.columnFilters.delete(col.Name);
        //delete this.columnFilters[col.Name];    
        this.gridFiltersChanged.emit({ ColumnName: col.Name, Filters: [''], IsAdded: false });
    }

    dropdownFilterKeyPress(event: KeyboardEvent, c: Ngrid2DefaultColumn, d: NgbDropdown): void {
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

    updateDateRangeFilter(col: Ngrid2DateColumn): void {
        if (col.startRange != null && col.endRange != null) {
            //for date range set end date to last moment of that day
            var dtStartRange = new Date(col.startRange.year, col.startRange.month, col.startRange.day);
            var dtEndRange = new Date(col.endRange.year, col.endRange.month, col.endRange.day);
            var distinctValues = this.distinctColValues.get(col.Name);
            var colFilters = [];
            for (var i = 0; i < distinctValues.length; i++) {
                var objToCompare = this.dateReviver(distinctValues[i].DistinctValue);
                if (objToCompare >= dtStartRange && objToCompare <= dtEndRange) {
                    //logDebug('compare ' + objToCompare + ' Start:' + StartRange + ' End:' + EndRange);
                    colFilters.push(distinctValues[i].DistinctValue);
                }
            }
            if (colFilters.length > 0) {
                this.addColumnFilters(col.Name, colFilters, true);
            }
        }
    }

    updateNumberRangeFilter(col: Ngrid2NumberColumn): void {
        if (col.startRange != null && col.endRange != null) {            
            var distinctValues = this.distinctColValues.get(col.Name);
            var colFilters = [];
            for (var i = 0; i < distinctValues.length; i++) {
                var objToCompare = +distinctValues[i].DistinctValue;
                if (objToCompare >= col.startRange && objToCompare <= col.endRange) {
                    console.info('adding to colFilters ' + objToCompare );
                    colFilters.push(objToCompare);
                }
            }
            if (colFilters.length > 0) {
                this.addColumnFilters(col.Name, colFilters, true);                
            }
        }
    }
   
    compareFn(selVa1: object, selVal2: object): boolean {
        var x = JSON.stringify(selVa1) == JSON.stringify(selVal2);
        return x;
    }

    getRowIcon(index: number, row: INgrid2Row): string {
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

    // importFromJson(): void {
    //     var fileUpload = document.getElementById("fileUploadJson");
    //     fileUpload.click();
    // }

    exportSelectedToJson(): void {
        var cancel = false;
        var selectedRows = [];
        for (var i = 0; i < this.rows.length; i++) {
            if (this.rows[i].isNgNgridSelected) {
                selectedRows.push(this.rows[i]);
            }
        }
        var exportObj: Ngrid2DataParams = { Rows: selectedRows, CancelEvent: cancel };
        this.onDataExport.emit(exportObj);
        if (!exportObj.CancelEvent) {
            var dataStr = JSON.stringify(selectedRows, null, 4);
            const modalRef = this.modalService.open(Ngrid2Modal, { size: 'lg' });
            modalRef.componentInstance.header = 'Exported JSON for ' + selectedRows.length + ' row(s)';
            modalRef.componentInstance.body = dataStr;
        }
    }

    on_fileUpload(element: HTMLInputElement): void {
        console.info("on_fileUpload");
        var cancel = false;
        var rowsToImport = [];
        var me = this;
        for (var i = 0; i < element.files.length; i++) {
            var reader = new FileReader();
            reader.readAsText(element.files[i]);
            reader.onload = function (e) {
                var arrRows = JSON.parse(reader.result.toString());
                var colDates = [];
                //do we have any date columns?
                for (var c = 0; c < me.columnDefinitions.length; c++) {
                    if (me.columnDefinitions[c].columnType == 'Ngrid2DateColumn') {
                        colDates.push(me.columnDefinitions[c].Name);
                    }
                }
                for (var j = 0; j < arrRows.length; j++) {
                    //check for any date objects
                    for (var c = 0; c < colDates.length; c++) {
                        if (arrRows[j][colDates[c]] != null) {
                            arrRows[j][colDates[c]] = new Date(arrRows[j][colDates[c]]);
                        }
                    }
                    rowsToImport.push(arrRows[j]);
                }
                //allow hosting control to override it
                var importObj: Ngrid2DataParams = { Rows: rowsToImport, CancelEvent: cancel };
                me.onDataImport.emit(importObj);
                if (!importObj.CancelEvent) {
                    for (var k = 0; k < rowsToImport.length; k++) {
                        me.rows.unshift(rowsToImport[k]);
                    }
                    //scope.$apply();
                }
            }
        }
    }

    getProgressType(): string {
        if (this.rowsLoadingPercent <= 20) return 'danger';
        if (this.rowsLoadingPercent <= 40) return 'warning';
        if (this.rowsLoadingPercent <= 60) return 'primary';
        return (this.rowsLoadingPercent <= 80) ? 'info' : 'success';
    }

    toString(o: any) : string
    {
        //return JSON.stringify(o,null,'\t');
        return JSON.stringify(o);
    }

    ngOnInit() {
        this.columnFilters = new Map<string, Ngrid2Filter>();
    }

    

}
