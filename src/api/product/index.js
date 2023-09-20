import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { app } from "../../service/firebase";


export default {
  async list() {
    const firestore = getFirestore(app);

    const productCollection = collection(firestore, "product");
    const productSnapsShot = await getDocs(productCollection);

    return productSnapsShot.docs.map((doc) => ({ id: doc.id, ...doc.data()}));
  },

  async index(id) {
    const firestore = getFirestore(app);

    const docRef = doc(firestore, "product", id);
    const docRes = await getDoc(docRef);

    return { id: docRes.id, ...docRes.data()};
  },

  async post(productForm) {
    const imageUrl = await this.uploadImage(productForm.image)
    
    const firestore = getFirestore(app);
    const docRef = await addDoc(collection(firestore, "product"), { ...productForm, image: imageUrl });

    console.log(docRef.id);
  },

  async delete(id) {
    try {
      const firestore = getFirestore(app);
      const productRef = doc(firestore, "product", id);
      await deleteDoc(productRef);
    } catch (error) {
      console.log(error);
    }
  },

  async uploadImage(file) {
    const storage = getStorage(app);

    if (file) {
      const storageRef = ref(storage, "images/" + file.name);
      try {
        const snapshot = await uploadBytes(storageRef, file);
        const imageUrl = await getDownloadURL(snapshot.ref);
        return imageUrl;
      } catch (error) {
        console.error("Erro ao fazer upload da imagem:", error);
      }
    }
  }
};
