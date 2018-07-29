
var fs = require('fs');
var PropertiesReader = require('properties-reader');

function generateEmail() {
  const properties = PropertiesReader('./src/resources/event.properties');
  return new Promise( (resolve, reject) => {
    fs.readFile('./src/resources/email.html', function(err, data) {
      if(err) { reject('error'); }
      let template = data.toString();
      properties.each((key, value) => {
        template = template.replace(`$${key}`, value);
      });
      resolve(template);
    });
  });
}

module.exports = generateEmail