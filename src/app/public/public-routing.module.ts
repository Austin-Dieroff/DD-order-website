import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { FormsModule } from '@angular/forms';

//Modules
import { PublicComponentsModule } from "./public-components.module";

//Components
import { PublicLayoutComponent } from "./layout/public-layout.component";
import { LoginComponent } from "./components/login/login.component";

const routes: Routes = [
  // {
  //   path: "login",
  //   component: LoginComponent
  // },
  {
    path: "",
    component: PublicLayoutComponent,
    children: [
      {
        path: "login",
        component: LoginComponent
      }
    ]
  }
];

@NgModule({
  declarations: [PublicLayoutComponent],
  imports: [RouterModule.forChild(routes), PublicComponentsModule],
  exports: [RouterModule]
})
export class PublicRoutingModule {}
