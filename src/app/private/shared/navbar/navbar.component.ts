import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

// Services
import { AuthService } from "../../../services/auth-service.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  logoutClick() {
    this.authService.logout();
    this.router.navigateByUrl("/login");
  }
}
