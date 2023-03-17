import UserProfile from '../userDetails/index'

import './index.css'

const JobFilters = props => {
  const {
    employmentTypeList,
    salaryRangesList,
    setEmployType,
    salaryRange,
  } = props

  const onClickEmployType = event => {
    setEmployType(event.target.value)
  }

  const onClickSalaryRange = event => {
    salaryRange(event.target.value)
  }

  return (
    <div>
      <UserProfile />
      <ul>
        <h1>Type of Employment</h1>
        {employmentTypeList.map(each => (
          <li className="filter-employment-type" key={each.label}>
            <input
              type="checkbox"
              value={each.employmentTypeId}
              onClick={onClickEmployType}
              id={each.label}
              name="employmentType"
            />
            <label className="employment-type" htmlFor={each.label}>
              {each.label}
            </label>
          </li>
        ))}
      </ul>
      <hr />
      <ul>
        <h1>Salary Range</h1>
        {salaryRangesList.map(each => (
          <li className="filter-employment-type" key={each.label}>
            <input
              type="radio"
              value={each.salaryRangeId}
              onClick={onClickSalaryRange}
              id={each.label}
              name="radioBtn"
            />
            <label className="employment-type" htmlFor={each.label}>
              {each.label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  )
}
export default JobFilters
