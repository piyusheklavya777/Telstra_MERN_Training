
import React, { Component } from 'react';
import { getWorkshopById } from '../services/workshops';
import Moment from 'react-moment'

export default class WorkshopDetails extends Component {
    state = {
        status: WorkshopDetails.Status.LOADING_WORKSHOP_DETAILS,
        workshop: null,
        error: null
    };

    render() {
        const { status, workshop, error } = this.state;
        let el;

        switch( status ) {
            case WorkshopDetails.Status.LOADING_WORKSHOP_DETAILS:
                /* b4-alert-dismissible */
                el = (
                    <div className="alert alert-primary alert-dismissible fade show" role="alert">
                        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            <span className="sr-only">Close</span>
                        </button>
                        <strong>Workshop details are being loaded. Hang on!</strong>
                    </div>
                );
                break;
            case WorkshopDetails.Status.LOADED_WORKSHOP_DETAILS:
                el = (
                 <div>
                        <h2>
                            {workshop.name}
                        </h2>
                        <hr />
                        <div className="row my-4">
                            <div className="col-4">
                                <img className="img-fluid" src={workshop.imageUrl} alt={workshop.description} />
                            </div>
                            <div className="col-8">
                                <div className="row">
                                    <div className="col-3">
                                        <p>
                                            <small>
                                                <Moment interval={0} format="MMM D YYYY">
                                                    {workshop.startDate}
                                                </Moment>
                                                {" - "}
                                                <Moment interval={0} format="MMM D YYYY">
                                                    {workshop.endDate}
                                                </Moment>
                                            </small>
                                        </p>
                                        <p>
                                            <small className="text-muted">
                                                {workshop.time}
                                            </small>
                                        </p>
                                    </div>
                                    <div className="col-3">
                                        <p>
                                            <small>Online</small>
                                        </p>
                                        <p>
                                            <small>In person</small>
                                        </p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12" dangerouslySetInnerHTML={{__html: workshop.description}}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
                break;
        case WorkshopDetails.Status.ERROR_LOADING_WORKSHOP_DETAILS: 
            el = (
                <div className="alert alert-primary alert-dismissible fade show" role="alert">
                        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            <span className="sr-only">Close</span>
                        </button>
                        <strong>Workshops loading failed!</strong>
                    </div>
            )
                break;
        }

        return (
            <div className="container my-4">
                {el}
            </div>
        )
    }

    componentDidMount() {
        console.log('id is', this.props.match.params.id)
        getWorkshopById(this.props.match.params.id)
            .then( workshop => {
                this.setState({
                    status: WorkshopDetails.Status.LOADED_WORKSHOP_DETAILS,
                    workshop 
                });
            })
            .catch(error => {
                this.setState({
                    status: WorkshopDetails.Status.ERROR_LOADING_WORKSHOP_DETAILS,
                    error
                })
            })
    }
}

WorkshopDetails.Status = {
    LOADING_WORKSHOP_DETAILS: 'LOADING_WORKSHOP_DETAILS',
    LOADED_WORKSHOP_DETAILS: 'LOADED_WORKSHOP_DETAILS',
    ERROR_LOADING_WORKSHOP_DETAILS: 'ERROR_LOADING_WORKSHOP_DETAILS'
};