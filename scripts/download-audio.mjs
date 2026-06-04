import https from 'https'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outDir = path.join(__dirname, '..', 'public', 'audio')

const words = [
  'אבא','אמא','ילד','ילדה','בית','כלב','חתול','מים','לחם','שמש',
  'ירח','יום','לילה','שלום','כן','לא','תודה','אחד','שתיים','שלוש',
  'ארבע','חמש','אדום','כחול','ירוק','לבן','שחור','צהוב','טוב','גדול',
  'קטן','ספר','עט','מורה','כיתה','תלמיד','שולחן','כיסא','דלת','חלון',
  'ראש','יד','רגל','עין','אף','פה','אוזן','תפוח','בננה','חלב',
  'ביצה','עוגה','שש','שבע','שמונה','תשע','עשר','ציפור','דג','פרה',
  'סוס','חבר','אח','אחות','סבא','סבתא','עץ','פרח','גשם','רוח',
  'ללכת','לרוץ','לאכול','לשתות','לישון','לקרוא','לכתוב','לשחק','לשיר','לצייר',
  'חולצה','מכנסיים','נעליים','כובע','שמלה','יפה','חדש','ישן','חם','קר',
  'שמח','עצוב','מהר','לאט','מטבח','חדר','מיטה','טלוויזיה','מחשב','משפחה',
  'ארוחה','גלידה','שוקולד','ארנב','פרפר','נמלה','עכביש','כוכב','שמים','ים',
  'הר','דרך','אוטובוס','מכונית','אופניים','בוקר','ערב','שעון','מתנה','חג',
]

fs.mkdirSync(outDir, { recursive: true })

function downloadWord(word, id) {
  return new Promise((resolve, reject) => {
    const encoded = encodeURIComponent(word)
    const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encoded}&tl=he&total=1&idx=0&textlen=${word.length}&client=tw-ob&prev=input&ttsspeed=1`
    const filePath = path.join(outDir, `${id}.mp3`)

    if (fs.existsSync(filePath)) {
      console.log(`  [skip] ${id}.mp3 (${word}) already exists`)
      resolve()
      return
    }

    const req = https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Referer': 'https://translate.google.com/',
      }
    }, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`HTTP ${res.statusCode} for word "${word}"`))
        return
      }
      const chunks = []
      res.on('data', c => chunks.push(c))
      res.on('end', () => {
        fs.writeFileSync(filePath, Buffer.concat(chunks))
        const size = Buffer.concat(chunks).length
        console.log(`  [ok]   ${id}.mp3 (${word}) - ${(size / 1024).toFixed(1)}KB`)
        resolve()
      })
    })
    req.on('error', reject)
  })
}

async function main() {
  console.log(`Downloading ${words.length} words to ${outDir}\n`)
  let ok = 0, fail = 0

  for (let i = 0; i < words.length; i++) {
    const id = i + 1
    try {
      await downloadWord(words[i], id)
      ok++
    } catch (err) {
      console.log(`  [FAIL] ${id} (${words[i]}): ${err.message}`)
      fail++
    }
    // Small delay to not hammer the server
    if (i < words.length - 1) {
      await new Promise(r => setTimeout(r, 200))
    }
  }

  console.log(`\nDone: ${ok} downloaded, ${fail} failed`)
}

main()
