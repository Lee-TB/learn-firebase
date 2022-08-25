import { useState } from 'react';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
} from 'firebase/auth';

function Authentication() {
  const [data, setData] = useState({});
  const auth = getAuth();

  const handleChange = (e) => {
    let newData = { [e.target.name]: e.target.value };
    setData({ ...data, ...newData });
  };

  const handleCreate = () => {
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((response) => {
        console.log('create user success: ', response);
      })
      .catch((error) => {
        console.log('create user error: ', error);
      });
  };

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((response) => {
        console.log('sign in success: ', response);
      })
      .catch((error) => {
        console.log('sign in error: ', error);
      });
  };

  const handleSignOut = () => {
    signOut(auth)
      .then((response) => {
        console.log('sign out success: ', response);
      })
      .catch((error) => {
        console.log('sign out error: ', error);
      });
  };

  const showCurrentUser = () => {
    const user = auth.currentUser;
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      // ...
      console.log(user);
    } else {
      console.log('No user is signed in.');
    }
  };

  const verifyEmail = () => {
    sendEmailVerification(auth.currentUser).then(() => {
      console.log('Email verification sent!');
    });
  };

  return (
    <section>
      <h2>Firebase Authentication With Email And Password</h2>
      <div>
        <input placeholder="email" name="email" onChange={handleChange} />
        <input placeholder="password" name="password" onChange={handleChange} />
      </div>
      <div style={{ padding: 10 }}></div>
      <div>
        <button onClick={handleCreate}>Create</button>
        <button onClick={handleSignIn}>Sign In</button>
        <button onClick={handleSignOut}>Sign Out</button>
        <button onClick={showCurrentUser}>Show Current User</button>
        <button onClick={verifyEmail}>Verify Email</button>
      </div>
    </section>
  );
}

export default Authentication;
