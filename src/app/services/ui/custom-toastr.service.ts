import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CustomToastrService {
constructor(private toastr:ToastrService){}
message(message: string,title: string, messageType: ToastrMessageType,position:any){
  this.toastr[messageType](message,title);
}
}

export enum ToastrMessageType{
Success = "success",
Info = "info",
warning = "warning",
Error = "error"
}