import { AppStateType } from "app/store"

const notes = (st: AppStateType) => st.notes.notes
const sortTag = (st: AppStateType) => st.notes.sortTag

export {notes, sortTag}