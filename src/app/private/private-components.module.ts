import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { FormsModule } from "@angular/forms";

// Third Party Modules
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
//import { MatDialogModule } from "@angular/material";
import {HttpClientModule} from '@angular/common/http';
//import { NgbButtonsModule } from "@ng-bootstrap/ng-bootstrap";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

//Components>>Shared
import { NavbarComponent } from "./shared/navbar/navbar.component";
import { FooterComponent } from "./shared/footer/footer.component";
import { SidebarComponent } from "./shared/sidebar/sidebar.component";

// Components>Pages
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { OrdersComponent } from "./components/orders/orders.component";
import { UsersComponent } from "./components/users/users.component";
import { SettingsComponent } from "./components/settings/settings.component";
import { EditOrderComponent } from "./components/edit-order/edit-order.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { HomeComponent } from "./components/home/home.component";
//import { ItemDetailComponent } from "./components/item-detail/item-detail.component";
//import { UserComponent } from "./components/user/user.component";
import { SelectItemComponent } from "./components/edit-order/select-item/select-item.component";
import { ArchivedOrdersComponent } from './components/archived-orders/archived-orders.component';
import { MatDialogModule } from "@angular/material/dialog";
import { EditNoteComponent } from './components/edit-order/edit-note/edit-note.component';

@NgModule({
  declarations: [
    DashboardComponent,
    OrdersComponent,
    UsersComponent,
    SettingsComponent,
    EditOrderComponent,
    ProfileComponent,
    NavbarComponent,
    SidebarComponent,
    HomeComponent,
    FooterComponent,
    SelectItemComponent,
    ArchivedOrdersComponent,
    EditNoteComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    HttpClientModule,
    FontAwesomeModule
    //NgbButtonsModule
  ],
  exports: [NavbarComponent, SidebarComponent, FooterComponent]
})
export class PrivateComponentsModule {}
