document.addEventListener('DOMContentLoaded', () => {
    /* 
    Delarations
    */
        const urlInstagram = `https://www.instagram.com/explore/tags`;
    //

    /* 
    Methods/Functions
    */
        const fetchInstagram = (tag = `javascript`) => {
            // Get request: fetch
            fetch(`${urlInstagram}/${tag}/?__a=1`)
            .then( instagramData => {
                console.log(instagramData);
                /* 
                Check result
                */
                    if( instagramData.ok ){
                        // Get the JSON data
                        return instagramData.json();
                    }
                    else{
                        console.log('Fetch error', instagramData);
                    };
                //
            })
            .then( jsonData => {
                console.log(jsonData);
            })
            .catch( fetchError => {
                console.error(fetchError);
            });
        };
    //

    /* 
    Start interface
    */ 
        fetchInstagram();
    //


});