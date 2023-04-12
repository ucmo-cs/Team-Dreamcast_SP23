import { Component } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private api: ApiService){}

  getEmployees() {
    this.api.getEmployees().subscribe((res:any)=>{
      console.log(res);
    });
  }
}
