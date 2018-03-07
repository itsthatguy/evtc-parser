import fs from "fs";
import { SmartBuffer } from "smart-buffer-64";

// import request from "request".defaults({ encoding: null });
import AdmZip from 'adm-zip';

async function parse(buffer) {
  const logBuffer = SmartBuffer.fromBuffer(buffer);
}

async function fromZip(buffer) {
  const zip = new AdmZip(buffer);
  const zipEntries = zip.getEntries();

  return zipEntries[0].getData();
}

export async function fromFile(filename) {
  return new Promise(resolve => {
    fs.readFile(filename, async (err, data) => {
      if (err) throw err;

      resolve(
        fromZip(data).then(async buffer => {
          return parse(buffer);
        })
      );
    });
  });
}
