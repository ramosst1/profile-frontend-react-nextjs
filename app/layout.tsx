'use client'
import './globals.css'
import { Inter } from 'next/font/google'
import NavBarTop from './nav-bar-top'

import { ThemeProvider, createTheme } from '@mui/material/styles';
// import { AuthProvider } from './context/AuthContext';

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



const inter = Inter({ subsets: ['latin'] })

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
    <>
        <ThemeProvider theme={theme}>
        <html lang="en">
            <NavBarTop/>
            <body className={inter.className}>{children}</body>
        </html>
    </ThemeProvider>
    </>


  )
}
