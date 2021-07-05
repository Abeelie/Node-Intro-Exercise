const fs = require('fs');
const process = require('process');

function cat(path) {
  fs.readFile(path, 'utf8', function(err, data) {
    if (err) {
      console.error(`Error with reading at ${path}: ${err}`);
      process.exit(1);
    } else {
      console.log(data);
    }
  });
}

// cat("one.txt")
// cat(process.argv[2]);


module.exports = {
	cat: cat
}
