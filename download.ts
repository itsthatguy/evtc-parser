import axios from 'axios';
import * as fs from 'fs';
import { resolve } from 'path';
import { forEach } from 'lodash';

const urls = [
  'https://gw2raidar.com/encounter/AppearedRespondingTapAnniversariesBulk',
  'https://gw2raidar.com/encounter/LeftsProportionsElevenPraisedButters',
  'https://gw2raidar.com/encounter/TrailingTradesVenturedRocksThefts',
  'https://gw2raidar.com/encounter/ClothesEntertainedSettledWeakestDiscovered',
  'https://gw2raidar.com/encounter/AllegingDieselsWetAwarenessSurvived',
  'https://gw2raidar.com/encounter/LabeledFunctioningRescuesBadPiling',
  'https://gw2raidar.com/encounter/VerbsDistinguishesBrowInspirationSubstantially',
  'https://gw2raidar.com/encounter/WeakenManufacturedWelcomeOwlsPhase',
  'https://gw2raidar.com/encounter/SurvivingBankruptcyLocalsBoundingSin',
];

async function downloadFile (url, name) {
  const path = resolve(__dirname, 'downloads', name)

  // axios image download with response type "stream"
  const response = await axios({
    method: 'GET',
    url: url,
    responseType: 'stream'
  })

  // pipe the result stream into a file on disc
  response.data.pipe(fs.createWriteStream(path))

  // return a promise and resolve when download finishes
  return new Promise((resolve, reject) => {
    response.data.on('end', () => {
      resolve()
    })

    response.data.on('error', () => {
      reject()
    })
  })

}

async function downloadStuff (url) {
  const name = url.substr(url.lastIndexOf('/') + 1);
  const path = resolve(__dirname, 'downloads')
  const zipurl = url.replace(/encounter/, 'download')

  downloadFile(`${url}.json`, `${name}.json`)
  downloadFile(zipurl, `${name}.zip`)
}

urls.forEach((u) => downloadStuff(u))
