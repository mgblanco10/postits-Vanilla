const {useState, useEffect} = React

function HomePage({onLogoutClick, onFeedback}){
    const logger = new Loggito('HomePage')

    const [name, setName] = useState(null)
    const [notes, setNotes] = useState(null)
    const [view, setView] = useState('info')

    useEffect(() => {
        logger.info('"componentDidMount"')

        try {
            retrieveUser(sessionStorage.token, (error, user) => {
                if (error) {
                    onFeedback({ message: error.message, level: 'error' })

                    logger.warn(error.message)

                    onLogoutClick()

                    return
                }

                setName(user.name)

                logger.debug('setName', user.name)
            })
        } catch (error) {
            onFeedback({ message: error.message, level: 'error' })

            logger.warn(error.message)
        }

        loadNotes()
    }, [])

    const loadNotes = () =>{
        try{
            retrieveNotes(sessionStorage.token, (error, notes)=>{
                if (error){
                    onFeedback({ message: error.message, level: 'error' })

                    logger.warn(error.message)

                    return
                }
                setNotes(notes)

                logger.debug('setNotes', notes)

            })
        }catch (error){
            onFeedback({ message: error.message, level: 'error' })

            logger.warn(error.message)
        }
    }

    const handleAddClick = () =>{
        try {
            createNote(sessionStorage.token, error =>{
                if (error){
                    onFeedback({ message: error.message, level: 'error' })
                    logger.warn(error.message)

                    return
                }
                loadNotes()
            })
        } catch (error){
            onFeedback({ message: error.message, level: 'error' })
            logger.warn(error.message)
        }
    }

    const handleUpdateNote = (noteId, text)=>{
        try{
            updateNote (sessionStorage.token, noteId, text, error =>{
                if (error){
                    onFeedback({ message: error.message, level: 'error' })

                    logger.warn(error.message)

                    return
                }
            })
        }catch (error){
            onFeedback({ message: error.message, level: 'error' })

            logger.warn(error.message)
        }
    }

    const handleDeleteNote = noteId =>{
        try {
            deleteNote (sessionStorage.token, noteId, error =>{
                if (error){
                    onFeedback({ message: error.message, level: 'error' })

                    logger.warn(error.message)

                    return
                }

                loadNotes()
            })
        } catch (error){
            onFeedback({ message: error.message, level: 'error' })

            logger.warn (error.message)
        }
    }

    const handleSettingsClick = () => {
        setView('settings')
        logger.debug('setView', 'settings')
        loadNotes()
    }

    const handleInfoClick = () =>{
        setView('info')
        logger.debug('setView', 'info')
        loadNotes()  
    }

    const handleSettingsCloseClick = () => {
        setView('list')
        logger.debug ('setView', 'list')
    }

    const handleInfoCloseCLick = () => {
        setView('list')
        logger.debug('setView', 'list')
    }

    logger.info('render')

    return name ?
        <div className="home-page container--full container--distributed">
            <Header name={name} onLogoutClick={onLogoutClick} onSettingsClick={handleSettingsClick} onInfoClick={handleInfoClick} view={view} />

        <main className="main">
            {view === 'list' && <NoteList notes={notes} onUpdateNote={handleUpdateNote} onDeleteNote={handleDeleteNote} />}
            {view === 'settings' && <Settings onCloseClick={handleSettingsCloseClick} onFeedback={onFeedback} />}
            {view === 'info' &&<Info onCloseClick={handleInfoCloseCLick}/>}
        </main> 

        <footer className="footer">
            {view === 'list'&& <button className="add-button transparent-button" onClick={handleAddClick}>+</button>}
        </footer>
    </div>
    :
    null
}  


