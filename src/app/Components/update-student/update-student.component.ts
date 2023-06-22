import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../Services/student.service';
import { FormControl, FormControlName, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Student } from '../../Models/Student';

@Component({
  selector: 'app-update-student',
  templateUrl: './update-student.component.html',
  styleUrls: ['./update-student.component.scss'],
})
export class UpdateStudentComponent implements OnInit {
  id: any;

  public profileStudentForm = new FormGroup({
    fullName: new FormControl(''),
    sex: new FormControl(''),
    age: new FormControl(''),
    birthday: new FormControl(''),
    majors: new FormControl(''), // Ngành học
    email: new FormControl(''),
    phone: new FormControl(''),
    introduce: new FormControl(''),//Giới thiệu bản thân
    createdDate : new FormControl(''),
    createdBy : new FormControl(''),
  });

  public selectedFile: File | null = null;
  public url = 'https://bootdey.com/img/Content/avatar/avatar1.png';

  constructor(
    private studentService: StudentService,
    private router: Router,
    private activeRouter: ActivatedRoute,
    private http: HttpClient
  ) {}
  public ngOnInit(): void {
    //throw new Error('Method not implemented.');
    this.activeRouter.params.subscribe(params => {
      this.id = params['id'];
      console.log(this.id)

    this.loadData(this.id);
    });
  }
  public onSubmit(): void {
    console.log('Chọn update Student');
    if (this.profileStudentForm.valid) {
      console.log(this.profileStudentForm.value);
    }

    const newStudent: any={};
    for (const controlName in this.profileStudentForm.controls) {
      if (this.profileStudentForm.controls.hasOwnProperty(controlName)) {
        const control =
          this.profileStudentForm.controls[
            controlName as keyof typeof this.profileStudentForm.controls
          ];
        newStudent[controlName] = control.value;
      }
    }
    const sv: Student= newStudent as Student;
    sv.id= this.id;
    console.log('newStudent'+ newStudent.fullName);
    if (this.selectedFile?.name!= null){
      sv.image = this.selectedFile?.name;
      console.log(typeof sv);
      console.log('New Image Student' + sv.image);
    }
    const formData = new FormData();
    formData.append('image', this.selectedFile!, this.selectedFile!.name);
    formData.append('student', JSON.stringify(sv));
    console.log(JSON.stringify(sv));
    this.studentService.updateStudent(formData).subscribe((res)=>{
      console.log('Update Sinh Viên thành công')
    })
  }

  private loadData(id: number) {
    this.studentService.getStudent(id).subscribe((data) => {
      console.log('getStudent', data);
      for (const controlName in this.profileStudentForm.controls) {
        if (controlName) {
          this.profileStudentForm.controls[
            controlName as keyof typeof this.profileStudentForm.controls
          ].setValue(data[controlName]);
        }
      }
      console.log(this.profileStudentForm.value)
    });
    this.studentService
      .getImageStudent()
      .then((imageUrl: string) => {
        this.url = imageUrl
      })
      .catch((error) => {
        console.error(error);
      });
  };

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
}
