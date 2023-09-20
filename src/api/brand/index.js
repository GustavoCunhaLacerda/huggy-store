import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore } from "firebase/firestore";
import { app } from "../../service/firebase";

export default {
  async list() {
    const firestore = getFirestore(app);

    const brandCollection = collection(firestore, "brand");
    const brandSnapsShot = await getDocs(brandCollection);

    return brandSnapsShot.docs.map((doc) => ({ id: doc.id, ...doc.data()}));
  },

  async post(formBrand) {
    console.log({formBrand});
    const firestore = getFirestore(app);
    const docRef = await addDoc(collection(firestore, "brand"), formBrand);

    console.log(docRef.id);
  },

  async delete(id) {
    const firestore = getFirestore(app);
    const brandRef = doc(firestore, "brand", id);
    await deleteDoc(brandRef);
  },
};
