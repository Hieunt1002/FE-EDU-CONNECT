import React from "react";
import { Box } from "@mui/material";
import "./GlobalStyles.scss"

function GlobalStyles({ children }) {
    return ( 
        <Box>
            {children}
        </Box>
     );
}

export default GlobalStyles;