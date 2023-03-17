import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Header from '../Header'
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
class Jobs extends Component {
  state = {profileData: '', jobsList: ''}

  componentDidMount() {
    this.getDetails()
  }

  getDetails = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/profile'
    const apiUrl1 = 'https://apis.ccbp.in/jobs'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    const response1 = await fetch(apiUrl1, options)
    const data1 = await response1.json()

    const updatedData = {
      name: data.profile_details.name,
      profileImageUrl: data.profile_details.profile_image_url,
      shortBio: data.profile_details.short_bio,
    }
    const updatedData1 = data1.jobs.map(each => ({
      companyLogoUrl: each.company_logo_url,
      employmentType: each.employment_type,
      jobDescription: each.job_description,
      location: each.location,
      packagePerAnnum: each.package_per_annum,
      rating: each.rating,
      title: each.title,
    }))

    this.setState({profileData: updatedData, jobsList: updatedData1})
  }

  onChangeCheckbox = event => console.log(event.target.value)

  employmentTypeItem = each => (
    <li className="list-items" key={each.employmentTypeId}>
      <input
        type="checkbox"
        className="input-el"
        onClick={this.onChangeCheckbox}
        value={each.label}
        id={each.employmentTypeId}
      />
      <label className="label" htmlFor={each.employmentTypeId}>
        {each.label}
      </label>
    </li>
  )

  salaryRangeItem = each => (
    <li className="list-items" key={each.salaryRangeId}>
      <input type="radio" className="input-el" id={each.salaryRangeId} />
      <label className="label" htmlFor={each.salaryRangeId}>
        {each.label}
      </label>
    </li>
  )

  render() {
    const {profileData, jobsList} = this.state
    const {name, profileImageUrl, shortBio} = profileData

    return (
      <div>
        <Header />
        <div className="jobs-bg-container1">
          <div className="jobs-bg-container2">
            <div className="jobs-bg-container3">
              <div className="profile-bg-container">
                <img
                  className="profile-img"
                  src={profileImageUrl}
                  alt="profile"
                />
                <h1 className="profile-name">{name}</h1>
                <p className="profile-bio">{shortBio}</p>
              </div>
              <hr />
              <p className="types-heading">Types of Employment</p>
              <ul className="ul-container">
                {employmentTypesList.map(each => this.employmentTypeItem(each))}
              </ul>
              <hr />
              <p className="types-heading">Salary Range</p>
              <ul className="ul-container">
                {salaryRangesList.map(each => this.salaryRangeItem(each))}
              </ul>
            </div>
            <div className="jobs-bg-container4">
              <div className="search-box-container">
                <input
                  type="search"
                  placeholder="Search"
                  className="search-input"
                />
                <button
                  type="button"
                  data-testid="searchButton"
                  className="search-btn"
                >
                  <BsSearch className="search-icon" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
