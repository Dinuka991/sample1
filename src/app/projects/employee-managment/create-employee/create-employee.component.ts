import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  
  fromDate: any;
  toDate: any;
  toggleClear:boolean=false;
  dtPickerSettings = {
    timePicker: false,
    format: 'dd-MM-yyyy',
    defaultOpen: false,
    closeOnSelect:true
  }
  employeeFname: string;
  employeeLname: string;
  employeeMobile: string;
  employeeId: number;
  employeeEmail: string;
  employeeEmails: string[] = [];
  employeeMobiles: string[] = [];
  employeeDate: Date;
  createForm: FormGroup;
  departmentCategory: string;
  employeeGender: string;
  employeeSalary: string;
  employeeTypeList: string[] = ['Permanent', 'Temperary' ]
  employeeTitleList: string[] =  ['Senior Engineer', 'Engineer', 'Assistant Engineer', 'Senior Staff', 'Staff', 'Technique Leader'];
  employeeGenderList: string[] = ['Male' , 'Female' ,  'Other'];
  employeeType: string;
  employeeTitle: string;
  departmentCategoryList: string[] = ['Customer Service', 'Development', 'Finance', 'Human'
                          , 'Resources', 'Marketing', 'Production', 'Quality Management', 'Research', 'Sales'];


  constructor(private fb: FormBuilder) {
      this.createForm = fb.group({
         employeeFname: [''],
         employeeId: [''],
         employeeLname: [''],
         departmentCategory: [''],
         employeeType: [''],
         employeeTitle: [''],
         employeeGender: [''] ,
         empployeeEmail: [''],
         employeeMobile: [''],
         employeeSalary: [''],
         employeeDate: [''],
         employeeEmail: [''],
         fromDate: [''] ,
         toDate: ['']




      });
   }

  ngOnInit() {

  }
  add(){
    this.employeeEmails.push(this.createForm.value.employeeEmail);
    this.createForm.controls['employeeEmail'].setValue('');
  }
  deleteEmail(element: any) {
    this.employeeEmails.splice( element , 1);
  }
  addMobile(){
    this.employeeMobiles.push(this.createForm.value.employeeMobile);
    this.createForm.controls['employeeMobile'].setValue('');
  }
  deleteMobile(element: any) {
    this.employeeMobiles.splice( element , 1);
  }

}
