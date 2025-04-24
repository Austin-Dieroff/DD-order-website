export class OrderDetails {
  departmentCode: string;
  salesperson: string;
  jobNumber: string;
  orderedBy: string;
  customerPO: string;
  attention: string;
  blanketOrderNumber: string;
  quoteNumber: string;
  orderType: string;
  orderTotal: number;

  constructor(_details?: Partial<OrderDetails>) {
    this.departmentCode = _details?.departmentCode ?? "";
    this.salesperson = _details?.salesperson ?? "";
    this.jobNumber = _details?.jobNumber ?? "";
    this.orderedBy = _details?.orderedBy ?? "";
    this.customerPO = _details?.customerPO ?? "";
    this.attention = _details?.attention ?? "";
    this.blanketOrderNumber = _details?.blanketOrderNumber ?? "";
    this.quoteNumber = _details?.quoteNumber ?? "";
    this.orderType = _details?.orderType ?? "";
    this.orderTotal = _details?.orderTotal ?? 0;
  }
}
