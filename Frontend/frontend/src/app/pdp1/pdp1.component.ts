import { Component } from '@angular/core';
import { FormGroup, Validators, FormControl} from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import * as moment from 'moment';
// import { MatToolbarModule } from '@angular/material/toolbar';
// import { MatIconModule } from '@angular/material/icon';
// import { MatTabsModule} from '@angular/material/tabs';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import {MatSelectModule} from '@angular/material/select';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-pdp1',
  templateUrl: './pdp1.component.html',
  styleUrls: ['./pdp1.component.css']
})


export class PDP1Component {
  tiles: Tile[] = [
    {text: 'One', cols: 3, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 1, rows: 1, color: 'lightgreen'},
    {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
  ];
  
  year = new Date().getFullYear();
  selected = this.year.toString();
 
  currentDate = moment();
  date = new FormControl({ value: this.currentDate.format('DD/MM/YYYY'), disabled: true });
}

// date: new FormControl({value: null, disabled: true})
