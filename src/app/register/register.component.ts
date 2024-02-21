import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { RegisterService } from '../register.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterModule,
    NgIf
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerService = inject(RegisterService);
  errorMessage?: string;

  constructor(
    private router: Router
  ) {}

  applyForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    phoneNumber: new FormControl(''),
    employeeNumber: new FormControl(''),
    role: new FormControl('')
  })

  submitRegistrationForm() {
    this.registerService
    .sendRegistrationData(
      this.applyForm.value.firstName ?? '',
      this.applyForm.value.lastName ?? '',
      this.applyForm.value.email ?? '',
      this.applyForm.value.phoneNumber ?? '',
      this.applyForm.value.employeeNumber ?? '',
    )
    .subscribe(
      res => {
        console.log('HTTP response', res);
        this.router.navigate(['/otp']);
      },
      err => this.errorMessage = err,
      () => console.log('HTTP request completed.')
    );
    }
}
