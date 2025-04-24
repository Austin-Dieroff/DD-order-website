export class OrderModel {
  orderId: string;
  salesChannel: string;
  customerId?: string;
  date?: Date;
  notes?: string;
  paymentReceived?: boolean;

  orderDetails?: OrderDetails;
  customerDetails?: CustomerDetails;
  billToContact?: BillToContact;
  shipToContact?: ShipToContact;
  billToAddress?: BillToAddress;
  shipToAddress?: ShipToAddress;
  lines: Line[];

  constructor(orderId: string, salesChannel: string, lines: Line[] = []) {
      this.orderId = orderId;
      this.salesChannel = salesChannel;
      // this.orderDetails = new OrderDetails();

      this.lines = lines;
  }
}

export class OrderDetails{
  departmentCode?: string;
  salesperson?: string;
  jobNumber?: string;
  orderedBy?: string;
  customerPO?: string;
  attention?: string;
  blanketOrderNumber?: string;
  quoteNumber?: string;
  orderType?: string;
  orderTotal?: string;
}

export class CustomerDetails{
  termsCode?: string;
  regionCode?: string;
  fobCode?: string;
  shipViaCode?: string;
  currencyCode?: string;
  currencyRate?: string;
  vatBranchID?: string;
}

export class BillToContact{
  contactId?: string;
  name?: string;
  phone1?: string;
  phone2?: string;
  fax1?: string;
  fax2?: string;
  email?: string;
}

export class ShipToContact{
  contactId?: string;
  name?: string;
  phone1?: string;
  phone2?: string;
  fax1?: string;
  fax2?: string;
  email?: string;
}

export class BillToAddress{
  addressId?: string;
  addressLine1?: string;
  addressLine2?: string;
  addressLine3?: string;
  addressLine4?: string;
  city?: string;
  state?: string;
  country?: string;
  zipCode?: string;
  postal?: string;
  taxCode?: string;
}

export class ShipToAddress{
  addressId?: string;
  addressLine1?: string;
  addressLine2?: string;
  addressLine3?: string;
  addressLine4?: string;
  city?: string;
  state?: string;
  country?: string;
  zipCode?: string;
  postal?: string;
  taxCode?: string;
}

export class Line{
  partXReference?: string;
  partNumber?: string;
  qty?: number;
  price?: number;
  handling?: number;
  tax?: number;
  taxable?: boolean;
  uom?: string;
  customerLine?: string;
  productClassCode?: string;
  notes?: string;
}