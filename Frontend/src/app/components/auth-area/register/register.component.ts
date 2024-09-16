import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/models/user-model';
import store from 'src/app/redux/store';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    public registerSteps = false;
    public userRegister = new UserModel();
    public passwordPermission: boolean;
    public emailPermission: boolean;
    public idPermission: boolean;
    public passwordConfirm: string;
    public cities: any;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.cities = store.getState().authState.cities;
  }

  public async registerStepOne() {
    try {
        const allUsersDetails = await this.authService.getAllUsersDetails();
        const emailIsExist = allUsersDetails.find(d => d.email == this.userRegister.email);
        const IdIsExist = allUsersDetails.find(d => d.id == this.userRegister.id);
        if(!emailIsExist) {
            this.emailPermission = true;
            if(!IdIsExist) {
                this.idPermission = true;
                if(this.userRegister.password == this.passwordConfirm) {
                    this.registerSteps = true;
                    this.passwordConfirm = null;
                    this.passwordPermission = true;
                }
                else {
                    this.passwordPermission = false;
                }
            }
            else {
                this.idPermission = false;
            }
        }
        else {
            this.emailPermission = false;
        }
    }
    catch (err: any) {
        alert(err.message);
    }
}

public async registerStepTwo() {
    try {
        await this.authService.register(this.userRegister);
        this.router.navigateByUrl("auth");
        alert("Successful to register.");
    }
    catch (err: any) {
        alert(err.message);
    }
}

public backToLoginPage() {
    this.router.navigateByUrl("auth");
}

}
