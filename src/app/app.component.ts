import { Component, OnInit } from '@angular/core';
import { Ngrid2ButtonColumn, Ngrid2DefaultColumn, Ngrid2InputColumn, Ngrid2SelectColumn, Ngrid2LinkColumn, Ngrid2DateColumn,Ngrid2DropdownFilter,INgrid2Row, Ngrid2NumberColumn } from 'ngrid2';
import { AppObj } from './appObj';
import { SelectMultipleControlValueAccessor } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Something changed';
  color_array = ["primary","secondary","success","danger","warning","info","light","dark"];

  _debug_all_cols = true;
   columnDefinitions : Ngrid2DefaultColumn[];    
   rows : any[];
   childColumndefinitions : Ngrid2DefaultColumn[];   
   childPropertynames:  string[]; 
   rowsLoading: boolean;
   rowsLoadingPercent: number;   
   showSettings: boolean ;

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

  getDefaultCol(): Ngrid2DefaultColumn {
     //Default
     var defCol : Ngrid2DefaultColumn = new Ngrid2DefaultColumn();    
     defCol.Name= "Col1",
     defCol.isNgNgridColumnHide = false,
     defCol.DisplayName = () => {      
       return defCol.Name;
     };
     defCol.isNgNgridSelected = false;        
     defCol.ClassFn  = (r: INgrid2Row) => {
       return "bg-"  + r[defCol.Name] ; //+ " text-white";
     };
     defCol.CellClassFn = (r: INgrid2Row) => {
       return "alert-" + this.color_array[r.Index];
     };
     defCol.TooltipFn = (r: INgrid2Row) => {      
       return "hello";
     };
     defCol.BadgeFn = (r: INgrid2Row) => {      
       return r.Index.toString();
     };
     defCol.BadgeClassFn = (r: INgrid2Row) => {      
       return "badge-dark badge-pill";
     };
     defCol.BadgeUrlFn = (r: INgrid2Row) => {      
       return "https=//www.bing.com"
     };
     defCol.BadgeTargetFn = (r: INgrid2Row) => {      
       return "_top"; 
     };
     defCol.IconFn = (r: INgrid2Row) => {
       return "far fa-play-circle";
     };
     defCol.NullOrEmptyFn =  (r: INgrid2Row) => {      
       return "No Value";
     }        
     defCol.FilterClassFn = (d: Ngrid2DropdownFilter) => {      
       return "bg-"  + d.DistinctValue ;
     };
     defCol.FilterIconFn= (d: Ngrid2DropdownFilter) => {
       return "far fa-play-circle";
     };
     defCol.NullOrEmptyFn =  (r: INgrid2Row) => {      
         return "No Value";
     }
     return defCol; 
  }

  getInputCol(): Ngrid2DefaultColumn {
    var inputCol : Ngrid2InputColumn = new Ngrid2InputColumn();
    inputCol.Name= "Col3";
    inputCol.isNgNgridColumnHide = false,
    inputCol.DisplayName = () => {
      return inputCol.Name;
    };
    inputCol.isNgNgridSelected = false;        
    inputCol.ClassFn  = (r: INgrid2Row) => {
      return "text-"  + r[inputCol.Name] ; //+ " text-white";
    };
    inputCol.CellClassFn = (r: INgrid2Row) => {
      return "";
    };
    inputCol.TooltipFn = (r: INgrid2Row) => {      
      return "hello";
    };
    inputCol.BadgeFn = (r: INgrid2Row) => {      
      return r.Index.toString();
    };
    inputCol.BadgeClassFn = (r: INgrid2Row) => {      
      return "badge-dark badge-pill";
    };
    inputCol.BadgeUrlFn = (r: INgrid2Row) => {      
      return "https=//www.bing.com"
    };
    inputCol.BadgeTargetFn = (r: INgrid2Row) => {      
      return "_top"; 
    };
    inputCol.IconFn = (r: INgrid2Row) => {
      return "far fa-play-circle";
    };
    inputCol.NullOrEmptyFn =  (r: INgrid2Row) => {      
      return "No Value";
    }        
    inputCol.FilterClassFn = (d: Ngrid2DropdownFilter) => {      
      return "bg-"  + d.DistinctValue;
    };
    inputCol.FilterIconFn= (d: Ngrid2DropdownFilter) => {
      return "far fa-play-circle";
    };
    inputCol.NullOrEmptyFn =  (r: INgrid2Row) => {      
        return "No Value";
    }
    inputCol.InputTypeFn =  (r: INgrid2Row) => {
      return "text";
    }
    return inputCol;

  }

  getSelectCol(): Ngrid2DefaultColumn {
    var selCol : Ngrid2SelectColumn = new Ngrid2SelectColumn();
    selCol.Name="Col4";
    selCol.isNgNgridColumnHide = false,
    selCol.DisplayName = () => {
      return selCol.Name;
    };
    selCol.isNgNgridSelected = false;        
    selCol.ClassFn  = (r: INgrid2Row) => {
      return "bg-"  + r[selCol.Name] ; //+ " text-white";
    };
    selCol.CellClassFn = (r: INgrid2Row) => {
      return "";
    };
    selCol.TooltipFn = (r: INgrid2Row) => {      
      return "hello";
    };
    selCol.BadgeFn = (r: INgrid2Row) => {      
      return r.Index.toString();
    };
    selCol.BadgeClassFn = (r: INgrid2Row) => {      
      return "badge-dark badge-pill";
    };
    selCol.BadgeUrlFn = (r: INgrid2Row) => {      
      return "https=//www.bing.com"
    };
    selCol.BadgeTargetFn = (r: INgrid2Row) => {      
      return "_top"; 
    };
    selCol.IconFn = (r: INgrid2Row) => {
      return "far fa-play-circle";
    };
    selCol.NullOrEmptyFn =  (r: INgrid2Row) => {      
      return "No Value";
    }        
    selCol.FilterClassFn = (d: Ngrid2DropdownFilter) => {      
      return "bg-"  + d.DistinctValue ;
    };
    selCol.FilterIconFn= (d: Ngrid2DropdownFilter) => {
      return "far fa-play-circle";
    };
    selCol.NullOrEmptyFn =  (r: INgrid2Row) => {      
        return "No Value";
    };    
    selCol.SelectFn = (r : any) => 
    {
      //console.warn('select fun caled ' + this.selectionList.length);
      return [
        {
          "selKey" : "abc",
          "selVal" : "1"
        },
        {
          "selKey" : "def",
          "selVal" : "2"
        },
        {
          "selKey" : "ghi",
          "selVal" : "3"
        }
      ];
    };
    selCol.SelectValue = "selVal";
    selCol.SelectKey = "selKey";
    return selCol;
  }

  getLinkCol(): Ngrid2DefaultColumn {
    var linkCol : Ngrid2LinkColumn = new Ngrid2LinkColumn();    
    linkCol.Name= "Col5",
    linkCol.isNgNgridColumnHide = false,
    linkCol.DisplayName = () => {
      return linkCol.Name;
    };
    linkCol.isNgNgridSelected = false;        
    linkCol.ClassFn  = (r: INgrid2Row) => {
      return "text-"  + r[linkCol.Name] ; //+ " text-white";
    };
    linkCol.CellClassFn = (r: INgrid2Row) => {
      return "";
    };
    linkCol.TooltipFn = (r: INgrid2Row) => {      
      return "hello";
    };
    linkCol.BadgeFn = (r: INgrid2Row) => {      
      return r.Index.toString();
    };
    linkCol.BadgeClassFn = (r: INgrid2Row) => {      
      return "badge-dark badge-pill";
    };
    linkCol.BadgeUrlFn = (r: INgrid2Row) => {      
      return "https=//www.bing.com"
    };
    linkCol.BadgeTargetFn = (r: INgrid2Row) => {      
      return "_top"; 
    };
    linkCol.IconFn = (r: INgrid2Row) => {
      return "far fa-play-circle";
    };
    linkCol.NullOrEmptyFn =  (r: INgrid2Row) => {      
      return "No Value";
    }        
    linkCol.FilterClassFn = (d: Ngrid2DropdownFilter) => {      
      return "bg-"  + d.DistinctValue;
    };
    linkCol.FilterIconFn= (d: Ngrid2DropdownFilter) => {
      return "far fa-play-circle";
    };
    linkCol.NullOrEmptyFn =  (r: INgrid2Row) => {      
        return "No Value";
    };
    linkCol.UrlFn= (r: INgrid2Row) => {  return "www.google.com" };
    return linkCol;
  }

  getDateCol(): Ngrid2DefaultColumn {
    var dateCol : Ngrid2DateColumn = new Ngrid2DateColumn();    
    dateCol.Name= "Col6";
    dateCol.isNgNgridColumnHide = false;
    dateCol.DisplayName = () => {
      return dateCol.Name;
    };
    dateCol.isNgNgridSelected = false;        
    dateCol.ClassFn  = (r: INgrid2Row) => {
      return ""; //+ " text-white";
    };
    dateCol.CellClassFn = (r: INgrid2Row) => {
      return "";
    };
    dateCol.TooltipFn = (r: INgrid2Row) => {      
      return "hello";
    };
    dateCol.BadgeFn = (r: INgrid2Row) => {      
      return r.Index.toString();
    };
    dateCol.BadgeClassFn = (r: INgrid2Row) => {      
      return "badge-dark badge-pill";
    };
    dateCol.BadgeUrlFn = (r: INgrid2Row) => {      
      return "https=//www.bing.com"
    };
    dateCol.BadgeTargetFn = (r: INgrid2Row) => {      
      return "_top"; 
    };
    dateCol.IconFn = (r: INgrid2Row) => {
      return "far fa-play-circle";
    };
    dateCol.NullOrEmptyFn =  (r: INgrid2Row) => {      
      return "No Value";
    }        
    dateCol.FilterClassFn = (d: Ngrid2DropdownFilter) => {      
      return "bg-"  + d.DistinctValue;
    };
    dateCol.FilterIconFn= (d: Ngrid2DropdownFilter) => {
      return "far fa-play-circle";
    };
    dateCol.NullOrEmptyFn =  (r: INgrid2Row) => {      
        return "No Value";
    };
    dateCol.DateFormatFn=  (r: INgrid2Row) => {      
      return "MM/dd/yyyy";
    };
    return dateCol;
  }

  getNumberCol(): Ngrid2DefaultColumn {
    var numCol : Ngrid2NumberColumn = new Ngrid2NumberColumn();    
    numCol.Name= "Col7",
    numCol.isNgNgridColumnHide = false,
    numCol.DisplayName = () => {      
      return numCol.Name;
    };
    numCol.isNgNgridSelected = false;        
    numCol.ClassFn  = (r: INgrid2Row) => {
      return "h" + r[numCol.Name]/100;
    };
    numCol.CellClassFn = (r: INgrid2Row) => {
      return "";
    };
    numCol.TooltipFn = (r: INgrid2Row) => {      
      return "hello";
    };
    numCol.BadgeFn = (r: INgrid2Row) => {      
      return r.Index.toString();
    };
    numCol.BadgeClassFn = (r: INgrid2Row) => {      
      return "badge-dark badge-pill";
    };
    numCol.BadgeUrlFn = (r: INgrid2Row) => {      
      return "https=//www.bing.com"
    };
    numCol.BadgeTargetFn = (r: INgrid2Row) => {      
      return "_top"; 
    };
    numCol.IconFn = (r: INgrid2Row) => {
      return "far fa-play-circle";
    };
    numCol.NullOrEmptyFn =  (r: INgrid2Row) => {      
      return "No Value";
    }        
    numCol.FilterClassFn = (d: Ngrid2DropdownFilter) => {      
      return "bg-"  + d.DistinctValue;
    };
    numCol.FilterIconFn= (d: Ngrid2DropdownFilter) => {
      return "far fa-play-circle";
    };
    numCol.NullOrEmptyFn =  (r: INgrid2Row) => {      
        return "No Value";
    }        
    return numCol;
  }
  
  async ngOnInit() {           
    this.columnDefinitions = [];    
    this.rows = [];    
    this.childColumndefinitions = [];
    this.childPropertynames =["Children"];
    this.rowsLoading = true;   
    this.rowsLoadingPercent = 0;    
    this.showSettings = true;


    this.columnDefinitions.push(this.getDefaultCol());

    if (this._debug_all_cols)
    {
      //Button
      this.columnDefinitions.push(this.getButtonCol());
        
      //Input
      this.columnDefinitions.push(this.getInputCol());

      //Select
      this.columnDefinitions.push(this.getSelectCol());

      //Link
      this.columnDefinitions.push(this.getLinkCol());
      
      this.columnDefinitions.push(this.getDateCol());
      
      //ngNgridNumber
      this.columnDefinitions.push(this.getNumberCol());
    }
    this.childColumndefinitions.push(this.getDefaultCol());
    this.childColumndefinitions.push(this.getButtonCol());            
    this.childColumndefinitions.push(this.getInputCol());
    this.childColumndefinitions.push(this.getSelectCol());
    this.childColumndefinitions.push(this.getLinkCol());    
    this.childColumndefinitions.push(this.getDateCol());       
    this.childColumndefinitions.push(this.getNumberCol());

   
    for (let index = 0; index < this.color_array.length; index++) {
      var newrow : AppObj = new AppObj();
      newrow.Index = index;
      newrow.isNgNgridOpen = false;
      newrow.Col1  = this.color_array[index];

      newrow.Col2 =  this.color_array[index];

      newrow.Col3 = this.color_array[index];

      newrow.Col4 =  {
        selKey: "abc",
        selVal: "1"                
      };

      newrow.Col5 = this.color_array[index];

      var tempDate = new Date();      
      tempDate.setDate(tempDate.getDate() + index); 
      newrow.Col6  =  tempDate;

      newrow.Col7 = index * 100;

      newrow.Children = [];

      for (let iChildRow = 0; iChildRow < 5; iChildRow++) {        
        var childRow : AppObj = new AppObj();
        childRow.Col1 = this.color_array[iChildRow];
        childRow.Col2 = this.color_array[iChildRow];
        childRow.Col3 = this.color_array[iChildRow];
        childRow.Col4 =  {
          selKey: "abc",
          selVal: "1"                
          };
        childRow.Col5 = this.color_array[iChildRow];
        childRow.Col6 = tempDate;
        childRow.Col7 = index * 100;
        childRow.Index = 0;        
        newrow.Children.push(childRow);
      }
      this.rows.push(newrow);     
      //await this.delay(500);
      this.rowsLoadingPercent += 10;
    
    }
    this.rowsLoadingPercent = 100;
        
  } 
   delay(ms: number):Promise<any> {
    return new Promise( resolve => setTimeout(resolve, ms) );
  } 
}
