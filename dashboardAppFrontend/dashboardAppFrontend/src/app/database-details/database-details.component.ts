import { Component, OnInit,ViewChild ,Inject} from '@angular/core';
import { DatabaseService } from '../database.service';
import {MatTableDataSource} from  '@angular/material/table'
import {MatPaginator,MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig} from  '@angular/material'
import { DialogAddDocument } from '../dialog-add-document/dialog-add-document';





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
  public isSelected :boolean 
  public isPrimary :boolean = false;
  public isSecondary = true;
  public data;
  public newData;
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
    this.isSecondary= true;
    //this.dbService.getCollectionDetails(name);
    if(this.isPrimary){
      this.isSecondary=false;
    this.dbService.getCollectionDetailsTwo(this.name,this.limit,this.skip).subscribe((e)=>{

      this.rows = (Object.keys(e[0]));
      console.log(this.rows);
     // console.log(e);
      this.data = e;
      this.data = new MatTableDataSource(this.data);
      this.data.paginator = this.paginator;
      this.skip =this.skip+this.limit;
    });
  }else{
    this.isPrimary =false;
    this.dbService.getCollectionDetailsTwo(this.name,this.limit,this.skip).subscribe((e)=>{

      this.newData = e;
  });
    
    //this.dataSource = new MatTableDataSource(this.dbService.collectionDetails);
  }
}
  // getNextDetails(){
  //   this.dbService.getCollectionDetailsTwo(this.name,this.limit,this.skip).subscribe((d)=>{
      
  //    //this.rows = (Object.keys(d[0]));
  //     console.log(d);
  //     this.data = d;
  //     this.skip =this.skip+this.limit;
  // });
  
  addDocument(){
    const dialogRef = this.dialog.open(DialogAddDocument, {
      width: '550px',
      data: this.name,
      });
     
      dialogRef.afterClosed().subscribe(result => {
        var arg = {
          'name':this.name
        }
        this.onSelect(arg);
        
      });
  }
  itemSelected(item){
   // console.log(item);
    const dialogRef = this.dialog.open(DialogOverview, {
      width: '80%',
      data: [item,this.name],
      });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      var arg = {
        'name':this.name
      }
      this.onSelect(arg)
    });
  }
  convertView(){
    if(this.isPrimary){
      this.isPrimary = false;
      this.isSecondary=true;
    }
    else{
      this.isPrimary=true;
      this.isSecondary=false;
      var arg = {
        'name':this.name
      }
      this.onSelect(arg)
    }

  }
  stringify(data){
    return JSON.stringify(data);
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

    },(err)=>{
      console.log(err);
    });
  }
  deleteDocument(data){
    var id = data._id;
    console.log(id);
    this.dbService.deleteCollectionData(this.data[1],id).subscribe(()=>{
    },(err)=>{
      console.log(err)
    });
  }

}
