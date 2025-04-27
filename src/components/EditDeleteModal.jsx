import { useEffect, useRef } from 'react'

import CheckDeletePageModal from './CheckDeletePageModal'
import InputPasswordModal from './InputPasswordModal'

const EditDeleteModal = ({
  inputPassword,
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
    const handleClickOtherSide = e => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setIsVisible(false)
      }
    }

    document.addEventListener('mousedown', handleClickOtherSide)
    return () => {
      document.removeEventListener('mousedown', handleClickOtherSide)
    }
  }, [setIsVisible])

  return (
    <>
      {isVisible && (
        <section className="edit-delete-modal" ref={modalRef}>
          <div className="edit-modal" onClick={handleClickEdit}>
            수정하기
          </div>
          {inputPassword && <InputPasswordModal id={shopId} onClose={onClose} />}
          <div className="delete-modal" onClick={() => setShowDeleteModal(true)}>
            삭제하기
          </div>
          {showDeleteModal && (
            <CheckDeletePageModal id={shopId} onClose={() => setShowDeleteModal(false)} />
          )}
        </section>
      )}
    </>
  )
}

export default EditDeleteModal
