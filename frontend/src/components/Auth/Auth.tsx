import React, { useEffect, useState } from 'react'
import { Button, Container, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode'
import { LOGIN_ROUTE, REGISTER_ROUTE } from '../../constants/apiEndpoints';


function Auth(props:any) {
  let initialState = { email: '', password: '' }
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(initialState);
  const [login, setLogin] = useState(false);
  const [errorMessage, setErrorMessage] = useState({status:false,message:''});

  useEffect(()=>{
    let token = document.cookie.split('=')[1]
    if(token){
      let tokenData = jwt_decode(token)
      props.loginhandler(tokenData);
    }
    if(props.isLogin){
      navigate('/')
    }
  },[props.isLogin])

  const handleSubmit = async () => {
    setErrorMessage({status:false,message:""})
    if (!userInfo.email?.trim?.() || !userInfo?.password?.trim?.()) {
      setErrorMessage({status:true,message:"please fill required fields"})
    } else {
      const EmailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if(!EmailRegex.test(userInfo.email)){setErrorMessage({status:true,message:"Email is not valid"});return;}
      var raw = JSON.stringify({email_id:userInfo.email,password:userInfo.password});
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      var requestOptions:any = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
      if (login) {
        const response = await fetch(LOGIN_ROUTE, requestOptions);
        const responseData = await response.json();
        if(responseData.success){
          const decodedData:any = jwt_decode(responseData.token);
          document.cookie = `token=${responseData.token}`
          props.loginhandler(decodedData);
          setUserInfo(initialState);
        }else{
          setErrorMessage({status:true,message:responseData.message});
        }
      } else {
        const response = await fetch(REGISTER_ROUTE, requestOptions);
        const responseData = await response.json();
        if(responseData.success){
          setUserInfo(initialState);
          setLogin(true);
        }else{
          setErrorMessage({status:true,message:responseData.message});
        }
      }
    }
  }

  return (
    <Container style={{ display: 'flex', flex: 1, width: '100vw', height: '100vh', padding: 0, justifyContent: 'center', alignItems: 'center' }}>
      <Container fixed style={{ width: '400px', gap: '20px', display: 'flex', flexDirection: 'column', paddingBlock: '20px', height: '400px', justifyContent: 'center' }}>
        <TextField id="outlined-basic" value={userInfo.email} onChange={(e) => { setUserInfo({ ...userInfo, email: e.target.value }) }} label="Email" variant="outlined" />
        <TextField id="outlined-basic" value={userInfo.password} onChange={(e) => { setUserInfo({ ...userInfo, password: e.target.value }) }} label="Password" variant="outlined" />
        {errorMessage?.status ? <span style={{ color: 'red', cursor: 'pointer' }} >{errorMessage.message}</span> : null}
        <Button variant="contained" onClick={() => { handleSubmit() }}>{login ? 'Login' : 'Register'}</Button>
        <span style={{ color: 'gray', cursor: 'pointer' }} onClick={() => { setLogin(!login) }}>{login ? 'Create Account' : 'Alredy Have Account Login'}</span>
      </Container>
    </Container>
  )
}

export default Auth