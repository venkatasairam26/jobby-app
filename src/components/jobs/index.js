import {Component} from 'react'
import Cookies from 'js-cookie'
import {BiSearch} from 'react-icons/bi'
import Loader from 'react-loader-spinner'
import {Redirect} from 'react-router-dom'

import Header from '../header/index'
import JobItems from '../jobsList'
import JobFilters from '../jobFilters/index'

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
  state = {
    jobsList: [],
    isLoading: true,
    searchInput: '',
    employmentType: '',
    salaryRange: '',
  }

  componentDidMount() {
    this.getJobs()
  }

  getJobs = async () => {
    const {employmentType, salaryRange, searchInput} = this.state
    console.log(employmentType)
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentType}&minimum_package=${salaryRange}&search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.jobs.map(eachJob => ({
        id: eachJob.id,
        title: eachJob.title,
        rating: eachJob.rating,
        location: eachJob.location,
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        jobDescription: eachJob.job_description,
        packagePerAnnum: eachJob.package_per_annum,
      }))
      this.setState({jobsList: updatedData, isLoading: false})
    }
  }

  getSearchJobs = () => {
    this.getJobs()
    this.setState({searchInput: ''})
  }

  getSearchJobItems = event => {
    this.setState({searchInput: event.target.value})
  }

  setEmployType = id => {
    this.setState({employmentType: id}, this.getJobs)
  }

  salaryRange = id => {
    this.setState({salaryRange: id}, this.getJobs)
  }

  render() {
    const {jobsList, isLoading, searchInput} = this.state

    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }

    return (
      <>
        <Header />
        <div className="jobs-cont">
          <div>
            <div className="job-search-icon">
              <input
                type="search"
                onChange={this.getSearchJobItems}
                value={searchInput}
                placeholder="search"
              />
              <button
                data-testid="searchButton"
                type="button"
                onClick={this.getSearchJobs}
              >
                <BiSearch className="search-icon" />
              </button>
            </div>

            {isLoading ? (
              <div className="loader-container" data-testid="loader">
                <Loader
                  type="ThreeDots"
                  color="#ffffff"
                  height="50"
                  width="50"
                />
              </div>
            ) : (
              <div>
                <JobFilters
                  employmentTypeList={employmentTypesList}
                  salaryRangesList={salaryRangesList}
                  setEmployType={this.setEmployType}
                  salaryRange={this.salaryRange}
                />
                <ul className="job-list-cont">
                  {jobsList.map(eachItem => (
                    <JobItems key={eachItem.id} jobItems={eachItem} />
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
