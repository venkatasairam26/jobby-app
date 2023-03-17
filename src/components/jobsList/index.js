import {AiFillStar} from 'react-icons/ai'
import {IoLocationSharp} from 'react-icons/io5'
import {TiShoppingBag} from 'react-icons/ti'
import {Link} from 'react-router-dom'

import './index.css'

const JobItems = props => {
  const {jobItems} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    packagePerAnnum,
    location,
    rating,
    id,
    title,
  } = jobItems

  return (
    <li className="job-item-cont">
      <Link to={`jobDetails/${id}`}>
        <div className="company-logo-cont">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="job-company-logo"
          />
          <div>
            <h1>{title}</h1>
            <div>
              <AiFillStar className="rat-star" />
              <p>{rating}</p>
            </div>
          </div>
        </div>
        <div className="loc-emp-package">
          <div className="loc-emp">
            <div>
              <IoLocationSharp />
              <p> {location}</p>
            </div>
            <div>
              <TiShoppingBag />
              <p>{employmentType}</p>
            </div>
          </div>
          <p>{packagePerAnnum}</p>
        </div>
        <hr />
        <h1>Description</h1>
        <p>{jobDescription}</p>
      </Link>
    </li>
  )
}

export default JobItems
