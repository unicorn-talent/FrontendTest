import React, { useEffect, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { TextField, Card, CardContent, CardActions, CardHeader, Button, InputAdornment, IconButton, Link, Grid } from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import api from '../utils/api';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      width: 400,
      margin: `${theme.spacing(0)} auto`
    },
    registerBtn: {
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

//state type

type State = {
  email: string
  password:  string
  confirmation: string
  isButtonDisabled: boolean
  helperText: string
  isError: boolean
};

type ErrorState = {
  email: string
  password:  string
  confirmation: string
};

const initialState:State = {
  email: '',
  password: '',
  confirmation: '',
  isButtonDisabled: true,
  helperText: '',
  isError: false
};

const Register: React.FC<{history: any; match: any}> = ({history}) => {
  const classes = useStyles();
  const [state, setState] = useState<State>(initialState);
  const [errors, setErrors] = useState<ErrorState>({email: '', password: '', confirmation: ''});
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);

  useEffect(() => {
    if (state.email.trim() && state.password.trim()) {
      setState({
        ...state,
        isButtonDisabled: false
      })
    } else {
      setState({
        ...state,
        isButtonDisabled: true
      })
    }
  }, [state.email, state.password]);

  const handleValidation = () => {
    const fieldErrors = {
      email: "",
      password: "",
      confirmation: ""
    };
    let formIsValid = true;
    
    //Email
    if (!state.email) {
      formIsValid = false;
      fieldErrors["email"] = "Email is required";
    }
    if (state.email !== "undefined") {
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      if (!emailPattern.test(state.email)) {
        formIsValid = false;
        fieldErrors["email"] = "Email is not valid";
      }
    }
    //Password
    if (!state.password) {
      formIsValid = false;
      fieldErrors["password"] = "Password is required";
    } else {
      if (state.password.toLocaleLowerCase() === state.password) {
        formIsValid = false;
        fieldErrors["password"] =
          "Password should have more than 1 upper case letter";
      } else if (state.password.length < 8) {
        formIsValid = false;
        fieldErrors["password"] = "Password should be more than 8 characters";
      }
    }

    //confirmation
    if (state.password != state.confirmation) {
      fieldErrors["confirmation"] = "Password is not match";
    }
    setErrors(fieldErrors);
    return formIsValid;
  };

  const handleShowPasswordClick = () => {
    setShowPassword((old) => !old);
  }

  const handleShowConfirmationClick = () => {
    setShowConfirmation((old) => !old);
  }

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.keyCode === 13 || event.which === 13) {
      state.isButtonDisabled || handleRegister();
    }
  };

  const handleEmailChange: React.ChangeEventHandler<HTMLInputElement> =
    (event) => {
      setState({
        ...state,
        email: event.target.value
      })
    };

  const handlePasswordChange: React.ChangeEventHandler<HTMLInputElement> =
    (event) => {
      setState({
        ...state,
        password: event.target.value
      })
    }
  const handleConfirmationChange: React.ChangeEventHandler<HTMLInputElement> =
  (event) => {
    setState({
      ...state,
      confirmation: event.target.value
    })
  }
  
  const handleRegister = async () => {

    const body = { email: state.email, password: state.password };
    
    if (handleValidation()) {
      api.post('/signup', body)
      .then((res: any) => {
        history.push('/signin');
      }).catch((err: any) => {
        if (err.response === undefined) {
          setState({
            ...state,
            isError: true,
            helperText: "something went wrong"
          })
        } else {
          setState({
            ...state,
            isError: true,
            helperText: err.response.data
          })
        }
      });
    }
  };

  return (
    <form className={classes.container} noValidate autoComplete="off">
      <Card className={classes.card}>
        <CardHeader className={classes.header} title="Register App" />
        <CardContent>
          <div>
            <TextField
              error={state.isError || (errors.email != '' ? true : false )}
              fullWidth
              id="email"
              type="email"
              label="email"
              placeholder="email"
              margin="normal"
              helperText={errors.email}
              onChange={handleEmailChange}
              onKeyPress={handleKeyPress}
            />
            <TextField
              error={state.isError || (errors.password != '' ? true : false )}
              fullWidth
              id="password"
              type={showPassword ? 'text' : 'password'}
              label="Password"
              placeholder="Password"
              margin="normal"
              helperText={errors.password}
              onChange={handlePasswordChange}
              onKeyPress={handleKeyPress}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleShowPasswordClick}
                    >
                      {showPassword ? <VisibilityIcon/> : <VisibilityOffIcon/>}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              error={state.isError || (errors.confirmation != '' ? true : false )}
              fullWidth
              id="confirmation"
              type={showConfirmation ? 'text' : 'password'}
              label="Confirmation"
              placeholder="Confirm Password"
              margin="normal"
              helperText={errors.confirmation}
              onChange={handleConfirmationChange}
              onKeyPress={handleKeyPress}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleShowConfirmationClick}
                    >
                      {showPassword ? <VisibilityIcon/> : <VisibilityOffIcon/>}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            size="large"
            color="secondary"
            className={classes.registerBtn}
            onClick={handleRegister}
            disabled={state.isButtonDisabled}>
            Register
          </Button>
        </CardActions>
        <CardActions>
          <Grid container justifyContent="center">
            Already have an account?
            <Link href="/signin">&nbsp;Login</Link>
          </Grid>
        </CardActions>
      </Card>
    </form>
  );
}

export default Register;