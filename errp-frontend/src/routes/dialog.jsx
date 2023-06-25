import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Dialog from '@mui/material/Dialog';

function SimpleDialog(props) {
  const { onClose, selectedValue, open ,response} = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <List sx={{ pt: 0 }}>
        {response.map((item) => (
          <ListItem disableGutters key={item.username}>
            <ListItemButton component="a" href={`/home/favorites/${item.username}`} key={item.username}>
              <ListItemAvatar>
                <Avatar >
                <img src={`http://localhost:3500/${item.imgUrl}`} alt="profileImg" style={{width:"40px",height:"40px",borderRadius:"40px"}} />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default function SimpleDialogDemo({response}) {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <div>
      <br />
      <Button variant="outlined" onClick={handleClickOpen}>
        favorite stores
      </Button>
      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
        response={response}
      />
    </div>
  );
}
