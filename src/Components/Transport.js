import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles( () => ({
  buttonsWrapper: {
    width: '20%',
  },
  buttons: {
    marginLeft: 10,
    backgroundColor: "#ED4D47",
    '&:hover': {
      backgroundColor: "red",
    }
  },
  indexCol: {
    width: '10%'
  },
  dateCol: {
    width: '20%'
  },
  nameCol: {
    width: '25%'
  },
  cityCol: {
    width: '25%'
  }
}));

export default function Transport(props) {
  const classes = useStyles();

  const editBtn = () => {
    props.onClickEditBtn(props.index);
  };

  const deleteBtn = () => {
    props.onClickDeleteBtn(props.index);
  };


  return (
    <ListItem className="transport">
        <ListItemText className={classes.indexCol} primary={props.index + 1}/>
        <ListItemText className={classes.dateCol} primary={props.transport.date}/>
        <ListItemText className={classes.nameCol} primary={props.transport.name}/>
        <ListItemText className={classes.cityCol} primary={props.transport.city}/>
        <div className={classes.buttonsWrapper}>
          <IconButton className={classes.buttons} onClick={editBtn} size="small" color="primary">
            <EditIcon />
          </IconButton>
          <IconButton className={classes.buttons} onClick={deleteBtn} size="small" color="primary">
            <DeleteIcon />
          </IconButton>
        </div>
    </ListItem>
 );
};

