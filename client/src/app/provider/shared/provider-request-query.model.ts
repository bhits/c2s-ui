export class ProviderRequestQuery {
  state: string;
  city: string;
  zipCode: string;
  firstName: string;
  lastName: string;
  genderCode: string;
  orgName: string;
  phone: string;

  constructor(state: string,
              city: string,
              zipCode: string,
              firstName: string,
              lastName: string,
              genderCode: string,
              orgName: string,
              phone: string) {
    this.state = state;
    this.city = city;
    this.zipCode = zipCode;
    this.firstName = firstName;
    this.lastName = lastName;
    this.genderCode = genderCode;
    this.orgName = orgName;
    this.phone = phone;
  }
}
