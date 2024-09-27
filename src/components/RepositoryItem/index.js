// Write your code here

import './index.css'

const RepositoryItem = props => {
  const {list} = props
  const {id, name, forksCount, starsCount, issuesCount, imageUrl} = list
  return (
    <li className="item-container">
      <img src={imageUrl} className="img" alt={name} />
      <h1 className="name">{name}</h1>
      <div className="card">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png "
          className="logo"
          alt="stars"
        />
        <p className="pera">{starsCount}</p>
      </div>
      <div className="card">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png "
          className="logo"
          alt="forks"
        />
        <p className="pera">{forksCount}</p>
      </div>
      <div className="card">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png "
          className="logo"
          alt="open issues"
        />
        <p className="pera">{issuesCount}</p>
      </div>
    </li>
  )
}

export default RepositoryItem






