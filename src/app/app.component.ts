import { Component,Input, OnInit } from '@angular/core';
import { Ngrid2 } from './ngrid2';
import { Ngrid2ButtonColumn, Ngrid2DefaultColumn, Ngrid2InputColumn, Ngrid2SelectColumn, Ngrid2LinkColumn, Ngrid2DateColumn } from './ngrid2DefaultColumn';
import { Ngrid2Filter } from './ngrid2Filter';
import { Ngrid2DropdownFilter } from './ngrid2DropdownFilter';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Something changed';

  //appGridObj : Ngrid2 = new Ngrid2();

  color_array = ["primary","secondary","success","danger","warning","info","light","dark"];

  _debug_all_cols = true;
   columnDefinitions : Ngrid2DefaultColumn[];    
   rows : any[];
   childColumndefinitions : Ngrid2DefaultColumn[];   
   childPropertynames:  string[]; 

  //selectionList : object[] =

  getButtonCol(): Ngrid2DefaultColumn {
    var btnCol : Ngrid2ButtonColumn = new Ngrid2ButtonColumn();
    btnCol.Name= "Col2",
    btnCol.isNgNgridColumnHide = false,
    btnCol.DisplayName = () => {
      return btnCol.Name;
    };
    btnCol.isNgNgridSelected = false;        
    btnCol.ClassFn  = (r: any) => {
      return "btn-" + r[btnCol.Name];
    };
    btnCol.CellClassFn = (r: any) => {
      return "";
    };
    btnCol.TooltipFn = (r: any) => {      
      return "hello";
    };
    btnCol.BadgeFn = (r: any) => {      
      return r.Index.toString();
    };
    btnCol.BadgeClassFn = (r: any) => {      
      return "badge-dark badge-pill";
    };
    btnCol.BadgeUrlFn = (r: any) => {      
      return "https=//www.bing.com"
    };
    btnCol.BadgeTargetFn = (r: any) => {      
      return "_top"; 
    };
    btnCol.IconFn = (r: any) => {
      return "far fa-play-circle";
    };
    btnCol.NullOrEmptyFn =  (r: any) => {      
      return "No Value";
    }        
    btnCol.FilterClassFn = (d: Ngrid2DropdownFilter) => {      
      return "bg-"  + d.DistinctValue ;
    };
    btnCol.FilterIconFn= (d: Ngrid2DropdownFilter) => {
      return "far fa-play-circle";
    };
    btnCol.NullOrEmptyFn =  (r: any) => {      
        return "No Value";
    }
    btnCol.ClickFn =  (r: any) => {
      alert("clicked");
    };
    btnCol.DisabledFn =  (r: any) => {
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
     defCol.ClassFn  = (r: any) => {
       return "bg-"  + r[defCol.Name] ; //+ " text-white";
     };
     defCol.CellClassFn = (r: any) => {
       return "alert-" + this.color_array[r.Index];
     };
     defCol.TooltipFn = (r: any) => {      
       return "hello";
     };
     defCol.BadgeFn = (r: any) => {      
       return r.Index.toString();
     };
     defCol.BadgeClassFn = (r: any) => {      
       return "badge-dark badge-pill";
     };
     defCol.BadgeUrlFn = (r: any) => {      
       return "https=//www.bing.com"
     };
     defCol.BadgeTargetFn = (r: any) => {      
       return "_top"; 
     };
     defCol.IconFn = (r: any) => {
       return "far fa-play-circle";
     };
     defCol.NullOrEmptyFn =  (r: any) => {      
       return "No Value";
     }        
     defCol.FilterClassFn = (d: Ngrid2DropdownFilter) => {      
       return "bg-"  + d.DistinctValue ;
     };
     defCol.FilterIconFn= (d: Ngrid2DropdownFilter) => {
       return "far fa-play-circle";
     };
     defCol.NullOrEmptyFn =  (r: any) => {      
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
    inputCol.ClassFn  = (r: any) => {
      return "text-"  + r[inputCol.Name] ; //+ " text-white";
    };
    inputCol.CellClassFn = (r: any) => {
      return "";
    };
    inputCol.TooltipFn = (r: any) => {      
      return "hello";
    };
    inputCol.BadgeFn = (r: any) => {      
      return r.Index.toString();
    };
    inputCol.BadgeClassFn = (r: any) => {      
      return "badge-dark badge-pill";
    };
    inputCol.BadgeUrlFn = (r: any) => {      
      return "https=//www.bing.com"
    };
    inputCol.BadgeTargetFn = (r: any) => {      
      return "_top"; 
    };
    inputCol.IconFn = (r: any) => {
      return "far fa-play-circle";
    };
    inputCol.NullOrEmptyFn =  (r: any) => {      
      return "No Value";
    }        
    inputCol.FilterClassFn = (d: Ngrid2DropdownFilter) => {      
      return "bg-"  + d.DistinctValue;
    };
    inputCol.FilterIconFn= (d: Ngrid2DropdownFilter) => {
      return "far fa-play-circle";
    };
    inputCol.NullOrEmptyFn =  (r: any) => {      
        return "No Value";
    }
    inputCol.InputTypeFn =  (r: any) => {
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
    selCol.ClassFn  = (r: any) => {
      return "bg-"  + r[selCol.Name] ; //+ " text-white";
    };
    selCol.CellClassFn = (r: any) => {
      return "";
    };
    selCol.TooltipFn = (r: any) => {      
      return "hello";
    };
    selCol.BadgeFn = (r: any) => {      
      return r.Index.toString();
    };
    selCol.BadgeClassFn = (r: any) => {      
      return "badge-dark badge-pill";
    };
    selCol.BadgeUrlFn = (r: any) => {      
      return "https=//www.bing.com"
    };
    selCol.BadgeTargetFn = (r: any) => {      
      return "_top"; 
    };
    selCol.IconFn = (r: any) => {
      return "far fa-play-circle";
    };
    selCol.NullOrEmptyFn =  (r: any) => {      
      return "No Value";
    }        
    selCol.FilterClassFn = (d: Ngrid2DropdownFilter) => {      
      return "bg-"  + d.DistinctValue ;
    };
    selCol.FilterIconFn= (d: Ngrid2DropdownFilter) => {
      return "far fa-play-circle";
    };
    selCol.NullOrEmptyFn =  (r: any) => {      
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
    linkCol.ClassFn  = (r: any) => {
      return "text-"  + r[linkCol.Name] ; //+ " text-white";
    };
    linkCol.CellClassFn = (r: any) => {
      return "";
    };
    linkCol.TooltipFn = (r: any) => {      
      return "hello";
    };
    linkCol.BadgeFn = (r: any) => {      
      return r.Index.toString();
    };
    linkCol.BadgeClassFn = (r: any) => {      
      return "badge-dark badge-pill";
    };
    linkCol.BadgeUrlFn = (r: any) => {      
      return "https=//www.bing.com"
    };
    linkCol.BadgeTargetFn = (r: any) => {      
      return "_top"; 
    };
    linkCol.IconFn = (r: any) => {
      return "far fa-play-circle";
    };
    linkCol.NullOrEmptyFn =  (r: any) => {      
      return "No Value";
    }        
    linkCol.FilterClassFn = (d: Ngrid2DropdownFilter) => {      
      return "bg-"  + d.DistinctValue;
    };
    linkCol.FilterIconFn= (d: Ngrid2DropdownFilter) => {
      return "far fa-play-circle";
    };
    linkCol.NullOrEmptyFn =  (r: any) => {      
        return "No Value";
    };
    linkCol.UrlFn= (r: any) => {  return "www.google.com" };
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
    dateCol.ClassFn  = (r: any) => {
      return ""; //+ " text-white";
    };
    dateCol.CellClassFn = (r: any) => {
      return "";
    };
    dateCol.TooltipFn = (r: any) => {      
      return "hello";
    };
    dateCol.BadgeFn = (r: any) => {      
      return r.Index.toString();
    };
    dateCol.BadgeClassFn = (r: any) => {      
      return "badge-dark badge-pill";
    };
    dateCol.BadgeUrlFn = (r: any) => {      
      return "https=//www.bing.com"
    };
    dateCol.BadgeTargetFn = (r: any) => {      
      return "_top"; 
    };
    dateCol.IconFn = (r: any) => {
      return "far fa-play-circle";
    };
    dateCol.NullOrEmptyFn =  (r: any) => {      
      return "No Value";
    }        
    dateCol.FilterClassFn = (d: Ngrid2DropdownFilter) => {      
      return "bg-"  + d.DistinctValue;
    };
    dateCol.FilterIconFn= (d: Ngrid2DropdownFilter) => {
      return "far fa-play-circle";
    };
    dateCol.NullOrEmptyFn =  (r: any) => {      
        return "No Value";
    };
    dateCol.DateFormatFn=  (r: any) => {      
      return "MM/dd/yyyy";
    };
    return dateCol;
  }

  getNumberCol(): Ngrid2DefaultColumn {
    var numCol : Ngrid2DefaultColumn = new Ngrid2DefaultColumn();    
    numCol.Name= "Col7",
    numCol.isNgNgridColumnHide = false,
    numCol.DisplayName = () => {      
      return numCol.Name;
    };
    numCol.isNgNgridSelected = false;        
    numCol.ClassFn  = (r: any) => {
      return "h" + r[numCol.Name]/100;
    };
    numCol.CellClassFn = (r: any) => {
      return "";
    };
    numCol.TooltipFn = (r: any) => {      
      return "hello";
    };
    numCol.BadgeFn = (r: any) => {      
      return r.Index.toString();
    };
    numCol.BadgeClassFn = (r: any) => {      
      return "badge-dark badge-pill";
    };
    numCol.BadgeUrlFn = (r: any) => {      
      return "https=//www.bing.com"
    };
    numCol.BadgeTargetFn = (r: any) => {      
      return "_top"; 
    };
    numCol.IconFn = (r: any) => {
      return "far fa-play-circle";
    };
    numCol.NullOrEmptyFn =  (r: any) => {      
      return "No Value";
    }        
    numCol.FilterClassFn = (d: Ngrid2DropdownFilter) => {      
      return "bg-"  + d.DistinctValue;
    };
    numCol.FilterIconFn= (d: Ngrid2DropdownFilter) => {
      return "far fa-play-circle";
    };
    numCol.NullOrEmptyFn =  (r: any) => {      
        return "No Value";
    }        
    return numCol;
  }
  
  ngOnInit() {           
    this.columnDefinitions = [];    
    this.rows = [];    
    this.childColumndefinitions = [];
    this.childPropertynames =["Children"];    

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
      var newrow : any = new Object();
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
        var childRow = {
          Col1: this.color_array[iChildRow],
          Col2: this.color_array[iChildRow],
          Col3: this.color_array[iChildRow],
          Col4:  {
          selKey: "abc",
          selVal: "1"                
          },
          Col5: this.color_array[iChildRow],        
          Col6:  tempDate,
          Col7: index * 100,
          Index: 0        
        }
        newrow.Children.push(childRow);
      }
      this.rows.push(newrow);      
    }
        
  }  
}
