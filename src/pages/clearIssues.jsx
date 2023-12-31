import { Container, Grid, useMediaQuery } from '@mui/material'
import React from 'react'
import TimelineCard from '../components/UI/timelineCard'
import Loader from '../components/UI/loader/Loader'
import useFetch from '../components/hooks/useFetch'
import Menu from '../components/UI/Menu'

const ClearIssues = ({setOpenComment}) => {

  const {data : timelineCardData , pending , error} = useFetch(`${process.env.REACT_APP_API}/get_images/`)
  error && alert(error)

  const matches = useMediaQuery('(min-width:900px)');

  return (
    <Grid mt={8} marginX={1} className="flex">
       <Grid container md={8} item display={'block'}>
       <Container maxWidth={matches && "sm"}>
        <p className='medium font-600'>Cleared issues</p>
        <br/>
        {timelineCardData.length === 0 && !pending && <p className='medium font-400'>No cleared issues found</p>}
        <Grid flexDirection={'row'} item columnSpacing={2}>
        {pending && <Loader/>}
        {timelineCardData.map((data, i) => <TimelineCard key={i} data={data} id={i} setOpenComment={setOpenComment} />)}
        </Grid>
        </Container>
      </Grid>
      <Menu/>
    </Grid>
  )
}

export default ClearIssues