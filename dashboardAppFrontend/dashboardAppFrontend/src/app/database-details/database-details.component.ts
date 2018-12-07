import { Component, OnInit,ViewChild ,Inject} from '@angular/core';
import { DatabaseService } from '../database.service';
import {MatTableDataSource} from  '@angular/material/table'
import {MatPaginator,MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig} from  '@angular/material'





@Component({
  selector: 'app-database-details',
  templateUrl: './database-details.component.html',
  styleUrls: ['./database-details.component.css']
})
export class DatabaseDetailsComponent implements OnInit {
  //dataSource: MatTableDataSource<[]>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public rows:Array<any> = [];
  public columns:Array<any> = [];
  public isSelected :boolean = false;
  public data;
  public name;
  public limit: number = 0 ;
  public skip : number = 0;
  constructor(private dbService :DatabaseService,public dialog: MatDialog) {
    
   }

  ngOnInit() {
    this.dbService.getCollectionList();
  }

  onSelect(coll){
    this.isSelected=true;
    this.name = coll.name;
    console.log(name);
    //this.dbService.getCollectionDetails(name);
    this.dbService.getCollectionDetailsTwo(this.name,this.limit,this.skip).subscribe((e)=>{

      this.rows = (Object.keys(e[0]));
      console.log(this.rows);
     // console.log(e);
      this.data = e;
      this.data = new MatTableDataSource(this.data);
      this.data.paginator = this.paginator;
      this.skip =this.skip+this.limit;
    });
    
    //this.dataSource = new MatTableDataSource(this.dbService.collectionDetails);
  }
  // getNextDetails(){
  //   this.dbService.getCollectionDetailsTwo(this.name,this.limit,this.skip).subscribe((d)=>{
      
  //    //this.rows = (Object.keys(d[0]));
  //     console.log(d);
  //     this.data = d;
  //     this.skip =this.skip+this.limit;
  // });

  itemSelected(item){
   // console.log(item);
    const dialogRef = this.dialog.open(DialogOverview, {
      width: '80%',
      data: [item,this.name],
      });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      // this.dbService.updateCollectionData(result).subscribe((da)=>
      // {
      //   console.log(da);
      // });
    });
  }
}
@Component({
  selector: 'dialog-overview',
  templateUrl: 'dialog-overview.html',
  styleUrls:['dialog-overview.css']  
})
export class DialogOverview implements OnInit {
    keys :string[];
    modalConfig = MatDialogConfig;
    displayKeys:string[];
    oldData = [];
  constructor(
    public dialogRef: MatDialogRef<DialogOverview>,
    @Inject(MAT_DIALOG_DATA) private data:any,private dbService:DatabaseService) {}

    ngOnInit(){
      this.oldData = this.data[0];
      this.keys = Object.keys(this.data[0]);
      this.displayKeys =this.keys.slice(1,this.keys.length); 
    }


  onNoClick(): void {
    this.dialogRef.close(this.oldData);
  }
  updateData(udpatedData){
    this.dbService.updateCollectionData(this.data[1],udpatedData).subscribe((data)=>{

    });
  }

}
