import React from 'react';

function Home(props) {
    return (
        <div className="jumbotron">
            <h1 className="display-3">Workshop App</h1>
            <hr className="my-2"/>
            <p className="lead">
            Welcome to the workshops app. Click
                <a href="/workshops"> Workshops</a>
            </p>
        </div>
    );
}

export default Home;
