// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {languageFiltersData, updateId, isActiveId} = props
  const {id, language} = languageFiltersData

  const isClassName = isActiveId ? 'is-true' : 'is-false'

  const selectId = () => {
    updateId(id)
    console.log(id)
  }

  return (
    <li className="filter-container">
      <button className={isClassName} type="button" onClick={selectId}>
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
