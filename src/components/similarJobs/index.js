import './index.css'

const SimilarJobs = props => {
  const {similarJobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = similarJobDetails

  return (
    <li>
      <img src={companyLogoUrl} alt="compony logo" />
      <h1>{title}</h1>
      <p>{rating}</p>
      <p>Description</p>
      <p>{jobDescription}</p>
      <p>{location}</p>
      <p>{employmentType}</p>
    </li>
  )
}
export default SimilarJobs
