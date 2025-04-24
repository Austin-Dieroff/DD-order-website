// Core Modules
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

// Third Party Modules
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
// import { MatDialogModule } from "@angular/material";
// import { MatTableModule } from "@angular/material/table";
// import { CdkTableModule } from "@angular/cdk/table";

// Environment
import { environment } from "../environments/environment";

// Angular Fire Modules
import { initializeApp, provideFirebaseApp } from "@angular/fire/app";
import { getAuth, provideAuth } from "@angular/fire/auth";
import { getFirestore, provideFirestore } from "@angular/fire/firestore";
import { getFunctions, provideFunctions } from "@angular/fire/functions";
import { getStorage, provideStorage } from "@angular/fire/storage";

//Routing Modules
import { AppRoutingModule } from "./app-routing.module";
import { PublicRoutingModule } from "./public/public-routing.module";
import { PrivateRoutingModule } from "./private/private-routing.module";

// Feature Modules
import { PrivateComponentsModule } from "./private/private-components.module";
import { PublicComponentsModule } from "./public/public-components.module";

//Services
//import { AuthService } from "./services/auth-service.service";
//import { FirestoreService } from "./services/firestore.service";
//import { FirebaseAdminService } from "./services/firebase-admin.service";

//Components
import { AppComponent } from "./app.component";
import { FIREBASE_OPTIONS } from "@angular/fire/compat";
//import { SelectItemComponent } from "./private/components/edit-order/select-item/select-item.component";
//import { EditNoteComponent } from "./private/components/edit-order/edit-note/edit-note.component";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PublicRoutingModule,
    PrivateRoutingModule,
    PrivateComponentsModule,
    PublicComponentsModule,
    FormsModule,
    BrowserAnimationsModule,
    NgbModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideFunctions(() => getFunctions()),
    provideStorage(() => getStorage()),
    FontAwesomeModule,
    // MatDialogModule,
    // MatTableModule,
    // CdkTableModule
  ],
  providers: [{ provide: FIREBASE_OPTIONS, useValue: environment.firebase }],
  bootstrap: [AppComponent],
})
export class AppModule {}
