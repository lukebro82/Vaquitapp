import {
  collection,
  addDoc,
  updateDoc,
  doc,
  getDocs,
} from "firebase/firestore/lite";
import { FirebaseDB } from "./firebase";

type Purchase = {
  id: string;
  from: string;
  amount: number;
  message: string;
  date: Date;
  status: string;
};
export async function getConfirmedPayments(): Promise<Purchase[]> {
  const confirmedPayments = collection(FirebaseDB, "donaciones");
  const querySnapshot = await getDocs(confirmedPayments);

  return querySnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      from: data.from,
      amount: data.amount,
      message: data.message,
      date: data.date?.toDate ? data.date.toDate() : new Date(data.date),
      status: data.status,
    } as Purchase;
  });
}
export async function createPurchase(
  newPurchInput: Pick<Purchase, "from" | "amount" | "message">
): Promise<string> {
  const purchase = {
    ...newPurchInput,
    date: new Date(),
    status: "pending",
  };
  // guardamos esta nueva purchase en la db y devolvemos el id
  const purchaseRef = collection(FirebaseDB, "donaciones");
  const docRef = await addDoc(purchaseRef, purchase);

  console.log("HOALLL", docRef.id);
  return docRef.id;
}

export async function confirmPurchase(purchaseId: string) {
  // confirmamos la compra en la DB
  console.log(purchaseId, "HOAL SOY EL PURCHASE ID");
  const purchaseRef = doc(FirebaseDB, "donaciones", purchaseId);

  try {
    await updateDoc(purchaseRef, {
      status: "confirmed",
    });
    console.log(`Purchase ${purchaseId} confirmed`);
    return true;
  } catch (error) {
    console.error("Error confirming purchase: ", error);
    return false;
  }
}
