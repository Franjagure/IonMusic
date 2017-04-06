import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {FormControl} from '@angular/forms';

@Injectable()
export class ValidateEmail {

  constructor(public http: Http) {
  }

    isValid(control: FormControl){
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(control.value);
      if (re){
        return null;
      }
      return {"invalidEmail": true};
    }

}
