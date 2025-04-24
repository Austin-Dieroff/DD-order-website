import { Component, OnInit } from '@angular/core';
import packageInfo from "../../../../../package.json";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  public version: string;

  constructor() { }

  ngOnInit() {
    this.version = packageInfo.version;
    // console.log("TCL: SidebarComponent -> ngOnInit -> version", version);
  }

}
