import fs from 'fs';
import { resolve as resolvePath } from 'path';
import Parser from './Parser';
import AdmZip from 'adm-zip';

async function parse (buffer) {
  return new Parser(buffer);
}

async function fromZip (buffer) {
  const zip = new AdmZip(buffer);
  const zipEntries = zip.getEntries();

  return zipEntries[0].getData();
}

export async function fromFile (filename) {
  return new Promise(resolve => {
    const filepath = resolvePath(filename);

    fs.readFile(filepath, async (err, data) => {
      if (err) throw err;

      fromZip(data).then(async buffer => {
        return resolve(parse(buffer));
      })
    });
  });
}
