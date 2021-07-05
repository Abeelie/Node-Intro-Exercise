const fs = require('fs');
const process = require('process');
const axios = require('axios');

function handleOutput(text, out) {
  if (out) {
    fs.writeFile(out, text, 'utf8', function(err) {
      if (err) {
        console.error(`Couldn't write to ${out}: ${err}`);
        process.exit(1);
      }
    });
  } else {
    console.log(text);
  }
}

function cat(path, out) {
  fs.readFile(path, 'utf8', function(err, data) {
    if (err) {
      console.error(`Error reading ${path}: ${err}`);
      process.exit(1);
    } else {
      handleOutput(data, out);
    }
  });
}

async function webCat(url, out) {
	const get_url = await axios.get(url)
                  .then(data => {
                  	handleOutput(data.data, out);
                 })
                  .catch(err => {
                  	console.log(`Error reading the url at ${url}: ${err}`); 
                  	process.exit(1);
                 })         
}

function handleInput(){
	let path, out;

	if (process.argv[2] === '--out') {
  		out = process.argv[3];
  		path = process.argv[4];
	} else {
  		path = process.argv[2];
	}

	if (path.slice(0, 4) === 'http' || path.slice(0,5) === 'https') {
  		webCat(path, out);
	} else {
  		cat(path, out);
	}
}

handleInput();