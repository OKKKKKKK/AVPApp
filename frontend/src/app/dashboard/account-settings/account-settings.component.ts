import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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


  generalForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    vehicleNo: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    make: new FormControl('', [Validators.required]),
    model: new FormControl('', [Validators.required]),
    year: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required])
  });


  constructor() { }

  ngOnInit() {
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
  }

}
