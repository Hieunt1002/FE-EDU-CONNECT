import { Box } from "@mui/system";
import React from "react";
import Iframe from "react-iframe";

function DemoPage() {
    return (
        <Box sx={{ marginBottom: '50px', height: '100%' }}>
            <Iframe src="https://www.vascak.cz/data/android/physicsatschool/canvas/opt_lupa_Canvas.html?l=fr" styles={{
                height: 'calc(90vh - 33px)',
                width: 'calc(1.6 * (110vh - 33px))',
                border: '1px solid silver',
            }}></Iframe>
        </Box>
    );
}

export default DemoPage;