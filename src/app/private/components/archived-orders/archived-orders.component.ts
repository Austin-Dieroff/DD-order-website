import { Component, OnInit } from "@angular/core";
import { Observable, firstValueFrom, lastValueFrom } from "rxjs";
import { ActivatedRoute } from "@angular/router";

//Third party libraries
import moment from "moment";

//Services
//import { FirestoreService } from "../../../services/firestore.service";
import { DebugModeService } from "../../../services/debug-mode.service";
import { OrderService } from "src/app/services/order.service";
import { DocumentData } from "firebase/firestore";
import { Order } from "src/app/models/order.model";
import { QueryDocumentSnapshot } from "@angular/fire/compat/firestore";
import { faFilePen, faTrash, faFolderOpen, faHouse, faFile, faUsers, faGear } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: "app-archived-orders",
  templateUrl: "./archived-orders.component.html",
  styleUrls: ["./archived-orders.component.scss"],
})
export class ArchivedOrdersComponent implements OnInit {
  archivedOrders$: Observable<any[]>;
  approvedOrders$: Observable<any[]>;
  debugMode;
  today = new Date();
  lastDoc: string;
  firstDoc: string;
  firstDocs: string[] = [];

  pageSize: number = 200;
  pageIndex: number = 0;

  faFilePen = faFilePen;
  faTrash = faTrash;
  faFolderOpen = faFolderOpen;
  faHouse = faHouse;
  faFile = faFile;
  faUsers = faUsers;
  faGear = faGear;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private debugModeService: DebugModeService
  ) {}

  ngOnInit() {
    this.loadOrders();

    this.debugModeService.value().then((result) => {
      this.debugMode = result;
    });
  }

  async loadOrders(direction: "next" | "prev" | "reload" = "next") {
    let firstDoc: string;
    if (direction == "prev") {
      firstDoc = this.firstDocs[this.firstDocs.length - 2];
      this.firstDocs.pop();
    }


    this.archivedOrders$ = this.orderService.getOrders(
      "archivedOrders",
      this.pageSize,
      direction,
      direction == "next" ? this.lastDoc : firstDoc
    );

    this.archivedOrders$.subscribe((orders) => {
      this.lastDoc = orders[orders.length - 1].date;
      // this.firstDoc = orders[orders.length - this.pageSize].date;
      if(direction == "next") {
        this.firstDocs.push(orders[0].date);
      }
    });
  }

  pageSizeChange(event: any) {
    const newPageSize = event.target.value
    if(newPageSize != this.pageSize) {
      this.firstDocs.length = 1
    }
    this.pageSize = newPageSize
    this.loadOrders("reload")

  }

  loadNextPage() {
    if (this.lastDoc) {
      this.loadOrders("next");
    }
  }

  loadPreviousPage() {
    this.loadOrders("prev");
  }

  formatDate(dateString: string) {
    return (
      moment(dateString).format("M/D/YY h:mm:ss a") +
      ` (${moment(dateString).fromNow()})`
    );
  }

  sortOrders(sortMode: string) {
    // this["sortMode" + sortMode] === "asc"
    //   ? (this["sortMode" + sortMode] = "desc")
    //   : (this["sortMode" + sortMode] = "asc");
    // this.archivedOrders = this.firestore.colWithIds$("archivedOrders", ref =>
    //   ref.orderBy(sortMode, this["sortMode" + sortMode])
    // );
  }

  moveOrder(
    orderId: string,
    sourceCollection: string,
    destinationCollection: string
  ) {
    const result = confirm(
      `Are you certain you want to move order ${orderId}?`
    );

    if (result) {
      this.orderService
        .moveOrder(orderId, sourceCollection, destinationCollection)
        .then(() => {
          alert("Successfully Moved Order");
        })
        .catch(() => {
          alert("Failed to Move Order");
        });
    }
  }
}
