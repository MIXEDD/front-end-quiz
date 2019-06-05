import React from 'react';
import './HeaderPart.scss';
import {Link} from 'react-router-dom';

const headerPart = (props) => (
    <div className="header-part">
        { props.params.showBackButton ?  <Link to="/" className="back-button">Home</Link> : null}
        <h1 id="page-title">{props.params.pageTitle}</h1>
    </div>
);

export default headerPart;