function IconButton({onClick, text,classMenu}) {
    return <button className={`transparent-button ${classMenu} `} onClick={onClick}><span className="material-symbols-outlined">{text}</span></button>
}