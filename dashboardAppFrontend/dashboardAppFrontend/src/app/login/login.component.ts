import { Component, OnInit } from '@angular/core';
import {DatabaseService} from '../database.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  connected: boolean;
  constructor(private dbService: DatabaseService) {
    this.connected=false;
   }

  ngOnInit() {
  }
  onClick(){
      this.dbService.connect().subscribe((data)=>{
      if(data.code == 999)
      {
        this.connected = true;
        console.log(this.connected);
      }
      else{
        this.connected =false;
        console.log(this.connected);
      }
        
      });
  }
}
