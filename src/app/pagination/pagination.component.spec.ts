import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

import { PaginationComponent } from './pagination.component';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaginationComponent],
      imports: [MatPaginatorModule, BrowserAnimationsModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit page change event', () => {
    const pageEvent: PageEvent = { pageIndex: 2, pageSize: 10, length: 100 };
    const pageChangedSpy = spyOn(component.pageChanged, 'emit');
    component.onPageChange(pageEvent);
    expect(pageChangedSpy).toHaveBeenCalledWith(pageEvent);
  });

  it('should display MatPaginator', () => {
    expect(fixture.debugElement.query(By.directive(MatPaginator))).toBeTruthy();
  });
});
