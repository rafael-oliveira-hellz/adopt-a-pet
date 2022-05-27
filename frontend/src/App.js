import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Components
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Container from "./components/layout/Container";
import Message from "./components/layout/Message";

// Pages > Auth
import Home from "./components/pages/Home";
import Login from "./components/pages/Auth/Login";
import Register from "./components/pages/Auth/Register";

// Context
import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <Router>
      <UserProvider>
        <Navbar />
        <Message />
          <Container>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </Container>
        <Footer />
      </UserProvider>
    </Router>
  );
}

export default App;
