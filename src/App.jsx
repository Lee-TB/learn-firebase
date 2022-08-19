import './App.css';
import AuthWithEmailAndPassword from './features/Authentication/AuthWithEmailAndPassword';
import { app } from './firebaseConfig';

function App() {
  return (
    <main>
      <AuthWithEmailAndPassword />
    </main>
  );
}

export default App;
