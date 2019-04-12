const curl = require("curl");
const jsdom = require("jsdom");

module.exports = getDogImageSource = uri => {
  return new Promise(
    (resolve, reject) => {
      curl.get(uri, null, (err,response,body) => {
        if (response.statusCode == 200) {
          resolve(parseData(body));
        } else {
          console.warn(`Error accessing dog profile at ${uri}`, error);
          resolve(null);
        }
      });
    }
  );
}

function parseData(html){
  const {JSDOM} = jsdom;
  const dom = new JSDOM(html);
  const $ = (require('jquery'))(dom.window);
  const images = $("img");
  return $(images[0]).attr('src');
}