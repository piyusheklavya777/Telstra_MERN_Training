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




export {
    getWorkshops,
    getWorkshopById
}
