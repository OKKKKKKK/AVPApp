import { ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { HealthService } from 'src/app/shared/services/health.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AccountSettingsComponent implements OnInit {

  activeTab = "general";
  generalFormSubmitted = false;
  changePasswordFormSubmitted = false;
  infoFormSubmitted = false;
  alertVisible = true;

  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  user = this.currentUser.data;

  constructor(private fb: FormBuilder, private healthService: HealthService, private toastr: ToastrService, private cdr: ChangeDetectorRef, private router: Router) { }


  /* generalForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    vehicleNo: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    make: new FormControl('', [Validators.required]),
    model: new FormControl('', [Validators.required]),
    year: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required])
  }); */

  generalForm = this.fb.group({
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
      seatWarmerFL: this.user.vehicleInfo.seatWarmerFL,
      seatWarmerFR: this.user.vehicleInfo.seatWarmerFR,
      seatWarmerBL: this.user.vehicleInfo.seatWarmerBL,
      seatWarmerBR: this.user.vehicleInfo.seatWarmerBR,
      trunk: this.user.vehicleInfo.trunk,
      ac: this.user.vehicleInfo.ac,
      roofTop: this.user.vehicleInfo.roofTop,
      seatOccupiedFL: [this.user.vehicleInfo.seatOccupiedFL, { disabled: true }],
      seatOccupiedFR: [this.user.vehicleInfo.seatOccupiedFR, { disabled: true }],
      seatOccupiedBL: this.user.vehicleInfo.seatOccupiedBL,
      seatOccupiedBR: this.user.vehicleInfo.seatOccupiedBR
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
      frontRight: this.user.healthCheck.frontRight,
      timeCoverInFullHealth: this.user.healthCheck.timeCoverInFullHealth,
      distanceCoverInFullHealth: this.user.healthCheck.distanceCoverInFullHealth
    })
  })

  ngOnInit() {
    this.healthService.getDashboardById(this.user._id).subscribe(x => {
      console.log(x);
      this.generalForm.patchValue(x);
      console.log(this.generalForm.value);
      this.cdr.markForCheck();
    })
  }

  setActiveTab(tab) {
    this.activeTab = tab;
  }

  get gf() {
    return this.generalForm.controls;
  }

  onGeneralFormSubmit() {
    this.generalFormSubmitted = true;
    if (this.generalForm.invalid) {
      return;
    }

    this.healthService.changeBasicInfo(this.generalForm.value).subscribe(res => {
      console.log(res);
      this.toastr.show('Information Updated Successfully!', 'Success!');
      setTimeout(() => {
        this.router.navigate(['/dashboard/health']);
      }, 500)
    }, (err) => {
      this.toastr.error('Something went wrong!', 'Error!');
      console.log(err);
    })
  }

}
