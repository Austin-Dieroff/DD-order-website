import { Address } from "./address.model";
import { Contact } from "./contact.model";
import { CustomerDetails } from "./customer-details.model";
import { OrderDetails } from "./order-details.model";
import { OrderLine } from "./order-line.model";

export class Order {
  orderId: string;
  salesChannel: string;
  customerId: string;
  date: string;
  dateRequired: string;
  datePromised: string;
  shipDate: string;
  notes: string;
  paymentReceived: boolean;
  orderDetails: OrderDetails;
  customerDetails: CustomerDetails;
  billToContact: Contact;
  shipToContact: Contact;
  billToAddress: Address;
  shipToAddress: Address;
  lines: OrderLine[];

  constructor(_order?: Partial<Order>) {
    this.orderId = _order?.orderId ?? "";
    this.salesChannel = _order?.salesChannel ?? "";
    this.customerId = _order?.customerId ?? "";
    this.date = _order?.date ?? "";
    this.dateRequired = _order?.dateRequired ?? "";
    this.datePromised = _order?.datePromised ?? "";
    this.shipDate = _order?.shipDate ?? "";
    this.notes = _order?.notes ?? "";
    this.paymentReceived = _order?.paymentReceived ?? false;
    this.orderDetails = new OrderDetails(_order?.orderDetails);
    this.customerDetails = new CustomerDetails(_order?.customerDetails);
    this.billToContact = new Contact(_order?.billToContact);
    this.shipToContact = new Contact(_order?.shipToContact);
    this.billToAddress = new Address(_order?.billToAddress);
    this.shipToAddress = new Address(_order?.shipToAddress);
    this.lines = _order?.lines?.map((line) => new OrderLine(line)) ?? [];
  }
}
