import { Injectable } from "@angular/core";
import { Observable, firstValueFrom, map } from "rxjs";
import { Order } from "../models/order.model";
import {
  AngularFirestore,
  DocumentReference,
  QueryDocumentSnapshot,
} from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: "root",
})
export class OrderService {
  constructor(private firestore: AngularFirestore) {}

  getOrder(
    orderId: string,
    collection: string = "unapprovedOrders"
  ): Observable<Order> {
    return this.firestore
      .collection(collection)
      .doc<Order>(orderId)
      .valueChanges();
  }

  getOrders(
    collection: string = "unapprovedOrders",
    limit?: number,
    direction: "next" | "prev" | "reload" = "next",
    currentPosition?: string
  ): Observable<Order[]> {
    return this.firestore
      .collection<Order>(collection, (ref) => {
        let queryRef = ref.orderBy("date", "desc");
        if (limit) {
          queryRef = queryRef.limit(limit);
        }
          
        if (currentPosition && direction == "next") {
          queryRef = queryRef.startAfter(currentPosition);
        }
        else if(currentPosition && direction == "prev") {
          queryRef = queryRef.startAt(currentPosition);
        }
        return queryRef;
      })
      .valueChanges();
  }

  createOrder(
    order: Order,
    collection: string = "unapprovedOrders"
  ): Promise<void> {
    return this.firestore
      .collection(collection)
      .doc(order.orderId)
      .set({ ...order });
  }

  updateOrder(
    order: Partial<Order>,
    collection: string = "unapprovedOrders"
  ): Promise<void> {
    return this.firestore
      .collection(collection)
      .doc(order.orderId)
      .update(order);
  }

  deleteOrder(
    orderId: string,
    collection: string = "unapprovedOrders"
  ): Promise<void> {
    return this.firestore.collection(collection).doc(orderId).delete();
  }

  moveOrder(
    orderId: string,
    fromCollection: string,
    toCollection: string
  ): Promise<void> {
    const docRef = this.firestore.collection(fromCollection).doc(orderId);
    return docRef
      .get()
      .toPromise()
      .then((doc) => {
        if (doc.exists) {
          const orderData = doc.data();
          const movePromise = this.firestore
            .collection(toCollection)
            .doc(orderId)
            .set(orderData);
          return movePromise.then(() => docRef.delete());
        }
        throw new Error("Document does not exist!");
      });
  }

  async getDropdownOptions(collection: string, orderBy: string) {
    // this.firestore
    //   .colWithIds$("currencyCodes", ref => ref.orderBy("Code", "asc"))
    //   .subscribe(codes => {
    //     this.currencyCodes = codes;
    //   });

    // const docRef = this.firestore.collection(collection).doc(docId);
    // return await firstValueFrom(docRef.get());

    return await firstValueFrom(
      this.firestore
        .collection(collection, (ref) => {
          let queryRef = ref.orderBy(orderBy, "asc");

          return queryRef;
        })
        .valueChanges()
    );
  }

  async getParts() {
    return await firstValueFrom(
      this.firestore
        .collection("parts", (ref) => {
          let queryRef = ref.orderBy("PartNumber", "asc");

          return queryRef;
        })
        .valueChanges()
    );
  }
}
