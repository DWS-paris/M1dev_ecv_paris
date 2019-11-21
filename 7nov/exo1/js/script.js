document.addEventListener('DOMContentLoaded', () => {


    /* Object simple */
    let julien = {
        name: 'Julien',
        age: 40,
        sayHello: () => {
            console.log(`Hello my name is ${this.name}`)
        }
    }

    /* 
    Object constructor
    => Modèle objet
    */
        // Modèle objet
        function User( paramName, paramAge ){
            this.name = paramName;
            this.age = paramAge
        };

        // Ajouter une fonctionalité
        User.prototype.sayHello = function(){
            console.log( 'Hello my name is ' + this.name )
        };

        User.prototype.howOld = function(){
            console.log('My age is ' + this.age);
        }

        // Instanciation du model objet
        let chuck = new User('Chuck', 179);
        chuck.sayHello();
        chuck.howOld();
        console.log(chuck);

        let jeanClaude = new User('Jean Claude', 56);
        jeanClaude.sayHello();
        jeanClaude.howOld();
        console.log(jeanClaude);
    //


})