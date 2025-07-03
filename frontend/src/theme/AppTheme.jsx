import { ThemeProvider } from '@mui/material/styles';
import { coporativeBlueTheme } from "./corporativeBlueTheme"
import { CssBaseline } from "@mui/material"

export const AppTheme = ({children}) => {
    return (
        <ThemeProvider theme={coporativeBlueTheme}>
            <CssBaseline/>
            {children}
        </ThemeProvider>

    )
}