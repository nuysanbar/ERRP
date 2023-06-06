import * as React from 'react';
import {Form} from "react-router-dom"
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {AiOutlineShoppingCart,AiOutlineStar,AiOutlineSearch,AiOutlineSetting} from "react-icons/ai"
import {IoIosNotificationsOutline} from "react-icons/io"
import {BiCategory,BiLogOut,BiPackage,BiPurchaseTag} from "react-icons/bi"
import {BsCaretDown,BsGraphUp} from "react-icons/bs"
import {FaStore} from "react-icons/fa"
export default function TemporaryDrawer({basicData,userRole}) {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
      {userRole===5508 && <>
            <ListItem disablePadding>
            <ListItemButton component="a" href='/home/products'>
              <ListItemIcon>
               <span> <FaStore/> </span> 
              </ListItemIcon>
              <ListItemText primary={"my store"} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href='/home/dashboard'>
              <ListItemIcon>
              <span><BsGraphUp/></span>
              </ListItemIcon>
              <ListItemText primary={"dashbaord"} />
            </ListItemButton>
          </ListItem>
          </>
          }
          <ListItem disablePadding>
            <ListItemButton component="a" href='/home/favorites'>
              <ListItemIcon>
              <span ><AiOutlineStar /></span>
              </ListItemIcon>
              <ListItemText primary={"favorites"} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href='/home/brands'>
              <ListItemIcon>
              <span><BiCategory /></span>
              </ListItemIcon>
              <ListItemText primary={"categories"} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href='/home/purchases'>
              <ListItemIcon>
              <span><BiPurchaseTag/></span>
              </ListItemIcon>
              <ListItemText primary={"purchases"} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href='/home/saved'>
              <ListItemIcon>
              <AiOutlineShoppingCart/>
              </ListItemIcon>
              <ListItemText primary={"cart"} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href='/home/profile'>
              <ListItemIcon>
              <AiOutlineSetting/>
              </ListItemIcon>
              <ListItemText primary={"settings"} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href='/home/logout'>
              <ListItemIcon>
              <AiOutlineSetting/>
              </ListItemIcon>
              <ListItemText primary={"logout"} />
            </ListItemButton>
          </ListItem>
      </List>
    </Box>
  );
  const searchStyled={
    height:"35px",
    width:"260px",
    padding: "0 20px",
    margin:"0px",
    border:"none",
    color:"var(--bl)",
    outline:"none"
  }
  return (
        <div style={{backgroundColor:"var(--bl)", color:"var(--wh)",padding:"5px 0 20px"}}>
          <Form method="get" action="search" style={{display:"inline-block",margin:"5px",verticalAlign:"top"}}>
            <input type="search" placeholder="search" id="search" name="search" style={searchStyled}/>
            <button className="searchIcon" style={{border:"none"}}><AiOutlineSearch/></button>
          </Form>
          <div onClick={toggleDrawer("right", true)} style={{display:"inline-block",width:"45px",margin:"0 auto",position:"absolute","right":"0px"}}>
                    <img src={`http://localhost:3500/${basicData.image}`} style={{width:"25px",height:"25px",borderRadius:"20px"}} alt="profileImg" /> <br />
                    <span>me<BsCaretDown className="drop"/></span>
          </div>
          <Drawer
            anchor={"right"}
            open={state["right"]}
            onClose={toggleDrawer("right", false)}>
            {list("right")}
          </Drawer>
        </div>
  );
}