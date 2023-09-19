import React, { useEffect } from 'react'
import Header from '../Layout/Header'
import PostComponent from '../common/PostComponent';
import Footer from '../Layout/Footer';
import { Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { GET_ALL_ARTICAL_ROUTE } from '../../constants/apiEndpoints';

function Home(props:any) {
  const {getAllArticals} = props;
  const navigate = useNavigate()
  useEffect(()=>{
    if(!props.isLogin){
      navigate('/auth')
    }
  });

  useEffect(()=>{
    (async()=>{
      var myHeaders = new Headers();
      myHeaders.append("authorization", document.cookie?.split('=')[1]);
      var requestOptions:any = {
        method: 'GET',
        redirect: 'follow',
        headers:myHeaders
      };
      const reposen = await fetch(GET_ALL_ARTICAL_ROUTE, requestOptions);
      const responseData = await reposen.json();
      getAllArticals(responseData.data);
    })();
  },[]);
  
  return (
    <div>
      <Header showSearch={true} {...props}></Header>
      {props.articals?.length > 0 ?
        <Container style={{gap:'10px',display:'flex',flexDirection:'column',marginTop:'30px'}}>
      {
       props.articals?.map((item:any,inx:any)=>{
          return (
              <PostComponent key={inx} postData={item} touchable={true} {...props}/>
          )
        })
      }
      </Container> : 
      <Container style={{display:'flex',justifyContent:'center',alignItems:'center',height:'70vh'}}>
        <h2>Artical Not Found</h2>
      </Container>
      }
      <Footer/>
    </div>
  )
}

export default Home
