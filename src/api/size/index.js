import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore } from "firebase/firestore";
import { app } from "../../service/firebase";

export default {
  async list() {
    try {
      const firestore = getFirestore(app);
  
      const sizeCollection = collection(firestore, "size");
      const sizeSnapsShot = await getDocs(sizeCollection);
  
      return sizeSnapsShot.docs.map((doc) => ({ id: doc.id, ...doc.data()}));
    } catch (error) {
      console.log(error);
    }
  },

  async post(formSize) {
    try {
      const firestore = getFirestore(app);
      await addDoc(collection(firestore, "size"), formSize);
    } catch (error) {
      console.log(error);
    }
  },

  async delete(id) {
    try {
      const firestore = getFirestore(app);
      const sizeRef = doc(firestore, "size", id);
      await deleteDoc(sizeRef);
    } catch (error) {
      console.log(error);
    }
  },
};
