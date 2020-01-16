document.addEventListener('DOMContentLoaded', () => {

    /* 
    Delarations
    */
        const apiUrl = 'http://localhost:9438/api'
        const articlesList = document.querySelector('#articlesList');
        const addPostForm = document.querySelector('#addPostForm');
        const title = document.querySelector('#title');
        const content = document.querySelector('#content');
        const popin = document.querySelector('#popin');
        const idPostToEdit = document.querySelector('#idPostToEdit');
        const formSectionTitle = document.querySelector('#formSection h2');
    //


    /* 
    Methods/Functions
    */
        const getFormSubmit = () => {
            addPostForm.addEventListener('submit', event => {
                event.preventDefault();

                if( title.value.length > 1 && content.value.length > 2){
                    // Check for create or update
                    if( idPostToEdit.value.length === 0 ){
                        // Add post within the API
                        fetchRequest( 'POST', 'posts', { title: title.value, content: content.value } )
                        .then( apiResponse => {
                            // Display new post
                            displayPosts([apiResponse.data])
                        } )
                        .catch( err => console.error(err) )
                    }
                    else{
                        // Updat post within the API
                        fetchRequest( 'PUT', `posts/${idPostToEdit.value}`, { title: title.value, content: content.value } )
                        .then( apiResponse => {
                            // Update DOM
                            document.querySelector(`[data-item-id="${idPostToEdit.value}"] p`).innerHTML = title.value;
                            
                        } )
                        .catch( err => console.error(err) )
                    }
                    
                }

                // Reset Form
                formSectionTitle.innerHTML = `Ajouter un article`
                addPostForm.reset();
            })
        }
        
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
                fetch( `${apiUrl}/${apiEndpoint}`, config)
                //=> Succes request
                .then( data => data.json())
                //=> Succes json data
                .then( jsonData => resolve( jsonData ))
                //=> Error reject err
                .catch( err => reject( err ))
            });
        };

        const displayPosts = data => {
            for( let item of data ){
                articlesList.innerHTML += `
                    <li data-item-id="${item.id}">
                        <p>${item.title}</p>
                        <a href="${item.id}" class="displayBtn">Afficher</a>
                        <a href="${item.id}" class="updateBtn">Mettre a jour</a>
                        <a href="${item.id}"  class="deleteItem">Supprimer</a>
                    </li>
                `;
            };

            getPostInteraction();
        }

        const getPostInteraction = () => {
            // Get links
            const displayLinks = document.querySelectorAll('.displayBtn');
            const updateLinks = document.querySelectorAll('.updateBtn');
            const deleteLinks = document.querySelectorAll('.deleteItem');

            // Concat links
            const interactionLinks = [...displayLinks, ...updateLinks, ...deleteLinks];

            // Loop on  collection
            for( let item of interactionLinks ){
                // Check the item class
                if( item.getAttribute('class') === 'displayBtn' ){
                    item.addEventListener('click', event => {
                        event.preventDefault();

                        fetchRequest('GET' ,`posts/${item.getAttribute('href')}`)
                        .then( apiResponse => displaySinglePost(apiResponse.data) )
                        .catch( err => console.error(err))
                    })
                }
                else if( item.getAttribute('class') === 'updateBtn' ){
                    item.addEventListener('click', event => {
                        event.preventDefault();

                        fetchRequest('GET' ,`posts/${item.getAttribute('href')}`)
                        .then( apiResponse => getPostEditForm(apiResponse.data) )
                        .catch( err => console.error(err))
                    })
                }
                else if( item.getAttribute('class') === 'deleteItem' ){
                    item.addEventListener('click', event => {
                        event.preventDefault();

                        fetchRequest('DELETE', `posts/${item.getAttribute('href')}`)
                        .then( apiResponse => {
                            document.querySelector(`[data-item-id="${item.getAttribute('href')}"]`).remove()
                        } )
                        .catch( err => console.error(err))
                    })
                }
            }
        }

        const displaySinglePost = data => {
            // Add content in the popin
            popin.innerHTML = `
                <h2>${data.title}</h2>
                <h2>${data.content}</h2>
            `;

            // Open the popin
            popin.classList.add('open');

            // Close the popin
            popin.addEventListener('click', () => {
                popin.classList.remove('open')
            })
        }

        const getPostEditForm = data => {
            // Add correct data in the form
            formSectionTitle.innerHTML = `Mettre à jour l'article ID ${data.id}`
            title.value = data.title;
            content.value = data.content;
            idPostToEdit.value = data.id;
        }
    //

    /* 
    Start interface
    */
        fetchRequest( 'GET', 'posts' )
        .then( apiResponse => displayPosts(apiResponse.data) )
        .catch( err => console.error(err));

        getFormSubmit();
    //
});