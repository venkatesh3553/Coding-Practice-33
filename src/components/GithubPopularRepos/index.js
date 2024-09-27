import {Component} from 'react'
import Loader from 'react-loader-spinner'

import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

class GithubPopularRepos extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    list: [],
    languageId: languageFiltersData[0].id,
  }

  componentDidMount() {
    this.languageCards()
  }

  languageCards = async () => {
    const {languageId} = this.state
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const url = `https://apis.ccbp.in/popular-repos?language=${languageId}`
    const response = await fetch(url)
    if (response.ok === true) {
      const data = await response.json()
      const updateList = data.popular_repos.map(eachItem => ({
        id: eachItem.id,
        imageUrl: eachItem.avatar_url,
        name: eachItem.name,
        starsCount: eachItem.stars_count,
        forksCount: eachItem.forks_count,
        issuesCount: eachItem.issues_count,
      }))
      this.setState({list: updateList, apiStatus: apiStatusConstants.success})
      console.log(data)
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  updateId = id => {
    this.setState({languageId: id}, this.languageCards)
  }

  languageStatusSuccess = () => {
    const {list} = this.state
    return (
      <ul className="ul-item-card">
        {list.map(eachItem => (
          <RepositoryItem list={eachItem} key={eachItem.id} />
        ))}
      </ul>
    )
  }

  languageStatusFail = () => (
    <div className="fail-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png "
        className="fail-img"
        alt="failure view"
      />
      <h1 className="fail-img">Somthing Went Wrong</h1>
    </div>
  )

  languageStatusLodig = () => (
    <div data-testid="loader" className="loader">
      <Loader color="#0284c7" height={80} type="ThreeDots" width={80} />
    </div>
  )

  onDisplayLanguage = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.languageStatusSuccess()
      case apiStatusConstants.failure:
        return this.languageStatusFail()
      case apiStatusConstants.inProgress:
        return this.languageStatusLodig()
      default:
        return null
    }
  }

  render() {
    const {languageId} = this.state
    return (
      <div className="app-container">
        <div className="responsive-container">
          <h1 className="heading">Popular</h1>
          <ul className="ul-container">
            {languageFiltersData.map(eachItem => (
              <LanguageFilterItem
                languageFiltersData={eachItem}
                key={eachItem.id}
                updateId={this.updateId}
                isActiveId={eachItem.id === languageId}
              />
            ))}
          </ul>
          {this.onDisplayLanguage()}
        </div>
      </div>
    )
  }
}

export default GithubPopularRepos
