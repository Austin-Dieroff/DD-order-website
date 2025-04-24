import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { faFilePen, faTrash, faFolderOpen, faHouse, faFile, faUsers, faGear } from '@fortawesome/free-solid-svg-icons';

// Third Party Libraries
import { Observable } from "rxjs";

// Environment Variables
import { environment } from "../../../../environments/environment";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"]
})
export class UsersComponent implements OnInit {
  // users: Observable<any[]>;
  users: any[];

  faFilePen = faFilePen;
  faTrash = faTrash;
  faFolderOpen = faFolderOpen;
  faHouse = faHouse;
  faFile = faFile;
  faUsers = faUsers;
  faGear = faGear;


  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.users = null; //Insert code to get users from service

    this.http
      .get<any[]>(
        "https://listusers-za4vktb7va-uc.a.run.app"
      )
      .subscribe(result => {
        console.log("TCL: UsersComponent -> ngOnInit -> result", result);
        this.users = result;
        console.log(
          "TCL: UsersComponent -> ngOnInit -> this.users",
          this.users
        );
      });
  }

  addUser() {
    
  }

  deleteUser(index) {
    console.log("TCL: UsersComponent -> deleteUser -> index", index);
    const user = this.users[index];

    const result = confirm(
      `Are you sure you want to delete user ${user.email}`
    );

    if(result) {

    }
  }
}
