import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-gitinfo',
  templateUrl: './gitinfo.component.html',
  styleUrls: ['./gitinfo.component.scss']
})
export class GitinfoComponent implements OnInit{
  searchTerm:string = "i-madhav";
  loadingGithubData:boolean = false

  constructor(private service:ApiService) {}
  githubData:any;

  ngOnInit(): void {
      this.loadGithubData("i-madhav");
  }
  
  loadGithubData(username:string) {
    this.loadingGithubData = true;

    this.service.getUser(username)
    .subscribe({
      next: (data) => {
        this.githubData = data;
        this.loadingGithubData = false; // Set loading state to false after data is fetched
        console.log(this.githubData);
      },
      error: (error) => {
        console.error('Error fetching GitHub data:', error);
        this.loadingGithubData = false; 
      },
    });
  }


  searchGithubProfile(): void {
    // Call GitHub API with search term
    if (this.searchTerm.trim() !== '') {
      this.loadGithubData(this.searchTerm.trim());
    }
  }
  
}
