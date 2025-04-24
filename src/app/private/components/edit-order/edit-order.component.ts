import { Component, OnInit, Inject } from "@angular/core";
import { Observable, firstValueFrom } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  FormArray,
  UntypedFormControl,
  Validators,
  FormGroup,
} from "@angular/forms";
import { map, filter, catchError, mergeMap } from "rxjs/operators";

//Third party libraries
import moment from "moment";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import * as states from "us-state-codes";
import { faFilePen, faTrash, faFolderOpen, faHouse, faFile, faUsers, faGear } from '@fortawesome/free-solid-svg-icons';

// Components
import { SelectItemComponent } from "./select-item/select-item.component";
import { EditNoteComponent } from "./edit-note/edit-note.component";

// Data Models
//import { Item } from "../../../models/item.model";
import { Order } from "src/app/models/order.model";

//Services
// import { FirestoreService } from "../../../services/firestore.service";
import { UPSService } from "../../../services/ups.service";

// Assets
import productDimensions from "../../../../assets/product-dimensions.json";
import stateRegionCodes from "../../../../assets/state-region-codes.json";
import { OrderService } from "src/app/services/order.service";

import { HelperService } from "src/app/services/helper.service";
import { OrderLine } from "src/app/models/order-line.model";

@Component({
  selector: "app-edit-order",
  templateUrl: "./edit-order.component.html",
  styleUrls: ["./edit-order.component.scss"],
})
export class EditOrderComponent implements OnInit {
  loading = false;
  orderForm: FormGroup = this.helperService.createFormGroup(new Order()); //Form Values
  orderId: string;
  status = "unapproved";
  collection: string;
  disabled: boolean;

  //Dropdown lists & lookup lists
  currencyCodes: any[];
  departmentCodes: any[];
  fOBCodes: any[];
  regionCodes: any[];
  shipViaCodes: any[];
  termsCodes: any[];
  parts$: Observable<any[]>;
  parts: any[];
  salespeople = ["AUTO", "Credit Card", "Amazon Pay", "PayPal"];

  orderDate; //Set aside variable to display order date in correct format

  faFilePen = faFilePen;
  faTrash = faTrash;
  faFolderOpen = faFolderOpen;
  faHouse = faHouse;
  faFile = faFile;
  faUsers = faUsers;
  faGear = faGear;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService,
    public dialog: MatDialog,
    private ups: UPSService,
    private helperService: HelperService
  ) {
    this.route.queryParams.subscribe((params) => {
      this.orderId = params.id;
      this.collection = params.collection;

      //Disabled check
      if (
        this.collection === "approvedOrders" ||
        this.collection === "archivedOrders"
      )
        this.disabled = true;
    });
  }

  async ngOnInit() {
    this.loading = true;
    this.setupDropdownsAndLookups();

    const order = new Order(
      await firstValueFrom(
        this.orderService.getOrder(this.orderId, this.collection)
      )
    );
    console.log("🚀 ~ EditOrderComponent ~ ngOnInit ~ order:", order);

    this.orderForm = this.helperService.createFormGroup(order);

    console.log("🚀 ~ EditOrderComponent ~ ngOnInit ~ this.order:", this.order);

    this.fixStates();
    this.setupFormDefaults();

    this.orderDate = this.formatDateSlashes(this.orderForm.controls.date.value);
    if (this.orderLines.length > 0) {
      this.orderLines.at(0).get("total").setValue(this.calculateItemOneTotal());
    }

    this.loading = false;
  }

  get order() {
    return this.orderForm.getRawValue();
  }

  get orderLines(): FormArray {
    return this.orderForm.get("lines") as FormArray;
  }

  async setupDropdownsAndLookups() {
    this.currencyCodes = await this.orderService.getDropdownOptions(
      "currencyCodes",
      "Code"
    );
    this.departmentCodes = await this.orderService.getDropdownOptions(
      "departmentCodes",
      "Code"
    );
    this.fOBCodes = await this.orderService.getDropdownOptions(
      "fOBCodes",
      "Code"
    );
    this.regionCodes = await this.orderService.getDropdownOptions(
      "regionCodes",
      "Code"
    );
    this.shipViaCodes = await this.orderService.getDropdownOptions(
      "shipViaCodes",
      "Code"
    );
    this.termsCodes = (
      await this.orderService.getDropdownOptions("termsCodes", "Code")
    ).map((termCode: any) => {
      // termCode.id = termCode.id.replace("%2F", "/");
      termCode.Code = termCode.Code.replace("%2F", "/");
      termCode.Description = termCode.Description.replace("%2F", "/");
      return termCode;
    });

    this.parts = await this.orderService.getParts();
  }

  formatDate(date) {
    if (date === undefined) return "";
    let newDate: Date = new Date(date);

    return (
      newDate.getFullYear() +
      "-" +
      ("0" + (newDate.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + newDate.getDate()).slice(-2)
    );
  }

  formatDateSlashes(date) {
    let newDate: Date = new Date(date);
    return (
      ("0" + (newDate.getMonth() + 1)).slice(-2) +
      "/" +
      ("0" + newDate.getDate()).slice(-2) +
      "/" +
      newDate.getFullYear()
    );
  }

  setOrderLines(lines: any[]) {
    let newLines = this.formBuilder.array([]);
    if (lines !== undefined) {
      lines.map((line, index) => {
        // console.log("TCL: EditOrderComponent -> setOrderLines -> index", index);
        // console.log("TCL: EditOrderComponent -> setOrderLines -> line", line);
        // let total = index == 0 ? this.calculateItemOneTotal() : line.price;
        // console.log("TCL: EditOrderComponent -> setOrderLines -> total", total);

        newLines.push(
          this.formBuilder.group({
            partNumber: [
              line.partNumber ? line.partNumber.replace("%2F", "/") : "",
            ],
            price: [line.price],
            shipping: [line.shipping ? line.shipping : "0"],
            handling: [line.handling ? line.handling : "0"],
            qty: [line.qty, Validators.required],
            tax: [line.tax ? line.tax : "0"],
            notes: [line.notes],
            total: [{ value: line.price, disabled: true }],
          })
        );
      });
    }
    return newLines;
  }

  getShippingRate(order: any) {
    // console.log("TCL: EditOrderComponent -> getShippingRate -> order", order)
    if (order.lines) {
      // console.log("TCL: EditOrderComponent -> getShippingRate -> order.lines", order.lines);
      let description = this.getItemDescription(order.lines[0].partNumber);
      // console.log("TCL: EditOrderComponent -> getShippingRate -> description", description);

      // console.log("TCL: EditOrderComponent -> getShippingRate -> productDimensions", productDimensions)
    }
  }

  setupFormDefaults() {
    let today: Date = new Date();

    // Set dateRequired
    if (this.orderForm.get("dateRequired").value === "") {
      this.orderForm
        .get("dateRequired")
        .setValue(
          today.getFullYear() +
            "-" +
            ("0" + (today.getMonth() + 1)).slice(-2) +
            "-" +
            ("0" + today.getDate()).slice(-2)
        );
    }

    // Set datePromised
    if (this.orderForm.controls.datePromised.value === "") {
      this.orderForm.controls.datePromised.setValue(
        today.toISOString().slice(0, 10)
      );
    }

    // Set shipDate
    if (this.orderForm.controls.shipDate.value === "") {
      this.orderForm.controls.shipDate.setValue(
        today.toISOString().slice(0, 10)
      );
    }

    // Set salesperson
    this.orderForm.controls.orderDetails.get("salesperson").setValue("AUTO");

    // Set departmentCode
    if (!this.orderForm.controls.orderDetails.get("departmentCode").value) {
      this.orderForm.controls.orderDetails
        .get("departmentCode")
        .setValue("085");
    }

    // Set currencyCode
    if (!this.orderForm.controls.customerDetails.get("currencyCode").value) {
      this.orderForm.controls.customerDetails
        .get("currencyCode")
        .setValue("US");
    }

    // Set currencyRate
    if (!this.orderForm.controls.customerDetails.get("currencyRate").value) {
      this.orderForm.controls.customerDetails.get("currencyRate").setValue("1");
    }

    // Set shipViaCode
    if (!this.orderForm.controls.customerDetails.get("shipViaCode").value) {
      // this.orderForm.controls.customerDetails.controls.shipViaCode.setValue(
      //   " GR.UPSPPA"
      // );
    }
    // if (
    //   this.orderForm.controls.customerDetails.controls.shipViaCode.value ==
    //   "GR.UPSPPA"
    // ) {
    //   this.orderForm.controls.customerDetails.controls.shipViaCode.setValue(
    //     " GR.UPSPPA"
    //   );
    // }

    // Set fobCode
    if (!this.orderForm.controls.customerDetails.get("fobCode").value) {
      this.orderForm.controls.customerDetails
        .get("fobCode")
        .setValue("SupDock");
    }

    // Set termsCode
    // if (!this.orderForm.controls.customerDetails.controls.termsCode.value) {
    //   this.orderForm.controls.customerDetails.controls.termsCode.setValue(
    //     "Visa%2FMastr"
    //   );
    // }

    // Set jobNumber
    // if (this.orderForm.controls.salesChannel.value === "amazon") {
    //   this.orderForm.controls.orderDetails.controls.jobNumber.setValue("200");
    // } else if (this.orderForm.controls.salesChannel.value === "ebay") {
    //   this.orderForm.controls.orderDetails.controls.jobNumber.setValue("230");
    // }

    // Set regionCode
    this.orderForm.controls.customerDetails
      .get("regionCode")
      .setValue(this.getRegionCode().regionCode);

    // Set User Defined 1
    if (this.orderForm.controls.salesChannel.value === "amazon") {
      this.orderForm.controls.customerDetails
        .get("userDefined1")
        .setValue("ind");
    } else if (this.orderForm.controls.salesChannel.value === "ebay") {
      this.orderForm.controls.customerDetails
        .get("userDefined1")
        .setValue("ind");
    }
  }

  getRegionCode() {
    return stateRegionCodes.find(
      (stateRegionCode) =>
        stateRegionCode.state ==
        this.orderForm.controls.shipToAddress.get("state").value
    );
  }

  fixStates() {
    // Fix non-abbreviated states
    if (this.orderForm.get("billToAddress").get("state").value.length > 2) {
      this.orderForm
        .get("billToAddress")
        .get("state")
        .setValue(
          states.getStateCodeByStateName(
            this.orderForm.get("billToAddress").get("state").value
          )
        );
    }

    if (this.orderForm.get("shipToAddress").get("state").value.length > 2) {
      this.orderForm
        .get("shipToAddress")
        .get("state")
        .setValue(
          states.getStateCodeByStateName(
            this.orderForm.get("shipToAddress").get("state").value.toLowerCase()
          )
        );
    }
  }

  calculateItemOneTotal() {
    let itemTotalMinusFirst = 0;
    this.order.lines.forEach((item, index) => {
      if (index > 0) {
        itemTotalMinusFirst += Number(item.total);
      }
    });
    let total =
      (Number(this.order.orderDetails.orderTotal) -
        itemTotalMinusFirst -
        Number(this.order.lines[0].shipping) -
        Number(this.order.lines[0].handling) -
        Number(this.order.lines[0].tax)) /
      this.order.lines[0].qty;
    total = Math.round((total + 0.00001) * 100) / 100; // Correct floating point number .999 issue
    console.log(
      "🚀 ~ EditOrderComponent ~ calculateItemOneTotal ~ total:",
      total
    );
    return total;
  }

  setItemTotals() {
    for (let i = this.order.lines.length - 1; i >= 0; i--) {
      // Calculate and Set second to n line totals
      if (i != 0) {
        let total =
          Number(this.order.lines[i].qty) * Number(this.order.lines[i].price);

        this.orderLines[i].controls.total.setValue(total);
      } else {
        (this.orderLines.at(0) as FormGroup).controls.total.setValue(
          this.calculateItemOneTotal()
        );
      }
    }
  }

  blankIfUndefined(valueToTest: string, key: string = undefined) {
    if (valueToTest === undefined) return "";
    if (key != undefined) {
      if (valueToTest[key] === undefined) return "";
      return valueToTest[key];
    }
    return valueToTest;
  }

  getItemDescription(partNumber: string) {
    if (partNumber !== "" && this.parts) {
      const part = this.parts.filter(
        (part) => part.PartNumber === partNumber
      )[0];

      if (part !== undefined) return part.Description;
    }

    return "[not found]";
  }

  addLine() {
    this.orderLines.push(this.helperService.createFormGroup(new OrderLine()));
  }

  removeLine(index) {
    confirm("Are you sure you want to delete this line?")
      ? this.orderLines.removeAt(index)
      : null;
  }

  openNotes(index) {
    this.orderLines;

    console.log(
      "🚀 ~ EditOrderComponent ~ openNotes ~ orderLines:",
      (this.orderLines.controls[index] as FormGroup).controls["notes"].value
    );

    if (!this.disabled) {
      const dialogRef = this.dialog.open(EditNoteComponent, {
        width: "400px",
        data: {
          note: (this.orderLines.controls[index] as FormGroup).controls["notes"]
            .value,
        },
      });
      dialogRef.afterClosed().subscribe((result) => {
        if (result !== undefined) {
          note: (this.orderLines.at(index) as FormGroup)
            .get("notes")
            .setValue(result);
        }
      });
    }
  }

  openSelectItem(index, partNumber: string): void {
    const dialogRef = this.dialog.open(SelectItemComponent, {
      width: "80%",
      data: { parts: this.parts, filter: partNumber },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined)
        (this.orderLines.controls[index] as FormGroup).controls[
          "partNumber"
        ].setValue(result);
    });
  }

  // calculateLineTotal(index) {
  //   let total =
  //     Number(
  //       this.orderForm.controls.lines.controls[index].controls.shipping.value
  //     ) +
  //     Number(
  //       this.orderForm.controls.lines.controls[index].controls.handling.value
  //     ) +
  //     Number(this.orderForm.controls.lines.controls[index].controls.qty.value) *
  //       Number(
  //         this.orderForm.controls.lines.controls[index].controls.price.value
  //       );

  //   this.orderForm.controls.lines.controls[index].controls.total.setValue(
  //     total
  //   );

  //   return total;
  // }

  trackByFn(index: any, item: any) {
    return index;
  }

  async save() {
    this.orderForm.controls.date.setValue(
      moment(this.orderForm.controls.date.value).toISOString()
    );
    await this.orderService.updateOrder(this.order, this.collection);

    this.router.navigate(["/", "orders"]);
  }

  async saveAndApprove() {
    this.orderForm.controls.date.setValue(
      moment(this.orderForm.controls.date.value).toISOString()
    );
    await this.orderService.createOrder(this.order, "approvedOrders").then(async () => {
        await this.orderService.deleteOrder(this.orderId, "unapprovedOrders");
      });

    this.router.navigate(["/", "orders"]);
  }

  close() {
    this.router.navigate(["/", "orders"]);
  }

  test() {
    //   console.log(
    //     "TCL: EditOrderComponent -> test -> this.orderForm.controls.lines",
    //     this.orderForm.controls.lines
    //   );
    //   Object.keys(this.orderForm.controls.lines.controls[0].controls).forEach(
    //     field => {
    //       // {1}
    //       const control = this.orderForm.get(field); // {2}
    //       control.markAsTouched({ onlySelf: true }); // {3}
    //     }
    //   );
    //   // this.orderForm.invalid
    //   console.log(
    //     "TCL: EditOrderComponent -> test -> this.orderForm.invalid",
    //     this.orderForm.invalid
    //   );
  }
}
