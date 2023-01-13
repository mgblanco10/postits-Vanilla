function RegisterPage({onLinkClick, onFeedback }) {
    const logger = new Loggito(RegisterPage.name)

    logger.info('constructor')

    const handleLinkClick = event => {
        event.preventDefault()

        onLinkClick()
    }
    const handleFormSubmit = event => {
        event.preventDefault()

        const form = event.target

        const nameInput = form.name
        const emailInput = form.email
        const passwordInput = form.password

        const name = nameInput.value
        const email = emailInput.value
        const password = passwordInput.value

        try {
            registerUser(name, email, password, (error) => {
                if (error) {
                    onFeedback({ message: error.message, level: 'error'})
                    
                    logger.warn(error.message)

                    return
                }
                logger.debug('register reset')
                onFeedback({message:`New usser`, level: 'success'})
                form.reset()
                onLinkClick()
            })
        } catch (error) {
            onFeedback({ message: error.message, level: 'error'})

            logger.warn(error.message)
        }
    }

    logger.info('render')

    return (<main className="register-page container container--full container--spaced">
        <form className="form form-register" onSubmit={handleFormSubmit}>
            <img className="imgRegister"
                src="https://cdn-icons-png.flaticon.com/512/5087/5087579.png" />

            <div className="form__field">
                <label htmlFor="name">Name</label>
                <input className="input" type="text" name="name" placeholder="name" id="name" />
            </div>

            <div className="form__field">
                <label htmlFor="email">Email</label>
                <input className="input" type="email" name="email" placeholder="email" id="email" />
            </div>

            <div className="form__field">
                <label htmlFor="password">Password</label>
                <input className="input" type="password" name="password" placeholder="password" id="password" />
            </div>

            <button className="button" type="submit">Register</button>
        </form>
        <a className="anchor" href="#" onClick={handleLinkClick}> Login </a>
    </main>)
}


