/* 
Import
*/
    // Nodes
    const exprress = require('express');
    const bodyParser = require('body-parser');
    const ejs = require('ejs');
    const path = require('path');
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

            // Start server
            this.launch();
        };

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