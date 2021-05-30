import { Component, OnInit } from '@angular/core';
import { HealthService } from 'src/app/shared/services/health.service';
import { battery, fuelTank, tires } from '../../shared/data/data';


@Component({
  selector: 'app-dashboard2',
  templateUrl: './dashboard2.component.html',
  styleUrls: ['./dashboard2.component.scss']
})

export class Dashboard2Component implements OnInit {


  constructor(private healthService: HealthService) {}

  battery:any = battery;
  fuelTank: any = fuelTank;
  tires:any = tires;

  ngOnInit(){
    //this.getBatteryDetails();
  }

  /* getBatteryDetails(){
    this.healthService.getBatteryParams().subscribe(res=>{
      console.log(res);
    })
  } */

  onResized(event: any) {
    setTimeout(() => {
      this.fireRefreshEventOnWindow();
    }, 300);
  }

  fireRefreshEventOnWindow = function () {
    var evt = document.createEvent("HTMLEvents");
    evt.initEvent("resize", true, false);
    window.dispatchEvent(evt);
  };
}
