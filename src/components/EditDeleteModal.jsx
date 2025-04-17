import InputPasswordModal from './InputPasswordModal'

const EditDeleteModal = ({ inputPassword, handleClickEdit, handleDelete }) => {
  const checkDelete = () => {
    const confirm = window.confirm('정말 삭제하시겠습니까?')
    if (confirm) {
      handleDelete()
    }
  }
  return (
    <section className="edit-delete-modal">
      <div className="edit-modal" onClick={handleClickEdit}>
        수정하기
      </div>
      {inputPassword && <InputPasswordModal />}
      <div className="delete-modal" onClick={checkDelete}>
        삭제하기
      </div>
    </section>
  )
}

export default EditDeleteModal
