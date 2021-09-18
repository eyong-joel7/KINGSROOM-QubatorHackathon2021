import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { Avatar } from "@material-ui/core";
import userIcon from '../../icons/headphones.svg'

const useStyles = makeStyles((theme) => ({
  root: {
    color:'#f1f1f1',
    width: "100%",
    minWidth: 260,
    maxWidth:380,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: "transparent",
    height: "100%"
  },
  text:{
    color:"#f1f1f1",
  }
}));

export default function SimpleList({ users }) {
  const classes = useStyles();
  function capitalize(s)
  {
      return s && s[0].toUpperCase() + s.slice(1);
  }
  return (
    <div className={classes.root}>
      <List component="nav" aria-label="main mailbox folders" style = {{backgroundColor: 'transparent'}}>
        {users.map((user) => (
          <ListItem button key = {user.name}>
            <ListItemIcon>
            <Avatar alt="headphones" src={userIcon} />
            </ListItemIcon>
            <ListItemText className = {classes.text} primary= {capitalize(user.name)} />
          </ListItem>
        ))}
      </List>
   
    </div>
  );
}
