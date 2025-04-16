import { Box, Toolbar } from '@mui/material'
import React from 'react'
import { NavBar, SideBar } from '../components';

export const JournalLayout = ({children}) => {

  const drawerWidth = 340;

  return (
    <Box sx={{display: "flex"}} className="animate__animated animate__fadeIn animate__faster">
        {/* Navbar */}
        <NavBar drawerWidth={drawerWidth}/>

        {/* Sidebar */}
        <SideBar drawerWidth={drawerWidth}/>

        <Box component="main" sx={{flexGrow: 1, p: 3}}>
            {/* Toolbar */}
            <Toolbar/>
            {children}
        </Box>
    </Box>
  )
}
