import React, { useReducer, useEffect, useCallback } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { TextField, Paper, Button, InputLabel, FormControl, Select,MenuItem, Card, CardContent, CardActions, CardHeader } from '@material-ui/core';
import { useAppStore } from '../store/AppStore';
import EnhancedTable from '../components/EnhancedTable';
import api from '../utils/api';
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      width: 500,
      margin: `${theme.spacing(0)} auto`
    },
    postBtn: {
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
    },
    division: {
      marginBottom: 10,
      width: '100%'
    }
  }),
);
const ArticleForm: React.FC<{history: any; match: any}> = ({history, match}) => {
  const classes = useStyles();
  const [state, dispatch] = useAppStore();

  const [title, setTitle] = React.useState('');
  const [content, setContent] = React.useState('');
  const [tag, setTag] = React.useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };
  const handleContentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value);
  };
  const handleTagChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
    const value = event.target.value;
    setTag(value as typeof tag);
  };
  const handlepost = () => {
    const body = {title, content, tag };
    if (match.params.id) {
      api.put(`/article/:${match.params.id}`, body).then((res: any) => {
        dispatch({
          type: 'UPDATE_ARTICLE',
          payload: res.data,
        });
        history.push('/datalist');
      }).catch((err: any) => {
        console.log('error');
      })
    } else {
      api.post('/article', body).then((res: any) => {
        dispatch({
          type: 'UPDATE_ARTICLE',
          payload: res.data,
        });
        history.push('/datalist');
      }).catch((err: any) => {
        console.log('error');
      })  
    }
    
  }

  useEffect(() => {
    api.get(`/article/${match.params.id}`).then((res: any) => {
      dispatch({
        type: 'GET_ARTICLE',
        payload: res.data,
      });
    }).catch((err: any) => {
      console.log('error');
    })
  }, [match.params.id]);

  useEffect(() => {
    api.get('/tags').then((res: any) => {
      dispatch({
        type: 'GET_TAGS',
        payload: res.tags,
      });
    }).catch((err: any) => {
      console.log('error');
    })
  }, []);

  return (
    <form className={classes.container} noValidate autoComplete="off">
      <Card className={classes.card} style={{width: '100%'}}>
        <CardHeader className={classes.header} title="New Item" />
        <CardContent  style={{width: '100%'}}>
          <div className={classes.division}>
            <TextField
              id="title"
              label="Title"
              multiline
              maxRows={4}
              value={state.article != undefined ? state.article.title: ""}
              onChange={handleChange}
              variant="outlined"
              style={{width:'100%'}}
            />
          </div>
          <div className={classes.division}>
            <TextField
              id="content"
              label="Content"
              multiline
              rows={4}
              defaultValue={state.article != undefined ? state.article.content : ""}
              onChange={handleContentChange}
              variant="outlined"
              style={{width:'100%'}}
            />
          </div>
          <div className={classes.division}>
          <FormControl variant="outlined" className={classes.formControl} style={{width: '100%', margin: '0px'}}>
            <InputLabel id="demo-simple-select-outlined-label">Age</InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              label="Age"
              value={tag}
              onChange={handleTagChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {
                state.tags != undefined &&
              state.tags.map((tag: number) => (
                <MenuItem value={tag}>{tag}</MenuItem>
              ))
              }
            </Select>
          </FormControl>
          </div>
          
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            size="large"
            color="primary"
            className={classes.postBtn}
            onClick={handlepost}
          >
            Post
          </Button>
        </CardActions>
      </Card>
    </form>
  );
}

export default ArticleForm;