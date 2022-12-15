import { Router } from '@angular/router';
import { NewUser, Login, User } from './../../interfaces/user.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public api = environment.baseUrl + "Access/";

  constructor(
    private http: HttpClient,
    private route: Router
  ) { }

  public register(user: NewUser): Promise<any> {
    return new Promise((resolve, reject) => {
      const headers = {
          'Content-Type': 'application/json'
        };
      this.http.post(`${this.api}/Register`, user, {headers}).subscribe(
        (response: any) => {
          resolve(response);
        },
        (err: HttpErrorResponse) => {
          reject(err.error);
        }
      )
    })
  }


  public login(user: Login): Promise<any> {
    return new Promise((resolve, reject) => {
      const headers = {
          'Content-Type': 'application/json'
        };
      this.http.post(`${this.api}/Login`, user, {headers})
      .subscribe(
        (response: any) => {
          resolve(response);
        },
        (err: HttpErrorResponse) => {
          reject(err.error)
        }
      )
      });
  }

  public async getUser(): Promise<User>{
    return new Promise((resolve, reject) => {
      this.http.get(`${this.api}/GetUser`)
      .subscribe(
        (response: any) => {
          resolve(response);
        },
        (err: HttpErrorResponse) => {
          this.route.navigate(['/login']);
          reject(err.error);
        }

      )
    })
  }

  public async getRank(): Promise<string>{
    return new Promise((resolve, reject) => {
      this.http.get(`${this.api}GetRank`)
      .subscribe(
        (response: any) => {
          resolve(response.responseMessage);
        },
        (err: HttpErrorResponse) => {
          this.route.navigate(['/login']);
          reject(err.error);
        }

      )
    })
  }
}
