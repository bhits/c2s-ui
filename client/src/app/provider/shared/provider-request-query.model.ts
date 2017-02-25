export class ProviderRequestQuery {
  state: string;
  city: string;
  zipcode: string;
  gender: string;
  phone: string;
  lastname: string;
  firstname: string;
  orgname: string;
  page: string;

  constructor(state: string,
              city: string,
              zipcode: string,
              gender: string,
              phone: string,
              lastname: string,
              firstname: string,
              orgname: string,
              page: string) {
    this.state = state;
    this.city = city;
    this.zipcode = zipcode;
    this.gender = gender;
    this.phone = phone;
    this.lastname = lastname;
    this.firstname = firstname;
    this.orgname = orgname;
    this.page = page;
  }
}
