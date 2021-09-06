import React, { useReducer, useEffect, useCallback } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Switch, FormControlLabel, Button } from '@material-ui/core';
import { useAppStore } from '../store/AppStore';
import EnhancedTable from '../components/EnhancedTable';
import api from '../utils/api';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      width: 400,
      margin: `${theme.spacing(0)} auto`
    },
    loginBtn: {
      marginTop: theme.spacing(2),
      flexGrow: 1
    },
    header: {
      textAlign: 'center',
      background: '#212121',
      color: '#fff'
    },
    card: {
      marginTop: theme.spacing(10)
    }
  })
);

const columns = [
  {
    name: "Title",
    selector: "title",
    sortable: true
  },
  {
    name: "Author",
    selector: "director",
    sortable: true
  },
  {
    name: "Created At",
    selector: "runtime",
    sortable: true,
    right: true
  },
  {
    name: "Actions",
  }
];

const DataList: React.FC<{history: any; match: any}> = ({history}) => {
  const classes = useStyles();
  const [state, dispatch] = useAppStore();

  const handleSwitchDarkMode = useCallback(() => {
    dispatch({
      type: 'SET_DARK_MODE',
      darkMode: !state.darkMode,
      payload: !state.darkMode,
    });
  }, [state, dispatch]);

  const addNewItem = () => {
    history.push('/addArticle');
  }

  return (
    <div>
      <FormControlLabel
              label={!state.darkMode ? 'Light mode' : 'Dark mode'}
              control={<Switch checked={state.darkMode} onChange={handleSwitchDarkMode} />}
            />
      <Button onClick={addNewItem} variant="contained" color="primary">New Item +</Button>
      <EnhancedTable history={history}/>
    </div>
  );
}

export default DataList;