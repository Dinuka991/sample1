import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators  } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {  Router } from '@angular/router';
import { EmployeeManagmentService } from '../../employee-managment.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  username: any;
  password: any;
  credentials: any;

  constructor(private fb: FormBuilder , private employeeManagmentService: EmployeeManagmentService,
              private http: HttpClient, private router: Router ) { }
  loginForm = this.fb.group({
    username: [ '', Validators.required],
    password: ['', Validators.required],
  });

  ngOnInit() {
  }
/*
  login() {
    const credentials  = {
      ' username ' : this.loginForm.get('username').value.trim(),
      ' password ' : this.loginForm.get('password').value.trim()
    };
    this.employeeManagmentService.authenticate(this.credentials, () => {
        this.router.navigateByUrl('/');
    });
    return true;
   
  }
*/
}
