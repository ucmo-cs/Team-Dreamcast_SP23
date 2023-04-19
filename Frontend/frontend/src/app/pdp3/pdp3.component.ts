import { Component } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-pdp3',
  templateUrl: './pdp3.component.html',
  styleUrls: ['./pdp3.component.css']
})
export class PDP3Component {
  constructor(private api: ApiService){}

  getPerformanceEval(performanceId:string) {
    this.api.getPerformanceEval(performanceId).subscribe((res:any)=> {
      console.log(res);
    })
  }
  
}