import { Component, OnInit } from '@angular/core';
import { faFilePen, faTrash, faFolderOpen, faHouse, faFile, faUsers, faGear } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  faFilePen = faFilePen;
  faTrash = faTrash;
  faFolderOpen = faFolderOpen;
  faHouse = faHouse;
  faFile = faFile;
  faUsers = faUsers;
  faGear = faGear;

  constructor() { }

  ngOnInit() {
  }

}
