import React, { useContext, useState } from "react";

import { ctx } from "./Store";

import { makeStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import Chip from '@material-ui/core/Chip';

import Button from '@material-ui/core/Button';

import TextField from '@material-ui/core/TextField';


const useStyles = makeStyles((theme) => ({
  root: {


    '& > *': {
      margin: '50px',
      padding: '30px'
    },
  }, 
  flex:{
      display:"flex",
      fontSize:"20px",
      alignItems:"center"
  },
  topicsWindow:{
      width:'30%',
      height:'300px',
      borderRight:'2px solid grey'
  },
  chatWindow:{
      width:'70%',
      height:'300px',
      padding:'20px'
  },
  chatBox:{
      width:'95%'
  },
  button:{
      width:'15%',
      padding:'10px'
  }
}));

function Dashboard() {

  const classes = useStyles();
  const { allChats, sendMessageAction, user } = useContext(ctx);
  const topics = Object.keys(allChats);
  const [activeTopic, setActiveTopic] = useState(topics[0]);
  const [textValue, setTextValue] = useState("");
  console.log(allChats)
  return(
    <div className={classes.root}>
        
    <Paper elevation={3} >
        <Typography variant="h3" component="h3">
            Chat app
        </Typography>
        <Typography variant="h6" component="h6">
            Reymon welcomes you to {activeTopic}
        </Typography>

        <div className={classes.flex}>
            <div className={classes.topicsWindow}>
                <List>
                    {
                        topics.map(topic=>(
                            <ListItem onClick={(e)=>setActiveTopic(e.target.innerText)} key={topic} button>
                                <ListItemText primary={topic } />
                            </ListItem>
                        ))
                    }

                </List>
            </div>
            <div className={classes.chatWindow}>
                {
                    allChats[activeTopic].map((chat, i)=>(
                        <div className={classes.flex} key={i}>
                            <Chip label={chat.from} />
                            <Typography variant='body1'>{chat.msg}</Typography>
                        </div>
                    ))
                }
            </div>
        </div>
        <div className={classes.flex}>
        <TextField 
            className={classes.chatBox}
            value={textValue}
            onChange={(e)=>setTextValue(e.target.value)}
            label="Send a chat"
            
        />

        <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={()=>{
                sendMessageAction({from: user, msg: textValue, topic:activeTopic})
                setTextValue('')
                }
            }
        >
            Send
        </Button>
        </div>
    </Paper>
  </div>
)
}

export default Dashboard;
