import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PageNotFoundComponent } from "./pages/page-not-found/page-not-found.component";
import { PublicLayoutComponent } from "./layout/public-layout.component";
import { LoginComponent } from "./components/login/login.component";
import { FormsModule } from '@angular/forms';

//Components>>Shared
import { FooterComponent } from './shared/footer/footer.component';

@NgModule({
  declarations: [PageNotFoundComponent, LoginComponent, FooterComponent],
  imports: [CommonModule, FormsModule],
  exports: [FooterComponent]
})
export class PublicComponentsModule {}
