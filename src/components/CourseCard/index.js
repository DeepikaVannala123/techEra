import {Link} from 'react-router-dom'

import './index.css'

const CourseCard = props => {
  const {details} = props
  const {logoUrl, id, name} = details
  return (
    <Link to={`/courses/${id}`} className="link-item">
      <li className="each-item">
        <img src={logoUrl} alt={name} className="logo-image" />
        <p className="text">{name}</p>
      </li>
    </Link>
  )
}

export default CourseCard
