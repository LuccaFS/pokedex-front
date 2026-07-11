import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { DropdownModel } from '../../interfaces/response.model';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  public api = environment.baseUrl + "Common";

  constructor(
    private http: HttpClient
  ) { }

  public async getRanksDropdown(): Promise<DropdownModel[]>{
      return new Promise((resolve, reject) => {
        this.http.get(`${this.api}/Dropdown/Ranks`)
        .subscribe(
          (response: any) => {
            resolve(response);
          },
          (err: HttpErrorResponse) => {
            //this.route.navigate(['/login']);
            reject(err.error);
          }
  
        )
      })
    }

  public async getTypesDropdown(): Promise<DropdownModel[]>{
      return new Promise((resolve, reject) => {
        this.http.get(`${this.api}/Dropdown/Types`)
        .subscribe(
          (response: any) => {
            resolve(response);
          },
          (err: HttpErrorResponse) => {
            //this.route.navigate(['/login']);
            reject(err.error);
          }
  
        )
      })
    }

  public async getPokemonGroupsDropdown(): Promise<DropdownModel[]>{
      return new Promise((resolve, reject) => {
        this.http.get(`${this.api}/Dropdown/PokemonGroups`)
        .subscribe(
          (response: any) => {
            resolve(response);
          },
          (err: HttpErrorResponse) => {
            //this.route.navigate(['/login']);
            reject(err.error);
          }
  
        )
      })
    }

  public async getFormGroupsDropdown(): Promise<DropdownModel[]>{
      return new Promise((resolve, reject) => {
        this.http.get(`${this.api}/Dropdown/FormGroups`)
        .subscribe(
          (response: any) => {
            resolve(response);
          },
          (err: HttpErrorResponse) => {
            //this.route.navigate(['/login']);
            reject(err.error);
          }
  
        )
      })
    }

  public async getGamesDropdown(): Promise<DropdownModel[]>{
      return new Promise((resolve, reject) => {
        this.http.get(`${this.api}/Dropdown/Games`)
        .subscribe(
          (response: any) => {
            resolve(response);
          },
          (err: HttpErrorResponse) => {
            //this.route.navigate(['/login']);
            reject(err.error);
          }
  
        )
      })
    }

  public async getShinyMethodsDropdown(): Promise<DropdownModel[]>{
      return new Promise((resolve, reject) => {
        this.http.get(`${this.api}/Dropdown/ShinyMethods`)
        .subscribe(
          (response: any) => {
            resolve(response);
          },
          (err: HttpErrorResponse) => {
            //this.route.navigate(['/login']);
            reject(err.error);
          }
  
        )
      })
    }

}