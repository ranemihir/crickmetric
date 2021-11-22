import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class QueryService {

  constructor(
    private http: HttpClient
  ) { }

  test() {
    return this.http.get(environment.apiUrl);
  }
}
