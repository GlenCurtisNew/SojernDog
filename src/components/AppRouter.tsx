import React from 'react';
import Favorites from '../pages/favorites';
import Homepage from '../pages/homepage';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import NavBar from './NavBar';

const AppRouter = (): JSX.Element => {
    return (
        <Router>
            <div>
                <NavBar />
                <Route path="/" exact component={Homepage} />
                <Route path="/favorites" component={Favorites} />
            </div>
        </Router>
    );
};

export default AppRouter;
