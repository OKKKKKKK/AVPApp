import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { HealthService } from 'src/app/shared/services/health.service';
import { battery, fuelTank, tires } from '../../shared/data/data';


@Component({
  selector: 'app-dashboard2',
  templateUrl: './dashboard2.component.html',
  styleUrls: ['./dashboard2.component.scss']
})

export class Dashboard2Component implements OnInit {
  ecoRunning: any;
  sportsRunning: any;


  constructor(private healthService: HealthService, private fb: FormBuilder, private cdr: ChangeDetectorRef) { }

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
      backRightLock: this.user.vehicleInfo.backRightLock,
      drivingMode: this.user.vehicleInfo.drivingMode,
      seatWarmer: this.user.vehicleInfo.seatWarmer,
      trunk: this.user.vehicleInfo.trunk,
      ac: this.user.vehicleInfo.ac
    }),
    healthCheck: this.fb.group({
      batteryPercentRemaining: this.user.healthCheck.batteryPercentRemaining,
      engineHealth: this.user.healthCheck.engineHealth,
      distanceCoverIconomyMode: this.user.healthCheck.distanceCoverIconomyMode,
      distanceCoverInSpeed: this.user.healthCheck.distanceCoverInSpeed,
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
      this.dashboardForm.patchValue(x);
      console.log(this.dashboardForm.value);

      this.ecoRunning = this.dashboardForm.get('healthCheck').get('distanceCoverIconomyMode').value * (parseFloat(this.dashboardForm.get('healthCheck').get('batteryPercentRemaining').value) / 100);
      this.sportsRunning = this.dashboardForm.get('healthCheck').get('distanceCoverInSpeed').value * (parseFloat(this.dashboardForm.get('healthCheck').get('batteryPercentRemaining').value) / 100);
      
      
      this.cdr.markForCheck();
    })

    this.onChanges();
  }

  get f(){
    return this.dashboardForm.controls;
  }

 /*  get health(){
    return this.dashboardForm.value.healthCheck.controls;
  } */

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
