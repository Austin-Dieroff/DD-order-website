"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Line = exports.ShipToAddress = exports.BillToAddress = exports.ShipToContact = exports.BillToContact = exports.CustomerDetails = exports.OrderDetails = exports.OrderModel = void 0;
class OrderModel {
    constructor(orderId, salesChannel, lines = []) {
        this.orderId = orderId;
        this.salesChannel = salesChannel;
        // this.orderDetails = new OrderDetails();
        this.lines = lines;
    }
}
exports.OrderModel = OrderModel;
class OrderDetails {
}
exports.OrderDetails = OrderDetails;
class CustomerDetails {
}
exports.CustomerDetails = CustomerDetails;
class BillToContact {
}
exports.BillToContact = BillToContact;
class ShipToContact {
}
exports.ShipToContact = ShipToContact;
class BillToAddress {
}
exports.BillToAddress = BillToAddress;
class ShipToAddress {
}
exports.ShipToAddress = ShipToAddress;
class Line {
}
exports.Line = Line;
//# sourceMappingURL=orderModel.js.map