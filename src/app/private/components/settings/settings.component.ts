import { Component, OnInit } from "@angular/core";

//Services
//import { FirestoreService } from "../../../services/firestore.service";
import { DebugModeService } from "../../../services/debug-mode.service";
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { faFilePen, faTrash, faFolderOpen, faHouse, faFile, faUsers, faGear } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: "app-settings",
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.scss"]
})
export class SettingsComponent implements OnInit {
  public settingsForm: UntypedFormGroup;

  faFilePen = faFilePen;
  faTrash = faTrash;
  faFolderOpen = faFolderOpen;
  faHouse = faHouse;
  faFile = faFile;
  faUsers = faUsers;
  faGear = faGear;


  constructor(
    private debugModeService: DebugModeService,
    private formBuilder: UntypedFormBuilder
  ) {
    this.debugModeService.value().then(result => {
      this.settingsForm = this.formBuilder.group({
        'debugMode': result
      });
    });
  }

  ngOnInit() {
    this.settingsForm = this.formBuilder.group({
      'debugMode': true
    });
  }

  debugModeChange(event) {
    this.debugModeService.set(event.target.value === "true");
  }
}
