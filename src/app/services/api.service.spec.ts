import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });
    service = TestBed.inject(ApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch user data', () => {
    const testData = { name: 'Test User', login: 'testuser' };

    service.getUser('testuser').subscribe((data: any) => {
      expect(data).toEqual(testData);
    });

    const req = httpTestingController.expectOne('https://api.github.com/users/testuser');
    expect(req.request.method).toEqual('GET');

    req.flush(testData);
  });

  it('should fetch repository data', () => {
    const testData = [{ name: 'repo1' }, { name: 'repo2' }];

    service.getRepoInfo('testuser').subscribe((data: any) => {
      expect(data).toEqual(testData);
    });

    const req = httpTestingController.expectOne('https://api.github.com/users/testuser/repos');
    expect(req.request.method).toEqual('GET');

    req.flush(testData);
  });
});
