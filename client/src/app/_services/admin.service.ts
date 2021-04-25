import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class AdminService {

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }



}
