import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeManagmentService {

  constructor(protected httpClient: HttpClient) { }
  getAllEmployee(requestObj?: any): Observable <any> {
    let params = new HttpParams();
    params = requestObj.first ? params.append('first', requestObj.first) : params;
    params = requestObj.maxResult ? params.append('maxResult',requestObj.maxResult) : params;
    params = requestObj.employeeId ? params.append('employeeId' , requestObj.employeeId) : params;
    params = requestObj.employeeName ? params.append('employeeName' , requestObj.employeeName) : params;
    params = requestObj.employeeMobile ? params.append('employeeMobile' , requestObj.employeeMobile ) : params;
    params = requestObj.employeeEmail ? params.append('employeeEmail' , requestObj.employeeEmail) : params;
    params = requestObj.employeeDate ? params.append('employeeDate' , requestObj.employeeDate) : params;
    return this.httpClient.get<any>('employee-services/psearch' ,{ params });
  }
}
