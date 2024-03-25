import { Box ,Card, CardContent, Button } from '@mui/material'
import React from 'react'
import './MainPage.css'
// import Card from '@mui/material'

const MainPage = () => {
  return (
    <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    margin={10}
    
    >
        <Box
        width={1000}
        height={10000}
        >

        <Card variant='outlined'>
           <CardContent >
            <div className='newClass'>

           <Button type="submit" variant="contained" color="primary" >
            <a href='/admin'>MINISTRY</a>
        
      </Button>
           <Button type="submit" variant="contained" color="primary">
        
            <a href='/uni'>UNIVERSITY</a>
      </Button>
           <Button type="submit" variant="contained" color="primary">
            <a href='/student'>STUDENT</a>
        
      </Button>
            </div>
           </CardContent>
        </Card>



        </Box>
    </Box>
  )
}

export default MainPage