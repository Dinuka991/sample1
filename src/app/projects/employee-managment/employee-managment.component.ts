import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { EmployeeManagmentService } from '../employee-managment.service';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';

@Component({
  selector: 'app-employee-managment',
  templateUrl: './employee-managment.component.html',
  styleUrls: ['./employee-managment.component.css']
})
export class EmployeeManagmentComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  empForm: FormGroup;
  employeeName: string;
  employeeMobile: string;
  employeeId: number;
  employeeEmail: string;
  employeeDate: Date;
  displayedColumns: string[] = [  'employeeId', 'employeeName' , 'employeeMobile' , 'employeeEmail' , 'employeeDate'];
  dataSource = new MatTableDataSource<Employee>();
  showProgressBar: boolean;
  totalCount: number;
  searchResultMessage: any;
  constructor(public dialog: MatDialog ,private fb: FormBuilder , private employeeManagmentService: EmployeeManagmentService) {
      this.empForm = fb.group({
        employeeName: null,
        employeeMobile: null,
        employeeId: null
      });
   }
  ngOnInit() {
    console.log('dd');
    this.empForm.get('employeeName').setValue('');
    this.empForm.get('employeeMobile').setValue('');
    this.empForm.get('employeeId').setValue('');
    this.paginator.pageIndex = 0;
    this.paginator.pageSize = 10;
    this.load();
  }
  load() {
    this.getObnContacts();
  }
  getObnContacts() {
    this.dataSource.data = [];
    this.showProgressBar = true;

    const requestObj = {
      first:  this.paginator.pageIndex + '',
      maxResult: this.paginator.pageSize + '',
    };

    if (this.empForm.value.employeeName) {
      requestObj["employeeName"] = this.empForm.get('employeeName').value.trim();
    }
    if (this.empForm.value.employeeMobile) {
      requestObj["employeeMobile"] = this.empForm.get('employeeMobile').value.trim();
    }
    if (this.empForm.value.employeeId) {
      requestObj["employeeId"] = this.empForm.get('employeeId').value.trim();
    }
    this.employeeManagmentService.getAllEmployee(requestObj)
      .subscribe((data: any) => {
        if (data) {
            if (data.totalElements === 0) {
               this.totalCount = 0;
               this.showProgressBar = false;
            } else {
            this.dataSource.data = data.content as Employee[];
            this.totalCount = data.totalElements || this.totalCount;
            console.log(this.totalCount);
            this.showProgressBar = false;
            }
        }
      },
        error => {
          this.totalCount = 0;
          this.searchResultMessage = error.message ? error.message : JSON.stringify(error);
        });
  }
  openCreateDialog(): void{
    const dialogRef = this.dialog.open(CreateEmployeeComponent, {
      width: '95%',
      maxWidth: '95vw',
      maxHeight: '95vh',
      disableClose: true,
     
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('create screen close');
    } )
  }

}
export interface Employee{
  id: number;
  employeeId: number;
  employeeName: string;
  employeeMobile: string;
  employeeEmail: string;
  employeeDate: Date;
}