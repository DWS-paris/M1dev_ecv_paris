/* 
Import
*/
    const fetch = require('node-fetch');
//

/* 
Service definition
*/
    const fetchRequest = ( method, apiEndpoint, body = null ) => {
        return new Promise( (resolve, reject) => {
            // Set request configuration
            let config = {
                method: method
            };
            if( method === 'POST' || method === 'PUT' ){
                config = {
                    method: method,
                    body: JSON.stringify(body),
                    headers: { 'Content-Type': 'application/json' }
                }
            }
            else if( method === 'DELETE' ){
                config = {
                    method: method,
                    headers: { 'Content-Type': 'application/json' }
                }
            }

            // Start fetching data
            fetch( `http://localhost:3000/${apiEndpoint}`, config)
            //=> Succes request
            .then( data => data.json())
            //=> Succes json data
            .then( jsonData => resolve( jsonData ))
            //=> Error reject err
            .catch( err => reject( err ))
        });
    };
//

/* 
Export
*/
    module.exports = fetchRequest;
//