import { Component } from '@angular/core';
import { ApiService } from '../api.service';


interface Year {
  value: string;
  viewValue: string;
}

export interface Tile {
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-pdp2',
  templateUrl: './pdp2.component.html',
  styleUrls: ['./pdp2.component.css']
})
export class PDP2Component {
  constructor(private api: ApiService){}

  getEmployees() {
    this.api.getEmployees().subscribe((res:any)=>{
      console.log(res);
    });
  }

  getASelfAssessment(employeeId:string, assessmentYear:string) {
    this.api.getASelfAssessment(employeeId, assessmentYear).subscribe((res:any)=> {
      console.log(res);
    })
  }

  title = 'Risen One Company Portal';

  tiles: Tile[] = [
    {text: 'One', cols: 1, rows: 1},
    {text: 'Two', cols: 1, rows: 1},
    {text: 'Three', cols: 1, rows: 1},
    {text: 'Four', cols: 1, rows: 1},
    {text: 'Five', cols: 1, rows: 1},
    {text: 'Six', cols: 1, rows: 1},
    {text: 'Seven', cols: 1, rows: 1},
    {text: 'Eight', cols: 1, rows: 1},
    {text: 'Nine', cols: 1, rows: 1},
    {text: 'Ten', cols: 1, rows: 1},
    {text: 'Eleven', cols: 1, rows: 1},
    {text: 'Twelve', cols: 1, rows: 1},
    {text: 'Thirteen', cols: 1, rows: 1},
  ];

  years: Year[] = [
    {value: 'year-0', viewValue: '2023'},
    {value: 'year-1', viewValue: '2022'},
    {value: 'year-2', viewValue: '2021'},
  ];
}
