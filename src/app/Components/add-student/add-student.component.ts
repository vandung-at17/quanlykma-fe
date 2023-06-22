import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  FormsModule,
  NgForm,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Student } from 'src/app/Models/Student';
import { StudentService } from 'src/app/Services/student.service';
@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss'],
})
export class AddStudentComponent implements OnInit {
  public id = 0;
  public profileStudentForm = new FormGroup({
    fullName: new FormControl(''),
    sex: new FormControl(''),
    age: new FormControl(''),
    birthday: new FormControl(''),
    majors: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
    introduce: new FormControl(''),
  });

  public selectedFile: File | null = null;
  public url = 'http://bootdey.com/img/Content/avatar/avatar1.png';

  constructor(
    private studentService: StudentService,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}
  public ngOnInit(): void {
    //throw new Error('Method not implemented.');
  }

  public onSubmit(): void {
    console.log('onSubmit');
    if (this.profileStudentForm.valid) {
      console.log(this.profileStudentForm.value);
    }
    // this.studentService.addNewStudent(this.profileStudentForm).subscribe((response )=>{
    //   console.log("Thêm sinh viên thành công")
    // })
    const newStudent: any = {};
    for (const controlName in this.profileStudentForm.controls) {
      if (this.profileStudentForm.controls.hasOwnProperty(controlName)) {
        const control =
          this.profileStudentForm.controls[
            controlName as keyof typeof this.profileStudentForm.controls
          ];
        newStudent[controlName] = control.value;
      }
    }

    console.log(this.profileStudentForm.controls.birthday.value);

    const hs: Student = newStudent as Student;
    if (this.selectedFile?.name != null) {
      hs.image = this.selectedFile!.name;
      console.log(typeof hs);
      console.log('Student' + hs.image);
    }
    if (this.selectedFile !== null) {
      const formData = new FormData();
      formData.append('image', this.selectedFile!, this.selectedFile!.name);
      formData.append('student', JSON.stringify(hs));
      console.log(JSON.stringify(hs));
      //debugger;
      this.studentService.addStudent(formData).subscribe((res) => {
        console.log('thêm sinh viên thành công');
      });
    }else{
      this.studentService.addNewStudent(hs).subscribe((res) =>{
        console.log('Thêm sinh viên mà không thêm ảnh');
      })
    }
  }

  public onSelectFile(e: any) {
    if (e.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        this.url = event.target.result;
      };
    }
    if (e.target.files.length > 0) {
      this.selectedFile = <File>e.target.files[0];
      // console.log(this.selectedFile.name);
    }
  }

  public calculateAge(): void {
    const currentYear = new Date().getFullYear();
    const birthYear = Number(this.profileStudentForm.controls.birthday);
  }
}
