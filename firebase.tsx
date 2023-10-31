import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
    apiKey: "AIzaSyAmdkTrgHZiUh6BrQj8UAvnPWMskMZESiw",
    authDomain: "sbaynews-2b6a5.firebaseapp.com",
    projectId: "sbaynews-2b6a5",
    storageBucket: "sbaynews-2b6a5.appspot.com",
    messagingSenderId: "552755871118",
    appId: "1:552755871118:web:1349ca2fdfa536666478df"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);