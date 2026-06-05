export interface Word {
  id: number
  hebrew: string
  hebrewNikud: string
  transliteration: string
  russian: string
  category: string
  level: number
}

export const words: Word[] = [
  // === LEVEL 1: Basic words (family, greetings, short common words) ===
  { id: 1, hebrew: 'אבא', hebrewNikud: 'אַבָּא', transliteration: 'аба', russian: 'папа', category: 'family', level: 1 },
  { id: 2, hebrew: 'אמא', hebrewNikud: 'אִמָּא', transliteration: 'има', russian: 'мама', category: 'family', level: 1 },
  { id: 3, hebrew: 'ילד', hebrewNikud: 'יֶלֶד', transliteration: 'елед', russian: 'мальчик', category: 'family', level: 1 },
  { id: 4, hebrew: 'ילדה', hebrewNikud: 'יַלְדָּה', transliteration: 'ялда', russian: 'девочка', category: 'family', level: 1 },
  { id: 5, hebrew: 'בית', hebrewNikud: 'בַּיִת', transliteration: 'байит', russian: 'дом', category: 'home', level: 1 },
  { id: 6, hebrew: 'כלב', hebrewNikud: 'כֶּלֶב', transliteration: 'келев', russian: 'собака', category: 'animals', level: 1 },
  { id: 7, hebrew: 'חתול', hebrewNikud: 'חָתוּל', transliteration: 'хатуль', russian: 'кот', category: 'animals', level: 1 },
  { id: 8, hebrew: 'מים', hebrewNikud: 'מַיִם', transliteration: 'маим', russian: 'вода', category: 'food', level: 1 },
  { id: 9, hebrew: 'לחם', hebrewNikud: 'לֶחֶם', transliteration: 'лехем', russian: 'хлеб', category: 'food', level: 1 },
  { id: 10, hebrew: 'שמש', hebrewNikud: 'שֶׁמֶשׁ', transliteration: 'шемеш', russian: 'солнце', category: 'nature', level: 1 },
  { id: 11, hebrew: 'ירח', hebrewNikud: 'יָרֵחַ', transliteration: 'яреах', russian: 'луна', category: 'nature', level: 1 },
  { id: 12, hebrew: 'יום', hebrewNikud: 'יוֹם', transliteration: 'йом', russian: 'день', category: 'time', level: 1 },
  { id: 13, hebrew: 'לילה', hebrewNikud: 'לַיְלָה', transliteration: 'лайла', russian: 'ночь', category: 'time', level: 1 },
  { id: 14, hebrew: 'שלום', hebrewNikud: 'שָׁלוֹם', transliteration: 'шалом', russian: 'привет / мир', category: 'greetings', level: 1 },
  { id: 15, hebrew: 'כן', hebrewNikud: 'כֵּן', transliteration: 'кен', russian: 'да', category: 'greetings', level: 1 },
  { id: 16, hebrew: 'לא', hebrewNikud: 'לֹא', transliteration: 'ло', russian: 'нет', category: 'greetings', level: 1 },
  { id: 17, hebrew: 'תודה', hebrewNikud: 'תּוֹדָה', transliteration: 'тода', russian: 'спасибо', category: 'greetings', level: 1 },
  { id: 18, hebrew: 'אחד', hebrewNikud: 'אֶחָד', transliteration: 'эхад', russian: 'один', category: 'numbers', level: 1 },
  { id: 19, hebrew: 'שתיים', hebrewNikud: 'שְׁתַּיִם', transliteration: 'штаим', russian: 'два', category: 'numbers', level: 1 },
  { id: 20, hebrew: 'שלוש', hebrewNikud: 'שָׁלוֹשׁ', transliteration: 'шалош', russian: 'три', category: 'numbers', level: 1 },
  { id: 21, hebrew: 'ארבע', hebrewNikud: 'אַרְבַּע', transliteration: 'арба', russian: 'четыре', category: 'numbers', level: 1 },
  { id: 22, hebrew: 'חמש', hebrewNikud: 'חָמֵשׁ', transliteration: 'хамеш', russian: 'пять', category: 'numbers', level: 1 },
  { id: 23, hebrew: 'אדום', hebrewNikud: 'אָדוֹם', transliteration: 'адом', russian: 'красный', category: 'colors', level: 1 },
  { id: 24, hebrew: 'כחול', hebrewNikud: 'כָּחוֹל', transliteration: 'кахоль', russian: 'синий', category: 'colors', level: 1 },
  { id: 25, hebrew: 'ירוק', hebrewNikud: 'יָרוֹק', transliteration: 'ярок', russian: 'зелёный', category: 'colors', level: 1 },
  { id: 26, hebrew: 'לבן', hebrewNikud: 'לָבָן', transliteration: 'лаван', russian: 'белый', category: 'colors', level: 1 },
  { id: 27, hebrew: 'שחור', hebrewNikud: 'שָׁחוֹר', transliteration: 'шахор', russian: 'чёрный', category: 'colors', level: 1 },
  { id: 28, hebrew: 'צהוב', hebrewNikud: 'צָהוֹב', transliteration: 'цахов', russian: 'жёлтый', category: 'colors', level: 1 },
  { id: 29, hebrew: 'טוב', hebrewNikud: 'טוֹב', transliteration: 'тов', russian: 'хорошо', category: 'greetings', level: 1 },
  { id: 30, hebrew: 'גדול', hebrewNikud: 'גָּדוֹל', transliteration: 'гадоль', russian: 'большой', category: 'adjectives', level: 1 },
  { id: 31, hebrew: 'קטן', hebrewNikud: 'קָטָן', transliteration: 'катан', russian: 'маленький', category: 'adjectives', level: 1 },

  // === LEVEL 2: Common words (food, school, home, body) ===
  { id: 32, hebrew: 'ספר', hebrewNikud: 'סֵפֶר', transliteration: 'сефер', russian: 'книга', category: 'school', level: 2 },
  { id: 33, hebrew: 'עיפרון', hebrewNikud: 'עִפָּרוֹן', transliteration: 'ипарон', russian: 'карандаш', category: 'school', level: 2 },
  { id: 34, hebrew: 'מורה', hebrewNikud: 'מוֹרָה', transliteration: 'мора', russian: 'учительница', category: 'school', level: 2 },
  { id: 35, hebrew: 'כיתה', hebrewNikud: 'כִּתָּה', transliteration: 'кита', russian: 'класс', category: 'school', level: 2 },
  { id: 36, hebrew: 'תלמיד', hebrewNikud: 'תַּלְמִיד', transliteration: 'талмид', russian: 'ученик', category: 'school', level: 2 },
  { id: 37, hebrew: 'שולחן', hebrewNikud: 'שֻׁלְחָן', transliteration: 'шульхан', russian: 'стол', category: 'home', level: 2 },
  { id: 38, hebrew: 'כיסא', hebrewNikud: 'כִּסֵּא', transliteration: 'кисэ', russian: 'стул', category: 'home', level: 2 },
  { id: 39, hebrew: 'דלת', hebrewNikud: 'דֶּלֶת', transliteration: 'делет', russian: 'дверь', category: 'home', level: 2 },
  { id: 40, hebrew: 'חלון', hebrewNikud: 'חַלּוֹן', transliteration: 'халон', russian: 'окно', category: 'home', level: 2 },
  { id: 41, hebrew: 'ראש', hebrewNikud: 'רֹאשׁ', transliteration: 'рош', russian: 'голова', category: 'body', level: 2 },
  { id: 42, hebrew: 'יד', hebrewNikud: 'יָד', transliteration: 'яд', russian: 'рука', category: 'body', level: 2 },
  { id: 43, hebrew: 'רגל', hebrewNikud: 'רֶגֶל', transliteration: 'регель', russian: 'нога', category: 'body', level: 2 },
  { id: 44, hebrew: 'עין', hebrewNikud: 'עַיִן', transliteration: 'аин', russian: 'глаз', category: 'body', level: 2 },
  { id: 45, hebrew: 'אף', hebrewNikud: 'אַף', transliteration: 'аф', russian: 'нос', category: 'body', level: 2 },
  { id: 46, hebrew: 'פה', hebrewNikud: 'פֶּה', transliteration: 'пэ', russian: 'рот', category: 'body', level: 2 },
  { id: 47, hebrew: 'אוזן', hebrewNikud: 'אוֹזֶן', transliteration: 'озен', russian: 'ухо', category: 'body', level: 2 },
  { id: 48, hebrew: 'תפוח', hebrewNikud: 'תַּפּוּחַ', transliteration: 'тапуах', russian: 'яблоко', category: 'food', level: 2 },
  { id: 49, hebrew: 'בננה', hebrewNikud: 'בָּנָנָה', transliteration: 'банана', russian: 'банан', category: 'food', level: 2 },
  { id: 50, hebrew: 'חלב', hebrewNikud: 'חָלָב', transliteration: 'халав', russian: 'молоко', category: 'food', level: 2 },
  { id: 51, hebrew: 'ביצה', hebrewNikud: 'בֵּיצָה', transliteration: 'бейца', russian: 'яйцо', category: 'food', level: 2 },
  { id: 52, hebrew: 'עוגה', hebrewNikud: 'עוּגָה', transliteration: 'уга', russian: 'торт', category: 'food', level: 2 },
  { id: 53, hebrew: 'שש', hebrewNikud: 'שֵׁשׁ', transliteration: 'шеш', russian: 'шесть', category: 'numbers', level: 2 },
  { id: 54, hebrew: 'שבע', hebrewNikud: 'שֶׁבַע', transliteration: 'шева', russian: 'семь', category: 'numbers', level: 2 },
  { id: 55, hebrew: 'שמונה', hebrewNikud: 'שְׁמוֹנֶה', transliteration: 'шмонэ', russian: 'восемь', category: 'numbers', level: 2 },
  { id: 56, hebrew: 'תשע', hebrewNikud: 'תֵּשַׁע', transliteration: 'теша', russian: 'девять', category: 'numbers', level: 2 },
  { id: 57, hebrew: 'עשר', hebrewNikud: 'עֶשֶׂר', transliteration: 'эсер', russian: 'десять', category: 'numbers', level: 2 },
  { id: 58, hebrew: 'ציפור', hebrewNikud: 'צִפּוֹר', transliteration: 'ципор', russian: 'птица', category: 'animals', level: 2 },
  { id: 59, hebrew: 'דג', hebrewNikud: 'דָּג', transliteration: 'даг', russian: 'рыба', category: 'animals', level: 2 },
  { id: 60, hebrew: 'פרה', hebrewNikud: 'פָּרָה', transliteration: 'пара', russian: 'корова', category: 'animals', level: 2 },
  { id: 61, hebrew: 'סוס', hebrewNikud: 'סוּס', transliteration: 'сус', russian: 'лошадь', category: 'animals', level: 2 },
  { id: 62, hebrew: 'חבר', hebrewNikud: 'חָבֵר', transliteration: 'хавер', russian: 'друг', category: 'family', level: 2 },
  { id: 63, hebrew: 'אח', hebrewNikud: 'אָח', transliteration: 'ах', russian: 'брат', category: 'family', level: 2 },
  { id: 64, hebrew: 'אחות', hebrewNikud: 'אָחוֹת', transliteration: 'ахот', russian: 'сестра', category: 'family', level: 2 },
  { id: 65, hebrew: 'סבא', hebrewNikud: 'סַבָּא', transliteration: 'саба', russian: 'дедушка', category: 'family', level: 2 },
  { id: 66, hebrew: 'סבתא', hebrewNikud: 'סָבְתָא', transliteration: 'савта', russian: 'бабушка', category: 'family', level: 2 },
  { id: 67, hebrew: 'עץ', hebrewNikud: 'עֵץ', transliteration: 'эц', russian: 'дерево', category: 'nature', level: 2 },
  { id: 68, hebrew: 'פרח', hebrewNikud: 'פֶּרַח', transliteration: 'перах', russian: 'цветок', category: 'nature', level: 2 },
  { id: 69, hebrew: 'גשם', hebrewNikud: 'גֶּשֶׁם', transliteration: 'гешем', russian: 'дождь', category: 'nature', level: 2 },
  { id: 70, hebrew: 'רוח', hebrewNikud: 'רוּחַ', transliteration: 'руах', russian: 'ветер', category: 'nature', level: 2 },

  // === LEVEL 3: Extended vocabulary (actions, clothes, more adjectives) ===
  { id: 71, hebrew: 'ללכת', hebrewNikud: 'לָלֶכֶת', transliteration: 'лалехет', russian: 'идти', category: 'actions', level: 3 },
  { id: 72, hebrew: 'לרוץ', hebrewNikud: 'לָרוּץ', transliteration: 'ларуц', russian: 'бежать', category: 'actions', level: 3 },
  { id: 73, hebrew: 'לאכול', hebrewNikud: 'לֶאֱכוֹל', transliteration: 'лээхоль', russian: 'есть (кушать)', category: 'actions', level: 3 },
  { id: 74, hebrew: 'לשתות', hebrewNikud: 'לִשְׁתּוֹת', transliteration: 'лиштот', russian: 'пить', category: 'actions', level: 3 },
  { id: 75, hebrew: 'לישון', hebrewNikud: 'לִישׁוֹן', transliteration: 'лишон', russian: 'спать', category: 'actions', level: 3 },
  { id: 76, hebrew: 'לקרוא', hebrewNikud: 'לִקְרוֹא', transliteration: 'ликро', russian: 'читать', category: 'actions', level: 3 },
  { id: 77, hebrew: 'לכתוב', hebrewNikud: 'לִכְתּוֹב', transliteration: 'лихтов', russian: 'писать', category: 'actions', level: 3 },
  { id: 78, hebrew: 'לשחק', hebrewNikud: 'לְשַׂחֵק', transliteration: 'лесахек', russian: 'играть', category: 'actions', level: 3 },
  { id: 79, hebrew: 'לשיר', hebrewNikud: 'לָשִׁיר', transliteration: 'лашир', russian: 'петь', category: 'actions', level: 3 },
  { id: 80, hebrew: 'לצייר', hebrewNikud: 'לְצַיֵּר', transliteration: 'лецайер', russian: 'рисовать', category: 'actions', level: 3 },
  { id: 81, hebrew: 'חולצה', hebrewNikud: 'חֻלְצָה', transliteration: 'хульца', russian: 'рубашка', category: 'clothes', level: 3 },
  { id: 82, hebrew: 'מכנסיים', hebrewNikud: 'מִכְנָסַיִם', transliteration: 'михнасаим', russian: 'штаны', category: 'clothes', level: 3 },
  { id: 83, hebrew: 'נעליים', hebrewNikud: 'נַעֲלַיִם', transliteration: 'наалаим', russian: 'обувь', category: 'clothes', level: 3 },
  { id: 84, hebrew: 'כובע', hebrewNikud: 'כּוֹבַע', transliteration: 'кова', russian: 'шапка', category: 'clothes', level: 3 },
  { id: 85, hebrew: 'שמלה', hebrewNikud: 'שִׂמְלָה', transliteration: 'симла', russian: 'платье', category: 'clothes', level: 3 },
  { id: 86, hebrew: 'יפה', hebrewNikud: 'יָפֶה', transliteration: 'яфе', russian: 'красивый', category: 'adjectives', level: 3 },
  { id: 87, hebrew: 'חדש', hebrewNikud: 'חָדָשׁ', transliteration: 'хадаш', russian: 'новый', category: 'adjectives', level: 3 },
  { id: 88, hebrew: 'ישן', hebrewNikud: 'יָשָׁן', transliteration: 'яшан', russian: 'старый', category: 'adjectives', level: 3 },
  { id: 89, hebrew: 'חם', hebrewNikud: 'חַם', transliteration: 'хам', russian: 'горячий', category: 'adjectives', level: 3 },
  { id: 90, hebrew: 'קר', hebrewNikud: 'קַר', transliteration: 'кар', russian: 'холодный', category: 'adjectives', level: 3 },
  { id: 91, hebrew: 'שמח', hebrewNikud: 'שָׂמֵחַ', transliteration: 'самеах', russian: 'весёлый', category: 'adjectives', level: 3 },
  { id: 92, hebrew: 'עצוב', hebrewNikud: 'עָצוּב', transliteration: 'ацув', russian: 'грустный', category: 'adjectives', level: 3 },
  { id: 93, hebrew: 'מהר', hebrewNikud: 'מַהֵר', transliteration: 'маhэр', russian: 'быстро', category: 'adjectives', level: 3 },
  { id: 94, hebrew: 'לאט', hebrewNikud: 'לְאַט', transliteration: 'леат', russian: 'медленно', category: 'adjectives', level: 3 },
  { id: 95, hebrew: 'מטבח', hebrewNikud: 'מִטְבָּח', transliteration: 'митбах', russian: 'кухня', category: 'home', level: 3 },
  { id: 96, hebrew: 'חדר', hebrewNikud: 'חֶדֶר', transliteration: 'хедер', russian: 'комната', category: 'home', level: 3 },
  { id: 97, hebrew: 'מיטה', hebrewNikud: 'מִטָּה', transliteration: 'мита', russian: 'кровать', category: 'home', level: 3 },
  { id: 98, hebrew: 'טלוויזיה', hebrewNikud: 'טֵלֵוִיזְיָה', transliteration: 'телевизья', russian: 'телевизор', category: 'home', level: 3 },
  { id: 99, hebrew: 'מחשב', hebrewNikud: 'מַחְשֵׁב', transliteration: 'махшев', russian: 'компьютер', category: 'home', level: 3 },
  { id: 100, hebrew: 'משפחה', hebrewNikud: 'מִשְׁפָּחָה', transliteration: 'мишпаха', russian: 'семья', category: 'family', level: 3 },
  { id: 101, hebrew: 'ארוחה', hebrewNikud: 'אֲרוּחָה', transliteration: 'аруха', russian: 'еда (приём пищи)', category: 'food', level: 3 },
  { id: 102, hebrew: 'גלידה', hebrewNikud: 'גְּלִידָה', transliteration: 'глида', russian: 'мороженое', category: 'food', level: 3 },
  { id: 103, hebrew: 'שוקולד', hebrewNikud: 'שׁוֹקוֹלָד', transliteration: 'шоколад', russian: 'шоколад', category: 'food', level: 3 },
  { id: 104, hebrew: 'ארנב', hebrewNikud: 'אַרְנָב', transliteration: 'арнав', russian: 'кролик', category: 'animals', level: 3 },
  { id: 105, hebrew: 'פרפר', hebrewNikud: 'פַּרְפַּר', transliteration: 'парпар', russian: 'бабочка', category: 'animals', level: 3 },
  { id: 106, hebrew: 'נמלה', hebrewNikud: 'נְמָלָה', transliteration: 'немала', russian: 'муравей', category: 'animals', level: 3 },
  { id: 107, hebrew: 'עכביש', hebrewNikud: 'עַכָּבִישׁ', transliteration: 'акавиш', russian: 'паук', category: 'animals', level: 3 },
  { id: 108, hebrew: 'כוכב', hebrewNikud: 'כּוֹכָב', transliteration: 'кохав', russian: 'звезда', category: 'nature', level: 3 },
  { id: 109, hebrew: 'שמים', hebrewNikud: 'שָׁמַיִם', transliteration: 'шамаим', russian: 'небо', category: 'nature', level: 3 },
  { id: 110, hebrew: 'ים', hebrewNikud: 'יָם', transliteration: 'ям', russian: 'море', category: 'nature', level: 3 },
  { id: 111, hebrew: 'הר', hebrewNikud: 'הַר', transliteration: 'гар', russian: 'гора', category: 'nature', level: 3 },
  { id: 112, hebrew: 'דרך', hebrewNikud: 'דֶּרֶךְ', transliteration: 'дерех', russian: 'дорога', category: 'nature', level: 3 },
  { id: 113, hebrew: 'אוטובוס', hebrewNikud: 'אוֹטוֹבּוּס', transliteration: 'отобус', russian: 'автобус', category: 'transport', level: 3 },
  { id: 114, hebrew: 'מכונית', hebrewNikud: 'מְכוֹנִית', transliteration: 'мехонит', russian: 'машина', category: 'transport', level: 3 },
  { id: 115, hebrew: 'אופניים', hebrewNikud: 'אוֹפַנַּיִם', transliteration: 'офанаим', russian: 'велосипед', category: 'transport', level: 3 },
  { id: 116, hebrew: 'בוקר', hebrewNikud: 'בּוֹקֶר', transliteration: 'бокер', russian: 'утро', category: 'time', level: 3 },
  { id: 117, hebrew: 'ערב', hebrewNikud: 'עֶרֶב', transliteration: 'эрев', russian: 'вечер', category: 'time', level: 3 },
  { id: 118, hebrew: 'שעון', hebrewNikud: 'שָׁעוֹן', transliteration: 'шаон', russian: 'часы', category: 'time', level: 3 },
  { id: 119, hebrew: 'מתנה', hebrewNikud: 'מַתָּנָה', transliteration: 'матана', russian: 'подарок', category: 'other', level: 3 },
  { id: 120, hebrew: 'חג', hebrewNikud: 'חַג', transliteration: 'хаг', russian: 'праздник', category: 'other', level: 3 },
]

export function getWordsForLevel(level: number): Word[] {
  if (level <= 3) {
    return words.filter(w => w.level <= level)
  }
  if (level === 4) {
    return words.filter(w => w.level <= 2)
  }
  return words
}

export function isNikudLevel(level: number): boolean {
  return level <= 3
}

export const categories: Record<string, string> = {
  family: 'משפחה',
  greetings: 'ברכות',
  numbers: 'מספרים',
  colors: 'צבעים',
  animals: 'חיות',
  food: 'אוכל',
  school: 'בית ספר',
  home: 'בית',
  body: 'גוף',
  nature: 'טבע',
  actions: 'פעולות',
  clothes: 'בגדים',
  adjectives: 'תארים',
  time: 'זמן',
  transport: 'תחבורה',
  other: 'אחר',
}
