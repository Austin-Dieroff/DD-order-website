export class OrderLine {
  partNumber: string;
  price: number;
  shipping: number;
  handling: number;
  qty: number;
  tax: number;
  notes: string;
  total: number;
  constructor(_line?: Partial<OrderLine>) {
    this.partNumber = _line?.partNumber?.replace("%2F", "/") ?? "";
    this.price = _line?.price ?? 0;
    this.shipping = _line?.shipping ?? 0;
    this.handling = _line?.handling ?? 0;
    this.qty = _line?.qty ?? 0;
    this.tax = _line?.tax ?? 0;
    this.notes = _line?.notes ?? "";
    this.total = _line?.price ?? 0;
  }
}
