import bcrypt from "bcryptjs";
const admins = [
  {
    firstName: "Erlich",
    lastName: "Bachman",
    address: "Apt 2506, Patrick Street, Montreal, QC, Canada, H3H2E9",
    dateOfBirth: "2000-03-01",
    phone: 5147726254,
    email: "admin@cdcapp.com",
    password: bcrypt.hashSync("123456", 10),
    registrationNum : "A123456789"
  }]

export default admins;
