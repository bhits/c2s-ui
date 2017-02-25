export class ProviderRequestQuery {
  state: string;
  city: string;
  zipcode: string;
  firstname: string;
  lastname: string;
  gendercode: string;
  orgname: string;
  phone: string;
  page: string;

  constructor(state: string,
              city: string,
              zipcode: string,
              firstname: string,
              lastname: string,
              gendercode: string,
              orgname: string,
              phone: string,
              page: string) {
    this.state = state;
    this.city = city;
    this.zipcode = zipcode;
    this.firstname = firstname;
    this.lastname = lastname;
    this.gendercode = gendercode;
    this.orgname = orgname;
    this.phone = phone;
    this.page = page;
  }
}
