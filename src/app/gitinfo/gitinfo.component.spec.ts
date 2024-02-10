import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { GitinfoComponent } from './gitinfo.component';
import { ApiService } from '../services/api.service';

describe('GitinfoComponent', () => {
  let component: GitinfoComponent;
  let fixture: ComponentFixture<GitinfoComponent>;
  let apiService: jasmine.SpyObj<ApiService>;

  beforeEach(() => {
    const apiServiceSpy = jasmine.createSpyObj('ApiService', ['getUser']);

    TestBed.configureTestingModule({
      declarations: [GitinfoComponent],
      imports: [HttpClientTestingModule],
      providers: [{ provide: ApiService, useValue: apiServiceSpy }]
    });

    fixture = TestBed.createComponent(GitinfoComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load GitHub data on initialization', () => {
    const testData = { name: 'Test User', login: 'testuser' };
    apiService.getUser.and.returnValue(of(testData));

    component.ngOnInit();

    expect(apiService.getUser).toHaveBeenCalledWith('i-madhav');
    expect(component.githubData).toEqual(testData);
    expect(component.loadingGithubData).toBeFalse();
  });

  it('should search for GitHub profile', () => {
    const testData = { name: 'Test User', login: 'testuser' };
    apiService.getUser.and.returnValue(of(testData));

    component.searchTerm = 'testuser';
    component.searchGithubProfile();

    expect(apiService.getUser).toHaveBeenCalledWith('testuser');
    expect(component.githubData).toEqual(testData);
    expect(component.loadingGithubData).toBeFalse();
  });

  it('should handle errors when fetching GitHub data', () => {
    const errorMessage = 'An error occurred';
    apiService.getUser.and.throwError(errorMessage);

    component.loadGithubData('testuser');

    expect(component.loadingGithubData).toBeFalse();
    expect(console.error).toHaveBeenCalledWith('Error fetching GitHub data:', errorMessage);
  });
});
