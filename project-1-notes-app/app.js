const fs = require('fs');
const validator = require('validator');
const chalk = require('chalk');
const yargs = require('yargs');
const notes = require('./notes');
const { string } = require('yargs');

//* Create add command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true, //! required
            type: 'string', //* default is boolean
        },
        body: {
            describe: 'Note text',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv) {
        notes.addNote(argv.title, argv.body);
    },
});

//* Create remove command
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv) {
        notes.removeNote(argv.title);
    },
});

//* Create read command
yargs.command({
    command: 'read',
    describe: 'Read a note',
    builder: {
        title: {
            type: 'string',
            demandOption: true,
            describe: 'note title'
        }
    },
    handler(argv) {
        notes.readNote(argv.title);
    },
});

//* Create list command
yargs.command({
    command: 'list',
    describe: 'List your notes',
    handler() {
        notes.listNotes();
    },
});

yargs.parse();

const book = {
    title: 'hello',
    author: 'abhishek',
};
