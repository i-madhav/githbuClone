import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RepoinfoComponent } from './repoinfo.component';
import { ApiService } from '../services/api.service';

describe('RepoinfoComponent', () => {
  let component: RepoinfoComponent;
  let fixture: ComponentFixture<RepoinfoComponent>;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RepoinfoComponent],
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    }).compileComponents();

    httpTestingController = TestBed.inject(HttpTestingController);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepoinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    httpTestingController.verify(); // Verify that there are no outstanding requests
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load repository data successfully', () => {
    const mockRepoData = [{ name: 'TestRepo1', language: 'TypeScript', private: false },
                          { name: 'TestRepo2', language: 'JavaScript', private: true }]; // Mock repository data
    component.repoData = { login: 'testUser', public_repos: mockRepoData.length }; // Set mock repoData
    fixture.detectChanges(); // Trigger change detection

    const req = httpTestingController.expectOne(`https://api.github.com/users/testUser/repos`);
    expect(req.request.method).toBe('GET'); // Check if a GET request was made
    req.flush(mockRepoData); // Simulate successful response

    expect(component.loadingRepoData).toBeFalse(); // Check if loadingRepoData is set to false after loading
    expect(component.totalItems).toEqual(mockRepoData.length); // Check if totalItems is equal to the length of mockRepoData
    expect(component.informationRepo).toEqual(mockRepoData); // Check if informationRepo is equal to mockRepoData
  });

  it('should handle error when loading repository data', () => {
    component.repoData = { login: 'testUser', public_repos: 0 }; // Set mock repoData
    fixture.detectChanges(); // Trigger change detection

    const req = httpTestingController.expectOne(`https://api.github.com/users/testUser/repos`);
    expect(req.request.method).toBe('GET'); // Check if a GET request was made
    req.error(new ErrorEvent('Network error')); // Simulate error response

    expect(component.loadingRepoData).toBeFalse(); // Check if loadingRepoData is set to false after error
    expect(component.totalItems).toEqual(0); // Check if totalItems is set to 0
    expect(component.informationRepo).toBeUndefined(); // Check if informationRepo is undefined
  });
});
