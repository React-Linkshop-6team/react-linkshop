// 정렬 옵션 리스트
const FILTER_OPTIONS = ['최신순', '좋아요순', '등록된 상품순']

// FilterModal 컴포넌트
// 역할: 필터 모달을 띄우고, 필터 값을 선택하고, 모달을 닫을 수 있다.
// selected: 현재 선택된 정렬 옵션 / onSelect: 정렬 옵션 클릭 시 호출되는 함수 / onClose: 모달창 닫기(x) 버튼 또는 배경 클릭 시 호출되는 함수
const FilterModal = ({ selected, onSelect, onClose }) => {
  return (
    <>
      {/* 검은 배경 눌렀을 때도 뒤로 가지게 */}
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
