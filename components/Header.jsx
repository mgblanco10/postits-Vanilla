//const useState = React.useState
const {useState} = React

function Header({name, onLogoutClick, onSettingsClick, view:viewHome}){
    const logger = new Loggito ('Header')
    
    const [view, setView] = useState(null) // [null, f () {}]

    const handleMenuClick = () => {
        setView('menu')

        logger.debug('setView', 'menu')
    }

    const handleCloseClick = () => {
        setView(null)
    
        logger.debug('setView', null)
    }

    const handleSettingsClick = () => {
        setView(null)

        logger.debug('setView', null)

        onSettingsClick()
    }

    logger.info('render')
       
        return (<header className="Header container">
        
    <div className= "container containerHeader">
    <img className="Header__img" src="https://media4.giphy.com/media/lnyLJ57x8jJ13ZDhTZ/giphy.gif?cid=a267dfa35mpqsy8edagjq1n6d14c20r903cyt2gneqzbgona&rid=giphy.gif&60490a1f0d4f710d77dfff46&1653264000136"/>
        <h1 className="title"> Hello, {name}! </h1>
 
            { view === null && <IconButton classMenu='menuClose' text="menu" onClick={handleMenuClick} />}
            { view === 'menu' && <IconButton classMenu='menuClose' text="close" onClick={handleCloseClick} />}
    </div>

            { view === 'menu' && <Menu onLogoutClick={onLogoutClick} onSettingsClick={handleSettingsClick} view={viewHome} />}
        </header>)
        
}

