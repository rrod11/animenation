import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import LandingPage from "./components/LandingPage";
import {
  useHistory,
  useLocation,
} from "react-router-dom/cjs/react-router-dom.min";
import HomePage from "./components/HomePage";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      {location.pathname === "/home" ? null : (
        <Navigation isLoaded={isLoaded} />
      )}
      {isLoaded && (
        <Switch>
          <Route exact path="/home">
            <LandingPage />
          </Route>
          <Route path="/homepage">
            <HomePage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
