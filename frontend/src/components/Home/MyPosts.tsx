import React, { useEffect, useState } from 'react'
import PostComponent from '../common/PostComponent';
import Header from '../Layout/Header';
import { Container } from '@mui/material';
import Footer from '../Layout/Footer';
import { GET_MY_ARTICAL_ROUTE } from '../../constants/apiEndpoints';
import { useNavigate } from 'react-router-dom';

function MyPost(props: any) {
  const {isLogin} = props;
  const navigate = useNavigate()
  useEffect(()=>{
    if(!isLogin){
        navigate('/auth')
    }
})

  useEffect(() => {
    (async () => {
      var myHeaders = new Headers();
      myHeaders.append("authorization", document.cookie?.split('=')[1]);
      var requestOptions:any = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };
      const response = await fetch(GET_MY_ARTICAL_ROUTE+props.userData.id, requestOptions);
      const responseData = await response.json();
      if(responseData.success){
        props.getMyArticals(responseData.data)
      }
    })()
  }, [])

  return (
    <div>
      <Header showSearch={false} {...props}></Header>
      {props.myArticals?.length > 0 ? <Container style={{ gap: '10px', display: 'flex', flexDirection: 'column', marginTop: '30px' }}>
        {
          props?.myArticals?.map((item:any, inx:number) => {
            return (
              <PostComponent key={inx} postData={item} touchable={true} {...props} />
            )
          })
        }
      </Container> :
        <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
          <h2>You Don't Have Post Any Artical</h2>
        </Container>}
      <Footer />
    </div>
  )
}

export default MyPost
