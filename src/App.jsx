import React from 'react'
import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider,
} from "react-router-dom";
import Registration from './pages/Registration/Registration';
import Login from './pages/Login';
import Home from './pages/Home';
import Rootlayout from './layout/Rootlayout';
import Message from './pages/Message';
import Notification from './pages/Notification';
import Setting from './pages/Setting';
import Logout from './pages/Logout';
import ForgetPassword from './pages/ForgetPassword';


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/registration" element={<Registration />}>Sign in</Route>
      <Route path="/login" element={<Login />}>Sign up</Route>
      <Route path="/forgetpassword" element={<ForgetPassword />}>Forgot password?</Route>
      <Route path="/" element={<Rootlayout />}>
        <Route index element={<Home />}></Route>
        <Route path='/message' element={<Message />}></Route>
        <Route path='/notification' element={<Notification />}></Route>
        <Route path='/setting' element={<Setting />}></Route>
        <Route path='/logout' element={<Logout />}></Route>
      </Route>
    </>

  )
);

const App = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default App