import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  @Input() totalItems: number | undefined;
  @Input() pageSize: number | undefined;
  @Output() pageChanged = new EventEmitter<PageEvent>();
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  onPageChange(event: PageEvent) {
    this.pageChanged.emit(event);
  }
}
