import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { HealthService } from 'src/app/shared/services/health.service';
import { battery, fuelTank, tires } from '../../shared/data/data';


@Component({
  selector: 'app-dashboard2',
  templateUrl: './dashboard2.component.html',
  styleUrls: ['./dashboard2.component.scss']
})

export class Dashboard2Component implements OnInit {


  constructor(private healthService: HealthService, private fb: FormBuilder) { }

  battery: any = battery;
  fuelTank: any = fuelTank;
  tires: any = tires;
  ignition: boolean;

  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  user = this.currentUser.data;

  dashboardForm = this.fb.group({
    _id: this.user._id,
    username: this.user.username,
    description: this.user.description,
    vehicleInfo: this.fb.group({
      vehicleNo: this.user.vehicleInfo.vehicleNo,
      make: this.user.vehicleInfo.make,
      model: this.user.vehicleInfo.model,
      year: this.user.vehicleInfo.year,
      ignitionStatus: this.user.vehicleInfo.ignitionStatus,
      flashlight: this.user.vehicleInfo.flashlight,
      frontLeftLock: this.user.vehicleInfo.frontLeftLock,
      frontRightLock: this.user.vehicleInfo.frontRightLock,
      backLeftLock: this.user.vehicleInfo.backLeftLock,
      backRightLock: this.user.vehicleInfo.backRightLock
    }),
    healthCheck: this.fb.group({
      batteryPercentRemaining: this.user.healthCheck.batteryPercentRemaining,
      isPluggedIn: this.user.healthCheck.isPluggedIn,
      status: this.user.healthCheck.status,
      backLeft: this.user.healthCheck.backLeft,
      backRight: this.user.healthCheck.backRight,
      frontLeft: this.user.healthCheck.frontLeft,
      frontRight: this.user.healthCheck.frontRight
    })
  })  

  ngOnInit() {
    this.currentUser = this.currentUser.data;

    //get latest data by id
    this.healthService.getDashboardById(this.currentUser._id).subscribe(x=>{
      console.log(x);
      this.dashboardForm.patchValue(x)
      console.log(this.dashboardForm.value);
    })

    this.onChanges();
  }

  onChanges() {
    this.dashboardForm.valueChanges.subscribe(res=>{
      console.log(res);
      this.updateDashboardParams(res);
    })
    //change requested param global setting
  }

  updateDashboardParams(data) {
    this.healthService.updateDashboardParameters(data).subscribe(res => {
      console.log(res);
    })
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
