import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class SciquestService {
  url = "http://localhost:3000/"
  constructor(private http: Http) {}

  checkConnection() {
    return this.http.get(this.url)
      .map(res => (res.status == 200));
   }

  handleResponse(header) {
    if (header.status != 401) {
      return 'success'
    }

    return 'error blah blah'
  }
}
