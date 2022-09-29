import {makeStyles} from '@material-ui/core/styles';
export default makeStyles(() => ({
  appBar: {
    borderRadius: 15,
    margin: '30px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1C538E'
  },
  heading: {
    color: 'rgba(255,255,255, 1)',
    display: 'inline-block',
  },
  image: {
    marginLeft: '15px',
    display: 'flex',
    align: 'center',
  },
}));
