export class Contact {
  contactId: string;
  name: string;
  phone1: string;
  phone2: string;
  fax1: string;
  fax2: string;
  email: string;

  constructor(_contact?: Partial<Contact>) {
    this.contactId = _contact?.contactId ?? "";
    this.name = _contact?.name ?? "";
    this.phone1 = _contact?.phone1 ?? "";
    this.phone2 = _contact?.phone2 ?? "";
    this.fax1 = _contact?.fax1 ?? "";
    this.fax2 = _contact?.fax2 ?? "";
    this.email = _contact?.email ?? "";
  }
}
