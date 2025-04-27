import { useEffect, useRef } from 'react'

import CheckDeletePageModal from './CheckDeletePageModal'
import InputPasswordModal from './InputPasswordModal'

const EditDeleteModal = ({
  inputPassword,
  setInputPassword,
  handleClickEdit,
  showDeleteModal,
  setShowDeleteModal,
  onClose,
  shopId,
  isVisible,
  setIsVisible,
}) => {
  const modalRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = e => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setIsVisible(false)
      }
    }

    if (isVisible) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isVisible, setIsVisible])

  useEffect(() => {
    if (isVisible) {
      setInputPassword(false)
    }
  }, [isVisible, setInputPassword])

  if (!isVisible) return null

  return (
    <section className="edit-delete-modal" ref={modalRef}>
      <div
        className="edit-modal"
        onClick={() => {
          handleClickEdit()
        }}
      >
        수정하기
      </div>

      {/* 수정하기 누른 경우만 비밀번호 모달 렌더링 */}
      {inputPassword && <InputPasswordModal id={shopId} onClose={() => setInputPassword(false)} />}

      <div className="delete-modal" onClick={() => setShowDeleteModal(true)}>
        삭제하기
      </div>

      {showDeleteModal && (
        <CheckDeletePageModal id={shopId} onClose={() => setShowDeleteModal(false)} />
      )}
    </section>
  )
}

export default EditDeleteModal
