import { Box, Container, useMediaQuery } from "@mui/material";
import React from "react";
import Notification from "./notification";

const Menu = () => {
  const matches = useMediaQuery("(min-width:900px)");

  return (
    <>
      {matches && (
        <Container maxWidth="xs">
          <Box position={"fixed"} style={{ marginTop: 8 }}>
            <Notification />
          </Box>
        </Container>
      )}
    </>
  );
};

export default Menu;
