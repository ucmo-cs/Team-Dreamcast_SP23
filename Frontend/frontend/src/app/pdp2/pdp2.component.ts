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
  constructor(private api: ApiService) { }

  getEmployees() {
    this.api.getEmployees().subscribe((res: any) => {
      console.log(res);
    });
  }

  getASelfAssessment(employeeId: string, assessmentYear: string) {
    this.api.getASelfAssessment(employeeId, assessmentYear).subscribe((res: any) => {
      console.log(res);
      this.accomplishment1 = res[0].accomplishments[0];
      this.accomplishment2 = res[0].accomplishments[1];
      this.accomplishment3 = res[0].accomplishments[2];
      this.takeaways = res[0].takeaways;
      this.obstaclesOvercame = res[0].obstaclesOvercame;
      this.improvementAreas = res[0].improvementAreas;
      this.supportImprovement = res[0].supportImprovement;
      this.milestones = res[0].milestones;
      this.hurdles = res[0].hurdles;
      this.holdAccountable = res[0].holdAccountable;
      this.posotivePerformanceExample = res[0].posotivePerformanceExample;
      this.improveExample = res[0].improveExample;
      this.mainGoal = res[0].mainGoal;
      this.learningGoal = res[0].learningGoal;
      this.leadershipTeam = res[0].leadershipTeam;
      this.feedback = res[0].feedback;
    })
  }

  title = 'Risen One Company Portal';

  accomplishment1 = 'Accomplishment text goes here.';
  accomplishment2 = 'Accomplishment text goes here.';
  accomplishment3 = 'Accomplishment text goes here.';
  takeaways = "Answer goes here.";
  obstaclesOvercame = "Answer goes here.";
  improvementAreas = "Answer goes here.";
  supportImprovement = "Answer goes here.";
  milestones = "Answer goes here.";
  hurdles = "Answer goes here.";
  holdAccountable = "Answer goes here.";
  posotivePerformanceExample = "Answer goes here.";
  improveExample = "Answer goes here.";
  mainGoal = "Answer goes here.";
  learningGoal = "Answer goes here.";
  leadershipTeam = "Answer goes here.";
  feedback = "Answer goes here.";

  tiles: Tile[] = [
    { text: 'One', cols: 1, rows: 1 },
    { text: 'Two', cols: 1, rows: 1 },
    { text: 'Three', cols: 1, rows: 1 },
    { text: 'Four', cols: 1, rows: 1 },
    { text: 'Five', cols: 1, rows: 1 },
    { text: 'Six', cols: 1, rows: 1 },
    { text: 'Seven', cols: 1, rows: 1 },
    { text: 'Eight', cols: 1, rows: 1 },
    { text: 'Nine', cols: 1, rows: 1 },
    { text: 'Ten', cols: 1, rows: 1 },
    { text: 'Eleven', cols: 1, rows: 1 },
    { text: 'Twelve', cols: 1, rows: 1 },
    { text: 'Thirteen', cols: 1, rows: 1 },
  ];

  years: Year[] = [
    { value: 'year-0', viewValue: '2023' },
    { value: 'year-1', viewValue: '2022' },
    { value: 'year-2', viewValue: '2021' },
  ];
}
