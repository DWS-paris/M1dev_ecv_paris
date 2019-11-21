document.addEventListener('DOMContentLoaded', () => {

    /* 
    Définition d'une classe User
    */
        class User {
            // Injecter des valeurs dans la classe
            constructor(paramName, paramAge, paramEmail, paramPassword){
                this.name = paramName;
                this.age = paramAge;
                this.email = paramEmail;
                this.password = paramPassword;
                this.isValidated = false;
            }

            /* 
            Méthodes
            */
                sayHello(){
                    console.log(`Hello my name is ${this.name}`)
                }

                howOld(){
                    console.log(`My age is ${this.age} years`)
                }

                sendEmailValidation(){
                    // Envoyer un eemail à this.email
                    // => une fois l'email validé
                    this.isValidated = true;
                }

                login(email, password){
                    if( this.isValidated ){
                        fetch('/api/login', {
                            method: 'POST',
                            body: {
                                email: email,
                                password: password
                            }
                        })
                        .then( apiResponse => apiResponse.json() )
                        .then( jsonResponse => console.log(jsonResponse))
                        .catch( apiError => console.error(apiError) )
                    }
                    else{
                        console.log('You need to validate your email')
                    }
                }
            //
        }
    //

    /* 
    Création de nouveaux utilisateurs
    */
        let julien = new User('Julien', 40);
        julien.sayHello();
        julien.howOld();
        console.log(julien);
    //


    


})