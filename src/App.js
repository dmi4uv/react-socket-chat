import './App.css';
import {useState,useEffect} from 'react'
import Login from "./components/Login/Login";
import Chat from "./components/Chat/Chat";
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Switch
} from "react-router-dom";
import Menu from "./components/Menu/Menu";
import Settings from "./components/Settings/Settings";
import ProtectedRoute from "./utils/ProtectedRoute";
import UserNameContext from "./utils/UserNameContext";

function App() {

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userName, setUserName] = useState(null);
    const login = () => {
        setIsAuthenticated(true);
    };

    const logout = () => {
        setIsAuthenticated(false);
    };

  return (
      <Router>
          <div className="App">
              <UserNameContext.Provider value={{setIsAuthenticated, userName, setUserName}}>
                  {/*{isAuthenticated?<Menu/>:null}*/}
                  <Switch>

                      <Route path="/" exact>
                          <Login/>
                      </Route>

                      <Route path="/settings">
                          <Settings/>
                      </Route>
                      <ProtectedRoute
                          isAuthenticated={isAuthenticated}
                          path="/chat"
                          logout={logout}
                          component={Chat}
                      />
                  </Switch>
              </UserNameContext.Provider>
          </div>
      </Router>

  );
}

export default App;
