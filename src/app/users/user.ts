export class User {

  constructor(
    public id: number,
    public email: string,
    public password: string,
    public confirmPassword: string,
    public firstName: string,
    public lastName: string,
    public birthDate: Date,
    public telNumber: string,
    public cin: string,
    public city: string,
    public avatar: string,
     public userLevel: string,
     public userSection: string,
     public userClass: string,
     public userCountry: string,
     public userUniversity: string,
     public userRole: string
  ) { }
}
