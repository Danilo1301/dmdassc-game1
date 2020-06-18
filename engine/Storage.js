const fs = require('fs');


Storage = class {
  static getBlocksData(callback) {
    var data = {};


    fs.readdir('./engine/assets/blocks', (err, files) => {
      if(err) {
        return console.log(err)
      }


      files.forEach(file => {
        data[file] = {};
        data[file].data = JSON.parse(fs.readFileSync(`./engine/assets/blocks/${file}/data.json`, 'utf8'))
      });


      callback(data);
    });


  }
}
