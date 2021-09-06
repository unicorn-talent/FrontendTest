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
      width: 1000,
      margin: `${theme.spacing(0)} auto`
    },
  })
);


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
    <form className={classes.container} noValidate autoComplete="off">
      <FormControlLabel
              label={!state.darkMode ? 'Light mode' : 'Dark mode'}
              control={<Switch checked={state.darkMode} onChange={handleSwitchDarkMode} />}
            />
      <Button onClick={addNewItem} variant="contained" color="primary">New Item +</Button>
      <EnhancedTable history={history}/>
    </form>
  );
}

export default DataList;