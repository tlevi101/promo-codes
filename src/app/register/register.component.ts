import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder,ValidatorFn,AbstractControl,ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  register: FormGroup
  showME=false;
  @Output() onSubmit = new EventEmitter<{email: string, name: string}>();
  constructor(private fb: FormBuilder) {
    this.register = this.fb.group({
      email: [{value:'', disabled:true},
    ],
    name:['',[
      Validators.required,
      Validators.pattern('^[a-zA-Z ]+$'),
      Validators.minLength(2),
    ]],
    agreement:['',[
      Validators.required,
      Validators.requiredTrue
    ]],
    })
    this.register.valueChanges.subscribe(data => console.log(data));
  }
  submitRegisterReq(){
    const req={email:this.email?.value, name:this.name?.value};
    this.onSubmit.emit(req);
  }
  ngOnInit(): void {
  }
  get email(): any {
    return this.register.get('email');
  }
  get name(): any {
    return this.register.get('name');
  }
  get agreement(): any {
    return this.register.get('aggreement');
  }

}
