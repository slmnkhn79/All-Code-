import { Component, OnInit } from '@angular/core';
import {DatabaseService} from '../database.service';
import {FormBuilder} from '@angular/forms';
import { Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public connected: boolean;
  loginForm =this.fBuilder.group(
    {username : ['',Validators.required],
    password:['',Validators.required],
    serverName : ['',Validators.required],
    portNumber : ['',Validators.required],
    dbName : ['',Validators.required]
    }
  );
  public item;
  public recents:boolean = false;
  constructor(private dbService: DatabaseService,private fBuilder : FormBuilder) {
    this.connected=false;
    this.recents=false;

   }

  ngOnInit() {
  
    let token = localStorage.getItem('saved');
    if(token == '0')
    {
      this.item = JSON.parse(localStorage.getItem('key'));
      console.log(this.item);
      this.recents = true;
    }

    
  }
  onClick(){
    
    if(this.loginForm.valid){
      this.dbService.connect(this.loginForm.value).subscribe((data)=>{
        if(data.code == 999)
        {
          this.connected = true;
          console.log(this.connected);
          var localdata = this.loginForm.value;
          localStorage.clear();
          localStorage.setItem('key',JSON.stringify(localdata));
          localStorage.setItem('saved','0');
          this.recents= true;
        }
        else{
          this.connected =false;
          console.log(this.connected);
        }
          
        });
    }
      
  }
  recentLogin(){
    let item = JSON.parse(localStorage.getItem('key'));
    console.log(item);
    this.dbService.connect(item).subscribe((data)=>{
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
