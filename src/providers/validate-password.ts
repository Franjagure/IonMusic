import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {FormControl} from '@angular/forms';

/*
  Generated class for the ValidateEmail provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ValidatePassword {

  constructor(public http: Http) {}

  isValid(control:FormControl){
        if(control.value == control.root.value['password']){
            return null;
        }else
        return { isValid:true };
 } 

}