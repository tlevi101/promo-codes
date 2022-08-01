import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'code-upload',
  templateUrl: './code-upload.component.html',
  styleUrls: ['./code-upload.component.css'],
  
})
export class CodeUploadComponent implements OnInit {
  codeUpload : FormGroup;
  public hours: number[];
  public minutes: number[];
  public dates: {value: number, desc: string}[];
  @Output() onSubmit = new EventEmitter<{email: string, code: string,purchase_time: string}>();
  constructor(private fb: FormBuilder) { 

    this.hours = new Array();
    for (let i = 0; i < 24; i++) {
      this.hours.push(i);
    }
    this.minutes = new Array();
    for (let i = 0; i < 59; i++) {
      this.minutes.push(i+1);
    }
    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
    ];
    this.dates = new Array();
    const date = new Date();
    for (let i = 6; i < date.getMonth()+1; i++) {
      for (let j = 0; j < new Date(2022,i, i==7? date.getDate():0).getDate(); j++) {
        let obj={value:new Date(2022,i,j+1).getTime(), desc:monthNames[i]+', '+ (j+1)};
        this.dates.push(obj)
      }
    }
    this.dates.reverse();
    this.codeUpload = this.fb.group({
      email:['',[
        Validators.required,
        Validators.email
      ]],
      code:['',[
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9]+$/),
        Validators.minLength(8),
        Validators.maxLength(8)
      ]],
      purchaseday:['',
        Validators.required,
      ],
      hour:['',
        Validators.required,
      ],
      minute:['',
        Validators.required,
      ]
    })
  }
  sendCode(){
    const req={email:this.email?.value, code:this.code?.value, purchase_time:this.getFormatedPurchaseTime()}
    this.onSubmit.emit(req);
  }
  getFormatedPurchaseTime() {
    const date =new Date(parseInt(this.purchaseday?.value));
    return (
      [
        date.getFullYear(),
        this.padTo2Digits(date.getMonth() + 1),
        this.padTo2Digits(date.getDate()),
      ].join('-') +
      ' ' +
      [
        this.padTo2Digits(this.hour?.value),
        this.padTo2Digits(this.minute?.value),
      ].join(':')
    );
  }
  padTo2Digits(num:any) {
    return num.toString().padStart(2, '0');
  }
  ngOnInit(): void {
  }

  get email(){
    return this.codeUpload.get("email");
  }
  get code(){
    return this.codeUpload.get("code"); 
  }
  get purchaseday(){
    return this.codeUpload.get("purchaseday");
  }
  get hour(){
    return this.codeUpload.get("hour");
  }
  get minute(){
    return this.codeUpload.get("minute");
  }
}

