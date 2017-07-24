'use strict';

var filePath = 'data-2017-06-30-all.json';

var fs = require('fs');

var stream = fs.createReadStream(filePath, {flags: 'r', encoding: 'utf-8'});
var buf = '';

var lines = 0;
var minDate = Date.UTC( 2020, 12 );
var maxDate = Date.UTC( 1971, 1 );
var minAtDate = minDate;
var maxAtDate = maxDate;
var misOrdered = 0;
var eqqs = 0;

stream.on('data', function(d) {
    buf += d.toString(); // when data is read, stash it in a string buffer
    pump(); // then process the buffer
});

stream.on('end', function() {
    console.log('lines: ' + lines);
    console.log('timestamp min: ' + new Date(minDate));
    console.log('@timestamp min: ' + new Date(minAtDate));
    console.log('timestamp max: ' + new Date(maxDate));
    console.log('@timestamp max: ' + new Date(maxAtDate));
    console.log('Misordered @timestamp:' + misOrdered + ' Eqqs: ' + eqqs)
});

function pump() {
    var pos;

    while ((pos = buf.indexOf('\n')) >= 0) { // keep going while there's a newline somewhere in the buffer
        if (pos == 0) { // if there's more than one newline in a row, the buffer will now start with a newline
            buf = buf.slice(1); // discard it
            continue; // so that the next iteration will start with data
        }
        processLine(buf.slice(0,pos)); // hand off the line
        buf = buf.slice(pos+1); // and slice the processed data off the buffer
    }
}

function processLine(line) { // here's where we do something with a line

    if (line[line.length-1] == '\r') line=line.substr(0,line.length-1); // discard CR (0x0D)

    if (line.length > 0) { // ignore empty lines
        var obj = JSON.parse(line); // parse the JSON
        lines++;

        var time = Date.parse(obj['timestamp']);
        var timeAt = Date.parse(obj['@timestamp']);

        if(minDate>time) minDate = time;
        if(maxDate<time) maxDate = time;

        if(minAtDate>timeAt) minAtDate = timeAt;
        if(maxAtDate>timeAt) misOrdered++;
        if(maxAtDate===timeAt) eqqs++;
        if(maxAtDate<timeAt) maxAtDate = timeAt;
    }
}