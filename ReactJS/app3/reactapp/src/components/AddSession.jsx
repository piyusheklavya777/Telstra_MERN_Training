import React, { Component } from 'react';
import {addSession} from '../services/workshops';

class AddSession extends Component {

    state = {
        values: {
            sequenceId: '',
            name: '',
            speaker:'',
            duration: '',
            level: '',
            abstract: ''
        },
        errors: {
            sequenceId: [],
            name: [],
            speaker: [],
            duration: [],
            level: [],
            abstract: []
        },
        isValid: false
    }

    updateValue = (event) => {
        this.setState({
            values: {
                ...this.state.values,
                [event.target.name] : event.target.value
            }
        },this.validate)
    }

    validate = () => {
        const {values:{sequenceId, name, speaker, duration, level, abstract}} = this.state

        const errors = {
            sequenceId: [],
            name: [],
            speaker: [],
            duration: [],
            level: [],
            abstract: []
        };

        let isValid = true;

        // sequenceId cannot be empty
        if( sequenceId.trim() === '' ) {
            errors.sequenceId.push( 'Sequence ID cannot be empty' );
            isValid = false;
        }

        // sequenceId MUST be a number
        if( ! ( /^\d+$/.test( sequenceId ) ) ) {
            errors.sequenceId.push( 'Sequence can contain only digits' );
            isValid = false;
        }

        //name
        if( ! ( /^[a-zA-Z ]{2,30}$/.test( name ) ) ) {
            errors.name.push( 'Name: 2-30 chars' );
            isValid = false;
        }

        //speakers
        if( ! ( /^[a-zA-Z ]{2,30}$/.test( speaker ) ) ) {
            errors.speaker.push( 'Speaker Name: 2-30 chars' );
            isValid = false;
        }

        //duration
        if( ! ( /^\d+(\.\d{1,2})?$/.test( duration ) ) ) {
            errors.duration.push( 'Duration in numbers(decimal)' );
            isValid = false; console.log('duration')
        }

        //level
        if( ! ( level==='Basic' || level==='Intermediate' || level==='Advanced' ) ) {
            errors.level.push( 'Levels | Choose from dropdown' );
            isValid = false; console.log('levels')
        }
        //abstract
        if(  ( abstract.trim() === '' ) ) {
            errors.abstract.push( 'Abstract Empty' );
            isValid = false; console.log('abstract empty !')
        }

        this.setState({
            errors,
            isValid
        });

    }

    addSession = (event) => {
        event.preventDefault();
        addSession(this.props.match.params.id, this.state.values)
            .then(updatedSession => {
                alert(`Session with id = ${updatedSession.id} was added`)
            })
            .catch(err=> {
                alert(err.message)
            })
            .then(()=>{
                this.props.history.push(`/workshops/${this.props.match.params.id}`)
            })
    }

    render() {

        const {values:{sequenceId, name, speaker, duration, level, abstract}} = this.state
        // const {err:{sequenceId:sequenceIderr, name: nameerr, speaker: speakererr, duration: durationerr, level, abstract}} = this.state
        const {errors:{sequenceId:sequenceIderr, name: nameerr, speaker: speakererr, duration: durationerr, level:levelerr, abstract:abstracterr}} = this.state

        return (
            <div className="container">
                <div className="row my-4">
                    <div className="col-12">
                        <h3>
                            Details of new session
                        </h3>
                        <hr />
                    </div>
                </div>
                <div className="col-12">
                    <form onSubmit={this.addSession}>
                        <div className="form-group row">
                            <label htmlFor="sequenceId" className="col-sm-3 col-form-label">Sequence ID</label>
                            <div className="col-sm-9">
                                <input type="text" className="form-control" name="sequenceId" id="sequenceId" placeholder="" aria-describedby="sequenceHelpId" value={sequenceId} onChange={this.updateValue} />
                                <small id="sequenceHelpId" className="text-muted">Sequence ID is the serial number of the session in the workshop</small>
                               <br/> {sequenceIderr.map( err => <small className="text-danger">{err}</small> )}
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="name" className="col-sm-3 col-form-label">Name</label>
                            <div className="col-sm-9">
                                <input type="text" className="form-control" name="name" id="name" placeholder=""  aria-describedby="NameHelpId" value={name} onChange={this.updateValue} />
                                <small id="NameHelpId" className="text-muted">The title of the session</small>
                                <br/>  {nameerr.map( err => <small className="text-danger">{err}</small> )}
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="speaker" className="col-sm-3 col-form-label">Speaker(s)</label>
                            <div className="col-sm-9">
                                <input type="text" className="form-control" name="speaker" id="speaker" placeholder="" aria-describedby="speakerHelpId"  value={speaker} onChange={this.updateValue} />
                                <small id="speakerHelpId" className="text-muted">The name of the speaker(s) for this session. Separate speaker names by a comma. Example <strong>John Doe, Jane Doe</strong>.</small>
                                <br/>  {speakererr.map( err => <small className="text-danger">{err}</small> )}
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="duration" className="col-sm-3 col-form-label">Duration</label>
                            <div className="col-sm-9">
                                <input type="number" className="form-control" name="duration" id="duration" placeholder="" aria-describedby="durationHelpId"  value={duration} onChange={this.updateValue} />
                                <small id="durationHelpId" className="text-muted">The length of the session in hours</small>
                                <br/>  {durationerr.map( err => <small className="text-danger">{err}</small> )}
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="level" className="col-sm-3 col-form-label">Level</label>
                            <div className="col-sm-9">
                                <select className="form-control" name="level" id="level"  value={level} onChange={this.updateValue}>
                                    <option value="">-- Select the level of the session --</option>
                                    <option value="Basic">Basic</option>
                                    <option value="Intermediate">Intermediate</option>
                                    <option value="Advanced">Advanced</option>
                                </select>
                                <br/>  {levelerr.map( err => <small className="text-danger">{err}</small> )}
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="duration" className="col-sm-3 col-form-label">Abstract</label>
                            <div className="col-sm-9">
                                <textarea type="number" className="form-control" name="abstract" id="abstract"  aria-describedby="abstractHelpId"  value={abstract} onChange={this.updateValue}></textarea>
                                <small id="abstractHelpId" className="text-muted">A brief description of the session topics</small>
                                <br/>  {abstracterr.map( err => <small className="text-danger">{err}</small> )}
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="offset-sm-3 col-sm-9">
                                <button type="submit" className="btn btn-primary mr-2" disabled={!this.state.isValid}>Add session</button>
                                <button type="button" className="btn btn-danger">Cancel</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default AddSession;