function Feedback({ level, message, onClick }) {
    return <div className={`Feedback container Feedback--${level? level : 'info'}`}>
        <div className="Feedback__box container container--spaced container--padded">
            {message}
            <button className="button" onClick={onClick}>Accept</button>
        </div>
    </div>
}