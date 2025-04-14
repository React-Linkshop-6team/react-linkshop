import { Link } from 'react-router-dom'

const Button = ({ children, to, className = '', type = 'button', onClick }) => {
  if (to) {
    return (
      <Link to={to} className={`button ${className}`}>
        {children}
      </Link>
    )
  }

  return (
    <button type={type} onClick={onClick} className={`button ${className}`}>
      {children}
    </button>
  )
}

export default Button
