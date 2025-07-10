import { collection, addDoc, updateDoc, doc } from "firebase/firestore/lite";
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
  // Mock data
  return [
    {
      id: "1",
      from: "Pepito",
      amount: 33000,
      message: "Ahi te va mi aporte",
      date: new Date(),
      status: "confirmed",
    },
    {
      id: "2",
      from: "Juanita",
      amount: 54000,
      message: "Apoyo esta campaña",
      date: new Date(),
      status: "confirmed",
    },
    {
      id: "3",
      from: "Pepita",
      amount: 60000,
      message: "Ojalá que llegues",
      date: new Date(),
      status: "confirmed",
    },
  ];
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

  return docRef.id;
}

export async function confirmPurchase(purchaseId: string) {
  // confirmamos la compra en la DB
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
