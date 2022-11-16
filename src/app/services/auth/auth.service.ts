import { Router } from '@angular/router';
import { NewUser, Login } from './../../interfaces/user.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private route: Router
  ) { }

  public register(user: NewUser): Promise<any> {
    return new Promise((resolve, reject) => {
      const headers = {
          'Content-Type': 'application/json'
        };
      this.http.post("https://localhost:5001/api/Access/Register", user, {headers}).subscribe(
        (response: any) => {
          //alert("User Created");
          resolve(response);
          //this.route.navigate(["/login"]);
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
      this.http.post("https://localhost:5001/api/Access/Login", user, {headers})
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

  public async getName(): Promise<string>{
    return new Promise((resolve, reject) => {
      this.http.get("https://localhost:5001/api/Access/GetName")
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

  public async getRank(): Promise<string>{
    return new Promise((resolve, reject) => {
      this.http.get("https://localhost:5001/api/Access/GetRank")
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
