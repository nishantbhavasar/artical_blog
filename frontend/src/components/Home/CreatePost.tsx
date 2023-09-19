import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { CREATE_POST_ROUTE } from '../../constants/apiEndpoints';
import { Button, Container, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import Header from '../Layout/Header';

function CreatePost(props: any) {
    const { handleLogout, isLogin, userData } = props
    const { id } = useParams();

    const navigate = useNavigate();
    const [articalInfo, setArticalInfo] = useState({
        "title": "",
        "description": "",
        "category": ""
    })
    const [errorMessage, setErrorMessage] = useState({
        status: false,
        message: ''
    })
    useEffect(() => {
        if (!isLogin) {
            navigate('/auth')
        }
    }, [])

    useEffect(() => {
        (async () => {
            if (id) {
                var myHeaders = new Headers();
                var requestOptions: any = {
                    method: 'GET',
                    headers: myHeaders,
                    redirect: 'follow'
                };
                myHeaders.append("Content-Type", "application/json");
                myHeaders.append("authorization", document.cookie?.split('=')[1]);
                const response = await fetch(`http://localhost:5000/api/post/${id}`, requestOptions)
                const responseData = await response.json();
                console.log('responseData==>',responseData)
                setArticalInfo(responseData?.data)
            }
        })();
    }, [])

    const fixedCategory = ['Food', 'Educations', 'Businessmen', 'Positions'];
    const handleCreatePost = async () => {
        console.log(articalInfo, !articalInfo?.title?.trim?.(), !articalInfo?.description?.trim?.(), !articalInfo?.category?.trim?.(), !fixedCategory.includes(articalInfo?.category?.trim()))
        if (!articalInfo?.title?.trim?.() || !articalInfo?.description?.trim?.() || !articalInfo?.category?.trim?.() || !fixedCategory.includes(articalInfo?.category?.trim())) {
            setErrorMessage({ status: true, message: "Please fill required Fields" });
        } else {
            var myHeaders = new Headers();
            myHeaders.append("authorization", document.cookie?.split('=')[1]);
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify(articalInfo);
            var requestOptions: any = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            const response = await fetch("http://localhost:5000/api/createpost", requestOptions);
            const reposnseData = await response.json();
            if (reposnseData.success) {
                navigate('/');
            } else {
                setErrorMessage({
                    status: true,
                    message: reposnseData.message
                })
            }
        }
    }

    const handleUpdatePost = async () => {
        console.log("update called")
        console.log(articalInfo, !articalInfo?.title?.trim?.(), !articalInfo?.description?.trim?.(), !articalInfo?.category?.trim?.(), !fixedCategory.includes(articalInfo?.category?.trim()))
        if (!articalInfo?.title?.trim?.() || !articalInfo?.description?.trim?.() || !articalInfo?.category?.trim?.() || !fixedCategory.includes(articalInfo?.category?.trim())) {
            setErrorMessage({ status: true, message: "Please fill required Fields" });
        } else {
            var myHeaders = new Headers();
            myHeaders.append("authorization", document.cookie?.split('=')[1]);
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify(articalInfo);
            var requestOptions: any = {
                method: 'PUT',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            const response = await fetch(`http://localhost:5000/api/updatepost/${id}`, requestOptions);
            const reposnseData = await response.json();
            if (reposnseData.success) {
                navigate('/');
            } else {
                setErrorMessage({
                    status: true,
                    message: reposnseData.message
                })
            }
        }
    }

    return (
        <>
            <Header {...props} />
            <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh', width: '100vw' }}>
                <Container fixed style={{ width: '600px', borderRadius: '20px', gap: '20px', display: 'flex', border: "1px solid blue", flexDirection: 'column', paddingBlock: '20px', height: '500px', justifyContent: 'center' }}>
                    <TextField id="outlined-basic" value={articalInfo.title} onChange={(e) => { setArticalInfo({ ...articalInfo, title: e.target.value }) }} label="Title" variant="outlined" />
                    <TextField multiline id="outlined-basic" value={articalInfo.description} onChange={(e) => { setArticalInfo({ ...articalInfo, description: e.target.value }) }} label="Description" variant="outlined" />
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Category</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={articalInfo.category}
                            label="Category"
                            onChange={(e) => { setArticalInfo({ ...articalInfo, category: e.target.value }) }}
                        >
                            <MenuItem value={'Food'}>Food</MenuItem>
                            <MenuItem value={'Educations'}>Educations</MenuItem>
                            <MenuItem value={'Businessmen'}>Businessmen</MenuItem>
                            <MenuItem value={'Positions'}>Positions</MenuItem>
                        </Select>
                    </FormControl>
                    {errorMessage?.status ? <span style={{ color: 'red', cursor: 'pointer' }} >{errorMessage.message}</span> : null}
                    <Button variant="contained" onClick={() => { if (!id) { handleCreatePost() } else { handleUpdatePost() } }}>{id ? "Update Post" : 'Create Post'}</Button>
                </Container>
            </Container>
        </>
    )
}

export default CreatePost
