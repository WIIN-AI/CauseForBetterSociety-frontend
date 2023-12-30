import { Grid } from '@mui/material'
import React, { useEffect } from 'react'
import Menu from '../components/UI/Menu'
import SavedCard from '../components/UI/SavedCard'
import useFetch from '../components/hooks/useFetch'
import Loader from '../components/UI/loader/Loader'
import { useNavigate } from 'react-router'
import { loginDetails } from '../components/loginDetails'

const SavedPost = ({setOpenComment}) => {

  const navigate = useNavigate();
  const login  = loginDetails.login

  useEffect(()=>{
    !login && navigate('/')
  },[login ,navigate])

  const {data : savedCardData , pending , error} = useFetch(`${process.env.REACT_APP_API}/get_images/`)
  error && alert(error)

  return (
    <Grid mt={8} marginX={1} className="flex">
      <Grid container md={8} item display={"block"} padding={'0 20px'}>
        <p className='medium font-600'>Saved Posts</p>
        <br/>
        <Grid container flexDirection={'row'} item columnSpacing={2} rowSpacing={2}>
        {pending && <Loader/>}
        {savedCardData.map((data, i) => <SavedCard key={i} data={data} id={i} setOpenComment={setOpenComment} />)}
        </Grid>
      </Grid>
      <Menu/>
    </Grid>
  )
}

export default SavedPost