function updateUserPassword(token, oldPassword, newPassword, newPasswordRepeat, callback) {
    if (typeof token !== 'string') throw new TypeError('Token is not a string')
    if (token.trim().length === 0) throw new Error('Token is empty or blank')

    if (typeof oldPassword !== 'string') throw new TypeError('Old password is not a string')
    if (oldPassword.trim().length === 0) throw new Error('Old password is empty or blank')
    if (oldPassword.length < 8) throw new Error('Old password length is less than 8 characters')

    if (typeof newPassword !== 'string') throw new TypeError('New password is not a string')
    if (newPassword.trim().length === 0) throw new Error('New password is empty or blank')
    if (newPassword.length < 8) throw new Error('New password length is less than 8 characters')

    if (typeof newPasswordRepeat !== 'string') throw new TypeError('New password repeat is not a string')
    if (newPasswordRepeat.trim().length === 0) throw new Error('New password repeat is empty or blank')
    if (newPasswordRepeat.length < 8) throw new Error('New password repeat length is less than 8 characters')

    if (typeof callback !== 'function') throw new TypeError('Callback is not a function')

    const xhr = new XMLHttpRequest

    xhr.onload = function () {
        const status = xhr.status

        if (status >= 500)
            callback(new Error(`server error (${status})`))
        else if (status >= 400)
            callback(new Error(`client error (${status})`))
        else if (status === 204)
            callback(null)
    }

    xhr.open('PATCH', 'https://b00tc4mp.herokuapp.com/api/v2/users')

    xhr.setRequestHeader('Authorization', `Bearer ${token}`)
    xhr.setRequestHeader('Content-type', 'application/json')

    const json = JSON.stringify({ oldPassword, password: newPassword })

    xhr.send(json)
}