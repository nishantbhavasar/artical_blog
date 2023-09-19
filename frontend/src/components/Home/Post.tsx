import React, { useEffect, useState } from 'react'
import PostComponent from '../common/PostComponent';
import Header from '../Layout/Header';
import { useParams } from 'react-router-dom';
import { Container } from '@mui/material';
import { GET_ARTICAL_ROUTE } from '../../constants/apiEndpoints';

function Post(props: any) {
  const { id } = useParams();
  const [loading,setLoading] = useState(true);

  useEffect(() => {
    (async ()=>{
      if (id) {
        var myHeaders = new Headers();
        myHeaders.append("authorization", document.cookie?.split('=')[1]);
        var requestOptions: any = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };
        const response = await fetch(GET_ARTICAL_ROUTE + id, requestOptions)
        const postData = await response.json()
        props.getArtical(postData.data)
        setLoading(false);
      }
    })();
  },[])
  // userID
  return (
    <>
      <Header showSearch={false} {...props}></Header>
      <Container style={{ padding: '20px' }}>
        {!loading ? <PostComponent postData={props.post} touchable={false} {...props} />:''}
      </Container>
    </>
  )
}

export default Post
