import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn, MdBusinessCenter} from 'react-icons/md'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Profile from '../Profile'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

let empType = ''
let minPkg = ''
let searchJobs = ''
const statuses = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}
const selectedOptions = []

class Jobs extends Component {
  state = {
    jobsList: '',
    status: statuses.initial,
  }

  componentDidMount() {
    this.getDetails()
  }

  getDetails = async () => {
    this.setState({status: statuses.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const jobsApiUrl = `https://apis.ccbp.in/jobs?employment_type=${empType}&minimum_package=${minPkg}&search=${searchJobs}`
    const response = await fetch(jobsApiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
        id: each.id,
      }))

      this.setState({
        jobsList: updatedData,
        status: statuses.success,
      })
    } else {
      this.setState({status: statuses.failure})
    }
  }

  onClickCheckbox = event => {
    if (event.target.checked) {
      selectedOptions.push(event.target.value)
      empType = selectedOptions.join(',')
      console.log(empType)
      this.getDetails()
    } else {
      const {value} = event.target
      const ind = selectedOptions.indexOf(value)
      selectedOptions.splice(ind, 1)
      empType = selectedOptions.join(',')
      console.log(empType)
      this.getDetails()
    }
  }

  onClickRadio = event => {
    minPkg = event.target.value
    this.getDetails()
  }

  onChangeSearch = event => {
    searchJobs = event.target.value
  }

  onClickSearch = () => {
    this.getDetails()
  }

  employmentTypeItem = each => (
    <li className="list-items" key={each.employmentTypeId}>
      <input
        type="checkbox"
        className="input-el"
        onClick={this.onClickCheckbox}
        value={each.employmentTypeId}
        id={each.employmentTypeId}
      />
      <label className="label" htmlFor={each.employmentTypeId}>
        {each.label}
      </label>
    </li>
  )

  salaryRangeItem = each => (
    <li className="list-items" key={each.salaryRangeId}>
      <input
        type="radio"
        className="input-el"
        id={each.salaryRangeId}
        onClick={this.onClickRadio}
        value={each.salaryRangeId}
        name="radios"
      />
      <label className="label" htmlFor={each.salaryRangeId}>
        {each.label}
      </label>
    </li>
  )

  jobFewDetails = each => {
    const {
      companyLogoUrl,
      title,
      id,
      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
    } = each
    return (
      <li className="few-jobs-dtls-list-items-container" key={id}>
        <Link to={`/jobs/${id}`} className="few-jobs-links">
          <div className="logo-title-container">
            <img
              src={companyLogoUrl}
              className="company-logo"
              alt="company logo"
            />
            <div className="title-rating-container">
              <h1 className="job-title">{title}</h1>
              <div className="rating-container">
                <AiFillStar className="star-icon" />
                <p className="rating-para">{rating}</p>
              </div>
            </div>
          </div>
          <div className="icon-pkg-container">
            <div className="icon-containers">
              <div className="icon-container">
                <MdLocationOn className="icons" />
                <p className="icons-label">{location}</p>
              </div>
              <div className="icon-container">
                <MdBusinessCenter className="icons" />
                <p className="icons-label">{employmentType}</p>
              </div>
            </div>
            <p className="pkg">{packagePerAnnum}</p>
          </div>
          <hr className="hr" />

          <h1 className="description-heading">Description</h1>
          <p className="job-description">{jobDescription}</p>
        </Link>
      </li>
    )
  }

  onClickRetry = () => this.getDetails()

  onSuccess = () => {
    const {jobsList} = this.state
    const jobsThr = () => (
      <ul className="few-jobs-dtls-ul-container">
        {jobsList.map(each => this.jobFewDetails(each))}
      </ul>
    )

    const noJobs = () => (
      <div className="no-jobs-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
          className="no-jobs-img"
        />
        <h1 className="no-job-heading">No Jobs Found</h1>
        <p className="no-job-para">
          We could not find any jobs. Try other filters
        </p>
      </div>
    )

    const res = jobsList.length !== 0 ? jobsThr() : noJobs()
    return res
  }

  onInProgress = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  onFailure = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png "
        alt="failure view"
        className="failure-img"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-para">
        We cannot seem to find the page you are looking for
      </p>
      <button type="button" className="retry-btn" onClick={this.onClickRetry}>
        Retry
      </button>
    </div>
  )

  currentStatus = () => {
    const {status} = this.state
    switch (status) {
      case statuses.inProgress:
        return this.onInProgress()
      case statuses.success:
        return this.onSuccess()
      case statuses.failure:
        return this.onFailure()
      default:
        return null
    }
  }

  render() {
    const {status} = this.state
    console.log(status)

    return (
      <div>
        <Header />
        <div className="jobs-bg-container1">
          <div className="jobs-bg-container2">
            <div className="search-box-container1 ">
              <input
                type="search"
                placeholder="Search"
                className="search-input"
                onChange={this.onChangeSearch}
              />
              <button
                type="button"
                data-testid="searchButton"
                className="search-btn"
                onClick={this.onClickSearch}
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            <div className="jobs-bg-container3">
              <Profile />
              <hr />
              <h1 className="types-heading">Type of Employment</h1>
              <ul className="ul-container">
                {employmentTypesList.map(each => this.employmentTypeItem(each))}
              </ul>
              <hr />
              <h1 className="types-heading">Salary Range</h1>
              <ul className="ul-container">
                {salaryRangesList.map(each => this.salaryRangeItem(each))}
              </ul>
            </div>
            <div className="jobs-bg-container4">
              <div className="search-box-container2">
                <input
                  type="search"
                  placeholder="Search"
                  className="search-input"
                  onChange={this.onChangeSearch}
                />
                <button
                  type="button"
                  data-testid="searchButton"
                  className="search-btn"
                  onClick={this.onClickSearch}
                >
                  <BsSearch className="search-icon" />
                </button>
              </div>
              {this.currentStatus()}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
