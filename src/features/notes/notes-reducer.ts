import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { v1 } from 'uuid'

const initialState: initialStateType = {
  notes: [],
  sortTag: ''
}

//slice
const slice = createSlice({
  name: "NOTES",
  initialState: initialState,
  reducers: {
    createNoteAC: (state, action: PayloadAction<{newNoteTitle:string}>) => {
      const newTags = action.payload.newNoteTitle.split(' ').filter(word => word[0] === '#')
      state.notes.unshift({id: v1(), title: action.payload.newNoteTitle, tags: newTags})
    },
    updateNoteTitleAC: (state, action: PayloadAction<{noteID:string, noteTitle:string}>) => {
      const index = state.notes.findIndex(note => note.id === action.payload.noteID)
      if(index > -1) {
        const newTags = action.payload.noteTitle.split(' ').filter(word => word[0] === '#')
        state.notes[index] = {...state.notes[index], title: action.payload.noteTitle, tags: newTags}
      }
    },
    deleteNoteAC: (state, action: PayloadAction<{noteID: string}>) => {
      const index = state.notes.findIndex(note => note.id === action.payload.noteID)
      if(index > -1) {state.notes.splice(index, 1)}
    },
    filterNotesAC: (state, action: PayloadAction<{sortTag: string}>) => {
      state.sortTag = action.payload.sortTag
    },
  },
})

// reducer
export const notesReducer = slice.reducer

// actions
export const {createNoteAC, updateNoteTitleAC, deleteNoteAC, filterNotesAC} = slice.actions

// types
export type NoteType = {
  id: string
  title: string
  tags: Array<string>
}
export type initialStateType = {
  notes: Array<NoteType>
  sortTag: string
}