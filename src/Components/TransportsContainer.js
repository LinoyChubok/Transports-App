import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import data from '../Data/transports.json'
import TransportsList from './TransportsList';
import TransportForm from './TransportForm';

const useStyles = makeStyles( () => ({
    flexContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: '3%',
    },
  }));

export default function TransportsContainer() {
    const classes = useStyles();

    const [transports, setTransports] = useState([]);
    const [currTransport, setCurrTansport] = useState({ id: "", date: "", name: "", city: "" });
    const [mode, setMode] = useState("Save");

    useEffect(() => {
        const loadTransports = data.map(transport => ({id: transport.id, date: transport.date, name: transport.name, city: transport.city}));
        return setTransports(loadTransports);
    }, []);

    const getSpecific = (currIndex) => {
        setMode("Update");
        setCurrTansport({
                id: transports[currIndex]["id"],
                date: transports[currIndex]["date"],       
                name: transports[currIndex]["name"],
                city: transports[currIndex]["city"]
         })
    };

    const nextId = (transports = []) => {    
        let max = transports.reduce((prev, curr) => prev.id > curr.id ? prev.id : curr.id , 0);
        return ++max;
    };

    const add = (newTransport) => {
        setTransports(prevState => ([
            ...prevState, {
                id: newTransport.id !== null ? newTransport.id : nextId(prevState),
                date: newTransport.date,
                name: newTransport.name,
                city: newTransport.city
            }])
        )
    };

    const update = (newTransport) => {
        setTransports(prevState => prevState.map(
            data => data.id !== newTransport.id ? data: {
                id: newTransport.id, date: newTransport.date, name: newTransport.name, city: newTransport.city               
            }))
        setCurrTansport({ id: "", date: "", name: "", city: "" });
        setMode("Save");
    };
  
    const deleteOne = (index) => {
        // Returns a filtered array that contains only transports that their index does not equal to the given index   
        setTransports(prevState => (
            prevState.filter((transport, i) => i !== index)
        ))
        setCurrTansport({ id: "", date: "", name: "", city: "" });
        setMode("Save");
    };
  

    return(
         <div className={classes.flexContainer}>
            <TransportsList getAllTransports={transports} getTransport={getSpecific} deleteTransport={deleteOne}/>
            <TransportForm  addTransport={add} updateTransport={update} currentMode={mode} formInputs={currTransport}/>
        </div>
    )
}