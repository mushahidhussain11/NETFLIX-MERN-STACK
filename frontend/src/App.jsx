import React, { useEffect } from "react"
import {Navigate, Route,Routes} from "react-router-dom";
import HomePage from "./pages/home/HomePage"
import LoginPage from "./pages/LoginPage"
import SignUpPage from "./pages/SignUpPage"
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authUser";
import { Loader } from "lucide-react";
import WatchPage from "./pages/WatchPage"
import SearchPage from "./pages/SearchPage";
import SearchHistoryPage from "./pages/SearchHistoryPage";
import NotFoundPage from "./pages/NotFoundPage"
function App() {
  
  const {user , isCheckingAuth, authCheck } = useAuthStore();

  useEffect(()=>{
    authCheck();
  },[authCheck])


  if(isCheckingAuth){
    return (
      <div className="h-screen">
        <div className="flex justify-center items-center bg-black h-full">
            <Loader className="animate-spin text-red-600 size-10"></Loader>
        </div>
      </div>
    )
  }
  return (
    <>
    <Routes>
        <Route path="/" element={<HomePage></HomePage>}></Route>
        <Route path="/login" element={ !user? <LoginPage></LoginPage> :  <Navigate to={"/"}></Navigate>}></Route>
        <Route path="/signup" element={!user? <SignUpPage></SignUpPage> : <Navigate to={"/"}></Navigate>}></Route>
        <Route path="/watch/:id" element={user? <WatchPage></WatchPage> : <Navigate to={"/login"}></Navigate>}></Route>
        <Route path="/search" element={user? <SearchPage></SearchPage> : <Navigate to={"/login"}></Navigate>}></Route>
        <Route path="/history" element={user? <SearchHistoryPage></SearchHistoryPage> : <Navigate to={"/login"}></Navigate>}></Route>
        <Route path="/*" element={<NotFoundPage></NotFoundPage>}></Route>
    </Routes>
    <Footer></Footer>
    <Toaster></Toaster>
    </>
  )
}

export default App;
