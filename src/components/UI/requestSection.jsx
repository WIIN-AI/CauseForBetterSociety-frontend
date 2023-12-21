import React from "react";
import { Box } from "@mui/material";

const RequestSection = ({ id }) => {
  return (
    <Box mb={8} role="presentation">
      <p className="sub-heading font-600 center">Request's to complete</p><br/>
      <p>No preview is available</p>
    </Box>
  );
};

export default RequestSection;
