import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import './index.css'

const statuses = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}
class Profile extends Component {
  state = {profileData: '', status: statuses.initial}

  componentDidMount() {
    this.getDetails()
  }

  getDetails = async () => {
    this.setState({status: statuses.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({profileData: updatedData, status: statuses.success})
    } else {
      this.setState({status: statuses.failure})
    }
  }

  onClickRetry = () => this.getDetails()

  onSuccess = () => {
    const {profileData} = this.state
    const {profileImageUrl, name, shortBio} = profileData
    return (
      <div className="profile-bg-container">
        <img className="profile-img" src={profileImageUrl} alt="profile" />
        <h1 className="profile-name">{name}</h1>
        <p className="profile-bio">{shortBio}</p>
      </div>
    )
  }

  onInProgress = () => (
    <div className="loader-container1" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  onFailure = () => (
    <div className="retry-btn-container">
      <button type="button" className="retry-btn" onClick={this.onClickRetry}>
        Retry
      </button>
    </div>
  )

  render() {
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
}

export default Profile
