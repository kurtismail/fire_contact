import { initializeApp } from "firebase/app";
import { child, get, getDatabase, ref, remove, set } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_apikey,
  authDomain: process.env.REACT_APP_authDomain,
  databaseURL: process.env.REACT_APP_databaseURL,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);

export function writeUserData(a) {
  set(ref(database, "users/" + a.id), {
    name: a.name,
    phone: a.phone,
    gender: a.gender,
    id: a.id,
  });
}

export const readData = (setTable) => {
  const dbRef = ref(database);
  get(child(dbRef, `users/`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        // console.log("database", snapshot.val());
        console.log("Read database");
        setTable(snapshot.val());
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

export const setData = (data, id, setContact) => {
  const dbRef = ref(database);
  get(child(dbRef, `users/`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        data.name = snapshot.val().name;
        data.phone = snapshot.val().phone;
        data.gender = snapshot.val().gender;
        console.log("setData");
        setContact(snapshot.val()[id]);
      } else {
        console.log("No data found");
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

export const delData = (id) => {
  remove(ref(database, `users/${id}`), {})
    .then(() => {
      // Data saved successfully!
      console.log("data removed");
    })
    .catch((error) => {
      // The write failed...
    });
};
