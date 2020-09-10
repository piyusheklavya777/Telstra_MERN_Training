import React, { Component } from 'react';
import {getSessions} from '../services/workshops'

export default class SessionsList extends Component {

    constructor(props) {
        super(props)

        this.state = {
            sessions : []
            }
    }
    

    sessionsbody(session) {

        let ret = (
            <div>ret</div>
        )

        let returnable= (
            <li class="list-group-item">
            <div class="row">
                <div class="col-1">
                    <div class="d-flex flex-column align-items-center">
                        <i class="fa fa-caret-up"></i>
                        <span>{session.upvoteCount}</span>
                        <i class="fa fa-caret-down"></i>
                    </div>
                </div>
                <div class="col-11">
                    <div class="lead">{session.name}</div>
                    <div class="h6">by {session.speaker}</div>
                    <div>
                        <span class="badge">{session.level}</span>
                    </div>
                    <div class="my-2">
                        {session.duration} hours
                    </div>
                    <p>
                        {session.abstract}
                    </p>
                </div>
            </div>
        </li>
        )
        return returnable;
    }

    render() {

        let sessionshead = (
            <div class="col-12">
                    <h3>
                        Sessions in this workshop
                    </h3>
                    <hr />
                </div>
        )

        return (
            <div className="container">
                <div class="row my-4">
                    {sessionshead}
                    <div class="col-12">
                        <ul class="list-group">
                        {this.state.sessions.map((session => {
                            return this.sessionsbody(session)
                        }))}
                        </ul>
                     </div>
                </div>
            </div>
            );
    }


    componentDidMount() {
      //  console.log('id is', this.props.match.url)
        getSessions(this.props.match.url)
            .then( sess => {
                this.setState({
                    sessions: sess
                }); console.log('sessions1: ', this.state.sessions1)
            })
            .catch(error => {
                this.setState({
                    status: 'ERROR',
                    error
                })
            })
    }

}

