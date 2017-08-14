var pathUtil = require('path');

var parsed = pathUtil.parse('/usr/tmp/local/image.png');
console.log(parsed);

console.log(parsed.base);
console.log(parsed.ext);