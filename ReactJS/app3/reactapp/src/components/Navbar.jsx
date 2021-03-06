import React from 'react';
import { Link } from 'react-router-dom'

function Navbar(props) {
    return (
        <div>
            <nav className="navbar navbar-expand navbar-dark bg-dark">
                <ul className="nav navbar-nav">
                    <li className="nav-item active">
                        <Link className="nav-link " to="/">Home<span className="sr-only">(current)</span></Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link " to="/workshops">Workshops</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Navbar;
