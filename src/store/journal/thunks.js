import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { addNewEmptyNote, deleteNoteById, savingNewNote, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, updateNote } from "./journalSlice";
import { fileUpload, loadNotes } from "../../helpers";

export const startNewNote = () => {
    return async(dispatch, getState) => {
        dispatch(savingNewNote());
        const { uid } = getState().auth;
        const newNote = {
            title: "",
            body: "",
            date: new Date().getTime(),
            imageUrls: []
        }
        const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`));
        await setDoc(newDoc, newNote);
        newNote.id = newDoc.id;
        dispatch(addNewEmptyNote(newNote));
        dispatch(setActiveNote(newNote));
    }
}

export const startLoadingNotes = () => {
    return async(dispatch, getState) => {
        const { uid } = getState().auth;
        const notes = await loadNotes(uid);
        dispatch(setNotes(notes));
    }
}

export const startSaveNote = () => {
    return async(dispatch, getState) => {
        dispatch(setSaving());
        const { uid } = getState().auth;
        const { activeNote } = getState().journal;
        const noteToFireStore = { ...activeNote };
        delete noteToFireStore.id;
        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${activeNote.id}`);
        await setDoc(docRef, noteToFireStore, { merge: true});
        dispatch(updateNote({id: activeNote.id, note: activeNote}));
    }
}

export const startUploadingFiles = (files = []) => {
    return async(dispatch) => {
        dispatch(setSaving());
        const fileUploadPromises = [];
        for (const file of files) {
            fileUploadPromises.push(fileUpload(file));
        }
        const photosUrls = await Promise.all(fileUploadPromises);
        dispatch(setPhotosToActiveNote(photosUrls));
    }
}

export const startDeletingNote = () => {
    return async(dispatch, getState) => {
        const { uid } = getState().auth;
        const { activeNote: note } = getState().journal;
        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
        await deleteDoc(docRef);
        dispatch(deleteNoteById(note.id));
    }
}