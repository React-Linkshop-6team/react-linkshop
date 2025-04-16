import { useState } from 'react'

const EditDeleteModal = () => {
  const [deleteConfirm, setDeleteConfirm] = useState(false)
  const [inputPassword, setInputPassword] = useState(false)

  const handleClickEdit = () => {
    setInputPassword(true)
  }

  const handleDelete = () => {
    setDeleteConfirm(true)
  }
  const checkDelete = () => {
    alert('삭제 되었습니다.')
    setDeleteConfirm(false)
  }

  return (
    <section className="edit-delete-modal">
      <div className="edit-modal" onClick={handleClickEdit}>
        수정하기
      </div>
      {inputPassword && (
        <section>
          <p>비밀번호를 입력해주세요!</p>
          <input placeholder="비밀번호를 입력해주세요." />
          <button>확인</button>
        </section>
      )}
      <div className="delete-modal" onClick={handleDelete}>
        삭제하기
      </div>
      {deleteConfirm && (
        <section className="confirm-modal">
          <p>정말 삭제하시겠습니까?</p>
          <span onClick={checkDelete}>네</span>
          <span onClick={() => setDeleteConfirm(false)}>아니오</span>
        </section>
      )}
    </section>
  )
}

export default EditDeleteModal
