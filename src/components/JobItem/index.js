//jobitem js
import {MdLocationOn} from 'react-icons/md'
import {AiFillStar} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import './index.css'


const JobItem = props => {
    const {details} = props
    const { id, companyLogoUrl, employmentType, jobDescription, location, packagePerAnnum, title, rating } = details

    return(
        <li className="job-item-container">
            <div className="job-logo-container">
                <img src={companyLogoUrl} 
                    alt="company logo" className="company-logo" />
                <div className="job-role-rating-container">
                    <h1 className="job-title"> {title} </h1>
                    <div className="rating-container">
                        <AiFillStar className="star-icon" />
                        <p className="job-rating"> {rating} </p>
                    </div>
                </div>
            </div>
            <div className="location-package-details">
                <div className="location-employment-container">
                    <div className="location-container">
                        <MdLocationOn className="location-icon" />
                        <p className="location"> {location} </p>
                    </div>
                    <div className="location-container">
                        <BsFillBriefcaseFill className="location-icon" />
                        <p className="location"> {employmentType} </p>
                    </div>
                </div>
                <p className="package"> {packagePerAnnum} </p>
            </div>
            <hr className="horizontal-line" />
            <h1 className="description-text"> Description </h1>
            <p className="description"> {jobDescription} </p>
        </li>
    )
}

export default JobItem