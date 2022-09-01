import { Component, Input, OnInit } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { baseColors } from 'ng2-charts';
import { VoteTally } from 'src/app/state/quickRankState';

@Component({
  selector: 'app-result-graph',
  templateUrl: './result-graph.component.html',
  styleUrls: ['./result-graph.component.scss']
})
export class ResultGraphComponent implements OnInit {

  @Input() tallies! : VoteTally[];
  @Input() colorMap! : Map<string,string>;
  public chartLabels: string[] = [];
  public chartDataset: ChartConfiguration<'doughnut'>['data']['datasets'] = [];
  public chartOptions: ChartConfiguration<'doughnut'>['options'] = { responsive: true };
  
  constructor() { }

  ngOnInit(): void {
    this.chartLabels = this.tallies.map(t => t.display);
    this.chartDataset = [{ data: this.tallies.map(t => t.count), backgroundColor: this.tallies.map((t) => this.colorMap.get(t.id)!)}];
    console.log(`baseColors: ${JSON.stringify(baseColors)}`);
  }

}
