import { Component, OnInit,ViewChild ,Inject} from '@angular/core';
import { DatabaseService } from '../database.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig} from  '@angular/material'
import * as $ from 'jquery';



@Component({
    selector: 'dialog-add-document',
    templateUrl: 'dialog-add-document.html',
    styleUrls:['dialog-add-document.css']  
  })
  export class DialogAddDocument implements OnInit {
      modalConfig = MatDialogConfig;
        jsonStatus : Boolean ;

    constructor(
      public dialogRef: MatDialogRef<DialogAddDocument>,
      @Inject(MAT_DIALOG_DATA) private collName:any,private dbService:DatabaseService) {}
  
      ngOnInit(){
       this.jsonStatus = false;
      }
  
  
    onNoClick(): void {
      this.dialogRef.close();
    }
    addDocument(data){
        if(this.validateJSON(data) && !$.isEmptyObject(data) ){
            this.jsonStatus= false;
        console.log(data);
        data = JSON.parse(data);
        this.dbService.addCollectionData(this.collName,data).subscribe((data)=>{
            console.log(data);
            this.dialogRef.close(data);
        },(error)=>{
            console.log(error);
        });
        }
        else{
            this.jsonStatus = true;
        console.log('not valid');
        }
    }

    validateJSON(obj){
        try{
            var c = $.parseJSON(obj);
            console.log('parse');
            this.jsonStatus= false;
            return true;
        }catch(e){
            this.jsonStatus= true;
           return false;
        }
    }
}