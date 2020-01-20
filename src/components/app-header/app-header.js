import React from 'react';
import './app-header.css';

const AppHeader = ({ avhUta, done }) => {
    return (
        <div className="app-header d-flex">
            <h1> Avhuta list </h1>
            <h2>{avhUta} more to do, {done} done</h2>
        </div>
    );
};

export default AppHeader;