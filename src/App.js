import { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { UserContext} from './Context/userContext';
import UserState from './Context/userContext';
import Header from './Components/Header';
import AdminHeader from './Components/AdminHeader';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Footer from './Components/Footer';
import Addgame from './Pages/Admin/Addgame';
import Games from './Pages/Admin/Games';
import Dashboard from './Pages/Admin/Dashboard';
import Editgames from './Pages/Admin/Editgames';
import Gamedetail from './Pages/Gamedetail';

function AppLayout() {
  const { currentuser } = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();

  const isAdminRoute = location.pathname.startsWith('/admin');

  // ✅ Redirect non-admins trying to access admin routes
  useEffect(() => {
    if (isAdminRoute && (!currentuser || !currentuser.isAdmin)) {
      navigate('/'); // Redirect to home page
    }
  }, [currentuser, isAdminRoute, navigate]);

  return (
    <div>
      {!isAdminRoute ? <Header /> : <AdminHeader />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/games/:id" element={<Gamedetail/>}></Route>
        <Route path="/login" element={<Login />} />
    
        {currentuser?.isAdmin && (
          <>
          <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/add-game" element={<Addgame />} />
            <Route path="/admin/games" element={<Games />} />
            <Route path="/admin/update-game/:id" element={<Editgames/>} />
            
          </>
        )}
      </Routes>
      {!isAdminRoute && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <UserState>
        <AppLayout />
      </UserState>
    </Router>
  );
}

export default App;
