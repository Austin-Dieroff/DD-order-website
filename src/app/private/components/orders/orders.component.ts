import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { ActivatedRoute } from "@angular/router";

//Third party libraries
import moment from "moment";
import { map } from "rxjs/operators";
//import { Message } from "@angular/compiler/src/i18n/i18n_ast";
import { DocumentSnapshot } from "@angular/fire/firestore";
import { faFilePen, faTrash, faFolderOpen, faHouse, faFile } from '@fortawesome/free-solid-svg-icons';


//Services
//import { FirestoreService } from "../../../services/firestore.service";
import { DebugModeService } from "../../../services/debug-mode.service";
import { OrderService } from "src/app/services/order.service";

@Component({
  selector: "app-orders",
  templateUrl: "./orders.component.html",
  styleUrls: ["./orders.component.scss"]
})
export class OrdersComponent implements OnInit {
  unapprovedOrders$: Observable<any[]>;
  approvedOrders$: Observable<any[]>;
  debugMode;
  today = new Date();
  faFilePen = faFilePen;
  faTrash = faTrash;
  faFolderOpen = faFolderOpen;
  faHouse = faHouse;
  faFile = faFile;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private debugModeService: DebugModeService
  ) {}

  ngOnInit() {
    this.unapprovedOrders$ = this.orderService.getOrders();

    this.approvedOrders$ = this.orderService.getOrders("approvedOrders");

    this.debugModeService.value().then(result => {
      this.debugMode =  result;
    });
  }

  formatDate(dateString: string) {
    return (
      moment(dateString).format("M/D/YY h:mm:ss a") +
      ` (${moment(dateString).fromNow()})`
    );
  }

  deleteOrder(orderId: string, collection: string) {
    const result = confirm(
      `Are you certain you want to delete order ${orderId}?`
    );

    if (result) {
      this.orderService.deleteOrder(orderId, collection).then(()=>{alert("Successfully Deleted Order")}).catch(()=>{alert("Failed to Delete Order")});
    }
  }

  moveOrder(
    orderId: string,
    sourceCollection: string,
    destinationCollection: string
  ) {
    const result = confirm(
      `Are you certain you want to move order to the archive: ${orderId}?`
    );

    if (result) {
      this.orderService.moveOrder(orderId, sourceCollection, destinationCollection).then(()=>{alert("Successfully Moved Order")}).catch(()=>{alert("Failed to Move Order")});
    }
  }

  sortOrders(sortMode: string) {




    // this["sortMode" + sortMode] === "asc"
    //   ? (this["sortMode" + sortMode] = "desc")
    //   : (this["sortMode" + sortMode] = "asc");

    // this.unapprovedOrders = this.firestore.colWithIds$(
    //   "unapprovedOrders",
    //   ref => ref.orderBy(sortMode, this["sortMode" + sortMode])
    // );




    // if (sortMode === "ordernumber") {
    //   this.sortModeOrderNumber === "asc"
    //     ? (this.sortModeOrderNumber = "desc")
    //     : (this.sortModeOrderNumber = "asc");

    //   this.unapprovedOrders = this.firestore.colWithIds$(
    //     "unapprovedOrders",
    //     ref => ref.orderBy("orderId", this.sortModeOrderNumber)
    //   );
    // }
  }
}
