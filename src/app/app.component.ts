import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CodeUploadComponent } from './code-upload/code-upload.component';
import { RegisterComponent } from './register/register.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit{
  title='promo-codes';
  @ViewChild(RegisterComponent) register:RegisterComponent;
  @ViewChild(CodeUploadComponent) codeUpload:CodeUploadComponent;
  result = "még nincs";
  showResult = false;
  codeUploadReq: any;
  private hr= new HttpHeaders().set('Content-Type', 'application/json')
  constructor(private http:HttpClient){
    this.register = new RegisterComponent(new FormBuilder());
    this.codeUpload = new CodeUploadComponent(new FormBuilder());
  }
  ngAfterViewInit(): void {
    
  }
  hideResult(){
    this.showResult = false;
  }
  sendCodeReq(req:any){
    this.http.post('https://ncp-dummy.staging.moonproject.io/api/torma-levente/code/upload',JSON.stringify(req),{headers:this.hr}).subscribe((res:any
    ) =>{
      if(res.data?.won){
        this.showResult = true;
        this.result="Gratululálunk, ön nyert!"
      }
      else{
        this.showResult = true;
        this.result="Sajnos nem nyert!"
      }
    },
    (error) => {
      this.register.showME=true;
      this.register.register.setValue({email:req.email, name:'', agreement:false});
    })
  }
  recieveCodeUpload($event:any){
    this.codeUploadReq=$event;
    this.sendCodeReq($event);
  }
  recieveRegisterReq($event:any){
    console.log($event);
    this.http.post('https://dummy-ncp.moonproject.io/api/torma-levente/user/register',JSON.stringify($event),{headers:this.hr}).subscribe((res:any)=>{
      this.register.showME=false;
      this.sendCodeReq(this.codeUploadReq);
    }, (error) => {
      console.log("asd",$event);
      console.log(error);
    });
  }
    
}
