import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";

//Services
//import { FirestoreService } from "./firestore.service";
import { Promise } from "q";
import { firstValueFrom } from "rxjs/internal/firstValueFrom";

@Injectable({
  providedIn: "root",
})
export class DebugModeService {
  debugMode: boolean;

  constructor(private firestore: AngularFirestore) {}

  async value() {
    return (
      (
        await firstValueFrom(this.firestore.doc("var/debugMode").get())
      ).data() as any
    ).value;

    // return Promise((resolve, reject) => {
    //   this.firestore
    //     .doc("var/debugMode")
    //     .get()
    //     .subscribe(doc => {
    //       if (doc) {
    //         this.debugMode = doc.data().value;
    //         resolve(this.debugMode);
    //       } else {
    //         reject(false);
    //       }

    //     });
    // });
  }

  async set(value: boolean) {
    await this.firestore.doc("var/debugMode").update({ value: value });

    // this.firestore.doc("var/debugMode").set({
    //   value: value
    // }).catch((reason) => {
    // console.log("TCL: DebugModeService -> set -> reason", reason);

    // });
    return null;
  }
}
