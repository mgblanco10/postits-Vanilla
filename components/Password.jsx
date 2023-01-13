function Password ({onCloseClick, onFeedback}) {
    const logger = new Loggito('Settings')

    logger.info('render')

    const handleFormSubmit = event => {
        event.preventDefault()

        // const {target: {oldPassword:{value:oldPassword}, newPassword:{value:newPassword}, newPasswordRepeat:{value:newPasswordRepeat}}} = event
        const { target: form } = event

        const {
            oldEmail: { value: oldEmail },
            newEmail: { value: newEmail },
            newEmailRepeat: { value: newEmailRepeat }
        } = form
        try {
            updateUserEmail(sessionStorage.token, oldEmail, newEmail, newEmailRepeat, error => {
                if (error) {
                    alert(error.message)
                    
                    return
                }
    
                onFeedback({message:`Email update`, level: 'success'})
                form.reset()
                onCloseClick()
            })
        } catch(error) {
            onFeedback({message:error.message, level: 'warning'})

            logger.warn(error.message)
        }
    }
    logger.info('render')

        return <div className="Settings container">

            <form className="update-email-form form" onSubmit={handleFormSubmit}>
                <img className="Settings__img" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3Ne6f06tRXhNZQl2jp5YjNepB8j5_hojl4LcOcyO-1s7TLzUHGuSIwblFSZ_ihI0BAlU&usqp=CAU" />

                <div className="form__field">
                    <label htmlFor="oldEmail">Current Email</label>
                    <input className="input" type="email" name="oldEmail" placeholder="old email" id="oldEmail" />
                </div>

                <div className="form__field">
                    <label htmlFor="newEmail">New Email</label>
                    <input class="input" type="email" name="newEmail" placeholder="new email" id="newEmail" />
                </div>

                <div className="form__field">
                    <label htmlFor="newEmailRepeat">Repeat New Email</label>
                    <input className="input" type="email" name="newEmailRepeat" placeholder="repeat new email" id="newEmailRepeat" />
                </div>

                <button className="button" type="submit">Update</button>
            </form>
            <IconButton text="home" onClick={onCloseClick} />
        </div>
    }