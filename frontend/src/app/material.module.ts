import { NgModule } from "@angular/core";
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import {MatLegacyCardModule as MatCardModule} from '@angular/material/legacy-card';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatLegacyProgressSpinnerModule as MatProgressSpinnerModule } from '@angular/material/legacy-progress-spinner';
import {MatLegacyPaginatorModule as MatPaginatorModule} from '@angular/material/legacy-paginator';
import {MatLegacyDialogModule as MatDialogModule} from '@angular/material/legacy-dialog';
import {MatLegacyListModule as MatListModule} from '@angular/material/legacy-list';
import {MatIconModule} from '@angular/material/icon';
import {MatLegacySnackBarModule as MatSnackBarModule} from '@angular/material/legacy-snack-bar';

@NgModule({
  exports:[
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatDialogModule,
    MatListModule,
    MatIconModule,
    MatSnackBarModule
  ]
})
export class MaterialModule{}