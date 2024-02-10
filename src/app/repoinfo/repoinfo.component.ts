import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-repoinfo',
  templateUrl: './repoinfo.component.html',
  styleUrls: ['./repoinfo.component.scss']
})
export class RepoinfoComponent implements OnInit, OnChanges{
  loadingRepoData: boolean = false;
  informationRepo: any;
  totalItems: number = 0;
  pageSize: number = 5;
  currentPage: number = 1;
  @Input() repoData: any;
  constructor(private service : ApiService) {}

  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['repoData'] && changes['repoData'].currentValue) {
      this.totalItems = this.repoData.public_repos || 0; // Update totalItems when repoData changes
      this.loadRepoData(); // Load repository data when repoData changes
    }
  }

  ngOnInit(): void {
    this.loadRepoData();
  }
  
  loadRepoData(page: number = 1): void {
    this.loadingRepoData = true; // Set loading state to true
    this.service.getRepoInfo(this.repoData).subscribe({
      next: (value) => {
        this.totalItems = value.length || 0;
        this.informationRepo = value.slice(
          (page - 1) * this.pageSize,
          page * this.pageSize
        );
        this.loadingRepoData = false;
      },
      error: (error) => {
        console.error('Error fetching repository data:', error);
        this.loadingRepoData = false;
      },
    });
  }

  onPageChanged(event: any): void {
    this.currentPage = event.pageIndex + 1;
    this.loadRepoData(this.currentPage);
  }

}
