//created using ng g c home, basically creating a home component, for more information go to https://angular.io/cli/generate
import { Component } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  //creates an api service 
  constructor(private api: ApiService){}

  getEmployees(){
    //not super clear on this but the .subscribe basically goes "hey, something got sent, log it"
    this.api.getEmployees().subscribe((res:any)=>{
      console.log(res);
    });
  }
  createEmployee(){
    this.api.createEmployee().subscribe((res:any)=>{
      console.log(res);
    });
  }


}
