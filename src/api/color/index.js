import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore } from "firebase/firestore";
import { app } from "../../service/firebase";

export default {
  async list() {
    try {
      const firestore = getFirestore(app);
  
      const colorCollection = collection(firestore, "color");
      const colorSnapsShot = await getDocs(colorCollection);
  
      return colorSnapsShot.docs.map((doc) => ({ id: doc.id, ...doc.data()}));
    } catch (error) {
      console.log(error);
    }
  },

  async post(formColor) {
    try {
      const firestore = getFirestore(app);
      await addDoc(collection(firestore, "color"), formColor);
    } catch (error) {
      console.log(error);
    }
  },

  async delete(id) {
    try {
      const firestore = getFirestore(app);
      const colorRef = doc(firestore, "color", id);
      await deleteDoc(colorRef);
    } catch (error) {
      console.log(error);
    }
  },
};
