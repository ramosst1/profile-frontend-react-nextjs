'use client'
import './globals.css'
import { Inter } from 'next/font/google'
import NavBarTop from './nav-bar-top'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Box, CssBaseline, Toolbar } from '@mui/material';
import { AuthProvider } from './context/AuthContext';

if(process.env.NODE_ENV === 'development'){
  import('./mocks').then(({setupMock}) => {
    setupMock();
   })
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#0d47a1',
      dark: '#093170',
      light: '#3d6bb3'
      
    },
    secondary: {
      main: '#00695c',
      dark: '#004940',
      light: '#33877c'
    }, 
    error:{
      main: '#d32f2f'
    }
  },
});


export const metadata = {
  title: 'Sample Site',
  description: 'This is a sample site.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <html lang="en">
          <body>
              <CssBaseline />
                <NavBarTop/>
                <Box component="main" margin={{md:10,xs:1}}
                    sx={{ width:'100%'}}
                >
                    <Toolbar />
                    {children}
                </Box>
          </body>            
        </html>
      </ThemeProvider>
    </AuthProvider>
  )
}
