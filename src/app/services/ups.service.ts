import { Injectable } from "@angular/core";

// Third Party Libraries
// const UPS = require("ups-shipping-api");
// import * as UPS from "ups-shipping-api";

// import * as upsAPI from "@genomeinc/shipping-ups";

// Environment
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class UPSService {
  ups;

  constructor() {
    // this.ups = new UPS(environment.ups);
  }

  getGroundRate(shipper, shipTo, packageDetail) {
    // this.getRates(shipper, shipTo, packageDetail).then((result) => {

    // });
  }

  private getRates(shipper, shipTo, packageDetail) {
    // const shipment = {shipper: shipper, shipTo: shipTo, package: packageDetail};
    // return this.ups.retreive_rates(shipment).then(result => {
    //   console.log("TCL: UPSService -> getRates -> result", result);
    //   return result;
    // });
  }
}
