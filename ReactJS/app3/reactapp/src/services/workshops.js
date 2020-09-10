import axios from 'axios';

const getWorkshops = () => {
    // promise (unfulfilled) -> resolved | rejected state
    return axios.get( `http://workshops-server.herokuapp.com/workshops` )
        .then( ( response ) => {
            console.log( 'first resolve handler' );
            console.log( response.data );

            return response.data;
        });
};

const getWorkshopById = (id) => {
    //console.log('id is', id)
    // promise (unfulfilled) -> resolved | rejected state
    return axios.get( `http://workshops-server.herokuapp.com/workshops/${id}` )
        .then( ( response ) => response.data);
};

const getSessions = (linkk) => {
    return axios.get( `http://workshops-server.herokuapp.com${linkk}/sessions` )
        .then( ( response ) => response.data);
}

const addSession = (workshopid, session) => {

    const sessionWithWorkshopId = {
        ...session,
        workshopId: +workshopid,
        duration: +session.duration,
        sequenceId: +session.sequenceId,
        upvoteCount: 0
    }

    return axios.post(
        `http://workshops-server.herokuapp.com/sessions/`,
        sessionWithWorkshopId,
        {headers: { 'Content-Type': 'application/json' } }
    ).then( response => response.data );
}


export {
    getWorkshops,
    getWorkshopById,
    getSessions,
    addSession
}
