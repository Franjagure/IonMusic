import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {FormControl} from '@angular/forms';

@Injectable()
export class ValidatePassword {

  constructor(public http: Http) {}

  isValid(control:FormControl){
        if(control.value == control.root.value['password']){
            return null;
        }
        else
        return { isValid:true };
 } 

}