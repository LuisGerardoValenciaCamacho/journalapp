import { createTheme } from "@mui/material"
import { red } from "@mui/material/colors";

export const greenTheme = createTheme({
    palette: {
        primary: {
            main: "#2b9207"
        },
        secondary: {
            main: "#30a208"
        },
        error: {
            main: red.A400
        }
    }

});