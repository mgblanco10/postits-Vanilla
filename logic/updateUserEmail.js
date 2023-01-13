function updateUserEmail (token, newEmail, callback){
    
    if (typeof newEmail !== 'string') throw new TypeError('Email is not string')
    if (newEmail.trim().length === 0) throw new Error('Email is empty or blank')
    if (!mailRegex.test(newEmail)) throw new Error('Email is not valid')
    if (typeof callback !== 'function') throw new TypeError('callback is not a function')

    
    const xhr = new XMLHttpRequest

    xhr.onload = function(){
        const status = xhr.status
        if(status >= 500)
            callback(new Error(`Server error (${status})`))
        if(status >=400)
            callback(new Error(`Client error (${JSON.parse(xhr.response).error})`))
        if(status === 204)
            callback(null)
    }

    xhr.open('PATCH','https://b00tc4mp.herokuapp.com/api/v2/users')

    xhr.setRequestHeader('Content-type', 'application/json')
    xhr.setRequestHeader('Authorization', `Bearer ${token}`)

    const newData = {
        username: newEmail,
    }
    xhr.send(JSON.stringify(newData))
}