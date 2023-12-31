import { Container, Divider, Grid, useMediaQuery } from "@mui/material";
import React from "react";
import Menu from "../components/UI/Menu";

const About = () => {

  return (
    <Grid mt={8} marginX={1} className="flex">
      <Grid container md={8} item display={"block"} pt={3}>
        <Container maxWidth="sm">
          <p className={`heading font-900`}>
          Cause For Better Society
          </p>
          <br />
            <Divider/>
          <br />
          <p className="sub-heading font-800">
            About Us :
          </p> <br />
          <p className="medium font-600">
          Cause For Better Society, Together
          </p>
          <br />
          <p className="text-justified  font-500">
            We believe in the power of unity, compassion, and action to create a
            more just and equitable India. We are a diverse group of individuals
            driven by a common goal: to make a positive impact on the lives of
            others and contribute to a better future for our nation.
          </p>
          <br />
          <p className="text-justified  font-400">
            Empowering communities: We collaborate with local communities to
            understand their needs and develop sustainable solutions. This could
            involve initiatives like education programs, healthcare access,
            environmental projects, or economic development ventures.
          </p>
          <br />
          <p className="text-justified  font-400">
            Fostering innovation: We encourage and support innovative ideas that
            address social issues. We provide resources, mentorship, and
            networking opportunities to individuals and organizations working on
            impactful projects.
          </p>
          <br />
          <p className="text-justified  font-400">
            Advocating for change: We raise our voices to advocate for policies
            and systems that promote social justice and equality. We engage with
            policymakers, influencers, and the public to create a more inclusive
            and equitable India.
          </p>
          <br />
          <p className="sub-heading font-800">
            Our values are the foundation of everything we do:
          </p>
          <br />
          <p className="text-justified  font-400">
            <span className=" font-500">Collaboration: </span> We believe that working together is essential to
            achieve lasting change. We value diversity and encourage open
            communication and collaboration among all stakeholders.
          </p>
          <br />
          <p className="text-justified  font-400">
            <span className=" font-500">Integrity:</span> We are committed to transparency, accountability, and
            ethical conduct in all our endeavors.
          </p>
          <br />
          <p className="text-justified  font-400">
          <span className=" font-500">Inclusivity:</span> We believe in the inherent worth and dignity of every
            individual, regardless of their background or circumstances. We
            strive to create a society where everyone feels valued and has the
            opportunity to thrive.
          </p>
          <br />
          <p className="text-justified  font-400">
          <span className=" font-500">Impact: </span>We are driven by a desire to make a real and lasting
            difference in the lives of others. We measure our success by the
            positive impact we create in communities across India.
          </p>
          <br />
          <p className="text-justified  font-600">
            We invite you to join us on this journey. Whether you want to
            volunteer your time, donate your resources, or simply spread the
            word about our work, every contribution is valuable. Together, we
            can build a brighter future for India, one step at a time.
          </p>
          <br />
          <br />
        </Container>
      </Grid>
      <Menu />
    </Grid>
  );
};

export default About;
