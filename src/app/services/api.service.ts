import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = "https://api.github.com/users/"
  constructor(
    private httpClient: HttpClient
  ) { }

  getUser(githubUsername: string = "i-madhav") {
    return this.httpClient.get(`${this.baseUrl}${githubUsername}`);
  }

  getRepoInfo(githubUsername:string = "i-madhav") {
    return this.httpClient.get<any>(`${this.baseUrl}${githubUsername}/repos`);
  }
}
