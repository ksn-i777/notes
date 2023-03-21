import React, { ChangeEvent, FC, useState } from 'react'
import { TextField } from '@mui/material'

type FilterFormPropsType = {
  callback(newInputText: string): void
  disabled?: boolean
}

export const FilterForm: FC<FilterFormPropsType> = React.memo(({ callback, disabled }) => {

  const [newInputText, setNewInputText] = useState<string>('')

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setNewInputText(e.currentTarget.value)
    callback(e.currentTarget.value)
  }

  return (
    <TextField
      disabled={disabled}
      variant="outlined"
      size="small"
      label={disabled ? 'add 2 and more tagged notes' : 'tag title'}
      value={newInputText}
      onChange={onChangeInput}
    />
  )
})