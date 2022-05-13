import { Snackbar} from '@mui/material'

import { useState } from 'react'

const FlashMessage = ({message, show, type}) => {

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
      <Snackbar autoHideDuration={3000}message={message} open={open} onClose={handleClose}anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center'
      }}
      > 
      {/* <Alert onClose={handleClose} severity={type}  sx={{width: '100%'}}>{message}</Alert> */}
      </Snackbar>
    </div>
  )
}

export default FlashMessage