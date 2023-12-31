import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore } from "firebase/firestore";
import { app } from "../../service/firebase";

export default {
  async list() {
    try {
      const firestore = getFirestore(app);
  
      const brandCollection = collection(firestore, "brand");
      const brandSnapsShot = await getDocs(brandCollection);
  
      return brandSnapsShot.docs.map((doc) => ({ id: doc.id, ...doc.data()}));
    } catch (error) {
      console.log(error);
    }
  },

  async post(formBrand) {
    try {
      const firestore = getFirestore(app);
      await addDoc(collection(firestore, "brand"), formBrand);
    } catch (error) {
      console.log(error);
    }
  },

  async delete(id) {
    try {
      const firestore = getFirestore(app);
      const brandRef = doc(firestore, "brand", id);
      await deleteDoc(brandRef);
    } catch (error) {
      console.log(error);
    }
  },
};
