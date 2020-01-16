/* 
Import
*/
    // Nodes
    const exprress = require('express');
    const bodyParser = require('body-parser');
    const ejs = require('ejs'); 
    const path = require('path');

    // Inner
    const fetchRequest = require('./services/fetch.service');
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
                    // Use fetch service
                    fetchRequest('POST', req.params['endpoint'],req.body)
                    .then( fetchedData => {
                        return res.json({
                            msg: "Item created",
                            status: "201",
                            data: fetchedData,
                            error: null
                        })
                    } )
                    .catch( fetchError => {
                        console.log(fetchError)
                        return res.json({
                            msg: "Item not created",
                            status: "500",
                            data: null,
                            error: fetchError
                        })
                    })
                })

                // CRUD: Read one item
                server.get( '/api/:endpoint/:id', (req, res) => {
                    fetchRequest( 'GET', `${req.params['endpoint']}/${req.params['id']}` )
                    .then( fetchedData => {
                        return res.json({
                            msg: "Item fetched",
                            status: "200",
                            data: fetchedData,
                            error: null
                        })
                    } )
                    .catch( fetchError => {
                        console.log(fetchError)
                        return res.json({
                            msg: "Item not fetched",
                            status: "500",
                            data: null,
                            error: fetchError
                        })
                    })
                })

                // CRUD: Read all items
                server.get( '/api/:endpoint/', async (req, res) => {
                    const fetchedData = await fetchRequest( 'GET', req.params['endpoint'])

                    if( fetchedData === {} ){
                        return res.json({
                            msg: "Items fetched",
                            status: "200",
                            data: fetchedData,
                            error: null
                        })
                    }
                    else{
                        return res.json({
                            msg: "Items not fetched",
                            status: "500",
                            data: null,
                            error: fetchedData
                        })
                    }
                })

                // CRUD: Update item by ID
                server.put( '/api/:endpoint/:id', (req, res) => {
                    fetchRequest( 'PUT', `${req.params['endpoint']}/${req.params['id']}`, req.body )
                    .then( fetchedData => {
                        return res.json({
                            msg: "Item updated",
                            status: "201",
                            data: fetchedData,
                            error: null
                        })
                    } )
                    .catch( fetchError => {
                        console.log(fetchError)
                        return res.json({
                            msg: "Item not updated",
                            status: "500",
                            data: null,
                            error: fetchError
                        })
                    })
                })

                // CRUD: Delete item by ID
                server.delete( '/api/:endpoint/:id', (req, res) => {
                    fetchRequest( 'DELETE', `${req.params['endpoint']}/${req.params['id']}` )
                    .then( fetchedData => {
                        return res.json({
                            msg: "Item deleted",
                            status: "200",
                            data: fetchedData,
                            error: null
                        })
                    })
                    .catch( fetchError => {
                        console.log(fetchError)
                        return res.json({
                            msg: "Item not deleted",
                            status: "500",
                            data: null,
                            error: fetchError
                        })
                    })
                })
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