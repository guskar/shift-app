import { Snackbar } from '@mui/material'
import { React, useState } from 'react'

/**
 * A module for flashmessage.
 *
 * @type {object} Props.
 * @returns {React.ReactElement} The flashmessage.
 */
const FlashMessage = ({ message, show, type }) => {
  const [open, setOpen] = useState(show)
  /**
   * Handles the close event.
   *
   * @param {object} event The event object.
   * @param {object} reason The reason object.
   */
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      // eslint-disable-next-line no-useless-return
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
