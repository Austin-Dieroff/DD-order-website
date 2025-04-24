import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";

// Services
import { AuthService } from "../../../services/auth-service.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  public email: string = "";
  public password: string = "";

  constructor(private authService: AuthService, private router: Router) {
    this.checkLoggedIn();
  }

  ngOnInit() {}

  loginClick() {
    console.log("login button click");
    console.log("TCL: LoginComponent -> email", this.email);
    console.log("TCL: LoginComponent -> password", this.password);

    this.authService
      .login(this.email, this.password)
      .then(value => {
        console.log("Successfully logged in");
        this.router.navigateByUrl("/home");
      })
      .catch(error => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode === "auth/wrong-password") {
          alert("Wrong password.");
        } else {
          alert(errorMessage);
        }
        console.log(error);
      });
  }

  async checkLoggedIn() {
    const user = await this.authService.isLoggedIn();
    if (user) {
      console.log("Is logged in!");
      this.router.navigateByUrl("/home");
    } else {
      console.log("Not logged in!");
    }
  }
}
