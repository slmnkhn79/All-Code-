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
  constructor(
    private httpClient: HttpClient
  ) { }

  connect() {
    return this.httpClient.get<Status>(this.connectUrl);
  }
  getCollectionList(){
    return this.httpClient.get<[]>(this.collectionUrl);
  }
  openCollection(collectionName){
    
  }
 
}
