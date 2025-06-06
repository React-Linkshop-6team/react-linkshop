import { FILTER_OPTIONS } from '../../constants/filterOptions'

const FilterModal = ({ selected, onSelect, onClose }) => {
  return (
    <>
      <div className="backdrop" onClick={onClose}></div>
      <div className="filter-modal">
        <div className="filter-modal-header">
          <span>정렬</span>
          <button className="close-button" onClick={onClose}>
            x
          </button>
        </div>
        <ul className="filter-options">
          {FILTER_OPTIONS.map(option => (
            <li
              key={option}
              onClick={() => onSelect(option)}
              className={option === selected ? 'selected' : ''}
            >
              {option}
              {option === selected && <span className="check">✓</span>}
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default FilterModal
