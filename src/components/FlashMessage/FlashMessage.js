import {Snackbar, Button} from '@mui/material'
import { useState } from 'react'

const FlashMessage = ({message, show}) => {

  const [open, setOpen] = useState(show)

  const handleClose = (event, reason) => {
    if(reason === 'clickaway') {
      return
    } else {
      setOpen(false)
    }
  }


  return (
    <div>
      <Snackbar
      message={message}
      autoHideDuration={5000}
      open={open}
      onClose={handleClose}
      /> 
    </div>
  )
}

export default FlashMessage