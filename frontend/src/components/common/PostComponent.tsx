import { Container } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Delete, Edit } from '@mui/icons-material';
import { DELETE_ARTICAL_ROUTE } from '../../constants/apiEndpoints';
type postDataType = { _id: string, title: string, category: string, description: string,userID:string }

function PostComponent({ postData, touchable ,userData}: { postData: postDataType, touchable: boolean ,userData:any}) {
  const navigate = useNavigate()
  const [auther, setAuther] = useState(false);
  useEffect(() => {
    if(postData.userID === userData?.id){
      setAuther(true);
    }
  },[])

  const handleDeleteArtical = async (id:string) =>{

    var myHeaders = new Headers();
    myHeaders.append("authorization", document.cookie?.split('=')[1]);
    var requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
      redirect: 'follow'
    };


  const response = await fetch(DELETE_ARTICAL_ROUTE+id, requestOptions as any)
  const responseData = await response.json()
  if(responseData.success){
    navigate('/');
  }
  }

  return (
    <Container style={{ padding: '20px', border: '1px solid gray', borderRadius: '20px', cursor: 'pointer' }}>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <h1 style={{ textTransform: 'capitalize', paddingBlock: '10px' }} onClick={() => { if (touchable) { navigate(`/post/${postData._id}`) } }}>{postData.title}</h1>
        <h3 style={{ textTransform: 'capitalize', color: 'gray' }} onClick={() => { if (touchable) { navigate(`/post/${postData._id}`) } }}>{"Category : " + postData.category || ''}</h3>
      </div>
      <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', padding: '20px' }}>
        <p onClick={() => { if (touchable) { navigate(`/post/${postData._id}`) } }}>{postData.description}</p>
       {auther && <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'end', gap: '10px' }}>
          <div onClick={()=>{handleDeleteArtical(postData._id)}}>
            <Delete color='error'></Delete>
          </div>
          <div onClick={()=>{navigate(`/updatePost/${postData._id}`)}}>
            <Edit color='info'></Edit>
          </div>
        </div>}
      </div>
    </Container>
  )
}

export default PostComponent
