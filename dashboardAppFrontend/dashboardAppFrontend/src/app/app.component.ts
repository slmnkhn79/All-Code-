import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'You Dashboard';

  connectionForm : FormGroup; 
  submitted:false;

  constructor(private fb: FormBuilder){
      this.connectionForm = this.fb.group({
          username:[''],
          password:[''],
          serverName:[''],
          portNumber:[''],
          dbName:['']
      });
  }
  ngOnInit(){

  }
}
