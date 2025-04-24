import { Component, OnInit, Inject, ViewChild } from "@angular/core";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material/dialog";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";

// Interfaces
export interface Part {
  PartNumber: string;
  Description: string;
}

@Component({
  selector: "app-select-item",
  templateUrl: "./select-item.component.html",
  styleUrls: ["./select-item.component.scss"]
})

export class SelectItemComponent implements OnInit {
  dataSource;
  displayedColumns: string[] = ["PartNumber", "Description"];
  selectedPartNumber: string;
  filter: string;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    public dialogRef: MatDialogRef<SelectItemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    // this.parts = this.data.parts;
    this.dataSource = new MatTableDataSource<Part>(this.data.parts);
    this.dataSource.paginator = this.paginator;
    this.applyFilter(this.data.filter);
    this.filter = this.data.filter;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  selectItem(row) {
    this.selectedPartNumber = row.PartNumber;
  }
}
