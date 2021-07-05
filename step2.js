const read = require('./step1');
const fs = require('fs');
const process = require('process');
const axios = require('axios');

async function webcat(url){
  const get_url = await axios.get(url)
                  .then(data => {
                  	console.log(data.data)
                 })
                  .catch(err => {
                  	console.log(`Error reading the url at ${url}: ${err}`); 
                  	process.exit(1);
                 })         
}

// webcat(process.argv[2]);

// webcat("https://gole.com/")


function selectReadFormat(){
	const item_1 = "http";
	const item_2 = "https";
	const path = process.argv[2];

	if (path.slice(0,4) === item_1 || path.slice(0,5) === item_2) {
	webcat(path);
	}else {
	read.cat(path);
	}
}

selectReadFormat();


