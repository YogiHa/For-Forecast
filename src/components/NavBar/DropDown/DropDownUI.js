import React from 'react';

import { useDispatch, useSelector } from "react-redux";
import { registerModal, signInModal } from "../../../store/actions/modalActions";
import { signOut, cleanError } from "../../../store/actions/authActions";

import { Button, Menu, MenuItem, Divider } from "@material-ui/core";
import ToggleButton from 'react-toggle-button';

const AuthNav = ({ dispatch, setAnchorMenu }) => (

    <MenuItem
              onClick={() => {
                dispatch(signOut());
                setAnchorMenu(null);
              }}
            >
              Sign Out
            </MenuItem>
)

const UnAuthNav = ({ dispatch, setAnchorMenu }) => (

    <div>
              <MenuItem
                onClick={() => {
                  dispatch(registerModal());
                  dispatch(cleanError());
                  setAnchorMenu(null);
                }}
              >
                Register
              </MenuItem>
              <MenuItem
                onClick={() => {
                  dispatch(signInModal(), cleanError() );
                  setAnchorMenu(null);
                }}
              >
                Sign In
              </MenuItem>
            </div>
)


export default function DropDownUI({ handleClick, anchorMenu, setAnchorMenu, toggleValue, handleToggle }) {

    const uid = useSelector(state => state.firebase.auth.uid);

    const dispatch = useDispatch();

    return (
        <div>
        <Button
          align="right"
          aria-controls="nav-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <img
            alt="settings"
            height={40}
            width={40}
            src={require("../../../assets/settings.png")}
          />
        </Button>
        <Menu
          id="nav-menu"
          anchorEl={anchorMenu}
          keepMounted
          open={Boolean(anchorMenu)}
          onClose={handleClick}
        >
          { 
            uid ? <AuthNav dispatch={dispatch} setAnchorMenu={setAnchorMenu} /> : <UnAuthNav  dispatch={dispatch} setAnchorMenu={setAnchorMenu} />
          }


           <Divider />
          <MenuItem> 
            <ToggleButton
             inactiveLabel={'C°'}
             activeLabel={'F°'}
             value={toggleValue}
             colors={{
               activeThumb: {
                 base: 'rgb(250,250,250)',
               },
               inactiveThumb: {
                 base: 'rgb(62,130,247)',
               }
             }}
             onToggle={handleToggle} />  

          </MenuItem>
        
       </Menu>
    </div>
    )
}