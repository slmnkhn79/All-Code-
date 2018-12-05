import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
import {MatTableDataSource} from  '@angular/material/table'

@Component({
  selector: 'app-database-details',
  templateUrl: './database-details.component.html',
  styleUrls: ['./database-details.component.css']
})
export class DatabaseDetailsComponent implements OnInit {
 dataSource: MatTableDataSource<[]>;
  constructor(private dbService :DatabaseService) { }

  ngOnInit() {
    this.dbService.getCollectionList();
  }
  onSelect(coll){
    var dbName = coll.dbName;
    var name = coll.name;
    console.log(name);
    this.dbService.getCollectionDetails(name);
    this.dataSource = new MatTableDataSource(this.dbService.collectionDetails);
  }
}
