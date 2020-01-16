document.addEventListener('DOMContentLoaded', () => {
    /* 
    Delarations
    */
        const urlInstagram = `https://www.instagram.com/explore/tags`;
        const mainTag = document.querySelector('main');
        const tagList = document.createElement('ul');
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
                displayTagList(jsonData.graphql.hashtag.edge_hashtag_to_media.edges);
            })
            .catch( fetchError => {
                console.error(fetchError);
            });
        };

        const displayTagList = collection => {
            // Loop on colection
            for( let item of collection ){
                //console.log(item)
                // Create LI tag
                let listItem = document.createElement('li');
                // Add CLASS on LI tag
                listItem.classList.add('instagramTag');

                // Add content in LI tag
                listItem.innerHTML = `
                    <p>${item.node.edge_media_to_caption.edges[0].node.text}</p>
                    <a href="${item.node.display_url}">Voir l'image</a>
                `;

                // Add LI tag in UL tag
                tagList.appendChild(listItem)
            }

            // Add UL tag in MAIN tag
            mainTag.appendChild(tagList)
        }
    //

    /* 
    Start interface
    */ 
        fetchInstagram();
    //


});