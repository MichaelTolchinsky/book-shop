import { NgModule } from "@angular/core";
import { CartComponent } from "./cart.component";
import { CommonModule } from "@angular/common";
import { AppRoutingModule } from "../app-routing.module";
import { MaterialModule } from "../material.module";
import { CartService } from "./cart.service";

@NgModule({
  declarations: [
    CartComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    MaterialModule
  ],
  exports:[CartComponent]
})
export class CartModule { }