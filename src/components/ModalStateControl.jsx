//모달들의 상태를 관리하는 컴포넌트.

import { useState } from 'react'
import { useParams } from 'react-router-dom'

import { deleteShop } from '../api/api'
import EditDeleteModal from './EditDeleteModal'

const ModalStateControl = () => {
  const { id } = useParams()
  const [deleteConfirm, setDeleteConfirm] = useState(false)
  const [inputPassword, setInputPassword] = useState(false)
  const [currentPassword, setCurrentPassword] = useState('')
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const handleClickEdit = () => {
    setInputPassword(true)
  }
  const handleDelete = async () => {
    const isConfirmed = window.confirm('정말 삭제하시겠습니까?')
    if (!isConfirmed) return

    if (!currentPassword) {
      alert('비밀번호를 입력해주세요.')
      return
    }

    try {
      const result = await deleteShop(id, currentPassword)
      if (result) {
        alert('삭제가 완료되었습니다!')
      } else {
        alert('삭제에 실패했습니다.')
      }
    } catch (error) {
      alert('에러가 발생했습니다.', error.response?.data || error)
    }
    setDeleteConfirm(true)
  }

  return (
    <EditDeleteModal
      deleteConfirm={deleteConfirm}
      inputPassword={inputPassword}
      setDeleteConfirm={setDeleteConfirm}
      handleClickEdit={handleClickEdit}
      handleDelete={handleDelete}
      currentPassword={currentPassword}
      setCurrentPassword={setCurrentPassword}
      showDeleteModal={showDeleteModal}
      setShowDeleteModal={setShowDeleteModal}
    />
  )
}

export default ModalStateControl
