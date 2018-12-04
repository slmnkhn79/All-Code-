import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-database-details',
  templateUrl: './database-details.component.html',
  styleUrls: ['./database-details.component.css']
})
export class DatabaseDetailsComponent implements OnInit {
  collectionList : [];
  constructor(private dbService :DatabaseService) { }

  ngOnInit() {
    this.dbService.getCollectionList().subscribe(
      (data)=>{
        this.collectionList = data;
      }
    );
  }
  openCollection(collectionName){
    
  }

}
