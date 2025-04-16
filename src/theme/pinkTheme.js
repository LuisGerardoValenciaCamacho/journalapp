import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

export const pinkTheme = createTheme({
    palette: {
        primary: {
            main: "#a7048c"
        },
        secondary: {
            main: "#860871"
        },
        error: {
            main: red.A400
        }
    }
})
