import { AppStateType } from "app/store";

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('notes')
    if (serializedState) {
      return {
        notes: {
          notes: JSON.parse(serializedState),
          sortTag: ''
        },
      }
    }
  } catch (err) {
    return undefined
  }
}

export const saveState = (state: AppStateType) => {
  try {
    const serializedState = JSON.stringify(state.notes.notes);
    localStorage.setItem('notes', serializedState);
  } catch {
    // ignore write errors
  }
};