import { Component } from '@angular/core';
import { NgxEchartsDirective, provideEcharts } from 'ngx-echarts';
import { EChartsOption } from 'echarts';
import {PresenceService} from "../../../Services/presence.service";
import {Utilisateur} from "../../../Models/utilisateur";
import {JsonPipe} from "@angular/common";
import {StaticsService} from "../../../Services/statics.service";
import {data} from "jquery";

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [NgxEchartsDirective, JsonPipe],
  providers: [provideEcharts()],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.css',
})
export class StatisticsComponent {
  listUsers : any[] =[];
  optionzaineb: EChartsOption = {};

  constructor(private presenceService : PresenceService,private staticsService: StaticsService) {
    this.presenceService.getPresenceByUser().subscribe((res:any[]) =>{
      this.listUsers = res;
    })
  }
  // Data for charts
  dataCircle = [
    { value: 1048, name: 'Search Engine' },
    { value: 735, name: 'Direct' },
    { value: 580, name: 'Email' },
    { value: 484, name: 'Union Ads' },
    { value: 300, name: 'Video Ads' },
  ];


  dataCandlesHorizontale = ['PENDING', 'APPROVED', 'REJECTED'];
  dataCandles = [120, 200, 150, 80, 70, 110, 130];

  // Charts Configurations
  option: EChartsOption = {
    tooltip: {
      trigger: 'item',
    },
    legend: {
      top: '5%',
      left: 'center',
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        padAngle: 5,
        itemStyle: {
          borderRadius: 10,
        },
        label: {
          show: false,
          position: 'center',
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: 'bold',
          },
        },
        labelLine: {
          show: false,
        },
        data: this.dataCircle,
      },
    ],
  };

  option2: EChartsOption = {
    xAxis: {
      type: 'category',
      data: this.dataCandlesHorizontale,
    },
    yAxis: {
      type: 'value',
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#283b56',
        },
      },
    },
    toolbox: {
      show: true,
      feature: {
        dataView: { readOnly: false },
        restore: {},
        saveAsImage: {},
      },
    },
    series: [
      {
        data: this.dataCandles,
        type: 'bar',
      },
    ],
  };

  updateChart(data: { pleasedCount: number; unpleasedCount: number }) {
    this.optionzaineb = {
      title: {
        text: 'Statistiques des Feedbacks',
        left: 'center',
      },
      xAxis: {
        type: 'category',
        data: ['Pleased', 'Unpleased']
      },
      yAxis: {
        type: 'value'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#283b56',
          },
        },
      },
      toolbox: {
        show: true,
        feature: {
          dataView: { readOnly: false },
          restore: {},
          saveAsImage: {},
        },
      },
      series: [
        {
          type: 'bar',
          data: [data.pleasedCount, data.unpleasedCount],
          itemStyle: {
            color: function (params) {
              return params.dataIndex === 0 ? '#5470C6' : '#EE6666';
            }
          }
        }
      ]
    };

}

  ngOnInit(): void {
    this.staticsService.statistics$.subscribe(data => {
      this.updateChart(data);
    });
  }
  }
