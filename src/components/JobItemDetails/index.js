import {Component} from 'react'
import Cookies from 'js-cookie'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn, MdBusinessCenter} from 'react-icons/md'
import {IoOpenOutline} from 'react-icons/io5'
import Header from '../Header'
import './index.css'

const views = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
  initial: 'INITIAL',
}

class JobItemDetails extends Component {
  state = {jobItemDtls: '', similarJobs: '', status: views.initial}

  componentDidMount() {
    this.getDetails()
  }

  convertData = data => ({
    companyLogoUrl: data.company_logo_url,
    employmentType: data.employment_type,
    id: data.id,
    jobDescription: data.job_description,
    location: data.location,
    pkgPerAnnum: data.package_per_annum,
    rating: data.rating,
    title: data.title,
    companyWebsiteUrl: data.company_website_url,
    lifeAtCompany: {
      description: data.life_at_company.description,
      imageUrl: data.life_at_company.image_url,
    },
    skills: data.skills.map(each => ({
      name: each.name,
      imageUrl: each.image_url,
    })),
  })

  convertData2 = data => ({
    companyLogoUrl: data.company_logo_url,
    employmentType: data.employment_type,
    id: data.id,
    jobDescription: data.job_description,
    location: data.location,
    pkgPerAnnum: data.package_per_annum,
    rating: data.rating,
    title: data.title,
  })

  getDetails = async () => {
    console.log(1)
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    const data1 = await response.json()
    const jobItemDtls = this.convertData(data1.job_details)
    const similarJobs = data1.similar_jobs.map(each => this.convertData2(each))
    this.setState({jobItemDtls, similarJobs, status: views.success})
  }

  onJobItemDtls = () => {
    const {jobItemDtls, status} = this.state
    const {
      companyLogoUrl,
      employmentType,
      id,
      jobDescription,
      location,
      pkgPerAnnum,
      rating,
      title,
      companyWebsiteUrl,
      lifeAtCompany,
      skills,
    } = jobItemDtls

    return (
      <div className="details-container">
        <div className="details-margin-container">
          <div className="logo-title-container">
            <img
              className="logo"
              src={companyLogoUrl}
              alt=" job details company logo"
            />
            <div>
              <h1 className="title">{title}</h1>
              <div className="job-item-dtls-rating-container">
                <AiFillStar className="star" />
                <p className="rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="location-emp-type-pkg-container">
            <div className="location-emp-type-container">
              <div className="job-item-dtls-location-container">
                <MdLocationOn className="job-item-dtls-location-icon" />
                <p className="job-item-dtls-location-name ">{location}</p>
              </div>
              <div className="job-item-dtls-emp-type-container">
                <MdBusinessCenter className="job-item-dtls-emp-type-icon" />
                <p className="job-item-dtls-emp-type-para">{employmentType}</p>
              </div>
            </div>
            <p className="pkg">{pkgPerAnnum}</p>
          </div>
          <hr />
          <div className="description-container">
            <div>
              <h1 className="job-item-dtls-description-heading">Description</h1>
              <a href={companyWebsiteUrl} className="hyper-link">
                <h1>Visit</h1>
                <IoOpenOutline />
              </a>
            </div>
            <p className="job-item-dtls-description-para">{jobDescription}</p>
          </div>
          <div>
            <h1 className="job-item-dtls-skills-heading">Skills</h1>
            <div className="total-skills-container">
              {status === views.success &&
                skills.map(each => (
                  <div className="skill-name-img-container" key={each.name}>
                    <img src={each.imageUrl} alt="" className="skill-img" />
                    <p className="skill-names">{each.name}</p>
                  </div>
                ))}
            </div>
          </div>
          <div>
            <h1 className="life-at-comp-heading">Life at Company</h1>
            {status === views.success && (
              <div className="life-at-comp-container">
                <p className="life-at-comp-description">
                  {lifeAtCompany.description}
                </p>
                <img
                  className="life-at-comp-img"
                  src={lifeAtCompany.imageUrl}
                  alt=""
                />
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  simJobs = eachItem => {
    const {
      companyLogoUrl,
      employmentType,
      id,
      jobDescription,
      location,
      pkgPerAnnum,
      rating,
      title,
    } = eachItem
    return (
      <div className="similar-jobs-full-dtls-container">
        <div className="logo-title-container">
          <img className="logo" src={companyLogoUrl} alt=" " />
          <div>
            <h1 className="title">{title}</h1>
            <div className="job-item-dtls-rating-container">
              <AiFillStar className="star" />
              <p className="rating">{rating}</p>
            </div>
          </div>
        </div>
        <h1 className="desc-heading">Description</h1>
        <p className="desc-para">{jobDescription}</p>
        <div className="location-emp-type-container">
          <div className="job-item-dtls-location-container">
            <MdLocationOn className="job-item-dtls-location-icon" />
            <p className="job-item-dtls-location-name ">{location}</p>
          </div>
          <div className="job-item-dtls-emp-type-container">
            <MdBusinessCenter className="job-item-dtls-emp-type-icon" />
            <p className="job-item-dtls-emp-type-para">{employmentType}</p>
          </div>
        </div>
      </div>
    )
  }

  onSimilarJobs = () => {
    const {similarJobs, status} = this.state
    return (
      <div className="details-container">
        <h1 className="similar-jobs-heading">Similar Jobs</h1>
        <div className="similar-jobs-dtls-container">
          {status === views.success &&
            similarJobs.map(eachItem => this.simJobs(eachItem))}
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="item-details-bg-container">
        <Header />
        {this.onJobItemDtls()}
        {this.onSimilarJobs()}
      </div>
    )
  }
}

export default JobItemDetails
