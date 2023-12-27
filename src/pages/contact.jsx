import { Box, Container, Divider, Grid, Paper, TextField } from '@mui/material'
import React from 'react'
import Menu from '../components/UI/Menu'

const Contact = () => {
  return (
    <Grid mt={8} marginX={1} className="flex">
       <Grid container md={8} item display={"block"} pt={3}>
        <Container maxWidth="sm">
          <p className="heading font-900">
            Cause.For.Better.Society
          </p>
          <br />
            <Divider/>
          <br />
          <p className="sub-heading font-800">
          Contact Us  :
          </p>
          <br/>
          <p className="medium font-600">
          Cause For Better Society, Together
          </p>
          <br />
          <p className="text-justified font-400">
          We believe in the power of collective action to create a stronger, more equitable India for all. We welcome your ideas, feedback, and support as we work towards this shared vision.
          </p>
          <br />
          <p className="text-justified font-500">
          Here are ways to connect with us:
          </p>
          <br />
          <p className="text-justified font-500">
          1. Reach out directly:
          </p><br/>
          <Paper elevation={1} sx={{
              height: 'auto',
              padding: '5vh',
              boxSizing: 'border-box'
           }}>
          <form>
          <TextField
              fullWidth
              required
              type='text'
              placeholder="Name"
              sx={{
                margin: "5px 0",
              }}
            />
            <TextField
              fullWidth
              required
              type='number'
              placeholder="Mobile"
              sx={{
                margin: "5px 0",
              }}
            />
            <TextField
              fullWidth
              type='email'
              required
              placeholder="Email"
              sx={{
                margin: "5px 0",
              }}
            />
            <Box mt={1.5} textAlign={"center"} >
                <button type="submit" className="button">
                  submit
                </button>
                <button type="reset" className="reset">
                  reset
                </button>
            </Box>
            </form>
            </Paper>
          <br /><br />
          <p className="text-justified font-500">
          2. Get involved:
          </p><br/>
          <p className="text-justified medium font-300">

          <p className="font-400">Volunteer: We have opportunities for people of all skills and backgrounds to contribute to our cause. Learn more about volunteering here: [volunteer_page_url].</p><br/>

          <p className="font-400">Donate: Your financial support allows us to continue our work and make a real difference. Donate securely here: [donation_page_url].</p><br/>

          <p className="font-400">Attend events: We host regular events where you can learn more about our work, connect with other like-minded individuals, and take action. See upcoming events here: [events_page_url]</p>
          </p><br/>
          {/* <p className="text-justified font-300">We value your voice and your commitment to making India a better place. No matter how you choose to connect, we appreciate your engagement and look forward to working with you!</p>
          <br /> */}
          <p className="sub-heading font-800">
          Additionally, you might consider including:
          </p>
          <br />
          <p className="text-justified medium font-300">
          <p className="font-400">A brief message about what motivates your work and what kind of impact you hope to achieve.</p><br/>
          <p className="font-400"> Specific calls to action for different audiences (e.g., students, professionals, donors, etc.).</p><br/>
          <p className="font-400"> Testimonials from supporters or beneficiaries of your work.</p><br/>
          <p className="font-400">Resources and information about the issues you address.</p> <br/>
          </p>
          <br />
          <br />
        </Container>
      </Grid>
      <Menu/>
    </Grid>
  )
}

export default Contact