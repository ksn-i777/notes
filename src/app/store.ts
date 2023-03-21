import { useDispatch } from 'react-redux'
import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import { notesReducer } from 'features/notes'
import { loadState, saveState } from 'utils/localStorage-util'

const rootReduser = combineReducers({
  notes: notesReducer,
})

export const store = configureStore({
  reducer: rootReduser,
  preloadedState: loadState(),
})

export type AppStateType = ReturnType<typeof rootReduser>

export type AppDispatchType = typeof store.dispatch
export const useCustomAppDispatch = useDispatch<AppDispatchType>

store.subscribe(() => saveState(store.getState()))

//@ts-ignore
window.store = store