import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { AppStore } from './store';
import { AppThemeProvider } from './theme';
import PrivateRoute from "./components/PrivateRoute";

import Login from './pages/Login';
import Register from './pages/Register';
import DataList from './pages/DataList';
import ArticleForm from './pages/ArticleForm';
/**
 * Root Application Component
 * @class App
 */
const App = () => {

  return (
    <div>
      <AppStore>
        <AppThemeProvider>
          <BrowserRouter>
            <Switch>
              <Route path="/signin" component={Login} />
              <Route path="/signup" component={Register} />

              <Route path="/datalist" component={DataList} />
              <Route path="/edit/:id" component={ArticleForm} />
              <Route path="/add" component={ArticleForm} />
            </Switch>
          </BrowserRouter>
        </AppThemeProvider>
      </AppStore>
    </div>
  );
};

export default App;
