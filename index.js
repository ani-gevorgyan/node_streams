const moment = require('moment');
const fs = require('fs');
const {
    Readable,
    Transform
} = require('stream');



class OurReadable extends Readable {
    _read() {
        setTimeout(() => {
            this.push(moment().format('DD MM YYYY, h:mm:ss') + '\n');
        }, 1000);
    }
}

class OurTransform extends Transform {
    _transform(chunk, encoding, callback) {
        this.push(`Current date and time is ----- ${chunk} `);
        callback();
    }
}

const rs = new OurReadable();
const ts = new OurTransform();
const ws = fs.createWriteStream('./data.txt', 'utf8');

rs.pipe(ts).pipe(ws);