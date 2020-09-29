import { TestBed } from '@angular/core/testing';

import { EmployeeManagmentService } from './employee-managment.service';

describe('EmployeeManagmentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmployeeManagmentService = TestBed.get(EmployeeManagmentService);
    expect(service).toBeTruthy();
  });
});
