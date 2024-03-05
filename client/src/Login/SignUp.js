import * as React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { setUser } from './loginSlice';

export default function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userUp, setUserUp] = useState({ FirstName: '', LastName: '', Passward: '', Email: '', PhoneNumber: '', Age: 3, ProfilImage: '', FileImage: null });
  const [status2, setStatus2] = useState(null);
  const [messagePassword, setMessagePassword] = useState('');
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;

  const funcPassword = (e) => {
    setUserUp((prevUser) => ({ ...prevUser, Passward: e.target.value }));
  };

  const funcFirstName = (e) => {
    setUserUp((prevUser) => ({ ...prevUser, FirstName: e.target.value }));
  };

  const funcLastName = (e) => {
    setUserUp((prevUser) => ({ ...prevUser, LastName: e.target.value }));
  };

  const funcPhone = (e) => {
    const phoneNumber = +e.target.value;
    setUserUp((prevUser) => ({ ...prevUser, PhoneNumber: phoneNumber }));
  };

  const funcEmail = (e) => {
    setUserUp((prevUser) => ({ ...prevUser, Email: e.target.value }));
  };

  const funcAge = (e) => {
    setUserUp((prevUser) => ({ ...prevUser, Age: e.target.value }));
  };

  const funcImg = (e) => {
    const formData = new FormData();
    formData.append('image-upload', e.target.files[0]);
    setUserUp((prevUser) => ({ ...prevUser, ProfilImage: e.target.files[0]?.name || null, FileImage: e.target.files[0] }));
  };


  const signUp = async (e) => {
    e.preventDefault();
    const errors = [];

    // Check for validation errors
    if (!userUp.Email.endsWith('@gmail.com')) {
      errors.push('Please enter a valid Gmail address.');
    }
    if (!(userUp.Age > 2 && userUp.Age < 121)) {
      errors.push('Please enter a valid age (3-120).');
    }
    if ((String(userUp.PhoneNumber)).length !== 9) {
      errors.push('Please enter a 10-digit phone number.');
    }
    if (!passwordRegex.test(userUp.Passward)) {
      errors.push('Password must be at least 6 characters long and contain at least one lowercase letter, one uppercase letter, and one digit.');
    }

    // Display errors if any, else proceed with sign up
    if (errors.length > 0) {
      setMessagePassword(errors.join(' '));
    } else {
      setMessagePassword('');
      try {
        const formData = new FormData();
        formData.append('FirstName', userUp.FirstName);
        formData.append('LastName', userUp.LastName);
        formData.append('Passward', userUp.Passward);
        formData.append('Email', userUp.Email);
        formData.append('PhoneNumber', userUp.PhoneNumber);
        formData.append('Age', userUp.Age);
        formData.append('ProfilImage', userUp.ProfilImage);
        formData.append('FileImage', userUp.FileImage); // Add the file to the FormData
        const headers = {
          'Content-Type': 'multipart/form-data', // Manually set the header
        };
        const response = await axios.post('https://localhost:7001/api/User/signUp', formData, { headers });
        console.log(response.data);
        dispatch(setUser(response.data));
        setStatus2(response.status.toString());
        navigate('/');
      } catch (error) {
        console.error('Error signing up:', error);
        if (error.response) {
          console.log("response: ", error.response.data, error.response.status, error.response.headers);
        } else if (error.request) {
          console.log("request : ", error.request);
        } else {
          console.log('Error', error.message);
        }
        console.log(error.config);
      }
    }
  };



  return (
    <div className="modal-left">
      <h1 className="modal-title">sign in</h1>
      <div style={{display: 'flex', flexDirection: 'row'}}>
        <div className="input-block">
          <label htmlFor="text" className="input-label">First name</label>
          <input type="FirstName" name="FirstName" id="FirstName" onChange={funcFirstName} placeholder="First name" />
        </div>
        <div className="input-block">
          <label htmlFor="text" className="input-label">Last name</label>
          <input type="LastName" name="LastName" id="LastName" onChange={funcLastName} placeholder="Last name" />
        </div>
      </div>

      
      <div className="input-block">
        <label htmlFor="email" className="input-label">Email</label>
        <input required type="email" name="email" id="email" onChange={funcEmail} placeholder="Email" />
      </div>
      <div style={{display: 'flex', flexDirection: 'row'}}>
      <div className="input-block">
        <label htmlFor="number" className="input-label">Phone</label>
        <input required type="text" name="phone" id="phone" onChange={funcPhone} placeholder="Phone" />
      </div>
      <Grid item xs={5} sm={2}>
        <TextField inputProps={{ type: 'number', min: 3, max: 120 }} onChange={funcAge} required fullWidth id="age" label="Age" name="age" autoComplete="age" />
      </Grid>
      </div>
      <div className="input-block">
        <label htmlFor="password" className="input-label">Password</label>
        <input required type="password" name="password" id="password" onChange={funcPassword} placeholder="Password" />
      </div>
      {status2 && <div>There is a user with this email address.</div>}
      <div style={{ display: 'grid', gridTemplateColumns: 'auto auto auto auto', margin: '30px' }}>
        <div>
          <input accept="image/*" type="file" id="image-upload" onChange={funcImg} style={{ display: 'none' }} />
          <label htmlFor="image-upload">
            <Button component="span" variant="contained" startIcon={<CloudUploadIcon />} style={{ backgroundColor: 'secondary.main' }}>
              Upload profile image
            </Button>
          </label>
        </div>
      </div>
      {messagePassword && <div>{messagePassword}</div>}
      <div></div>
      <div className="modal-buttons">
        <Link to={"SignIn"}>already have an account?</Link>
        <button className="input-button" onClick={signUp}>sign up</button>
      </div>
    </div>
  );
}
