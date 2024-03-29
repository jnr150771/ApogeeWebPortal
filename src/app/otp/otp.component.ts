import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { OtpService } from '../otp.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-otp',
  standalone: true,
  imports: [
    ReactiveFormsModule,
  ],
  templateUrl: './otp.component.html',
  styleUrl: './otp.component.css'
})
export class OtpComponent {
  otpService = inject(OtpService);
  errorMessage?: string;
  

  digitValidate(ele: HTMLInputElement): void{
    console.log('fonction digitvalid')
    console.log(ele.value);
    ele.value = ele.value.replace(/[^0-9]/g,'');
  }
  
  tabChange(val: number): void{
      let ele = document.querySelectorAll('input');
      if(ele[val-1].value != '' && val<6){
        ele[val].focus()
      }else if(ele[val-1].value == '' && val>1){
        ele[val-2].focus()
      }   
   }

  constructor(
    private router: Router
    
  ) {}

  otpForm = new FormGroup({
    first: new FormControl(''),
    second: new FormControl(''),
    third: new FormControl(''),
    fourth: new FormControl(''),
    fifth: new FormControl(''),
    sixth: new FormControl('')
  })


  submitOtpForm() {
    console.log('otp works')
    this.otpService
    .sendOtpCode(
      Number(this.otpForm.value.first) ?? 0,
      Number(this.otpForm.value.second) ?? 0,
      Number(this.otpForm.value.third) ?? 0,
      Number(this.otpForm.value.fourth) ?? 0,
      Number(this.otpForm.value.fifth) ?? 0,
      Number(this.otpForm.value.sixth) ?? 0,
    )
    .subscribe(
      res => {
        console.log('HTTP response', res);
        this.router.navigate(['/change-password']);
      },
      err => this.errorMessage = err,
      () => console.log('HTTP request completed.')
    );
  }
  
}
