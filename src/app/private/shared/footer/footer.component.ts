import { Component, OnInit } from "@angular/core";
import packageInfo from "../../../../../package.json";

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.scss"],
})
export class FooterComponent implements OnInit {
  public version: string;
  constructor() {}

  ngOnInit() {
    // console.log("version", version);
    this.version = packageInfo.version;
  }
}
