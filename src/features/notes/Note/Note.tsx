import s from './Note.module.scss';
import React, { FC, useCallback, useState } from 'react';
import { IconButton } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { useCustomAppDispatch } from 'app/store';
import { EditableSpan } from 'common/components';
import { deleteNoteAC, NoteType, updateNoteTitleAC } from 'features/notes/notes-reducer';

type NotePropsType = {
  note: NoteType
}

export const Note: FC<NotePropsType> = React.memo(({ note }) => {

  const dispatch = useCustomAppDispatch()

  const [editMode, setEditMode] = useState<boolean>(false)

  const updateNoteTitle = useCallback((noteID: string, noteTitle: string) => {
    dispatch(updateNoteTitleAC({ noteID, noteTitle }))
  }, [dispatch])

  const deleteNote = useCallback((noteID: string) => {
    dispatch(deleteNoteAC({ noteID }))
  }, [dispatch])

  return (
    <div className={s.noteContainer}>
      <div className={s.noteWithTags}>
        <EditableSpan
          editMode={editMode}
          setEditMode={setEditMode}
          spanTitle={note.title}
          changeSpanTitle={(newSpanTitle: string) => { updateNoteTitle(note.id, newSpanTitle) }}
        />
        <span className={s.tags}>{note.tags.join(' ')}</span>
      </div>
      <IconButton
        aria-label="edit"
        size="small"
        style={{ color: 'steelblue' }}
        onClick={() => setEditMode(true)}
      >
        <Edit fontSize="small" />
      </IconButton>
      <IconButton
        aria-label="delete"
        size="small"
        style={{ color: 'steelblue' }}
        onClick={() => deleteNote(note.id)}
      >
        <Delete fontSize="small" />
      </IconButton>
    </div>
  )
})