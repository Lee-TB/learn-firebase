import './App.css';
import { BrowserRouter, Routes, Route, Outlet, Link } from 'react-router-dom';
import app from './firebaseConfig';
import Firestore from './features/Firestore/Firestore';
import Authentication from './features/Authentication/Authentication';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <div>
                <Link to="/firestore">
                  <button>Firestore</button>
                </Link>
                <Link to="/authentication">
                  <button>Authentication</button>
                </Link>
              </div>
              <Outlet />
            </>
          }
        >
          <Route path="firestore" element={<Firestore />} />
          <Route path="authentication" element={<Authentication />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
