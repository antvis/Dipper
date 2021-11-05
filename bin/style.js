const fs = require('fs-extra');
const path = require('path');
const TARGET_PATH = path.resolve(__dirname, '../packages/');

const getAllFile = function (dir) {
  let res = [];
  function traverse(dir) {
    fs.readdirSync(dir).forEach((file) => {
      const pathname = path.join(dir, file);
      if (fs.statSync(pathname).isDirectory()) {
        traverse(pathname);
      } else {
        res.push(pathname);
      }
    });
  }
  traverse(dir);
  return res;
};

console.log(getAllFile(TARGET_PATH));
