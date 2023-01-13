/**
 * Checks user credentials against database
 * 
 * @param {string} email The user email
 * @param {string} password The user password
 * @param {function} callback The function expression that provides a result
 * 
 * @throws {Error | TypeError} On invalid inputs
 */

function authenticateUser(email, password, callback) {
    if (typeof email !== 'string') throw new TypeError('Email is not a string')
    if (email.trim().length === 0) throw new Error('Email is empty or blank')
    if (email.length < 6) throw new Error('Email length is not valid')
    if (!EMAIL_REGEX.test(email)) throw new Error('Email is not valid')

    if (typeof password !== 'string') throw new TypeError('Password is not a string')
    if (password.trim().length === 0) throw new Error('Password is empty or blank')
    if (password.length < 8) throw new Error('Password length is less than 8 characters')

    if (typeof callback !== 'function') throw new TypeError('Callback is not a function')
 
    const xhr = new XMLHttpRequest

    xhr.onload = function (){
    
        const status = xhr.status

        if(status >= 500)
            callback (new Error (`server error (${status})`))
        else if (status >= 400)
             callback (new Error (`client error (${status})`))
        else if (status === 200){
            //recibo JSON en xhr.responseText
            const json = xhr.responseText
            // parseo JSON a JS
            const data = JSON.parse (json)
            // accedo al valor de la propiedad token
            const token = data.token
            // llamo a la callback con 'null'para el manejo de errores
            
            callback(null, token)
         }
    }
    
    xhr.open ('POST', 'https://b00tc4mp.herokuapp.com/api/v2/users/auth')
    
    xhr.setRequestHeader('Content-type', 'application/json')
    
    xhr.send(`{"username":"${email}", "password":"${password}"}`)

}
