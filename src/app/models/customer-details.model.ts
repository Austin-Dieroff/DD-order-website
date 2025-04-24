export class CustomerDetails {
  termsCode: string;
  regionCode: string;
  fobCode: string;
  shipViaCode: string;
  currencyCode: string;
  currencyRate: number;
  vatBranchID: string;
  userDefined1: string;
  discount: number;

  constructor(_details?: Partial<CustomerDetails>) {
    this.termsCode = _details?.termsCode ?? "";
    this.regionCode = _details?.regionCode ?? "";
    this.fobCode = _details?.fobCode ?? "";
    this.shipViaCode = _details?.shipViaCode ?? "";
    this.currencyCode = _details?.currencyCode ?? "";
    this.currencyRate = _details?.currencyRate ?? 0;
    this.vatBranchID = _details?.vatBranchID ?? "";
    this.userDefined1 = _details?.userDefined1 ?? "";
    this.discount = _details?.discount ?? 0;
  }
}
