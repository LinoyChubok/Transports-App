import React, { useState, useEffect } from 'react';
import moment from 'moment'
import { makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles( (theme) => ({
    form: {
        marginLeft: '3%',
        // Match [0, md) ~ [0, 960px)     
        [theme.breakpoints.down('md')]: {
            marginTop: '3%',
        },
    },
    inputs: {
        display: 'block',
        marginBottom: 20,
        width: 300,
        height: 40,
        backgroundColor: '#FFFFFF',
        borderRadius: 5,
        border: "2px solid #EE4D47",     
    },
    button: {
        display: 'block',
        backgroundColor: '#EE4D47',
        color: '#FFFFFF',
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '40%',
        textTransform: 'none',
        '&:hover': {
            backgroundColor: "red",
        }
    },
  }));

export default function TransportForm(props) {
    const classes = useStyles();

    const [id, setId] = useState();
    const [date, setDate] = useState();
    const [name, setName] = useState();
    const [city, setCity] = useState();
    const [mode, setMode] = useState();

    useEffect(() => {
        // Load data from list to form
        setId(props.formInputs.id);
        setDate(props.formInputs.date);
        setName(props.formInputs.name);
        setCity(props.formInputs.city);
        setMode(props.currentMode);
    }, [props.formInputs.id, props.formInputs.date, props.formInputs.name, props.formInputs.city, props.currentMode]);
   
   
    const updateSaveTransport = () => {
        // Add a new transport
        if(mode === "Save") {
            const newTransport = {id: null , date:date, name:name, city:city};
            if(date !== "" && name !== "" && city !== "" && moment(date, ["MM.DD.YYYY", "DD.MM.YYYY","YYYY.MM.DD"], true).isValid()) {
                props.addTransport(newTransport);
                setId("");
                setDate("");
                setName("");
                setCity("");
            }
            else alert("There are invalid fields");  
        } 
        else if(mode === "Update") {
            // Update specific transport
            const newTransport = {id: id , date: date, name: name, city: city};
            if(date !== "" && name !== "" && city !== "" && moment(date, ["MM.DD.YYYY", "DD.MM.YYYY","YYYY.MM.DD"], true).isValid()) {
                props.updateTransport(newTransport);
            }
            else alert("There are invalid fields");           
        }
      };


    return(
        <form className={classes.form}>
            <InputBase className={classes.inputs} placeholder="Date (DD.MM.YYYY)" label="Outlined" variant="outlined" onChange={e => setDate(e.target.value)} value={date || ''}/>
            <InputBase className={classes.inputs} placeholder="Name" label="Outlined" variant="outlined" onChange={e => setName(e.target.value)} value={name || ''}/>
            <InputBase className={classes.inputs} placeholder="City" label="Outlined" variant="outlined" onChange={e => setCity(e.target.value)} value={city || ''}/>
            <Button className={classes.button} onClick={updateSaveTransport} variant="contained">{mode}</Button>
        </form>
    )    
}