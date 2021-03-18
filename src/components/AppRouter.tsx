import React from 'react';
import Favorites from '../pages/favorites';
import Homepage from '../pages/homepage';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

const AppRouter = (): JSX.Element => {
    return (
        <Router>
            <div>
                <nav>
                    <Link to="/">Home</Link>
                    <Link to="/favorites">Favorites</Link>
                </nav>

                <Route path="/" exact component={Homepage} />
                <Route path="/favorites" component={Favorites} />
            </div>
        </Router>
    );
};

export default AppRouter;
