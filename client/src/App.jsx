import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/layouts/footer"
import Header from "./components/layouts/header"
import Login from "./components/pages/login";
import Register from "./components/pages/register";
import UserProfile from "./components/pages/user/userProfile";
import UserHome from "./components/pages/user/userHome";
import WithdrawInterest from "./components/pages/user/withdrawInterest";
import UserInvestments from "./components/pages/admin/usersList";
import Invest from "./components/pages/user/invest";
import ProtectedRoutes from "./utils/protectedRoutes";
import Page404 from "./components/pages/404Page";

function App() {
  return (
    <>
    <Router>
    <Header />
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<ProtectedRoutes admin={false} />} >
      <Route path="/home" element={<UserHome />} />
      <Route path="/user" element={<UserProfile />} />
      <Route path="/invest" element={<Invest />} />
      <Route path="/user/:id/withdraw/interest" element={<WithdrawInterest />} />
      </Route>
      <Route element={<ProtectedRoutes admin={true} />} >
      <Route path="/admin" element={<UserInvestments />} />
      </Route>
      <Route path="*" element={<Page404 />} />
    </Routes>
    <Footer />
    </Router>
    </>
  )
}

export default App
