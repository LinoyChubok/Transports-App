import Transport from './Transport'
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';

const useStyles = makeStyles( (theme) => ({
    transportList: {
      width: '100%',
      maxWidth: 650,
      height: 550,
      overflow: 'auto',
      backgroundColor: '#FFFFFF',
      borderRadius: 10,
      // Match [0, md) ~ [0, 960px)     
      [theme.breakpoints.down('md')]: {
        height: 250,
      },
    },
  }));
  
export default function TransportsList(props) {
    const classes = useStyles();

    const eachTransport = (item, index) => {
      return  (<Transport key={item.id} index={index} transport={item}
                onClickEditBtn={props.getTransport} onClickDeleteBtn={props.deleteTransport}>                
              </Transport>)
    };

    return( <List className={classes.transportList}>
                { props.getAllTransports.map(eachTransport) }
            </List>
    );   
}
