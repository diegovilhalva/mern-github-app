import { Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
import SignUpPage from "./pages/SignUpPage"
import LoginPage from "./pages/LoginPage"
import ExplorePage from "./pages/ExplorePage"
import LikesPage from "./pages/LikesPage"
import Sidebar from "./components/Sidebar"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { useAuthContext } from "./context/AuthContext"



function App() {

const {authUser} = useAuthContext()
console.log('Authenticated user',authUser)
  return (
    <div className="flex">
      <Sidebar />
      <ToastContainer/>
      <div className="max-w-5xl my-5 text-white mx-auto transition-all duration-300 flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/likes" element={<LikesPage />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
