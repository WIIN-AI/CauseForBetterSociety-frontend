import { Container, Grid } from '@mui/material'
import React, { useEffect } from 'react'
import Menu from '../components/UI/Menu'
import Loader from '../components/UI/loader/Loader'
import SavedCard from '../components/UI/SavedCard'
import useFetch from '../components/hooks/useFetch'
import { useNavigate } from 'react-router'
import { loginDetails } from '../components/loginDetails'

const MyArticle = ({setOpenComment}) => {

  const navigate = useNavigate();
  const login  = loginDetails.login

  useEffect(()=>{
    !login && navigate('/')
  },[login ,navigate])

  const {data : totalData , pending , error} = useFetch(`${process.env.REACT_APP_API}/get_images/`)
  error && alert(error)

  const userDetails = JSON.parse(localStorage.getItem('userDetails'));
  const yourArticleData = totalData.filter(e => e.email === userDetails.email)

  return (
    <Grid mt={8} marginX={1} className="flex">
      <Grid container md={8} item display={"block"}>
      <Container maxWidth="sm">
        <p className='medium font-600'>My Article</p>
        <br/>
        {yourArticleData.length === 0 && !pending && <p className='medium font-400'>No Articles are found</p>}
        <Grid container flexDirection={'row'} item columnSpacing={2} rowSpacing={2}>
        {pending && <Loader/>}
        {yourArticleData.map((data, i) => <SavedCard key={i} data={data} id={i} setOpenComment={setOpenComment} />)}
        </Grid>
      </Container>
      </Grid>
     <Menu/>
    </Grid>
  )
}

export default MyArticle