//filters js
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

const FiltersGroup = props => {

    const renderEmploymentFiltersList = () => {
      return employmentTypesList.map(item => {
        const {changeEmployType} = props 
        const onClickChangeEmploymentType = () => changeEmployType(item.employmentTypeId)

        return(
          <li key={item.employmentTypeId}>
            <input className="input" type="checkbox" onClick={onClickChangeEmploymentType} id={item.employmentTypeId} /> 
            <label className="label" htmlFor={item.employmentTypeId}> {item.label} </label>
          </li>
        )
      })
    }

    const renderEmploymentFilters = () => {
      return(
        <>
          <h1 className="heading"> Type of Employment </h1>
          <ul className="employment-filters">
            {renderEmploymentFiltersList()}
          </ul>
        </>
      )
    }

    const renderSalaryRangeList = () => {
      return salaryRangesList.map(item => {
        const {changeSalaryRange, activeSalaryRange} = props
        const onClickChangeSalaryRange = () => changeSalaryRange(item.salaryRangeId)

        return(
           <li key={item.salaryRangeId}>
            <input className="input" name="Salary" type="radio" onClick={onClickChangeSalaryRange} id={item.salaryRangeId} value={item.label} /> 
            <label className="label" name="Salary" htmlFor={item.salaryRangeId}> {item.label} </label>
          </li>
        )
      })
    }

    const renderSalaryRange = () => {
      return(
        <>
          <h1 className="heading"> Salary Range </h1>
          <ul className="employment-filters">
            {renderSalaryRangeList()}
          </ul>
        </>
      )
    }

    return(
        <div className="filters-group">
            {renderEmploymentFilters()}
            <hr className="hr"/>
            {renderSalaryRange()}
        </div>
    )
}

export default FiltersGroup