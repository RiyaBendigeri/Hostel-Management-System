import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import Home from './Home';
import ViewComplaints from './viewComplaints';
import Navbar from './Navbar';
import { AuthProvider } from './Authcontext'; // Import AuthProvider
import AdminViewComplaints from './Adminview'; // Import the new component
import ComplaintForm from './Complaintform';

// Inside your Routes



function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
     
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            
            <Route path="/view-complaints" element={<ViewComplaints />} />
            <Route path="/submit-complaint" element={<ComplaintForm />} />
           
            <Route path="/admin-view-complaints" element={<AdminViewComplaints />} />

            
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
