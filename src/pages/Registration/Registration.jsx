import { Button, Grid, TextField } from '@mui/material'
import "./registration.css"
import React, { useState } from 'react'
import RegistrationImage from "../../assets/images/registration.jpg"
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAuth, createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from "firebase/auth";
import { useNavigate } from 'react-router-dom'
import ErrorIcon from '@mui/icons-material/Error';

//design
const TextField2 = styled(TextField)({
  '& label.Mui-focused': {
    color: '#11175d',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#B2BAC2',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#B2BAC2',
      borderWidth: '2px',
    },
    '&:hover fieldset': {
      borderColor: '#B2BAC2',
      borderWidth: '2px',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#5f35f5',
    },
  },
  "& .MuiOutlinedInput-input": {
    padding: "16px"
  },
});
const BootstrapButton = styled(Button)({
  boxShadow: 'none',
  textTransform: 'none !important',
  fontSize: '17px !important',
  padding: '16px 12px !important',
  width: '375px',
  marginTop: '50px !important',
  borderRadius: '50px !important',
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

const Registration = () => {
  const auth = getAuth();

  //state
  let navigate = useNavigate()
  let [email, setEmail] = useState("")
  let [name, setName] = useState("")
  let [password, setPassword] = useState("")
  let [passworderr, setPassworderr] = useState("")
  let [emailerr, setEmailerr] = useState("")
  let [passwordshow, setPasswordshow] = useState(false)
  let [error, setError] = useState("")

  let handleEmail = (e) => {
    setEmail(e.target.value)
    setEmailerr("")
    setError("")
  }
  let handleName = (e) => {
    setName(e.target.value)
  }
  let handlePassword = (e) => {
    setPassword(e.target.value)
    setPassworderr("")
  }
  let handleRegistration = () => {
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setEmailerr("Invalid email")
    }
    if (!/^[a-zA-Z0-9!@#$%^&*.,/-_|+-]{6,15}$/.test(password)) {
      setPassworderr("Password must be at least 6 characters")
    } else if (email && name && password && !emailerr && !passworderr) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          updateProfile(auth.currentUser, {
            displayName: name, photoURL: "https://www.alaska.edu/_resources/images/placeholders/profile.png"
          }).then(() => {
            sendEmailVerification(auth.currentUser)
              .then(() => {
                toast.success('Registration Successful', {
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
                  setName("");
                  setPassword("");
                  navigate('/')
                }, 2000)
              });
          }).catch((error) => {
            console.log(error)
          });
          // Signed up 

        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          if (errorCode.includes("auth/email-already-in-use")) {
            setError("You have already used this email")
          }
          console.log(errorCode)
          console.log(errorMessage)
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
      <Grid container>
        <Grid item xs={6}>
          <div style={{ height: "100vh", display: "flex", justifyContent: "end", alignItems: "center" }}>
            <div style={{ marginRight: "70px" }}>
              <h1 className='title'>Get started with easily register</h1>
              <p className='sub_title'>Free register and you can enjoy it</p>
              <div className='inputBox'>
                <TextField2 onChange={handleEmail} className='registrationInput' label="Email Address" variant="outlined" type='email' />
              </div>
              {error && <p className='text-red-600 mt-1 flex items-center gap-1'><ErrorIcon fontSize='small' />{error}</p>}
              {emailerr && <p className='text-red-600 flex items-center gap-1 mt-1' ><ErrorIcon fontSize='small' />{emailerr}</p>}
              <div className='inputBox'>
                <TextField2 onChange={handleName} className='registrationInput' label="Full Name" variant="outlined" type='text' />
              </div>
              <div className="inputBox relative">
                <TextField2 onChange={handlePassword} className='registrationInput' label="Password" variant="outlined" type={passwordshow ? "text" : "password"} />
                {passwordshow ?
                  <VisibilityOffIcon onClick={() => setPasswordshow(!passwordshow)} className="text-[#000000]/50 absolute top-4 right-5" /> :
                  <VisibilityIcon onClick={() => setPasswordshow(!passwordshow)} className="text-[#000000]/50 absolute top-4 right-5" />
                }
              </div>
              {passworderr &&
                <p className='text-red-600 mt-1 flex items-start gap-1'><ErrorIcon fontSize='small' />{passworderr}</p>
              }
              {email && name && password ?
                (<BootstrapButton onClick={handleRegistration} variant="contained" disableRipple>Sign Up</BootstrapButton>) :
                (<BootstrapButton onClick={handleRegistration} disabled variant="contained" disableRipple>Sign Up</BootstrapButton>)
              }
              <div className=' flex items-center gap-[8px] mt-[35px] '>
                <p className='text-[16px] font-medium text-[#03014C]'>Already have an account?</p>
                <Link to="/login" className='text-[16px] font-bold text-[#EA6C00]' href="#">Sign in</Link>
              </div>
            </div>
          </div>
        </Grid>
        <Grid item xs={6}>
          <div style={{ height: "100vh" }}>
            <img className='registrationimg' src={RegistrationImage} alt="Registration" />
          </div>
        </Grid>
      </Grid>
    </div>
  )
}

export default Registration