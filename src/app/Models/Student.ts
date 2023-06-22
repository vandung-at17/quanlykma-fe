export class Student {
  id: number;
  fullName: string;
  sex: boolean;
  age: number;
  birthday: string;
  majors: string;
  email: string;
  phone: string;
  status: boolean;
  introduce: string;// Phần giới thiệu
  createdDate: string;
  modifiedDate: string;
  image ?: string;
  constructor(
    id: number,
    fullName: string,
    sex: boolean,
    age: number,
    birthday: string,
    majors: string,
    email: string,
    phone: string,
    status: boolean,
    introduce: string,
    createdDate: string,
    modifiedDate: string,
    image: string
  ) {
    this.id = id;
    this.fullName = fullName;
    this.sex = sex;
    this.age = age;
    this.birthday = birthday;
    this.majors = majors;
    this.email = email;
    this.phone = phone;
    this.status = status;
    this.introduce= introduce;
    this.createdDate= createdDate;
    this.modifiedDate= modifiedDate;
    this.image = image;
  }
}
