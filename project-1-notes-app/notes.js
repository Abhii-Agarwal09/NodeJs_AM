const fs = require('fs');
const chalk = require('chalk');

const getNotes = () => 'Your notes....';

const addNote = (title, body) => {
    const notes = loadNotes();
    // const duplicateNotes = notes.filter((note) => note.title === title);  // it checks every note
    const duplicateNote = notes.find((note) => note.title === title); // return the first match

    if (!duplicateNote) {
        notes.push({
            title,
            body,
        });
        saveNotes(notes);
        console.log(chalk.inverse.green.bold('Note added'));
    } else console.log(chalk.inverse.red.bold('Not title already taken'));
};

const removeNote = (title) => {
    const notes = loadNotes();
    // const noteToDelete = notes.filter((note) => note.title === title);
    const notesToKeep = notes.filter((note) => note.title != title);
    saveNotes(notesToKeep);
    // if (noteToDelete.length === 0)
    //     console.log(chalk.inverse.red.bold('No note found'));
    // else console.log(chalk.inverse.green.bold('Note deleted'));
    notes.length > notesToKeep.length
        ? console.log(chalk.inverse.green.bold('Note deleted'))
        : console.log(chalk.inverse.red.bold('No note found'));
};

const listNotes = () => {
    const notes = loadNotes();
    const noteTitles = notes.filter((note) => note.title);
    console.log(chalk.inverse('Your notes....'));
    noteTitles.forEach((noteTitle) => console.log(noteTitle));
};

const readNote = (title) => {
    const notes = loadNotes();
    const noteToRead = notes.find((note) => note.title === title);

    if (!noteToRead) console.log(chalk.red.inverse.bold('No note found'));
    else {
        console.log(chalk.green.inverse.bold(noteToRead.title));
        console.log(noteToRead.body);
    }
};

const loadNotes = () => {
    try {
        return JSON.parse(fs.readFileSync('notes.json').toString());
    } catch (e) {
        return [];
    }
};

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
};

module.exports = {
    getNotes,
    addNote,
    removeNote,
    listNotes,
    readNote,
};
