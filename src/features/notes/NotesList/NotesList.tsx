import s from './NotesList.module.scss';
import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useCustomAppDispatch } from 'app/store';
import { AddItemForm, FilterForm } from 'common/components';
import * as noteSelectors from 'features/notes/selectors';
import { createNoteAC, filterNotesAC } from 'features/notes/notes-reducer';
import { Note } from 'features/notes/Note';



export const NotesList = () => {

  const dispatch = useCustomAppDispatch()
  const notes = useSelector(noteSelectors.notes)
  const sortTag = useSelector(noteSelectors.sortTag)

  const createNote = useCallback((newNoteTitle: string) => {
    dispatch(createNoteAC({ newNoteTitle }))
  }, [dispatch])

  const filterNotes = useCallback((sortTag: string) => {
    dispatch(filterNotesAC({ sortTag }))
  }, [dispatch])

  const sortedNotes = notes.filter(note => note.tags.some(tag => tag.includes(sortTag)))
  const disabledFilterForm = notes.length <= 1 || notes.every(note => note.tags.length === 0)

  return (
    <div className={s.notesListContainer}>

      <span className={s.title}>Add new note</span>
      <AddItemForm placeholder={'note title'} callback={createNote} />

      <span className={disabledFilterForm ? s.disabledTitle : s.title}>Filter by tag</span>
      <FilterForm callback={filterNotes} disabled={disabledFilterForm} />

      {(sortTag ? sortedNotes : notes).map(note => <Note key={note.id} note={note} />)}
    </div>
  )
}