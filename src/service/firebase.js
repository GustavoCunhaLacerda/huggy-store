import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCFezVV4zGCFkPgCNtkDbSg71vRD6yxADQ",
  authDomain: "huggy-store.firebaseapp.com",
  projectId: "huggy-store",
  storageBucket: "huggy-store.appspot.com",
  messagingSenderId: "5612512489",
  appId: "1:5612512489:web:72d3cfe0c8dd7ade4f3c78",
  measurementId: "G-BJVK5NS16M",
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

// rules_version = '2';
// service firebase.storage {
//   match /b/{bucket}/o {
//     match /{allPaths=**} {
//      allow read: if true
//     }
//   }
// }