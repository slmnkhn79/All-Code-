import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {Status } from './error';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  connected: boolean;
  private connectUrl = 'http://localhost:3000/connect';
  private collectionUrl ='http://localhost:3000/list-collections'
  private baseURL ="http://localhost:3000";
  private jsonResponse :{
    status: string,
    code: number
  }
  private collectionList =[];
   collectionDetails = [];
  displayedColumns = [];
  //private collectionUrl = 'http://localhost:3000/api/connect';
  constructor(
    private httpClient: HttpClient
  ) { }

  connect() {
    return this.httpClient.get<Status>(this.connectUrl);
  }
  getCollectionList(){
    this.httpClient.get<[]>(this.collectionUrl).subscribe((data)=>{
    this.collectionList = data;
    });
  }
  getCollectionDetails(collName){
    this.httpClient.get<[]>(this.baseURL+'/list-data/'+collName).subscribe((data)=>{
      this.collectionDetails = data;
      this.displayedColumns = Object.keys(this.collectionDetails[0]);
    });
    
  }
  getCollectionDetailsTwo(collName,limit,skip){
    return this.httpClient.get(this.baseURL+'/list-data/'+collName+'/'+limit+'/'+skip);
    
  }
  updateCollectionData(collName,data){
    return this.httpClient.put(this.baseURL+'/'+collName+'/'+'updateData',data);
  }
 
}
