import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

// Third Party Modules
import {
  AuthGuard,
  redirectUnauthorizedTo
} from "@angular/fire/auth-guard";

// Feature Modules
import { PrivateComponentsModule } from "./private-components.module";

//Components
import { PrivateLayoutComponent } from "./layout/private-layout.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { EditOrderComponent } from "./components/edit-order/edit-order.component";
import { OrdersComponent } from "./components/orders/orders.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { SettingsComponent } from "./components/settings/settings.component";
import { UsersComponent } from "./components/users/users.component";
import { HomeComponent } from "./components/home/home.component";
import { ArchivedOrdersComponent } from "./components/archived-orders/archived-orders.component";

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(["/login"]);

const routes: Routes = [
  {
    path: "",
    component: PrivateLayoutComponent,
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
    children: [
      {
        path: "home",
        component: HomeComponent
      },
      {
        path: "dashboard",
        component: DashboardComponent
      },
      {
        path: "edit-order",
        component: EditOrderComponent
      },
      {
        path: "orders",
        component: OrdersComponent
      },
      {
        path: "archived-orders",
        component: ArchivedOrdersComponent
      },
      {
        path: "profile",
        component: ProfileComponent
      },
      {
        path: "settings",
        component: SettingsComponent
      },
      {
        path: "users",
        component: UsersComponent
      }
    ]
  }
];

@NgModule({
  declarations: [PrivateLayoutComponent],
  imports: [RouterModule.forChild(routes), PrivateComponentsModule],
  exports: [RouterModule]
})
export class PrivateRoutingModule {}
