import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ChangePasswordService } from '../change-password.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent {
  changePasswordService = inject(ChangePasswordService);
  errorMessage?: string;

  password: HTMLInputElement = (document.getElementById("password") as HTMLInputElement)!;
  confirm_password: HTMLInputElement = (document.getElementById("confirmPassword") as HTMLInputElement)!; 

  changePasswordForm = new FormGroup({
    newPassword: new FormControl('')
  })


  constructor(
    private router: Router
  ) {}

  changePassword(): any {
    console.log('submit works');
    this.changePasswordService
    .sendNewPassword(
      this.changePasswordForm.value.newPassword ?? '',
    )
    .subscribe(
      res => {
        console.log('HTTP response', res);
        this.router.navigate(['/login']);
      },
      err => this.errorMessage = err,
      () => console.log('HTTP request completed.')
    );
  }

  

  

  
}
