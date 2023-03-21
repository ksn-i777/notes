import React, { ChangeEvent, KeyboardEvent, useState } from 'react'
import { TextField } from '@mui/material'

type EditableSpanPropsType = {
  editMode: boolean
  setEditMode: (value: boolean) => void
  spanTitle: string
  changeSpanTitle: (newSpanTitle: string) => void
  disabled?: boolean
}

export const EditableSpan = React.memo((props: EditableSpanPropsType) => {

  const [title, setTitle] = useState<string>(props.spanTitle)

  const onOpenEditMode = () => {
    !props.disabled && props.setEditMode(true)
    return
  }
  const onCloseEditMode = () => {
    props.setEditMode(false)
    props.changeSpanTitle(title)
  }
  const onChangeSpanTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }
  const onKeyDownSpanTitle = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.code === 'Enter') {
      props.setEditMode(false)
      props.changeSpanTitle(title)
    }
  }

  const clearTitle = props.spanTitle.split(' ').map(word => word[0] === '#' ? word.slice(1) : word).join(' ')

  return props.editMode
    ?
    <TextField
      variant="standard"
      size="small"
      value={title}
      onChange={onChangeSpanTitle}
      onBlur={onCloseEditMode}
      onKeyDown={onKeyDownSpanTitle}
      autoFocus
    />
    :
    <span style={{ wordBreak: 'break-word' }} onDoubleClick={onOpenEditMode}>{clearTitle}</span>
})