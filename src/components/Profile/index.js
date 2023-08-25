//profile js
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import './index.css'

const profileApiConstants = {
    intial: 'INITIAL',
    success: 'SUCCESS',
    failure: 'FAILURE',
    inProgress: 'IN_PROGRESS'
}


class Profile extends Component{
    state = {
        profileDetails: {},
        profileApiStatus: profileApiConstants.intial
    }

    componentDidMount(){
        this.getProfileDetails()
    }

    getProfileDetails = async () => {
        this.setState({profileApiStatus: profileApiConstants.inProgress})

        const jwtToken = Cookies.get("jwt_token")

        const url = "https://apis.ccbp.in/profile"
        const options = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        }

        const response = await fetch(url, options)
        if(response.ok === true){
            const data = await response.json()
            const updatedData = {
                name: data.profile_details.name,
                profileImageUrl: data.profile_details.profile_image_url,
                shortBio: data.profile_details.short_bio
            }

            this.setState({profileDetails: updatedData, profileApiStatus: profileApiConstants.success})
        }else{
            this.setState({profileApiStatus: profileApiConstants.failure})
        }
        
    }

    renderLoader = () => {
        return(
            <div className="loader-container" data-testid="loader">
                <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
            </div>
        )
    }

    renderProfileDetails = () => {
        const {profileDetails} = this.state
        return(
            <div className="profile-bg-container">
                <img src={profileDetails.profileImageUrl} 
                    alt="profile"/>
                <h1 className="profile-name"> {profileDetails.name} </h1>
                <p className="profile-details"> {profileDetails.shortBio} </p>
            </div>
        )
    }

    onClickRetryBtn = () => {
        this.getProfileDetails()
    }

    renderFailureView = () => {
        return(
            <div className="retry-btn-container">
                <button type="button" className="retry-btn" onClick={this.onClickRetryBtn}>
                    Retry
                </button>
            </div>
        )
    }

    renderContent = () => {
        const {profileApiStatus} = this.state

        switch(profileApiStatus){
            case (profileApiConstants.inProgress):
                return this.renderLoader()
            case (profileApiConstants.success):
                return this.renderProfileDetails()
            case (profileApiConstants.failure):
                return this.renderFailureView()
            default:
                return null
        }

    }

    render(){
        const {profileDetails} = this.state

        return(
            <>
                {this.renderContent()}
            </>
        )
    }
}

export default Profile