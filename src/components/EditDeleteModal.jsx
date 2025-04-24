//수정하기/삭제하기 버튼을 보여줌.

import { useEffect, useRef } from 'react'
import CheckDeletePageModal from './CheckDeletePageModal'
import InputPasswordModal from './InputPasswordModal'

const EditDeleteModal = ({
  inputPassword,
  handleClickEdit,
  showDeleteModal,
  setShowDeleteModal,
  onClose,
}) => {
  const modalRef = useRef(null)

  useEffect(() => {
    const handelClickOtherSide = e => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setShowDeleteModal(false)
      }
    }

    document.addEventListener('mousedown', handelClickOtherSide)
    return () => {
      document.removeEventListener('mousedown', handelClickOtherSide)
    }
  }, [setShowDeleteModal])

  return (
    <section className="edit-delete-modal">
      <div className="edit-modal" onClick={handleClickEdit}>
        수정하기
      </div>
      {inputPassword && <InputPasswordModal onClose={onClose} />}
      <div className="delete-modal" onClick={() => setShowDeleteModal(true)}>
        삭제하기
      </div>
      {showDeleteModal && <CheckDeletePageModal onClose={() => setShowDeleteModal(false)} />}
    </section>
  )
}

export default EditDeleteModal
