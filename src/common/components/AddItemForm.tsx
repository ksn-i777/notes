import React, { ChangeEvent, FC, KeyboardEvent, useState } from 'react'
import { Button, TextField } from '@mui/material'

type AddItemFormPropsType = {
  placeholder: string
  callback(newInputText: string): void
  disabled?: boolean
}

export const AddItemForm: FC<AddItemFormPropsType> = React.memo(({ placeholder, callback, disabled }) => {

  const [newInputText, setNewInputText] = useState<string>('')
  const [error, setError] = useState<string>('')

  const errorMessage: string = 'field is required'

  const onAddItem = () => {
    if (newInputText.trim() !== '') {
      callback(newInputText.trim())
      setNewInputText('')
    } else {
      setError(errorMessage)
    }
  }

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.value.trim() !== '') { setNewInputText(e.currentTarget.value) }
    else { setNewInputText('') }
  }

  const onKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (error && e.key !== 'Enter') { setError('') }
    if (e.key === 'Enter' && newInputText.trim() !== '') { onAddItem() }
    if (e.key === 'Enter' && newInputText.trim() === '') { setError(errorMessage) }
  }

  const buttonStyle = {
    minWidth: '40px',
    maxWidth: '40px',
    border: '1px solid steelblue',
    color: 'steelblue'
  }

  return (
    <div style={{ width: '100%', display: 'grid', gridTemplateColumns: '1fr 40px', gap: '10px' }}>
      <TextField
        disabled={disabled}
        error={!!error}
        variant="outlined"
        size="small"
        label={error ? errorMessage : placeholder}
        value={newInputText}
        onChange={onChangeInput}
        onKeyPress={onKeyPress}
      />
      <Button disabled={disabled} style={buttonStyle} onClick={onAddItem}>+</Button>
    </div>
  )
})