import csv from 'csv-parser';
import {
    unlink,
    createWriteStream,
    createReadStream
} from 'fs';
import {
    argv
} from 'yargs';
import {emptyDir} from 'fs-extra';

if (!argv.input) {
    console.log('No input file set. Use npm start -- --input=<path>');
    process.exit(1);
}

emptyDir('output', (err) => {
    if (err) {
        console.log('Unable to clean output directory!');
        process.exit(1);
    }
});

let writeStream = createWriteStream('output/output.csv', {
    flags: 'ax',
});

let stream = csv({
    raw: false, // do not decode to utf-8 strings
    separator: ',', // specify optional cell separator
    quote: '"', // specify optional quote character
    escape: '"', // specify optional escape character (defaults to quote value)
    newline: '\n', // specify a newline character
    strict: false,
    headers: [
        'PartitionKey',
        'RowKey',
        'Timestamp',
        'Partition',
        'blockId',
        'directionCode',
        'entitynumber',
        'internalLinenumber',
        'restString0',
        'restString1',
        'restString2',
        'timeOfFirstStop',
        'timeOfLastStop',
        'tripnumber',
        'restString3',
        'restString4',
        'restString5',
        'restString6',
    ],
});

createReadStream(argv.input)
    .pipe(stream)
    .on('data', function (data) {
        writeStream.write(
            data.PartitionKey +
            ',' +
            data.internalLinenumber +
            ',' +
            data.tripnumber +
            ',' +
            data.restString0 +
            data.restString1 +
            data.restString2 +
            data.restString3 +
            data.restString4 +
            data.restString5 +
            data.restString6
        );
    })
    .on('error', function (err) {
        console.log('Failed to process input: ' + err);
        process.exit(1)
    });