import { Button, Grid, TextField } from '@mui/material'
import React, { useState } from 'react'
import LoginImage from "../../src/assets/images/login.jpg"
import LoginIcon from "../../src/assets/images/loginicon.png"
import styled from 'styled-components'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Bounce, toast, ToastContainer } from 'react-toastify'
import { Link } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import ErrorIcon from '@mui/icons-material/Error';
import { useNavigate } from 'react-router-dom'
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

//design
const BootstrapButton = styled(Button)({
  boxShadow: 'none',
  textTransform: 'none !important',
  fontSize: '17px !important',
  padding: '16px 12px !important',
  width: '375px',
  marginTop: '50px !important',
  borderRadius: '10px !important',
  border: '1px solid',
  lineHeight: 1.5,
  backgroundColor: '#5f35f5 !important',
  borderColor: '#5f35f5 !important',
  '&:hover': {
    backgroundColor: '#5f35f5',
    borderColor: '#5f35f5',
    boxShadow: '0 0 0 0.2rem rgba(95, 53, 245, .5) !important',
  },
});


const Login = () => {
  let navigate = useNavigate()
  const auth = getAuth();
  let [email, setEmail] = useState("")
  let [password, setPassword] = useState("")
  let [emailerr, setEmailerr] = useState("")
  let [passwordshow, setPasswordshow] = useState(false)
  let [error, setError] = useState("")

  let handleEmail = (e) => {
    setEmail(e.target.value)
    setEmailerr("")
    setError("")
  }
  let handlePassword = (e) => {
    setPassword(e.target.value)
    setError("")
  }
  let handleLogin = () => {
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setEmailerr("Invalid email")
    } else if (email && password && !emailerr) {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          toast.success('Successfully Login', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
          });
          setTimeout(() => {
            const user = userCredential.user;
            console.log(user)
            setEmail("");
            setPassword("");
            navigate('/home')
          }, 2000)
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          if (errorCode.includes("auth/invalid-credential")) {
            setError("Invalid Login Info")
          }
        });
    }
  }

  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <div className=' h-[100vh] flex items-center justify-end '>
            <div className=' mr-[70px] '>
              <h1 className=' text-[35px] font-bold text-[#03014C] mb-[30px] '>Login to your account!</h1>
              <button className=' flex items-center justify-center gap-[10px] w-[220px] h-[62px] border-solid border-[2px] border-[#03014C]/50 rounded-[10px] text-[16px] font-semibold text-[#03014C] '><img src={LoginIcon} alt="login" /> Login with Google</button>
              <div className=' mt-[40px] '>
                <TextField onChange={handleEmail} className=' w-[375px] ' id="standard-basic" label="Email Address" variant="standard" type="email" />
              </div>
              {emailerr && <p className='text-red-600 mt-1 flex items-center gap-1'><ErrorIcon fontSize='small' />{emailerr}</p>}
              <div className=' mt-[40px] relative '>
                <TextField onChange={handlePassword} className=' w-[375px] ' id="standard-basic" label="Password" variant="standard" type={passwordshow ? "text" : "password"} />
                {passwordshow ?
                  <VisibilityOffIcon onClick={() => setPasswordshow(!passwordshow)} className=" text-[#000000]/50 absolute top-4 right-5" /> :
                  <VisibilityIcon onClick={() => setPasswordshow(!passwordshow)} className=" text-[#000000]/50 absolute top-4 right-5" />
                }
              </div>
              <div className=' flex justify-between items-center mt-3 '>
                <FormControlLabel control={<Checkbox />} label="Remember me" />
                <a className=' font-semibold text-[16px] text-[#03014C] ' href="#">Forgot password?</a>
              </div>
              {error &&
                <p className='text-red-600 mt-1 flex items-center gap-1'><ErrorIcon fontSize='small' />{error}</p>
              }
              {email && password ? (<BootstrapButton onClick={handleLogin} variant="contained" disableRipple>Login to Continue</BootstrapButton>) :
                (<BootstrapButton onClick={handleLogin} disabled variant="contained" disableRipple>Login to Continue</BootstrapButton>)}

              <div className=' flex items-center gap-[8px] mt-[30px]'>
                <p className=' text-[16px] font-medium text-[#03014C] '>Don't have an account?</p>
                <Link to="/registration" className=' text-[16px] font-bold text-[#EA6C00] ' href="#">Sign up</Link>
              </div>
            </div>
          </div>
        </Grid>
        <Grid item xs={6}>
          <div>
            <img className=' w-full h-[100vh] object-cover ' src={LoginImage} alt="Login" />
          </div>
        </Grid>
      </Grid>
    </div>
  )
}

export default Login