//notfound js
import './index.css'

const NotFound = () => {
    return(
        <div className="notfound-container">
            <img src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
                alt="not found" className="notfound-img" />
            <h1 className="notfound-heading"> Page Not Found </h1>
            <p className="notfound-description"> We are sorry, the page you requested could not found </p>
        </div>
    )
}

export default NotFound