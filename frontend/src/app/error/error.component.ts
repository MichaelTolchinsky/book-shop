import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css'],
  standalone: true,
  imports: [CommonModule, MatDialogModule],
})
export class ErrorComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { message: string }) {}
}
