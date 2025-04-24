export class Address {
  addressId: string;
  addressLine1: string;
  addressLine2: string;
  addressLine3: string;
  addressLine4: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  postal: string;
  taxCode: string;

  constructor(_address?: Partial<Address>) {
    this.addressId = _address?.addressId ?? "";
    this.addressLine1 = _address?.addressLine1 ?? "";
    this.addressLine2 = _address?.addressLine2 ?? "";
    this.addressLine3 = _address?.addressLine3 ?? "";
    this.addressLine4 = _address?.addressLine4 ?? "";
    this.city = _address?.city ?? "";
    this.state = _address?.state ?? "";
    this.country = _address?.country ?? "";
    this.zipCode = _address?.zipCode ?? "";
    this.postal = _address?.postal ?? "";
    this.taxCode = _address?.taxCode ?? "";
  }
}
