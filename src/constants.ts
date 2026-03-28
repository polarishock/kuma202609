import { DayPlan, Member, Phrase, LocationDetail } from './types';

export const MEMBERS: Member[] = [
  { id: '1', name: '廷', avatar: '/images/avatar-user1.png' },
  { id: '2', name: '佑', avatar: '/images/avatar-user2.png' },
  { id: '3', name: 'ㄗ', avatar: '/images/avatar-user3.png' },
  { id: '4', name: '萱', avatar: '/images/avatar-user4.png' },
];

export const LOCATION_DETAILS: LocationDetail[] = [
  {
    id: 'katsuretsutei',
    location: '勝烈亭豬排',
    history: '創立於昭和50年（1975年），是熊本最具代表性的豬排老店。以獨門的炸功與嚴選的「六白黑豬」聞名，曾獲得米其林指南推薦。',
    mustDo: [
      '品嚐厚切黑豬肉',
      '體驗自行磨製芝麻醬汁',
      '續加免費的白飯、味噌湯與高麗菜絲'
    ],
    food: [
      '厚切里肌豬排',
      '大海老（炸大蝦）',
      '季節限定炸牡蠣'
    ],
    image: '/images/katsuretsutei.jpg'
  },
  {
    id: 'kumamoto-castle',
    location: '熊本城',
    history: '由名將加藤清正於1607年完工，與姬路城、松本城並列日本三大名城。以堅不可摧的「武者返」石牆著稱。雖然在2016年地震中受損，但目前天守閣已修復完成並開放參觀。',
    mustDo: [
      '登上天守閣俯瞰熊本市景',
      '參觀本丸御殿的「昭君之間」',
      '與穿著武士盔甲的「熊本城款待武將隊」合照'
    ],
    food: [
      '櫻之馬場 城彩苑內的陣太鼓霜淇淋',
      '馬肉刺身（熊本名物）',
      '即食糰子'
    ],
    image: '/images/kumamoto-castle.jpg'
  },
  {
    id: 'futamigaura',
    location: '二見浦夫婦岩',
    history: '位於糸島半島北端，以海中矗立的兩塊巨大岩石與白色鳥居聞名。這裡是「日本百選夕陽」之一，也是著名的姻緣聖地。',
    mustDo: [
      '在白色鳥居前拍攝網美照',
      '漫步於二見浦海灘',
      '尋找附近的「天使之翼」彩繪牆'
    ],
    food: [
      '糸島海鮮丼',
      '糸島布丁',
      '海邊咖啡廳的特製飲品'
    ],
    image: '/images/futamigaura.jpg'
  },
  {
    id: 'noko-island',
    location: '能古島海島公園',
    history: '博多灣中的一座小島，從姪濱搭渡輪僅需10分鐘。公園內四季皆有不同花卉盛開，最著名的是秋季的波斯菊與春季的油菜花，襯托著蔚藍海景。',
    mustDo: [
      '在四季花海中漫步',
      '體驗「能古島式」迷你高爾夫',
      '在古色古香的「思出通」街道尋寶'
    ],
    food: [
      '能古島漢堡',
      '能古烏龍麵',
      '黑毛和牛絕景烤肉'
    ],
    image: '/images/noko-island.jpg'
  },
  {
    id: 'fukuoka-tower',
    location: '福岡塔',
    history: '高234公尺，是日本最高的海濱塔。外牆鑲嵌了8000片半反射鏡，被稱為「鏡之帆」。',
    mustDo: [
      '在123公尺高的展望台欣賞360度全景',
      '在「戀人聖地」鎖上愛情鎖',
      '欣賞夜晚的主題燈光秀'
    ],
    food: [
      '展望餐廳 Sky Lounge Refuge 的下午茶',
      '周邊百道濱海灘的輕食'
    ],
    image: '/images/fukuoka-tower.jpg'
  },
  {
    id: 'lalaport',
    location: 'LaLaport 福岡',
    history: '2022年開幕的大型購物中心，最受矚目的標誌是門口1:1實物大的「RX-93ff ν 鋼彈」立像。',
    mustDo: [
      '觀賞鋼彈立像的整點表演',
      '參觀 GUNDAM SIDE-F 鋼彈專賣店',
      '在 KidZania 體驗職業（如果有小孩）'
    ],
    food: [
      '九州最大規模的美食廣場',
      '各類連鎖名店（如一蘭、利久牛舌）'
    ],
    image: '/images/lalaport.jpg'
  }
];

export const ITINERARY: DayPlan[] = [
  {
    day: 1,
    date: '9/25',
    image: '/images/day1-kumamoto.jpg',
    items: [
      { id: '1-1', time: '04:00', location: '家裡', description: '出發前往桃園機場', mapUrl: '' },
      { id: '1-2', time: '07:30', location: '桃園機場', description: '星宇 JX846 ➔ 熊本機場', mapUrl: 'https://maps.google.com/?q=Taoyuan+International+Airport' },
      { id: '1-3', time: '12:07', location: '熊本機場', description: '1F 4 號站牌搭乘產交巴士', mapUrl: 'https://maps.google.com/?q=Kumamoto+Airport' },
      { id: '1-4', time: '12:40', location: '飯店', description: '寄放行李', mapUrl: '' },
      { id: '1-5', time: '13:00', location: '勝烈亭豬排', description: '午餐：名店豬排', mapUrl: 'https://maps.google.com/?q=Katsuretsutei' },
      { id: '1-6', time: '15:00', location: '熊本城', description: '參觀日本三大名城', mapUrl: 'https://maps.google.com/?q=Kumamoto+Castle' },
      { id: '1-7', time: '18:00', location: '熊本-博多', description: '搭乘新幹線前往博多', mapUrl: '' },
      { id: '1-8', time: '19:00', location: '燒肉', description: '晚餐：預約燒肉', mapUrl: '' },
      { id: '1-9', time: '21:30', location: '博多-熊本', description: '返回熊本住宿', mapUrl: '' },
    ]
  },
  {
    day: 2,
    date: '9/26',
    image: '/images/day2-itoshima.jpg',
    items: [
      { id: '2-1', time: '07:00', location: '早餐', description: '早餐自理', mapUrl: '' },
      { id: '2-2', time: '08:00', location: '熊本-博多', description: '搭乘新幹線', mapUrl: '' },
      { id: '2-3', time: '08:50', location: '博多車站', description: 'KKDAY 糸島深度一日遊集合', mapUrl: 'https://maps.google.com/?q=Hakata+Station' },
      { id: '2-4', time: '10:00', location: '白絲瀑布', description: '九州糸島自然景觀', mapUrl: 'https://maps.google.com/?q=Shiraito+Falls' },
      { id: '2-5', time: '11:00', location: '雷山千如寺', description: '大悲王院參拜', mapUrl: 'https://maps.google.com/?q=Sennyoji+Daihyooin' },
      { id: '2-6', time: '12:20', location: '椰子樹鞦韆', description: '網美打卡景點', mapUrl: 'https://maps.google.com/?q=Palm+Tree+Swing+Itoshima' },
      { id: '2-7', time: '13:10', location: '二見浦夫婦岩', description: '櫻井二見浦 & 天使之翼', mapUrl: 'https://maps.google.com/?q=Sakurai+Futamigaura' },
      { id: '2-8', time: '13:30', location: '糸島海鮮堂', description: '午餐：二見浦本店', mapUrl: 'https://maps.google.com/?q=Itoshima+Kaisendo' },
      { id: '2-9', time: '15:20', location: '芥屋大門', description: '龍貓森林步道', mapUrl: 'https://maps.google.com/?q=Keya+no+Oto' },
      { id: '2-10', time: '16:40', location: '福岡塔', description: '欣賞夕陽美景', mapUrl: 'https://maps.google.com/?q=Fukuoka+Tower' },
      { id: '2-11', time: '17:40', location: '博多', description: '返回博多車站', mapUrl: '' },
      { id: '2-12', time: '19:00', location: '晚餐', description: '博多市區晚餐', mapUrl: '' },
      { id: '2-13', time: '21:30', location: '博多-熊本', description: '返回熊本', mapUrl: '' },
    ]
  },
  {
    day: 3,
    date: '9/27',
    image: '/images/day3-noko.jpg',
    items: [
      { id: '3-1', time: '07:00', location: '早餐', description: '早餐自理', mapUrl: '' },
      { id: '3-2', time: '08:00', location: '熊本-博多', description: '搭乘新幹線', mapUrl: '' },
      { id: '3-3', time: '09:00', location: '能古島海島公園', description: '搭乘渡輪前往能古島', mapUrl: 'https://maps.google.com/?q=Nokonoshima+Island+Park' },
      { id: '3-4', time: '12:00', location: '能古島午餐', description: '能古島漢堡 / 黑毛和牛絕景烤肉', mapUrl: '' },
      { id: '3-5', time: '13:00', location: '天神商圈', description: 'PARCO、mina 百貨、Bic Camera', mapUrl: 'https://maps.google.com/?q=Tenjin+Station' },
      { id: '3-6', time: '16:30', location: 'Full Full Hakata', description: '買明太子麵包 (博多運河城)', mapUrl: 'https://maps.google.com/?q=The+Full+Full+Hakata' },
      { id: '3-7', time: '17:00', location: '博多站商圈', description: '商圈購物與散策', mapUrl: '' },
      { id: '3-8', time: '18:30', location: '牛腸鍋', description: '晚餐：博多名物', mapUrl: '' },
      { id: '3-9', time: '19:30', location: 'LaLaport 福岡', description: '1:1 實物大鋼彈 + 購物', mapUrl: 'https://maps.google.com/?q=LaLaport+Fukuoka' },
      { id: '3-10', time: '21:00', location: '博多-熊本', description: '返回熊本', mapUrl: '' },
    ]
  },
  {
    day: 4,
    date: '9/28',
    image: '/images/day4-airport.jpg',
    items: [
      { id: '4-1', time: '07:00', location: '飯店', description: '辦理退房', mapUrl: '' },
      { id: '4-2', time: '07:43', location: '產交巴士', description: '搭乘巴士前往機場', mapUrl: '' },
      { id: '4-3', time: '10:00', location: '熊本機場', description: '觀景台 & 伴手禮購物', mapUrl: 'https://maps.google.com/?q=Kumamoto+Airport' },
      { id: '4-4', time: '11:55', location: '熊本機場', description: '星宇 JX847 ➔ 桃園機場', mapUrl: '' },
      { id: '4-5', time: '14:00', location: '返家', description: '結束愉快旅程', mapUrl: '' },
    ]
  }
];

export const PHRASES: Phrase[] = [
  // 基本
  { id: 'b1', zh: '你好', jp: 'こんにちは', romaji: 'Konnichiwa', category: 'basic' },
  { id: 'b2', zh: '謝謝', jp: 'ありがとうございます', romaji: 'Arigatou gozaimasu', category: 'basic' },
  { id: 'b3', zh: '對不起 / 不好意思', jp: 'すみません', romaji: 'Sumimasen', category: 'basic' },
  { id: 'b4', zh: '是的', jp: 'はい', romaji: 'Hai', category: 'basic' },
  { id: 'b5', zh: '不是', jp: 'いいえ', romaji: 'Iie', category: 'basic' },
  { id: 'b6', zh: '請問你會說英文嗎？', jp: '英語を話せますか？', romaji: 'Eigo wo hanasemasu ka?', category: 'basic' },
  
  // 用餐
  { id: 'd1', zh: '請給我菜單', jp: 'メニューをください', romaji: 'Menyuu wo kudasai', category: 'dining' },
  { id: 'd2', zh: '這個多少錢？', jp: 'これはいくらですか？', romaji: 'Kore wa ikura desu ka?', category: 'dining' },
  { id: 'd3', zh: '結帳', jp: 'お会計をお願いします', romaji: 'Okaikei wo onegaishimasu', category: 'dining' },
  { id: 'd4', zh: '請給我水', jp: 'お水をください', romaji: 'Omizu wo kudasai', category: 'dining' },
  { id: 'd5', zh: '有推薦的嗎？', jp: 'おすすめはありますか？', romaji: 'Osusume wa arimasu ka?', category: 'dining' },
  { id: 'd6', zh: '我不吃肉', jp: '肉は食べられません', romaji: 'Niku wa taberaremasen', category: 'dining' },
  
  // 購物
  { id: 's1', zh: '我要這個', jp: 'これをください', romaji: 'Kore wo kudasai', category: 'shopping' },
  { id: 's2', zh: '可以試穿嗎？', jp: '試着できますか？', romaji: 'Shichaku dekimasu ka?', category: 'shopping' },
  { id: 's3', zh: '有免稅嗎？', jp: '免税になりますか？', romaji: 'Menzei ni narimasu ka?', category: 'shopping' },
  { id: 's4', zh: '可以用信用卡嗎？', jp: 'クレジットカードは使えますか？', romaji: 'Kurejitto kaado wa tsukaemasu ka?', category: 'shopping' },
  { id: 's5', zh: '請給我收據', jp: '領収書をください', romaji: 'Ryoushuusho wo kudasai', category: 'shopping' },
  
  // 交通
  { id: 't1', zh: '車站 在哪裡？', jp: '駅はどこですか？', romaji: 'Eki wa doko desu ka?', category: 'transport' },
  { id: 't2', zh: '這班車會到...嗎？', jp: 'この電車は..に行きますか？', romaji: 'Kono densha wa ... ni ikimasu ka?', category: 'transport' },
  { id: 't3', zh: '請給我一張到...的票', jp: '...までの切符を一枚ください', romaji: 'Yufuin made no ... ichimai kudasai', category: 'transport' },
  { id: 't4', zh: '入口在哪裡？', jp: '入り口はどこですか？', romaji: 'Iriguchi wa doko desu ka?', category: 'transport' },
  { id: 't5', zh: '出口在哪裡？', jp: '出口はどこですか？', romaji: 'Deguchi wa doko desu ka?', category: 'transport' },
  
  // 緊急
  { id: 'e1', zh: '救命！', jp: '助けてください！', romaji: 'Tasukete kudasai!', category: 'emergency' },
  { id: 'e2', zh: '我的包包不見了', jp: 'バッグをなくしました', romaji: 'Baggu wo nakushimashita', category: 'emergency' },
  { id: 'e3', zh: '我想去醫院', jp: '病院に行きたいです', romaji: 'Byouin ni ikitai desu', category: 'emergency' },
  { id: 'e4', zh: '請叫警察', jp: '警察を呼んでください', romaji: 'Keisatsu wo yonde kudasai', category: 'emergency' },
];
