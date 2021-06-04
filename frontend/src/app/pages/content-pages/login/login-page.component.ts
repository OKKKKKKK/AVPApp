import { Component, ViewChild } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { AuthService } from 'src/app/shared/auth/auth.service';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})

export class LoginPageComponent {

  loginFormSubmitted = false;
  isLoginFailed = false;

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  invaliduserpass: boolean = false;
  showPassword: boolean = false;
  myclass: boolean = false;
  invalidUserOrPassworErrorMsg: any;


  constructor(private router: Router, private authService: AuthService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute) {
  }

  get lf() {
    return this.loginForm.controls;
  }

  // On submit button click
  onSubmit() {
    this.loginFormSubmitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    this.spinner.show(undefined,
      {
        type: 'ball-triangle-path',
        size: 'medium',
        bdColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        fullScreen: true
      });

      const params = {
        username:this.loginForm.value.username, 
        password:this.loginForm.value.password
      }
    this.authService.login(params)
      .subscribe((res) => {
        console.log(res);
        this.invaliduserpass = false;
        this.spinner.hide();
        this.router.navigate(['/manual']);
      },(err) => {
        console.log(err, this.invaliduserpass);
        this.isLoginFailed = true;
        this.invaliduserpass = true;
        this.invalidUserOrPassworErrorMsg = err;
        this.spinner.hide();
        console.log('error: ' + err)
      })
  }

  resetInvalidMsg() {
		this.invaliduserpass=false;
	}

	showeye(){
		this.showPassword = !this.showPassword;
		this.myclass = !this.myclass;
	}

	onEnter(event) {
		if(event.keyCode == 13 ) {
			this.onSubmit();
		}
	}
}
