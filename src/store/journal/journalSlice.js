import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: false,
        messageSaved: "",
        notes: [],
        activeNote: null
    },
    reducers: {
        savingNewNote: (state) => {
            state.isSaving = true;
        },
        addNewEmptyNote: (state, action) => {
            state.notes.push(action.payload);
            state.isSaving = false;
        },
        setActiveNote: (state, action) => {
            state.activeNote = action.payload;
            state.messageSaved = "";
        },
        setNotes: (state, action) => {
            state.notes = action.payload;
        },
        setSaving: (state, action) => {
            state.isSaving = true;
            state.messageSaved = "";
        },
        updateNote: (state, action) => {
            state.isSaving = false;
            state.notes = state.notes.map(note => {
                return note.id === action.payload.id ? action.payload.note : note;
            });
            state.messageSaved = `${action.payload.note.title}, actualizada correctamente`;
        },
        setPhotosToActiveNote: (state, action) => {
            console.log(action.payload);
            state.activeNote.imageUrls = [...state.activeNote.imageUrls, ...action.payload];
            state.isSaving = false;
        },
        deleteNoteById: (state, action) => {

        }
    }
});

export const { savingNewNote, addNewEmptyNote, setActiveNote, setNotes, setSaving, setPhotosToActiveNote, updateNote, deleteNoteById } = journalSlice.actions;