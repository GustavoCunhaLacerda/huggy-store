import { addDoc, collection, doc, getDoc, getFirestore } from "firebase/firestore";
import { app } from "../../service/firebase";

export default {
  async post(order) {
    console.log({order});
    const firestore = getFirestore(app);
    const docRef = await addDoc(collection(firestore, "order"), order);

    return docRef.id;
  },

  async index(id) {
    const firestore = getFirestore(app);

    const docRef = doc(firestore, "order", id);
    const docRes = await getDoc(docRef);

    return { id: docRes.id, ...docRes.data()};
  },
};
