//jobs js
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import {BsSearch} from 'react-icons/bs'
import Header from '../Header'
import Profile from '../Profile'
import JobItem from '../JobItem'
import FiltersGroup from '../FiltersGroup'


import './index.css'

const apiJobsConstants = {
    initial: 'INITIAL',
    success: 'SUCCESS',
    failure: 'FAILURE',
    inProgress: 'IN_PROGRESS'
}

class Jobs extends Component{
    state = {
        searchInput: "",
        employmentTypeInput: [],
        packageInput: "",
        jobDetails: [],
        apiJobsStatus: apiJobsConstants.initial
    }

    componentDidMount(){
        this.getJobsDetails()
    }

    getJobsDetails = async () => {
        this.setState({apiJobsStatus: apiJobsConstants.inProgress})

        const jwtToken = Cookies.get("jwt_token")

        const {searchInput, employmentTypeInput, packageInput} = this.state
        const employmentTypeFinalValue = employmentTypeInput.join()

        const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentTypeFinalValue}&minimum_package=${packageInput}&search=${searchInput}`
        const options = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        }

        const response = await fetch(apiUrl, options)

        if(response.ok === true){
            const data = await response.json()
            const updatedData = data.jobs.map(eachJob => ({
                id: eachJob.id,
                companyLogoUrl: eachJob.company_logo_url,
                employmentType: eachJob.employment_type,
                jobDescription: eachJob.job_description,
                location: eachJob.location,
                packagePerAnnum: eachJob.package_per_annum,
                title: eachJob.title,
                rating: eachJob.rating
            }))

            this.setState({jobDetails: updatedData, apiJobsStatus: apiJobsConstants.success})
        }else{
            this.setState({apiJobsStatus: apiJobsConstants.failure})
        }
       

    }

    onChangeSearchInput = event => {
        this.setState({searchInput: event.target.value})
    }

    onEnterSearchInput = event => {
        if(event.key === "Enter"){
            this.getJobsDetails()
        }
    }

    renderSearchBar = () => {
        const {searchInput} = this.state
        return(
            <div className="seacrh-container">
                <input type="search" onChange={this.onChangeSearchInput} onKeyDown={this.onEnterSearchInput} value={searchInput}
                    className="search-bar" placeholder="Search" />
                <button type="button" data-testid="searchButton" className="search-btn">
                    <BsSearch className="search-icon" onClick={this.getJobsDetails} />
                </button>
            </div>
        )
    }

    renderLoader = () => {
        return(
            <div className="loader-container" data-testid="loader">
                <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
            </div>
        )
    }

    renderJobsDetails = () => {
        const {jobDetails} = this.state
        
        if (jobDetails.length !== 0){
            return(
                <ul className="jobs-list-container">
                    {jobDetails.map(eachItem => <JobItem key={eachItem.id} details={eachItem} />)}
                </ul>
            )
        }else{
            return(
                <div className="no-jobs-view">
                    <img src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
                        alt="no jobs" className="no-jobs-img" />
                    <h1 className="no-jobs-heading"> No Jobs Found </h1>
                    <p className="no-jobs-text"> We could not find any jobs. Try Other filters. </p>
                </div>
            )
        }
       
    }

    retryGetJobDetails = () => {
        this.getJobsDetails()
    }

    renderFailureView = () => {
        return(
            <div className="jobs-failure-container">
                <img src="https://assets.ccbp.in/frontend/react-js/failure-img.png" 
                    alt="failure view" className="jobs-faliure-img" />
                <h1 className="jobs-failure-heading"> Oops! Something Went Wrong </h1>
                <p className="jobs-failure-text"> We cannot seen to find the page you are looking for.</p>
                <button type="button" className="jobs-retry-btn" onClick={this.retryGetJobDetails}> Retry </button>
            </div>
        )
    }

    renderContent = () => {
        const {apiJobsStatus} = this.state

        switch(apiJobsStatus){
            case (apiJobsConstants.inProgress):
                return this.renderLoader()
            case (apiJobsConstants.success):
                return this.renderJobsDetails()
            case (apiJobsConstants.failure):
                return this.renderFailureView()
            default:
                return null
        }
    }

    changeEmployType = id => {
        this.setState(prevState =>  ({employmentTypeInput: [...prevState.employmentTypeInput, id]})
        , this.getJobsDetails)
    }

    changeSalaryRange = id => {
        this.setState({packageInput: id}, this.getJobsDetails)
    }

    render(){
        const {jobDetails, packageInput, employmentTypeInput} = this.state
        
        return(
            <>
                <Header />
                <div className="jobs-bg-container">
                    <div className="jobs-responsive-container">
                        <div className="profile-and-filters-container">
                            <Profile />
                            <hr className="hr-line" />
                            <FiltersGroup 
                                changeEmployType={this.changeEmployType}
                                changeSalaryRange={this.changeSalaryRange}
                                activeSalaryRange={packageInput}
                            />
                        </div>
                        <div className="jobs-container">
                            {this.renderSearchBar()}
                            {this.renderContent()}
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Jobs