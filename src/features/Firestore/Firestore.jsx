import { useState } from 'react';
import { db } from '~/firebaseConfig';
import {
  doc,
  collection,
  addDoc,
  setDoc,
  getDoc,
  getDocs,
  Timestamp,
  where,
  query,
  updateDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { cityConverter, City } from './cityConverter';

function Firestore() {
  const usersCollection = collection(db, 'users');
  const [user, setUser] = useState({});

  const addUser = async () => {
    if (user.email && user.password) {
      try {
        const docRef = await addDoc(usersCollection, user);
        console.log(docRef);
      } catch (e) {
        console.error('Error adding document: ', e);
      }
    }
  };

  const getData = async () => {
    const querySnapshot = await getDocs(usersCollection);
    console.log(querySnapshot.forEach((doc) => console.log(doc.data())));
  };

  const readDocRef = async () => {
    const docRef = doc(db, 'users/LRZiFVu8DthHdzKpQxfb');
    console.log(docRef);
  };

  const setData = async () => {
    const docData = {
      stringExample: 'Hello world!',
      booleanExample: true,
      numberExample: 3.14159265,
      dateExample: Timestamp.fromDate(new Date('December 10, 1815')),
      arrayExample: [5, true, 'hello'],
      nullExample: null,
      objectExample: {
        a: 5,
        b: {
          nested: 'foo',
        },
      },
    };
    try {
      // Add a new document in collection "cities"
      await setDoc(doc(db, 'data', 'one'), docData);
      console.log('set Data success');
    } catch (error) {
      console.log('set data: ', error);
    }
  };

  const handleChange = (e) => {
    let newData = { [e.target.name]: e.target.value };
    setUser({ ...user, ...newData });
  };

  const setCity = async () => {
    const ref = doc(db, 'cities', 'LA').withConverter(cityConverter);
    try {
      await setDoc(ref, new City('Los Angeles', 'CA', 'USA'));
      console.log('set city success: ', ref);
    } catch (error) {
      console.log('set city error: ', error);
    }
  };

  const updateUser = async () => {};

  const readRoom = async () => {
    try {
      const roomsRef = collection(db, 'rooms');
      const q = query(roomsRef, where('owner', '==', 'lyduc'));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        console.log(doc.id, ' => ', doc.data());
      });
    } catch (error) {
      console.log(error);
    }
  };

  const addSubcollection = async () => {
    const colRef = collection(db, 'users/userID/name');
    const nameRef = await addDoc(colRef, {
      first: 'Duc',
      last: 'Tran',
    });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const values = {
      email: e.target.email.value,
      password: e.target.password.value,
    };
    const userDocRef = doc(db, `users/${values.email}`);
    try {
      await setDoc(userDocRef, values);
      console.log('them user thanh cong: ', userDocRef);
    } catch (error) {
      console.log('them that bai', error);
    }
  };

  const testMerge = async () => {
    const dataRef = doc(db, 'data/123');
    // the first try to delete one of these fields and click again
    // now remake original data and modify data after add merge: true
    // You can see setDoc work like updateDoc
    try {
      const updateTimestamp = await updateDoc(dataRef, {
        a: 1,
        c: 3,
        timestamp: serverTimestamp(),
      });
      console.log('update at: ', updateTimestamp);
    } catch (error) {
      console.log('update error: ', error);
    }
  };

  return (
    <section>
      <h2>Firebase Firestore</h2>
      <form onSubmit={handleOnSubmit}>
        <input placeholder="email" name="email" onChange={handleChange} />
        <input placeholder="password" name="password" onChange={handleChange} />
        <button type="submit">Submit</button>
      </form>
      <div style={{ padding: 10 }}></div>
      <button onClick={addUser}>Add data</button>
      <button onClick={getData}>Get data</button>
      <button onClick={readDocRef}>Read doc ref</button>
      <button onClick={setData}>Set Data</button>
      <button onClick={setCity}>Set city</button>
      <button onClick={updateUser}>Update user</button>
      <button onClick={readRoom}>Read rooms</button>
      <button onClick={addSubcollection}>Add subcollection</button>
      <button onClick={testMerge}>test testMerge</button>
    </section>
  );
}

export default Firestore;
