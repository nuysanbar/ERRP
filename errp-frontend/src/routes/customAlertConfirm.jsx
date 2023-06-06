import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AlertDialog({open,handleAgree,handleDisAgree,title,content}) {

  return (
    <div >
      <Dialog
        open={open}
        fullWidth
        maxWidth="sm"
        onClose={handleDisAgree}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" style={{color:"var(--bl)"}}>
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description"  style={{color:"black"}}>
            {content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDisAgree} variant='outlined' style={{color:"red",borderColor:"red"}}>Disagree</Button>
          <Button onClick={handleAgree} autoFocus variant='contained' style={{backgroundColor:"var(--bl)"}}>Agree</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
