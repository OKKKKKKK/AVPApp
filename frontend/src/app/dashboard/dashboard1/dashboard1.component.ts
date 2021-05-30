import { Component, OnInit } from '@angular/core';
import { HealthService } from 'src/app/shared/services/health.service';
import {fuelTank} from '../../shared/data/data';


@Component({
  selector: 'app-dashboard1',
  templateUrl: './dashboard1.component.html',
  styleUrls: ['./dashboard1.component.scss']
})

export class Dashboard1Component implements OnInit {

  constructor(private healthService: HealthService){}

  ngOnInit(){
    this.healthService.getUserDetails().subscribe(res=>{
      console.log(res);
    })
  } 

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
