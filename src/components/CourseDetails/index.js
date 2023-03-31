import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'INPROGRESS',
  failure: 'FAILURE',
}

class CourseDetails extends Component {
  state = {courseDetailsData: {}, apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getCoursesDetailsData()
  }

  getCoursesDetailsData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const apiUrl = `https://apis.ccbp.in/te/courses/${id}`
    const options = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = {
        id: data.course_details.id,
        name: data.course_details.name,
        imageUrl: data.course_details.image_url,
        description: data.course_details.description,
      }
      this.setState({
        apiStatus: apiStatusConstants.success,
        courseDetailsData: updatedData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onClickButton = () => {
    this.getCoursesDetailsData()
  }

  renderCourseDetails = () => {
    const {courseDetailsData} = this.state
    console.log(courseDetailsData)
    return (
      <div className="container">
        <img
          src={courseDetailsData.imageUrl}
          alt={courseDetailsData.name}
          className="course-image"
        />
        <div className="cont-2">
          <h1 className="heading">{courseDetailsData.name}</h1>
          <p className="description1">{courseDetailsData.description}</p>
        </div>
      </div>
    )
  }

  renderLoaderView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#4656a1" height={50} width={50} />
    </div>
  )

  renderFailureView = () => (
    <div className="products-error-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
        className="products-failure-img"
      />
      <h1 className="product-failure-heading-text">
        Oops! Something Went Wrong
      </h1>
      <p className="products-failure-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button className="button" onClick={this.onClickButton} type="button">
        Retry
      </button>
    </div>
  )

  renderCoursesDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderCourseDetails()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoaderView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.renderCoursesDetails()}
      </>
    )
  }
}

export default CourseDetails
