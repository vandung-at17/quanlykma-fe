import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/Services/student.service';
import { Observable, count } from 'rxjs';
import { Student } from '../../Models/Student';
import { transition } from '@angular/animations';
import {MatIconModule} from '@angular/material/icon';
import { Router } from '@angular/router';
@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss'],
  providers: [StudentService],
})
export class TablesComponent implements OnInit {
  public search = '';

  public selectNumbeRentries =[2,5,10,15,25,50,100];

  public totalItem : number;
  public totalPage : number;
  public currentPage : number;
  public numberRentri : number = 2;
  students: any;
  constructor(private studentService: StudentService, private router: Router) {}

  public async ngOnInit() {
    //throw new Error('Method not implemented.');
    this.totalItemService();

    this.studentService.getAllStudent().subscribe((any) => {
      this.students = any;
    });
    this.totalItemService();

    console.log(this.search);
  }

  public totalItemService() : number{
    this.studentService.getTotalItem().subscribe((number)=>{
      this.totalItem = number;
      console.log('totalItem gán: '+ this.totalItem);
      this.totalPage = Math.ceil(this.totalItem/this.numberRentri);
      console.log('totalPage gán: '+ this.totalPage);
    })
    return this.totalItem;
  }

  public onKey(event: any) {
    //console.log('nhận event', this.search);
    //console.log((<HTMLInputElement>event.target).value);
    console.log("changeNumber " + this.numberRentri+ " key : "+ this.search);
  }

  public changeNumbeRentries(event :any) : void {
    const changeNumber = event.target.value;
    if (! changeNumber){
      return;
    }
    this.numberRentri = changeNumber;
    console.log("changeNumber " + this.numberRentri+ " key : "+ this.search);
  }

  public editStudent(id: number){
    this.router.navigate(['/updatestudent', id]);
  }
}
