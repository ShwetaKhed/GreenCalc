import { Component, OnInit, Input } from '@angular/core';
import { BarModel } from '../Model/bar.model';

@Component({
  selector: 'app-barchart',
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.css']
})
export class BarchartComponent implements OnInit {

  @Input() List: Array<BarModel> =  [];

  public Total=0;
  public MaxHeight= 160;

  constructor() { }
  ngOnInit(): void {
    this.MontarGrafico();
  }
  MontarGrafico(){
    this.List.forEach(element => {
      this.Total += element.Value;
    });

    this.List.forEach(element => {
      element.Size = Math.round((element.Value*this.MaxHeight)/this.Total) + '%';
    });
  }


}
