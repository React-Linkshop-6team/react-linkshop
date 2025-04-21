import { useState, useEffect } from 'react'
import axios from 'axios'

import EditDeleteModal from './EditDeleteModal'

const ModalStateControl = () => {
  const [deleteConfirm, setDeleteConfirm] = useState(false)
  const [inputPassword, setInputPassword] = useState(false)

  const handleClickEdit = () => {
    setInputPassword(true)
  }
  const handleDelete = () => {
    setDeleteConfirm(true)
  }

  return (
    <EditDeleteModal
      deleteConfirm={deleteConfirm}
      inputPassword={inputPassword}
      setDeleteConfirm={setDeleteConfirm}
      handleClickEdit={handleClickEdit}
      handleDelete={handleDelete}
    />
  )
}

export default ModalStateControl
