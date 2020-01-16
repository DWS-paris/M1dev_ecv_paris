document.addEventListener('DOMContentLoaded', () => {

    /* 
    Delarations
    */
        const apiUrl = 'http://localhost:9438/api'
        const articlesList = document.querySelector('#articlesList');
        const addPostForm = document.querySelector('#addPostForm');
        const title = document.querySelector('#title');
        const content = document.querySelector('#content');
    //


    /* 
    Methods/Functions
    */
        const getFormSubmit = () => {
            addPostForm.addEventListener('submit', event => {
                event.preventDefault();

                if( title.value.length > 1 && content.value.length > 2){
                    // Add post within the API
                    fetchRequest( 'POST', 'posts', { title: title.value, content: content.value } )
                    .then( data => {
                        addPostForm.reset();
                        displayPosts([data])
                    } )
                    .catch( err => console.error(err) )
                }
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
                    <li>
                        <p>${item.title}</p>
                        <a href="${item.id}" class="displayBtn">Afficher</a>
                        <a href="${item.id}" class="updateBtn">Mettre a jour</a>
                        <a href="${item.id}"  class="deleteItem">Supprimer</a>
                    </li>
                `;
            };
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