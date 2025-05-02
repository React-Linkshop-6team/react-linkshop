import logoImage from '../assets/images/linkshop.webP'

const NotFound = () => {
  const onGoBack = e => {
    history.back()
  }

  return (
    <div className="error">
      <div className="error-image-container">
        <img src={logoImage} alt="logo" className="error-image" />
      </div>
      <div className="error-message-container">
        <h1 className="error-message-code">404</h1>
        <p className="erorr-message-title">Sorry, Page not found</p>
        <p className="error-message-subtitle">The page you requested could not be found.</p>
      </div>
      <div className="error-button-container">
        <button onClick={onGoBack}>돌아가기</button>
      </div>
    </div>
  )
}

export default NotFound
