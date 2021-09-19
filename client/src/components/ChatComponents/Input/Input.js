import SendIcon from "@material-ui/icons/Send";
import React, { useEffect, useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import "./Input.css";
import Button from "@mui/material/Button";
import { makeStyles } from "@material-ui/core/styles";
import DialogSelect from "./SelectDialog";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#f1f1f1",
    borderRadius: "4px",
    width: "150px !important",
    margin: "2px !important",
    zIndex: 200000,
  },
  btn: {
    padding: "10px 10px",
  },
  form: {
    backgroundColor: "#f1f1f1",
    maxWidth: 150,
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    width: "5rem",
    height: "5rem",
  },
  svg: {
    width: "4rem !important",
    height: "4rem !important",
  },
  text: {
    color: "#f1f1f1",
    fontWeight: "bold",
  },
  button: {
    textTransform: "lowercase !important",
  },
}));

const Input = ({ setMessage, sendMessage, message, users, name }) => {
  const [displayUser, setDisplayUser] = useState("");
  const [open, setOpen] = useState(false);
  const [userID, setUserID] = useState("");
  const peers = users.filter(
    (user) => user.name?.toLowerCase() !== name.toLowerCase()
  );

  const handleClickOpen = () => {
    setOpen(true);
  };
  const classes = useStyles();

  useEffect(() => {
    if (displayUser !== "") {
      const userToSend = users.find((user) => user.name === displayUser);
      userToSend && setUserID(userToSend.id);
    } else {
      setUserID("");
    }
  }, [displayUser, users]);
  return (
    <div className="sendto">
      <span className={classes.text}>Send to:</span>{" "}
      <Button
        className={classes.button}
        onClick={handleClickOpen}
        variant="contained"
        endIcon={<KeyboardArrowDownIcon />}
      >
        {displayUser ? displayUser : " Everyone"}
      </Button>
      <form className="form">
        <input
          className="input"
          type="text"
          placeholder="Message"
          value={message}
          onChange={({ target: { value } }) => setMessage(value)}
          onKeyPress={(event) =>
            event.key === "Enter" ? sendMessage(event, userID) : null
          }
        />
        <button className="sendButton" onClick={(e) => sendMessage(e, userID)}>
          <SendIcon />{" "}
        </button>
      </form>
      <DialogSelect
        open={open}
        setOpen={setOpen}
        peers={peers}
        setDisplayUser={setDisplayUser}
      />
    </div>
  );
};

export default Input;
