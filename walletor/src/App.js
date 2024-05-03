import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Layout from './components/Layout/Layout/Layout';
import User from './pages/User';
import AuthenticatedRoute from './components/Hoc/PrivateRoute/AuthenicatedRoute';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/login" exact element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path='/' element={
              <AuthenticatedRoute>
                <Home />
              </AuthenticatedRoute>
            } />
            <Route path='/user' element={
              <AuthenticatedRoute>
                <User />
              </AuthenticatedRoute>
            } />
          </Routes>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
