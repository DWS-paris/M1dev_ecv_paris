/* 
Import
*/
    // Nodes
    const exprress = require('express');
    const bodyParser = require('body-parser');
    const ejs = require('ejs'); 
    const path = require('path');

    // Modules
    const fetch = require('node-fetch');
//

/* 
Config
*/
    // Declaration
    const server = exprress();
    const port = 9438;

    // Server class
    class ServerClass{
        init(){
            // View engine configuration
            server.set('view engine', 'ejs');

            //=> Body-parser
            server.use(bodyParser.json({limit: '10mb'}));
            server.use(bodyParser.urlencoded({ extended: true }));

            // Static path configuration
            server.set( 'views', __dirname + '/www' );
            server.use( exprress.static(path.join( __dirname, 'www' )) );

            // Get routes
            this.serverRoutes();
        };

        serverRoutes(){
            /* 
            API route definition; CRUD
            */
                // CRUD: Create item
                server.post( '/api/:endpoint', ( req, res ) => {
                    const apiEndpoint = req.params['endpoint'];

                    // Create new DB entry
                    return new Promise( (resolve, reject) => {

                        // Check body content
                        //=> IF OK
                        fetch( `http://localhost:3000/${apiEndpoint}`, {
                            method: 'POST',
                            body: JSON.stringify(req.body),
                            headers: { 'Content-Type': 'application/json' }
                        })
                        .then( data => {
                            // Resolve Promise  data
                            return resolve( res.json({
                                status: 201,
                                msg: 'Item created',
                                data: data,
                                error: null
                            }))
                        })
                        .catch( err => {
                            // Reject Promise error
                            return reject( res.json({
                                status: 500,
                                msg: 'Item not created',
                                data: null,
                                error: err
                            }))
                        })
                    });
                })

                // CRUD: Read one item

                // CRUD: Read all items

                // CRUD: Update item by ID

                // CRUD: Delete item by ID
            //


            // Start server
            this.launch();
        }

        launch(){
            server.listen( port, () => {
                console.log(`Server is listening on port ${port}`);
            });
        };
    };
//

/* 
Start server
*/
    new ServerClass().init();
//