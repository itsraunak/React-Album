import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = (props) => {
    return (
        <div className="navbar">
            <h2>
                <span className="site-logo">
                    <Link to="/">
                        <span className="site-logo-first">album</span>
                        <span className="site-logo-last">pedia</span>
                    </Link>
                </span>
            </h2>
            {props?.page ? (
                <Link to={props.path}>
                    <button>{props.page}</button>
                </Link>
            ) : null}

            <Link to="/">
                <button>Home</button>
            </Link>
        </div>
    );
};

export default Navbar;
