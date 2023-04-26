import { Component } from '@angular/core';
//import html2canvas from 'html2canvas';
import { ApiService } from '../api.service';
// import { FormControl } from '@angular/forms'; //don't need
//import * as jspdf from 'jspdf'; //for getting to pdf 

//add and take away when needed/not needed
interface Year {
  value: string;
  viewValue: string;
}

//added 4/21/23 - take away if not needed
export interface Tile{
    cols:number;
    rows:number;
    text:string;

}

@Component({
  selector: 'app-pdp3',
  templateUrl: './pdp3.component.html',
  styleUrls: ['./pdp3.component.css']
})
export class PDP3Component {
  //download pdf //currently non-functional
  /*
  public captureScreen()  
  {  
    var data = document.getElementById('contentToConvert');  //Id of the table
    html2canvas(data).then(canvas => {  
      // Few necessary setting options  
      let imgWidth = 208;   
      let pageHeight = 295;    
      let imgHeight = canvas.height * imgWidth / canvas.width;  
      let heightLeft = imgHeight;  

      const contentDataURL = canvas.toDataURL('image/png')  
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
      let position = 0;  
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)  
      pdf.save('MYPdf.pdf'); // Generated PDF   
    });  
  }  
  */
  constructor(private api: ApiService){}
  DateCompleted = new Date();
  currentPerformanceEvalId = "";

  setdefaultInputs2(){
    this.EmployeeName = this.api.globalUser;
    this.SupervisorName = this.api.globalUser2;

    this.EmployeeName = '------';
    this.SupervisorName = '------';
    this.Rating1 = '----';
    this.Rating2 = '----';
    this.Rating3 = '----';
    this.Rating4 = '----';
    this.Rating5 = '----';
    this.Feedback1 = '------';
    this.Feedback2 = '------';
    this.Feedback3 = '-------';
    this.Feedback4 = '-------';
    this.Feedback5 = '-------';
  }

  setDefaultInputs(){
    this.EmployeeName = this.api.globalUser;
    this.DateCompleted = new Date ();

    this.EmployeeName = 'Last Mcfirst';
    this.SupervisorName = 'Last First';
    this.Rating1 = '11/10';
    this.Rating2 = '20/10';
    this.Rating3 = '19.5/10';
    this.Rating4 = '0/10';
    this.Rating5 = '0.0/10';
    this.Feedback1 = 'is awesome';
    this.Feedback2 = 'is swag';
    this.Feedback3 = 'swag awesome';
    this.Feedback4 = 'no.';
    this.Feedback5 = 'not good bro';

  }

  getPerformanceEval(employeeId: string) {
    this.api.getPerformanceEval(employeeId).subscribe((res:any)=> {
      if (this.currentPerformanceEvalId.length != 0){
        this.currentPerformanceEvalId = res[0].id;
        this.EmployeeName = res[0].EmployeeName;
        this.SupervisorName = res[0].SupervisorName;
        this.Rating1 = res[0].Rating1;
        this.Rating2 = res[0].Rating2;
        this.Rating3 = res[0].Rating3;
        this.Rating4 = res[0].Rating4;
        this.Rating5 = res[0].Rating5;
        this.Feedback1 = res[0].Feedback1;
        this.Feedback2 = res[0].Feedback2;
        this.Feedback3 = res[0].Feedback3;
        this.Feedback4 = res[0].Feedback4;
        this.Feedback5 = res[0].Feedback5;
      }
      else {this.setDefaultInputs(); }
    })
  }
/** 
  getSpecificPerformanceEval(performanceId:string){
    this.api.getSpecificPerformanceEval()
  }
  */

  deletePerformanceEval(id: string){
    this.api.deletePerformanceEval(id).subscribe((res: any)=>{
      alert(res);
      this.setdefaultInputs2();
    })
  }

  title = 'Risen One Company Portal'
 /**
  EmployeeName = this.api.globalUser;
  SupervisorName = this.api.globalUser2;
  Rating1 = this.api.rating1;
  Rating2 = this.api.rating2;
  Rating3 = this.api.rating3;
  Rating4 = this.api.rating4;
  Rating5 = this.api.rating4;
  Feedback1 = this.api.feedback1;
  Feedback2 = this.api.feedback2;
  Feedback3 = this.api.feedback3;
  Feedback4 = this.api.feedback4;
  Feedback5 = this.api.feedback4;
  */

  //ideally what it should display is default text, and should change
  EmployeeName = this.api.globalUser;
  SupervisorName = this.api.globalUser2;
  Rating1 = 'rate goes here.';
  Rating2 = 'rate goes here.';
  Rating3 = 'rate goes here.';
  Rating4 = 'rate goes here.';
  Rating5 = 'rate goes here.';
  Feedback1 = 'feedback goes here.';
  Feedback2 = 'feedback goes here.';
  Feedback3 = 'feedback goes here.';
  Feedback4 = 'feedback goes here.';
  Feedback5 = 'feedback goes here.';

  years: Year[] = [
    {value: '2023', viewValue: '2023'},
    {value: '2022', viewValue: '2022'},
    {value: '2021', viewValue: '2021'},
    {value: '2020', viewValue: '2020'}
  ]


}
