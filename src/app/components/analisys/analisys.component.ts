import {Component, OnInit} from '@angular/core';
import {AnalysisService} from '../../services/analysis.service';
import {UsersService} from '../../services/users.service';
import {Label} from 'ng2-charts';
import * as moment from 'moment';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-analisys',
  templateUrl: './analisys.component.html',
  styleUrls: ['./analisys.component.css']
})
export class AnalisysComponent implements OnInit {
  data = [];
  pieChartLabels: Label[] = [''];
  pieChartData: number[] = [0];
  dataFetched: boolean = false;

  constructor(private service: AnalysisService, private useService: UsersService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    const userId = this.route.snapshot.paramMap.get('id');
    this.service.getOrdersPerDay(userId).subscribe((res: any) => {
      this.data = res;
      this.dataFetched = true;
      this.pieChartLabels = this.data.map((i: any) => {
        return moment(i._id).format('DD-MM-YYYY');
      });
      this.pieChartData = this.data.map((i) => {
        return i.orders_per_day;
      });

    });
  }

}
