import { Component, OnInit } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { firstValueFrom } from "rxjs/internal/firstValueFrom";
import { faFilePen, faTrash, faFolderOpen, faHouse, faFile, faGauge } from '@fortawesome/free-solid-svg-icons';
//import { FirestoreService } from "../../../services/firestore.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  orderMetrics: any;
  faHouse = faHouse;
  faFile = faFile;
  faGauge = faGauge;

  constructor(private firestore: AngularFirestore) {}
  //   this.firestore
  //   .doc$("var/orderMetrics")
  //   .subscribe((orderMetrics: any) => {
  //   console.log("TCL: DashboardComponent -> ngOnInit -> orderMetrics", orderMetrics)
  //     this.orderMetrics = orderMetrics;
  // });

  async ngOnInit() {
    this.orderMetrics = ( await firstValueFrom(this.firestore.collection("var").doc("orderMetrics").get()) ).data()
  }
}
