
'use strict';
/* ==========================================================================
   WEALTHY — Advanced Personal Expense & Wealth Tracker
   App terpisah: index.html + styles.css + app.js. State di localStorage. Nominal disimpan sebagai
   INTEGER Rupiah (bukan float) agar perhitungan desimal selalu akurat.
   ========================================================================== */
const KEY = 'wealthy_state_v2';

const ICONS = {
  chart:'<path d="M4 20V10m6 10V4m6 16v-7m6 7H2"/>',
  wallet:'<path d="M3 7h15a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Zm0 0V5a2 2 0 0 1 2-2h11v4"/><circle cx="16" cy="13" r="1"/>',
  target:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
  spark:'<path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z"/>',
  layers:'<path d="m12 3 9 5-9 5-9-5 9-5Zm-9 9 9 5 9-5M3 16l9 5 9-5"/>',
  repeat:'<path d="M4 9V7a3 3 0 0 1 3-3h11m0 0-3-3m3 3-3 3M20 15v2a3 3 0 0 1-3 3H6m0 0 3 3m-3-3 3-3"/>',
  settings:'<circle cx="12" cy="12" r="3"/><path d="M12 2v3m0 14v3M2 12h3m14 0h3M4.9 4.9l2.1 2.1m10 10 2.1 2.1M19.1 4.9 17 7M7 17l-2.1 2.1"/>',
  plus:'<path d="M12 5v14M5 12h14"/>',
  search:'<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
  download:'<path d="M12 3v12m0 0 4-4m-4 4-4-4M4 17v3h16v-3"/>',
  upload:'<path d="M12 21V9m0 0 4 4m-4-4-4 4M4 7V4h16v3"/>',
  trash:'<path d="M4 7h16M9 7V4h6v3m-8 0 1 13h8l1-13"/>',
  edit:'<path d="m4 20 4-1 11-11-3-3L5 16l-1 4Z"/><path d="m14 6 3 3"/>',
  sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4"/>',
  moon:'<path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5Z"/>',
  x:'<path d="M6 6l12 12M18 6 6 18"/>',
  arrow:'<path d="M5 12h14m-6-6 6 6-6 6"/>',
  chevLeft:'<path d="m15 6-6 6 6 6"/>',
  chevRight:'<path d="m9 6 6 6-6 6"/>',
  check:'<path d="m5 12 4 4L19 6"/>',
  alert:'<path d="M12 3 2 20h20L12 3Zm0 6v5m0 3v.5"/>',
  clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  up:'<path d="m6 15 6-6 6 6"/>',
  down:'<path d="m6 9 6 6 6-6"/>',
  info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v5m0-8v.5"/>',
  refresh:'<path d="M20 11a8 8 0 1 0-2 6m2-6V5m0 6h-6"/>',
  food:'<path d="M4 3v7a3 3 0 0 0 6 0V3M7 3v18M17 3c-2 2-3 5-3 9h6c0-4-1-7-3-9Zm0 9v9"/>',
  car:'<path d="M5 16v3h2v-3m10 0v3h2v-3M4 16v-5l2-5h12l2 5v5H4Zm2-5h12M7 14h2m6 0h2"/>',
  bag:'<path d="M5 8h14l1 12H4L5 8Zm4 0V6a3 3 0 0 1 6 0v2"/>',
  ticket:'<rect x="3" y="5" width="18" height="14" rx="1"/><path d="m10 9 5 3-5 3V9Z"/>',
  receipt:'<path d="M6 3h12v18l-3-2-3 2-3-2-3 2V3Zm3 5h6M9 12h6"/>',
  health:'<path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6V3Z"/>',
  book:'<path d="M4 5a2 2 0 0 1 2-2h5v17H6a2 2 0 0 0-2 2V5Zm16 0a2 2 0 0 0-2-2h-5v17h5a2 2 0 0 1 2 2V5Z"/>',
  house:'<path d="m3 11 9-7 9 7v9H3v-9Zm7 9v-6h4v6"/>',
  plane:'<path d="m21 3-9 18-2-7-7-2L21 3Zm-9 11 4-4"/>',
  coins:'<rect x="3" y="6" width="18" height="13" rx="1"/><path d="M3 10h18M16 14h2"/>',
  briefcase:'<rect x="3" y="7" width="18" height="13" rx="1"/><path d="M8 7V5h8v2M3 13h18"/>',
  trend:'<path d="M3 17l6-6 4 4 8-8M15 7h6v6"/>',
  swap:'<path d="M4 8h13m0 0-3-3m3 3-3 3M20 16H7m0 0 3-3m-3 3 3 3"/>',
  dots:'<circle cx="6" cy="6" r="1"/><circle cx="12" cy="6" r="1"/><circle cx="18" cy="6" r="1"/><circle cx="6" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="18" cy="12" r="1"/><circle cx="6" cy="18" r="1"/><circle cx="12" cy="18" r="1"/><circle cx="18" cy="18" r="1"/>',
  cash:'<rect x="3" y="6" width="18" height="12" rx="1"/><circle cx="12" cy="12" r="3"/>',
  bank:'<path d="m3 10 9-6 9 6H3Zm2 0v9m5-9v9m4-9v9m5-9v9M3 21h18"/>',
  phone:'<rect x="6" y="2" width="12" height="20" rx="2"/><path d="M10 18h4"/>',
  card:'<rect x="3" y="5" width="18" height="14" rx="1"/><path d="M3 10h18M7 15h4"/>'
};
function ico(n,s=18){return '<svg width="'+s+'" height="'+s+'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">'+(ICONS[n]||ICONS.spark)+'</svg>'}
const CATS = {
  'Makan & Minum':{icon:ico('food',16),color:'--c-makan'},
  'Transport':{icon:ico('car',16),color:'--c-transport'},
  'Belanja':{icon:ico('bag',16),color:'--c-belanja'},
  'Hiburan':{icon:ico('ticket',16),color:'--c-hiburan'},
  'Tagihan':{icon:ico('receipt',16),color:'--c-tagihan'},
  'Kesehatan':{icon:ico('health',16),color:'--c-kesehatan'},
  'Pendidikan':{icon:ico('book',16),color:'--c-pendidikan'},
  'Rumah':{icon:ico('house',16),color:'--c-rumah'},
  'Liburan':{icon:ico('plane',16),color:'--c-liburan'},
  'Gaji':{icon:ico('coins',16),color:'--c-gaji'},
  'Freelance':{icon:ico('briefcase',16),color:'--c-freelance'},
  'Investasi':{icon:ico('trend',16),color:'--c-investasi'},
  'Transfer':{icon:ico('swap',16),color:'--c-transfer'},
  'Lainnya':{icon:ico('dots',16),color:'--c-lainnya'}
};
const SUBS = {
  'Makan & Minum':['Makanan','Kopi','Minuman','Snack','GoFood','GrabFood'],
  'Transport':['Grab','Gojek','Bensin','Parkir','Tol','Transportasi Umum'],
  'Belanja':['Pakaian','Elektronik','Kecantikan','Rumah Tangga','Olahraga'],
  'Hiburan':['Streaming','Bioskop','Game','Konser','Hobi'],
  'Tagihan':['Listrik','Internet','Air','BPJS','Cicilan','Asuransi'],
  'Kesehatan':['Apotek','Dokter','Vitamin','Gym'],
  'Pendidikan':['Kursus','Buku','Ujian'],
  'Rumah':['Sewa','Kebersihan','Peralatan','Perbaikan'],
  'Liburan':['Tiket','Hotel','Transportasi','Makan'],
  'Gaji':['Gaji Pokok','Bonus','THR'],
  'Freelance':['Desain','Konsultasi','Menulis','Koding'],
  'Investasi':['Dividen','Reksa Dana','Saham','Obligasi'],
  'Transfer':['Antar Dompet','Top Up','Tarik Tunai'],
  'Lainnya':['Lainnya']
};
const ACCT_TYPES = {
  cash:{icon:ico('cash',17),label:'Tunai / Kas',color:'--pos'},
  bank:{icon:ico('bank',17),label:'Rekening Bank',color:'--c-transport'},
  ewallet:{icon:ico('phone',17),label:'E-Wallet',color:'--c-belanja'},
  credit:{icon:ico('card',17),label:'Kartu Kredit',color:'--neg'}
};
const NAV = [
  {id:'dashboard',label:'Dashboard',icon:'chart',title:'Dashboard',sub:'Ringkasan keuangan Anda hari ini'},
  {id:'transactions',label:'Transaksi',icon:'wallet',title:'Transaksi',sub:'Semua pemasukan, pengeluaran & transfer'},
  {id:'budgets',label:'Anggaran',icon:'target',title:'Anggaran Bulanan',sub:'Pantau batas pengeluaran per kategori'},
  {id:'goals',label:'Target Tabungan',icon:'spark',title:'Target Tabungan',sub:'Wujudkan rencana finansial Anda'},
  {id:'accounts',label:'Dompet & Akun',icon:'layers',title:'Dompet & Akun',sub:'Kelola semua sumber dana Anda'},
  {id:'recurring',label:'Transaksi Berulang',icon:'repeat',title:'Transaksi Berulang',sub:'Otomatisasi gaji, tagihan & cicilan'},
  {id:'settings',label:'Pengaturan & Data',icon:'settings',title:'Pengaturan & Data',sub:'Backup, restore & preferensi aplikasi'}
];
function catColor(c){return cssVar((CATS[c]||CATS['Lainnya']).color)}
const CUSTOM_CAT_COLORS=['--c-custom1','--c-custom2','--c-custom3','--c-custom4','--c-custom5','--c-custom6'];
function cleanCatName(raw){return String(raw||'').trim().replace(/\s+/g,' ').slice(0,24)}
function findCatName(raw){
  const n=cleanCatName(raw);if(!n)return null;
  return Object.keys(CATS).find(c=>c.toLowerCase()===n.toLowerCase())||null;
}
function registerCustomCategory(raw){
  const found=findCatName(raw);if(found)return found;
  const n=cleanCatName(raw);if(!n)return null;
  state.customCategories.push(n);
  CATS[n]={icon:ico('dots',16),color:CUSTOM_CAT_COLORS[(state.customCategories.length-1)%CUSTOM_CAT_COLORS.length]};
  refreshCatLists();saveState();return n;
}
function syncCustomCats(){
  state.customCategories.forEach((n,i)=>{
    if(n&&!CATS[n])CATS[n]={icon:ico('dots',16),color:CUSTOM_CAT_COLORS[i%CUSTOM_CAT_COLORS.length]};
  });
  refreshCatLists();
}
function esc(v){return String(v==null?'':v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function uid(){return Date.now().toString(36)+Math.random().toString(36).slice(2,8)}
function pad(n){return String(n).padStart(2,'0')}
function isoDT(d){return d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate())+'T'+pad(d.getHours())+':'+pad(d.getMinutes())}
function isoD(d){return isoDT(d).slice(0,10)}
function todayISO(){return isoD(new Date())}
function monthKey(s){if(s instanceof Date)return s.getFullYear()+'-'+pad(s.getMonth()+1);return String(s||'').slice(0,7)}
function currentMonth(){return monthKey(new Date())}
function shiftMonth(k,n){const p=String(k).split('-');const d=new Date(Number(p[0]),Number(p[1])-1+n,1);return monthKey(d)}
function monthLabel(k){const p=String(k).split('-');return new Date(Number(p[0]),Number(p[1])-1,1).toLocaleDateString('id-ID',{month:'long',year:'numeric'})}
function shortMonthLabel(k){const p=String(k).split('-');return new Date(Number(p[0]),Number(p[1])-1,1).toLocaleDateString('id-ID',{month:'short',year:'numeric'})}
function monthEndStr(k){const p=String(k).split('-');return isoDT(new Date(Number(p[0]),Number(p[1]),0,23,59,59))}
function firstDataMonth(){
  const keys=state.transactions.map(t=>monthKey(t.date)).filter(Boolean).sort();
  return keys.length?keys[0]:currentMonth();
}
function daysAgo(n,h=10){const d=new Date();d.setDate(d.getDate()-n);d.setHours(h,0,0,0);return isoDT(d)}
function monthDay(offset,day,h=9){const d=new Date();d.setDate(1);d.setMonth(d.getMonth()+offset);d.setDate(day);d.setHours(h,0,0,0);return isoDT(d)}
function addMonths(s,n){const d=new Date(s);const day=d.getDate();d.setDate(1);d.setMonth(d.getMonth()+n);const max=new Date(d.getFullYear(),d.getMonth()+1,0).getDate();d.setDate(Math.min(day,max));return d}
function fmt(n){return 'Rp '+Math.round(Number(n)||0).toLocaleString('id-ID')}
function fmtCompact(n){const a=Math.abs(Number(n)||0);if(a>=1e9)return 'Rp '+(n/1e9).toFixed(1).replace('.',',')+' M';if(a>=1e6)return 'Rp '+(n/1e6).toFixed(1).replace('.',',')+' jt';if(a>=1e3)return 'Rp '+Math.round(n/1e3)+' rb';return fmt(n)}
function parseAmount(s){return Math.round(Number(String(s).replace(/\D/g,''))||0)}
function groupDigits(s){return String(s).replace(/\D/g,'').replace(/\B(?=(\d{3})+(?!\d))/g,'.')}
function parseTags(s){return String(s||'').split(/[,;]/).map(x=>x.trim().replace(/^#+/,'').replace(/\s+/g,'-')).filter(Boolean).slice(0,8)}
function sum(a){return a.reduce((x,y)=>x+(Number(y)||0),0)}
const byId=(arr,id)=>arr.find(x=>x.id===id);
/* ============================ STATE & SEED ============================ */
function initialTheme(){
  try{
    const raw=localStorage.getItem(KEY);
    if(raw){const p=JSON.parse(raw);const d=p&&p.data?p.data:p;return d&&d.theme==='dark'?'dark':'light'}
  }catch(e){}
  return 'light';
}
let state = loadState() || emptyState(initialTheme());
let pendingConfirm = null;
const ui = {
  view:'dashboard',
  month:currentMonth(),
  cashflowMode:'monthly',
  filters:{q:'',range:'month',from:'',to:'',type:'all',category:'all',account:'all'},
  charts:{}
};

function loadState(){
  try{
    const raw=localStorage.getItem(KEY);
    if(!raw) return null;
    const parsed=JSON.parse(raw);
    return parsed && parsed.data ? normalize(parsed.data) : normalize(parsed);
  }catch(e){ console.warn('Gagal memuat state:',e); return null; }
}
function normalize(s){
  s.accounts=Array.isArray(s.accounts)?s.accounts:[];
  s.transactions=Array.isArray(s.transactions)?s.transactions:[];
  s.recurring=Array.isArray(s.recurring)?s.recurring:[];
  s.goals=Array.isArray(s.goals)?s.goals:[];
  s.customCategories=Array.isArray(s.customCategories)?s.customCategories.map(cleanCatName).filter(Boolean).filter((v,i,a)=>a.findIndex(x=>x.toLowerCase()===v.toLowerCase())===i):[];
  s.budgets=s.budgets&&typeof s.budgets==='object'?s.budgets:{};
  s.theme=s.theme==='light'?'light':'dark';
  s.transactions.forEach(t=>{t.amount=parseAmount(t.amount);t.tags=Array.isArray(t.tags)?t.tags:[];t.type=t.type||'expense';});
  s.recurring.forEach(r=>{r.amount=parseAmount(r.amount);});
  s.goals.forEach(g=>{g.target=parseAmount(g.target);g.saved=parseAmount(g.saved);});
  Object.keys(s.budgets).forEach(k=>{s.budgets[k]=parseAmount(s.budgets[k]);});
  return s;
}
function saveState(){
  try{ localStorage.setItem(KEY,JSON.stringify({app:'Wealthy',version:1,data:state})); }
  catch(e){ toast('Gagal menyimpan: penyimpanan penuh','err'); }
}
function emptyState(theme){
  return {version:1,theme:theme||'light',
    accounts:[{id:'def',name:'Dompet Utama',type:'cash',initialBalance:0,createdAt:new Date().toISOString()}],
    transactions:[],recurring:[],budgets:{},goals:[],customCategories:[]};
}
function seedData(theme){
  theme = theme==='dark'?'dark':'light';
  const A={cash:'a_cash',bank:'a_bank',ew:'a_ew',cc:'a_cc'};
  const accounts=[
    {id:A.cash,name:'Tunai / Kas',type:'cash',initialBalance:750000,createdAt:new Date().toISOString()},
    {id:A.bank,name:'BCA Utama',type:'bank',initialBalance:18500000,createdAt:new Date().toISOString()},
    {id:A.ew,name:'GoPay',type:'ewallet',initialBalance:1250000,createdAt:new Date().toISOString()},
    {id:A.cc,name:'Kartu Kredit',type:'credit',initialBalance:0,createdAt:new Date().toISOString()}
  ];
  let n=0;
  const T=(o)=>({id:'seed_t'+(++n),date:o.date,type:o.type,amount:o.amount,category:o.category,
    subcategory:o.sub||'',accountId:o.acc,toAccountId:o.to||null,note:o.note||'',tags:o.tags||[],
    recurringId:o.rid||null,auto:false,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()});
  const transactions=[
    T({date:daysAgo(0,12),type:'expense',amount:68000,category:'Makan & Minum',sub:'GoFood',acc:A.bank,note:'Nasi padang + es teh',tags:['makan','kerja']}),
    T({date:daysAgo(0,8),type:'expense',amount:25000,category:'Makan & Minum',sub:'Kopi',acc:A.ew,note:'Kopi Kenangan',tags:['ngopi']}),
    T({date:daysAgo(1,8),type:'expense',amount:152000,category:'Transport',sub:'Grab',acc:A.ew,note:'Grab ke kantor',tags:['kerja']}),
    T({date:daysAgo(1,12),type:'expense',amount:47500,category:'Makan & Minum',sub:'Makanan',acc:A.cash,note:'Warung Bu Sari'}),
    T({date:daysAgo(2,16),type:'expense',amount:289000,category:'Belanja',sub:'Pakaian',acc:A.bank,note:'Uniqlo — kemeja',tags:['belanja']}),
    T({date:daysAgo(3,10),type:'transfer',amount:1000000,category:'Transfer',sub:'Top Up',acc:A.bank,to:A.ew,note:'Top up GoPay'}),
    T({date:daysAgo(4,15),type:'income',amount:2300000,category:'Freelance',sub:'Desain',acc:A.bank,note:'Desain landing page klien',tags:['kerja','freelance']}),
    T({date:daysAgo(5,20),type:'expense',amount:186000,category:'Hiburan',sub:'Streaming',acc:A.bank,note:'Netflix premium'}),
    T({date:daysAgo(6,17),type:'expense',amount:92000,category:'Transport',sub:'Bensin',acc:A.cash,note:'Pertamax'}),
    T({date:daysAgo(7,19),type:'expense',amount:350000,category:'Kesehatan',sub:'Apotek',acc:A.bank,note:'Vitamin + obat'}),
    T({date:daysAgo(8,19),type:'expense',amount:125000,category:'Makan & Minum',sub:'GrabFood',acc:A.ew,note:'Ayam geprek + es teh'}),
    T({date:daysAgo(9,20),type:'expense',amount:78000,category:'Hiburan',sub:'Bioskop',acc:A.bank,note:'Tiket CGV',tags:['liburan']}),
    T({date:daysAgo(11,14),type:'expense',amount:240000,category:'Belanja',sub:'Elektronik',acc:A.bank,note:'Kabel HDMI & mouse'}),
    T({date:daysAgo(12,9),type:'expense',amount:65000,category:'Makan & Minum',sub:'Kopi',acc:A.cash,note:'Kopi tuku'}),
    T({date:daysAgo(13,11),type:'expense',amount:410000,category:'Tagihan',sub:'Listrik',acc:A.bank,note:'PLN prabayar',tags:['rumah']}),
    T({date:daysAgo(14,22),type:'expense',amount:155000,category:'Transport',sub:'Grab',acc:A.ew,note:'Grab pulang malam'}),
    T({date:daysAgo(15,10),type:'expense',amount:320000,category:'Rumah',sub:'Kebersihan',acc:A.cash,note:'Ibu kos + bersih-bersih',tags:['rumah']}),
    T({date:daysAgo(16,9),type:'income',amount:500000,category:'Investasi',sub:'Dividen',acc:A.bank,note:'Dividen reksa dana',tags:['investasi']}),
    T({date:daysAgo(17,20),type:'expense',amount:198000,category:'Makan & Minum',sub:'Makanan',acc:A.bank,note:'Dinner ulang tahun teman',tags:['sosial']}),
    T({date:monthDay(-1,3,12),type:'expense',amount:82000,category:'Makan & Minum',sub:'Makanan',acc:A.ew,note:'Makan siang kantor'}),
    T({date:monthDay(-1,6,19),type:'expense',amount:142000,category:'Makan & Minum',sub:'GoFood',acc:A.bank,note:'GoFood malam'}),
    T({date:monthDay(-1,8,10),type:'expense',amount:118000,category:'Transport',sub:'Grab',acc:A.ew,note:'Grab ke kantor'}),
    T({date:monthDay(-1,11,16),type:'expense',amount:215000,category:'Belanja',sub:'Rumah Tangga',acc:A.bank,note:'Belanja bulanan'}),
    T({date:monthDay(-1,14,20),type:'expense',amount:95000,category:'Hiburan',sub:'Game',acc:A.ew,note:'Steam sale'}),
    T({date:monthDay(-1,17,13),type:'expense',amount:165000,category:'Makan & Minum',sub:'Makanan',acc:A.cash,note:'Makan di warung'}),
    T({date:monthDay(-1,20,11),type:'expense',amount:310000,category:'Kesehatan',sub:'Dokter',acc:A.bank,note:'Konsultasi dokter'}),
    T({date:monthDay(-1,22,15),type:'expense',amount:88000,category:'Transport',sub:'Bensin',acc:A.cash,note:'Isi bensin'}),
    T({date:monthDay(-1,24,10),type:'income',amount:1800000,category:'Freelance',sub:'Konsultasi',acc:A.bank,note:'Konsultasi UI klien',tags:['kerja']}),
    T({date:monthDay(-1,26,18),type:'expense',amount:275000,category:'Rumah',sub:'Peralatan',acc:A.bank,note:'Peralatan dapur'}),
    T({date:monthDay(-1,28,9),type:'transfer',amount:500000,category:'Transfer',sub:'Antar Dompet',acc:A.bank,to:A.cash,note:'Tarik tunai'}),
    T({date:monthDay(-1,29,14),type:'expense',amount:119000,category:'Makan & Minum',sub:'Minuman',acc:A.ew,note:'Ngopi bareng teman'})
  ];
  const recurring=[
    {id:'r_salary',type:'income',amount:12500000,category:'Gaji',subcategory:'Gaji pokok',accountId:A.bank,toAccountId:null,note:'Gaji bulanan',tags:['gaji'],frequency:'monthly',startDate:monthDay(-1,1,8),nextDate:monthDay(-1,1,8),endDate:null,active:true},
    {id:'r_inet',type:'expense',amount:385000,category:'Tagihan',subcategory:'Internet',accountId:A.bank,toAccountId:null,note:'Internet rumah',tags:['rumah'],frequency:'monthly',startDate:monthDay(-1,5,9),nextDate:monthDay(-1,5,9),endDate:null,active:true},
    {id:'r_laptop',type:'expense',amount:850000,category:'Tagihan',subcategory:'Cicilan',accountId:A.cc,toAccountId:null,note:'Cicilan laptop',tags:['cicilan'],frequency:'monthly',startDate:monthDay(-1,10,9),nextDate:monthDay(-1,10,9),endDate:null,active:true},
    {id:'r_spotify',type:'expense',amount:54900,category:'Hiburan',subcategory:'Streaming',accountId:A.ew,toAccountId:null,note:'Spotify Premium',tags:['langganan'],frequency:'monthly',startDate:monthDay(-1,12,9),nextDate:monthDay(-1,12,9),endDate:null,active:true}
  ];
  const goals=[
    {id:'g1',name:'Dana Darurat',emoji:'D',target:30000000,saved:18500000,deadline:monthDay(13,1,9).slice(0,10),createdAt:new Date().toISOString()},
    {id:'g2',name:'Laptop Baru',emoji:'L',target:12000000,saved:4250000,deadline:monthDay(6,1,9).slice(0,10),createdAt:new Date().toISOString()},
    {id:'g3',name:'Liburan Bali',emoji:'B',target:8000000,saved:2100000,deadline:monthDay(4,1,9).slice(0,10),createdAt:new Date().toISOString()}
  ];
  const s={version:1,theme:theme,accounts:accounts,transactions:transactions,recurring:recurring,goals:goals,customCategories:[],
    budgets:{'Makan & Minum':2000000,'Transport':800000,'Belanja':1500000,'Hiburan':500000,'Tagihan':1500000,'Kesehatan':400000}};
  return s;
}

/* ============================ RECURRING ENGINE ============================ */
function processRecurring(){
  const today=new Date(); today.setHours(23,59,59,999);
  let changed=false;
  state.recurring.forEach(r=>{
    if(!r.active) return;
    let guard=0;
    let cursor=new Date(r.nextDate||r.startDate);
    if(isNaN(cursor)) return;
    while(cursor<=today && guard++<240){
      const dateStr=isoDT(cursor);
      const exists=state.transactions.some(t=>t.recurringId===r.id && t.date.slice(0,10)===dateStr.slice(0,10));
      if(!exists){
        state.transactions.push({id:uid(),date:dateStr,type:r.type,amount:r.amount,category:r.category,
          subcategory:r.subcategory||'',accountId:r.accountId,toAccountId:r.toAccountId||null,
          note:(r.note||'Transaksi otomatis')+' (otomatis)',tags:r.tags||[],recurringId:r.id,auto:true,
          createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()});
        changed=true;
      }
      if(r.frequency==='weekly') cursor.setDate(cursor.getDate()+7);
      else if(r.frequency==='daily') cursor.setDate(cursor.getDate()+1);
      else if(r.frequency==='yearly') cursor.setFullYear(cursor.getFullYear()+1);
      else cursor=addMonths(dateStr,1);
      if(r.endDate && isoD(cursor)>r.endDate) break;
    }
    r.nextDate=isoDT(cursor);
  });
  if(changed) saveState();
}

/* ============================ COMPUTATIONS ============================ */
function balances(){
  const map={};
  state.accounts.forEach(a=>map[a.id]=Number(a.initialBalance)||0);
  state.transactions.forEach(t=>{
    const amt=Number(t.amount)||0;
    if(t.type==='income' && map[t.accountId]!==undefined) map[t.accountId]+=amt;
    else if(t.type==='expense' && map[t.accountId]!==undefined) map[t.accountId]-=amt;
    else if(t.type==='transfer'){
      if(map[t.accountId]!==undefined) map[t.accountId]-=amt;
      if(map[t.toAccountId]!==undefined) map[t.toAccountId]+=amt;
    }
  });
  return map;
}
function netWorthAt(until){
  const map={};
  state.accounts.forEach(a=>map[a.id]=Number(a.initialBalance)||0);
  state.transactions.filter(t=>!until||t.date<=until).forEach(t=>{
    const amt=Number(t.amount)||0;
    if(t.type==='income'&&map[t.accountId]!==undefined)map[t.accountId]+=amt;
    else if(t.type==='expense'&&map[t.accountId]!==undefined)map[t.accountId]-=amt;
    else if(t.type==='transfer'){
      if(map[t.accountId]!==undefined)map[t.accountId]-=amt;
      if(map[t.toAccountId]!==undefined)map[t.toAccountId]+=amt;
    }
  });
  return sum(Object.values(map));
}
function netWorth(){return netWorthAt(null)}
function monthStats(m){
  const list=state.transactions.filter(t=>monthKey(t.date)===m && t.type!=='transfer');
  const income=sum(list.filter(t=>t.type==='income').map(t=>t.amount));
  const expense=sum(list.filter(t=>t.type==='expense').map(t=>t.amount));
  return {income,expense,net:income-expense,list};
}
function expenseByCategory(m){
  const out={};
  state.transactions.filter(t=>monthKey(t.date)===m&&t.type==='expense')
    .forEach(t=>{out[t.category]=(out[t.category]||0)+t.amount});
  return out;
}
function daysLeftInMonth(){const d=new Date();return Math.max(1,new Date(d.getFullYear(),d.getMonth()+1,0).getDate()-d.getDate()+1)}
function avgMonthlySavings(){
  const vals=[];
  for(let i=0;i<3;i++){
    const d=new Date(); d.setDate(1); d.setMonth(d.getMonth()-i);
    const st=monthStats(d.getFullYear()+'-'+pad(d.getMonth()+1));
    if(st.income>0||st.expense>0) vals.push(st.net);
  }
  return vals.length?Math.max(0,sum(vals)/vals.length):0;
}
function budgetStatus(cat,m){
  const limit=Number(state.budgets[cat])||0;
  const key=m||currentMonth();
  const isCurrent=key===currentMonth();
  const spent=sum(state.transactions.filter(t=>monthKey(t.date)===key&&t.type==='expense'&&t.category===cat).map(t=>t.amount));
  const pct=limit>0?(spent/limit)*100:0;
  const color=pct>90?'bad':pct>=70?'warn':'good';
  const remaining=limit-spent;
  const safe=limit>0?(isCurrent?Math.max(0,Math.floor(remaining/daysLeftInMonth())):Math.max(0,remaining)):0;
  return {limit,spent,pct,color,safe,remaining,isCurrent};
}
/* ============================ RENDER: SHELL ============================ */
const content=document.getElementById('content');
function renderNav(){
  document.getElementById('nav').innerHTML=NAV.map(n=>
    '<button class="nav-item'+(ui.view===n.id?' active':'')+'" data-action="nav" data-view="'+n.id+'">'+ico(n.icon,17)+'<span>'+n.label+'</span></button>'
  ).join('');
  const cur=NAV.find(n=>n.id===ui.view)||NAV[0];
  document.getElementById('page-title').textContent=cur.title;
  document.getElementById('page-subtitle').textContent=cur.sub+(ui.view==='dashboard'?' · '+monthLabel(ui.month):'');
  const dl=document.getElementById('today-line');
  if(dl)dl.textContent=new Date().toLocaleDateString('id-ID',{weekday:'long',day:'numeric',month:'long',year:'numeric'});
  const fs=document.getElementById('foot-stamp');
  if(fs)fs.textContent='Diperbarui '+new Date().toLocaleTimeString('id-ID',{hour:'2-digit',minute:'2-digit'});
  document.getElementById('theme-btn').innerHTML=ico(state.theme==='dark'?'sun':'moon',18);
  document.documentElement.dataset.theme=state.theme;
}
function renderView(){
  renderNav();
  const views={dashboard:viewDashboard,transactions:viewTransactions,budgets:viewBudgets,
    goals:viewGoals,accounts:viewAccounts,recurring:viewRecurring,settings:viewSettings};
  content.innerHTML=(views[ui.view]||views.dashboard)();
  window.scrollTo({top:0,behavior:'instant'});
  if(ui.view==='dashboard') renderCharts();
  if(ui.view==='transactions') renderTxList();
}

/* ============================ SHARED ROW ============================ */
function txRow(t,compact){
  const acc=byId(state.accounts,t.accountId);
  const to=byId(state.accounts,t.toAccountId);
  const cat=CATS[t.category]||CATS['Lainnya'];
  let icon=cat.icon,title=esc(t.category),sub=esc(t.subcategory||t.note||'—'),cls='',amt='';
  if(t.type==='income'){cls='pos';amt='+'+fmt(t.amount)}
  else if(t.type==='expense'){cls='neg';amt='−'+fmt(t.amount)}
  else{
    icon=ico('swap',16);title='Transfer antar dompet';
    sub=esc((acc?acc.name:'?')+' → '+(to?to.name:'?'));cls='tr';amt=fmt(t.amount);
  }
  const d=new Date(t.date);
  const dateLabel=d.toLocaleDateString('id-ID',{day:'2-digit',month:'short'});
  const timeLabel=pad(d.getHours())+':'+pad(d.getMinutes());
  const tags=(t.tags||[]).slice(0,3).map(x=>'<span class="tag">#'+esc(x)+'</span>').join('');
  const note=t.note&&t.subcategory?esc(t.note):'';
  return '<div class="tx-row'+(compact?' tx-compact':'')+'">'+
    '<div class="c-date tx-date"><b>'+dateLabel+'</b>'+timeLabel+'</div>'+
    '<div class="c-ico"><div class="tx-ico">'+icon+'</div></div>'+
    '<div class="c-main"><div class="tx-main">'+title+(t.auto?' <span class="pill transfer" style="font-size:9px">auto</span>':'')+'</div>'+
      '<div class="tx-sub">'+sub+'</div>'+(tags?'<div class="tags">'+tags+'</div>':(note?'<div class="tx-sub">'+note+'</div>':''))+'</div>'+
    '<div class="c-acc tx-sub" style="font-size:11.5px">'+esc(acc?acc.name:'—')+'</div>'+
    (compact?'':'<div class="c-note tx-sub">'+(note||'—')+'</div>')+
    '<div class="c-amt tx-amt '+cls+'">'+amt+'</div>'+
    '<div class="c-actions tx-actions"><button class="mini-btn" data-action="edit-tx" data-id="'+t.id+'" title="Edit">'+ico('edit',15)+'</button>'+
      '<button class="mini-btn del" data-action="delete-tx" data-id="'+t.id+'" title="Hapus">'+ico('trash',15)+'</button></div>'+
  '</div>';
}
function txHeader(compact){
  return '<div class="tx-head'+(compact?' tx-compact':'')+'"><div>Tanggal</div><div></div><div>Kategori / Catatan</div><div>Dompet</div>'+
    (compact?'':'<div>Catatan</div>')+'<div style="text-align:right">Nominal</div><div></div></div>';
}
function kpiCard(label,value,color,iconName,delta,deltaGood){
  let d='<span class="delta flat">—</span>';
  if(delta!==null&&delta!==undefined){
    const up=delta>=0;
    d='<span class="delta '+(up===deltaGood?'up':'down')+'">'+(up?ico('up',12):ico('down',12))+Math.abs(delta).toFixed(1)+'%</span>';
  }
  return '<div class="card kpi" style="--kpi-color:'+color+'"><div class="kpi-top"><div class="kpi-ico">'+ico(iconName,18)+'</div>'+d+'</div>'+
    '<div class="kpi-label">'+label+'</div><div class="kpi-value">'+value+'</div></div>';
}

/* ============================ VIEW: DASHBOARD ============================ */
function viewDashboard(){
  const m=ui.month, pm=shiftMonth(m,-1);
  const isCurrent=m===currentMonth();
  const st=monthStats(m), prev=monthStats(pm);
  const nw=netWorthAt(monthEndStr(m));
  const rate=st.income>0?((st.income-st.expense)/st.income)*100:0;
  const ratePrev=prev.income>0?((prev.income-prev.expense)/prev.income)*100:0;
  const pct=(a,b)=>b>0?((a-b)/b)*100:null;
  const label=shortMonthLabel(m);
  const recent=state.transactions.filter(t=>monthKey(t.date)===m).sort((a,b)=>b.date.localeCompare(a.date)).slice(0,5);
  const budgets=Object.keys(state.budgets).sort((a,b)=>budgetStatus(b,m).pct-budgetStatus(a,m).pct).slice(0,4);
  const goals=state.goals.slice().sort((a,b)=>(b.saved/b.target)-(a.saved/a.target)).slice(0,3);
  const monthBar='<div class="month-nav">'+
    '<button class="icon-btn" data-action="month-prev" title="Bulan sebelumnya" '+(m<=firstDataMonth()?'disabled':'')+'>'+ico('chevLeft',16)+'</button>'+
    '<div class="month-nav-main"><span class="month-nav-label">'+monthLabel(m)+'</span>'+
      '<span class="month-nav-meta">'+(isCurrent?'Sedang berjalan':'Arsip')+'</span></div>'+
    '<button class="icon-btn" data-action="month-next" title="Bulan berikutnya" '+(isCurrent?'disabled':'')+'>'+ico('chevRight',16)+'</button>'+
    (isCurrent?'':'<button class="btn-ghost btn-sm" data-action="month-now">Bulan ini</button>')+
  '</div>';
  const quickBar='<form class="quick-add" data-form="quick">'+
    '<div class="field"><label class="lbl">Nominal</label><input type="text" name="amount" class="amt-format" inputmode="numeric" placeholder="Rp 0" required></div>'+
    '<div class="field"><label class="lbl">Kategori</label><select name="category" id="qa-category">'+catOptions('expense','Makan & Minum',true)+'</select></div>'+
    '<div class="field" id="qa-custom-wrap" style="display:none"><label class="lbl">Nama Kategori</label><input type="text" name="customCategory" id="qa-custom" placeholder="Nama kategori" maxlength="24"></div>'+
    '<div class="field"><label class="lbl">Catatan</label><input type="text" name="note" placeholder="Opsional"></div>'+
    '<button type="submit" class="btn-primary">'+ico('plus',15)+' Catat</button>'+
    '<div class="qa-hint">Tekan <b>N</b> untuk form lengkap · <b>/</b> untuk kolom nominal</div>'+
  '</form>';
  return monthBar+quickBar+'<div class="grid kpi-grid" style="margin-bottom:16px">'+
    kpiCard('Kekayaan · '+label,fmt(nw),'var(--accent)','layers',null,null)+
    kpiCard('Pemasukan · '+label,fmt(st.income),'var(--pos)','down',pct(st.income,prev.income),true)+
    kpiCard('Pengeluaran · '+label,fmt(st.expense),'var(--neg)','up',pct(st.expense,prev.expense),false)+
    kpiCard('Savings Rate · '+label,rate.toFixed(1)+'%','var(--warn)','target',rate-ratePrev,true)+
  '</div>'+
  '<div class="card" style="margin-bottom:16px"><div class="card-head"><div><div class="card-title">Tren Kekayaan</div>'+
    '<div class="card-sub">Kekayaan bersih 12 bulan terakhir</div></div>'+ico('trend',17)+'</div>'+
    '<div class="chart-box networth-box" id="networth-box"></div></div>'+
  '<div class="grid chart-grid" style="margin-bottom:16px">'+
    '<div class="card"><div class="card-head"><div><div class="card-title">Arus Kas</div><div class="card-sub">Pemasukan vs pengeluaran</div></div>'+
      '<div class="seg" id="cashflow-seg"><button data-action="cf-mode" data-mode="monthly" class="'+(ui.cashflowMode==='monthly'?'active':'')+'">Bulanan</button>'+
      '<button data-action="cf-mode" data-mode="daily" class="'+(ui.cashflowMode==='daily'?'active':'')+'">Harian</button></div></div>'+
      '<div class="chart-box" id="cashflow-box"></div></div>'+
    '<div class="card"><div class="card-head"><div><div class="card-title">Komposisi Pengeluaran</div><div class="card-sub">'+monthLabel(m)+' per kategori</div></div></div>'+
      '<div class="chart-box" id="donut-box"></div></div>'+
  '</div>'+
  '<div class="grid chart-grid" style="margin-bottom:16px">'+
    '<div class="card"><div class="card-head"><div><div class="card-title">Catatan</div><div class="card-sub">Observasi dari data Anda</div></div>'+ico('spark',17)+'</div>'+
      '<div class="insight-list">'+renderInsights()+'</div></div>'+
    '<div class="card"><div class="card-head"><div><div class="card-title">Anggaran</div><div class="card-sub">Yang perlu diperhatikan</div></div>'+
      '<button class="mini-btn" data-action="nav" data-view="budgets" title="Lihat semua">'+ico('arrow',16)+'</button></div>'+
      (budgets.length?budgets.map(cat=>{
        const b=budgetStatus(cat,m),meta=CATS[cat]||CATS['Lainnya'];
        return '<div class="budget-row"><div class="budget-top"><b>'+meta.icon+' '+esc(cat)+'</b><span style="color:var(--'+b.color+');font-weight:750">'+fmt(b.spent)+' / '+fmt(b.limit)+'</span></div>'+
          '<div class="prog '+b.color+'"><span style="width:'+Math.min(100,b.pct)+'%"></span></div>'+
          '<div class="budget-meta"><span>'+b.pct.toFixed(0)+'% terpakai</span><span>'+(b.isCurrent?'Aman: '+fmt(b.safe)+'/hari':'Sisa: '+fmt(b.remaining))+'</span></div></div>';
      }).join(''):'<div class="empty"><p>Belum ada anggaran. Tambahkan di menu Anggaran.</p></div>')+
    '</div>'+
  '</div>'+
  '<div class="grid two-col">'+
    '<div class="card"><div class="card-head"><div><div class="card-title">Transaksi Terbaru</div><div class="card-sub">Lima catatan di '+monthLabel(m)+'</div></div>'+
      '<button class="mini-btn" data-action="nav" data-view="transactions">'+ico('arrow',16)+'</button></div>'+
      '<div class="tx-list">'+txHeader(true)+(recent.length?recent.map(t=>txRow(t,true)).join(''):'<div class="empty"><p>Belum ada transaksi.</p></div>')+'</div></div>'+
    '<div class="card"><div class="card-head"><div><div class="card-title">Target Tabungan</div><div class="card-sub">Progres terkini</div></div>'+
      '<button class="mini-btn" data-action="nav" data-view="goals">'+ico('arrow',16)+'</button></div>'+
      (goals.length?goals.map(g=>{
        const p=Math.min(100,(g.saved/g.target)*100);
        return '<div class="budget-row"><div class="budget-top"><b>'+esc(g.emoji||'T')+' '+esc(g.name)+'</b><span>'+p.toFixed(0)+'%</span></div>'+
          '<div class="prog accent"><span style="width:'+p+'%"></span></div>'+
          '<div class="budget-meta"><span>'+fmt(g.saved)+'</span><span>dari '+fmt(g.target)+'</span></div></div>';
      }).join(''):'<div class="empty"><p>Belum ada target tabungan.</p></div>')+
    '</div>'+
  '</div>';
}
function renderInsights(){
  const m=ui.month, pm=shiftMonth(m,-1);
  const cur=expenseByCategory(m), prev=expenseByCategory(pm);
  const out=[];
  const changes=Object.keys(cur).map(c=>({c,now:cur[c],before:prev[c]||0,delta:prev[c]>0?((cur[c]-prev[c])/prev[c])*100:null}))
    .filter(x=>x.delta!==null&&x.delta>5).sort((a,b)=>b.delta-a.delta);
  if(changes.length){
    const x=changes[0];
    out.push({c:'var(--neg)',i:'up',t:'<strong>'+esc(x.c)+' naik '+x.delta.toFixed(0)+'%</strong> dibanding bulan lalu ('+fmtCompact(x.now)+' vs '+fmtCompact(x.before)+').',s:'Tren pengeluaran'});
  }
  const weekday=['Minggu','Senin','Selasa','Rabu','Kamis','Jumat','Sabtu'];
  const wd={};
  state.transactions.filter(t=>t.type==='expense'&&(new Date()-new Date(t.date))<=30*864e5)
    .forEach(t=>{const k=new Date(t.date).getDay();wd[k]=(wd[k]||0)+t.amount});
  const topWd=Object.keys(wd).sort((a,b)=>wd[b]-wd[a])[0];
  if(topWd!==undefined) out.push({c:'var(--warn)',i:'clock',t:'Pengeluaran terbesar dalam 30 hari terjadi pada <strong>'+weekday[topWd]+'</strong> ('+fmtCompact(wd[topWd])+').',s:'Pola mingguan'});
  const st=monthStats(m);
  if(st.income>0){
    const rate=((st.income-st.expense)/st.income)*100;
    out.push({c:rate>=20?'var(--pos)':'var(--warn)',i:'target',t:rate>=20
      ?'Savings rate Anda <strong>'+rate.toFixed(1)+'%</strong> — sangat sehat! Pertahankan konsistensi ini.'
      :'Savings rate Anda <strong>'+rate.toFixed(1)+'%</strong>. Citi target 20% dengan menunda satu pengeluaran non-esensial.',s:'Kesehatan arus kas'});
  }
  const over=Object.keys(state.budgets).map(c=>({c,b:budgetStatus(c)})).filter(x=>x.b.limit>0&&x.b.pct>90);
  if(over.length) out.push({c:'var(--neg)',i:'alert',t:'Anggaran <strong>'+esc(over[0].c)+'</strong> sudah terpakai '+over[0].b.pct.toFixed(0)+'%. Sisa aman '+fmt(over[0].b.safe)+' per hari.',s:'Peringatan anggaran'});
  const biggest=state.transactions.filter(t=>t.type==='expense'&&monthKey(t.date)===m).sort((a,b)=>b.amount-a.amount)[0];
  if(biggest) out.push({c:'var(--accent)',i:'info',t:'Pengeluaran tunggal terbesar bulan ini: <strong>'+esc(biggest.note||biggest.category)+'</strong> sebesar '+fmt(biggest.amount)+'.',s:'Transaksi terbesar'});
  if(!out.length) out.push({c:'var(--accent)',i:'spark',t:'Belum ada catatan. Mulai dengan mencatat transaksi pertama Anda — insight akan muncul sendiri.',s:'Mulai dari sini'});
  return out.slice(0,5).map(x=>'<div class="insight" style="--i-color:'+x.c+'"><div class="insight-ico">'+ico(x.i,15)+'</div><div><p>'+x.t+'</p><small>'+x.s+'</small></div></div>').join('');
}

/* ============================ VIEW: TRANSAKSI ============================ */
function filteredTransactions(){
  const f=ui.filters,q=f.q.trim().toLowerCase();
  const now=new Date();
  const wk=new Date(); wk.setDate(wk.getDate()-6);
  return state.transactions.filter(t=>{
    if(q){
      const hay=[t.note,t.category,t.subcategory,t.type,...(t.tags||[]),(byId(state.accounts,t.accountId)||{}).name].join(' ').toLowerCase();
      if(!hay.includes(q)) return false;
    }
    const d=t.date.slice(0,10);
    if(f.range==='today'&&d!==todayISO()) return false;
    if(f.range==='week'&&(d<isoD(wk)||d>todayISO())) return false;
    if(f.range==='month'&&monthKey(t.date)!==monthKey(now)) return false;
    if(f.range==='custom'&&((f.from&&d<f.from)||(f.to&&d>f.to))) return false;
    if(f.type!=='all'&&t.type!==f.type) return false;
    if(f.category!=='all'&&t.category!==f.category) return false;
    if(f.account!=='all'&&t.accountId!==f.account&&t.toAccountId!==f.account) return false;
    return true;
  }).sort((a,b)=>b.date.localeCompare(a.date));
}
function viewTransactions(){
  const cats=Object.keys(CATS).sort();
  const opts=(arr,sel)=>arr.map(x=>'<option value="'+esc(x.v)+'"'+(x.v===sel?' selected':'')+'>'+esc(x.l)+'</option>').join('');
  return '<div class="page-head"><div><h2>Semua Transaksi</h2><p>Cari, filter, edit, dan kelola seluruh aktivitas keuangan.</p></div>'+
    '<button class="btn-primary" data-action="add-tx">'+ico('plus',16)+' Tambah Transaksi</button></div>'+
  '<div class="card" style="margin-bottom:16px"><div class="filters">'+
    '<div class="field search-wrap"><label>Cari</label><div style="position:relative"><span style="position:absolute;left:11px;top:50%;transform:translateY(-50%);color:var(--faint)">'+ico('search',15)+'</span>'+
      '<input type="text" id="tx-search" placeholder="Catatan, tag, kategori..." value="'+esc(ui.filters.q)+'" style="padding-left:34px"></div></div>'+
    '<div class="field"><label>Rentang Waktu</label><select id="f-range">'+opts([
      {v:'all',l:'Semua waktu'},{v:'today',l:'Hari ini'},{v:'week',l:'Minggu ini'},{v:'month',l:'Bulan ini'},{v:'custom',l:'Custom'}],ui.filters.range)+'</select></div>'+
    '<div class="field"><label>Tipe</label><select id="f-type">'+opts([{v:'all',l:'Semua tipe'},{v:'income',l:'Pemasukan'},{v:'expense',l:'Pengeluaran'},{v:'transfer',l:'Transfer'}],ui.filters.type)+'</select></div>'+
    '<div class="field"><label>Kategori</label><select id="f-category">'+opts([{v:'all',l:'Semua kategori'}].concat(cats.map(c=>({v:c,l:c}))),ui.filters.category)+'</select></div>'+
    '<div class="field"><label>Dompet</label><select id="f-account">'+opts([{v:'all',l:'Semua dompet'}].concat(state.accounts.map(a=>({v:a.id,l:a.name}))),ui.filters.account)+'</select></div>'+
    '<button class="btn-ghost" data-action="clear-filters" style="height:38px">Reset</button>'+
  '</div>'+
  '<div id="custom-range" style="display:'+(ui.filters.range==='custom'?'flex':'none')+';gap:10px;margin-bottom:12px;max-width:420px">'+
    '<div class="field" style="flex:1"><label>Dari</label><input type="date" id="f-from" value="'+esc(ui.filters.from)+'"></div>'+
    '<div class="field" style="flex:1"><label>Sampai</label><input type="date" id="f-to" value="'+esc(ui.filters.to)+'"></div></div>'+
  '<div id="tx-summary"></div><div class="tx-list" id="tx-list"></div></div>';
}
function renderTxList(){
  const list=filteredTransactions();
  const inc=sum(list.filter(t=>t.type==='income').map(t=>t.amount));
  const exp=sum(list.filter(t=>t.type==='expense').map(t=>t.amount));
  const tr=list.filter(t=>t.type==='transfer').length;
  const s=document.getElementById('tx-summary');
  if(s) s.innerHTML='<div class="tx-summary"><span>Menampilkan <b>'+list.length+'</b> transaksi</span>'+
    '<span>Masuk: <b style="color:var(--good)">'+fmt(inc)+'</b></span>'+
    '<span>Keluar: <b style="color:var(--bad)">'+fmt(exp)+'</b></span>'+
    '<span>Transfer: <b>'+tr+'</b></span></div>';
  const el=document.getElementById('tx-list');
  if(!el) return;
  el.innerHTML=list.length?(txHeader(false)+list.map(t=>txRow(t,false)).join('')):
    '<div class="empty"><div class="big">'+ico('search',26)+'</div><p>Tidak ada transaksi yang cocok dengan filter ini.<br>Coba ubah kata kunci atau rentang waktu.</p></div>';
}

/* ============================ VIEW: ANGGARAN ============================ */
function viewBudgets(){
  const cats=Object.keys(CATS).filter(c=>CATS[c].color&&c!=='Transfer').sort();
  const rows=Object.keys(state.budgets).sort((a,b)=>budgetStatus(b).pct-budgetStatus(a).pct);
  const totalLimit=sum(Object.values(state.budgets));
  const totalSpent=sum(rows.map(c=>budgetStatus(c).spent));
  return '<div class="page-head"><div><h2>Anggaran Bulanan</h2><p>Tetapkan batas, pantau sisa, dan ketahui jumlah aman yang bisa dibelanjakan hari ini.</p></div>'+
    '<button class="btn-primary" data-action="add-budget">'+ico('plus',16)+' Atur Anggaran</button></div>'+
  '<div class="grid three-col" style="margin-bottom:16px">'+
    kpiCard('Total Anggaran',fmt(totalLimit),'var(--accent)','target',null,null)+
    kpiCard('Sudah Terpakai',fmt(totalSpent),'var(--neg)','up',null,null)+
    kpiCard('Sisa Bulan Ini',fmt(totalLimit-totalSpent),(totalLimit-totalSpent)>=0?'var(--pos)':'var(--neg)','wallet',null,null)+
  '</div>'+
  '<div class="card">'+(rows.length?rows.map(cat=>{
    const b=budgetStatus(cat),meta=CATS[cat]||CATS['Lainnya'];
    return '<div class="budget-row"><div class="budget-top"><div><b style="font-size:14px">'+meta.icon+' '+esc(cat)+'</b>'+
      '<div class="card-sub">'+fmt(b.spent)+' dari '+fmt(b.limit)+(b.remaining<0?' · <span style="color:var(--bad)">Over limit '+fmt(Math.abs(b.remaining))+'</span>':'')+'</div></div>'+
      '<div style="display:flex;align-items:center;gap:5px">'+
        '<span class="pill '+b.color+'" style="color:var(--'+b.color+')">'+b.pct.toFixed(0)+'%</span>'+
        '<button class="mini-btn" data-action="edit-budget" data-cat="'+esc(cat)+'">'+ico('edit',15)+'</button>'+
        '<button class="mini-btn del" data-action="delete-budget" data-cat="'+esc(cat)+'">'+ico('trash',15)+'</button></div></div>'+
      '<div class="prog '+b.color+'"><span style="width:'+Math.min(100,b.pct)+'%"></span></div>'+
      '<div class="budget-meta"><span>Sisa: <b style="color:var(--text)">'+fmt(Math.max(0,b.remaining))+'</b></span>'+
      '<span>Safe-to-spend: <b style="color:var(--good)">'+fmt(b.safe)+'</b> / hari ('+daysLeftInMonth()+' hari tersisa)</span></div></div>';
  }).join(''):'<div class="empty"><div class="big">'+ico('target',26)+'</div><p>Belum ada anggaran. Klik <strong>Atur Anggaran</strong> untuk mulai membatasi pengeluaran.</p></div>')+
  '</div>'+
  '<div class="note-strip" style="margin-top:16px">'+ico('info',16)+'<div>Indikator warna: <strong>hijau</strong> di bawah 70%, <strong>kuning</strong> 70–90%, <strong>merah</strong> di atas 90%. Safe-to-spend dihitung dari sisa anggaran dibagi sisa hari dalam bulan.</div></div>';
}
/* ============================ VIEW: TARGET TABUNGAN ============================ */
function goalETA(g){
  const avg=avgMonthlySavings();
  const remaining=Math.max(0,g.target-g.saved);
  if(remaining<=0) return 'Target tercapai.';
  if(avg<=0) return 'Perlu tabungan rutin';
  const months=Math.ceil(remaining/avg);
  const d=addMonths(new Date().toISOString(),months);
  return '± '+months+' bulan lagi · '+d.toLocaleDateString('id-ID',{month:'short',year:'numeric'});
}
function viewGoals(){
  const saved=sum(state.goals.map(g=>g.saved)),target=sum(state.goals.map(g=>g.target));
  return '<div class="page-head"><div><h2>Target Tabungan</h2><p>Pantau progres dan estimasi waktu tercapai berdasarkan rata-rata tabungan 3 bulan terakhir.</p></div>'+
    '<button class="btn-primary" data-action="add-goal">'+ico('plus',16)+' Tambah Target</button></div>'+
  '<div class="grid three-col" style="margin-bottom:16px">'+
    kpiCard('Total Terkumpul',fmt(saved),'var(--pos)','target',null,null)+
    kpiCard('Total Target',fmt(target),'var(--accent)','spark',null,null)+
    kpiCard('Rata-rata Tabung/Bulan',fmt(avgMonthlySavings()),'var(--warn)','chart',null,null)+
  '</div>'+
  '<div class="grid three-col">'+(state.goals.length?state.goals.map(g=>{
    const p=Math.min(100,g.target>0?(g.saved/g.target)*100:0);
    return '<div class="card goal-card"><div style="display:flex;justify-content:space-between;align-items:flex-start">'+
      '<div class="goal-emoji">'+esc(g.emoji||'T')+'</div>'+
      '<div style="display:flex;gap:3px"><button class="mini-btn" data-action="edit-goal" data-id="'+g.id+'">'+ico('edit',15)+'</button>'+
      '<button class="mini-btn del" data-action="delete-goal" data-id="'+g.id+'">'+ico('trash',15)+'</button></div></div>'+
      '<div class="goal-name">'+esc(g.name)+'</div><div class="goal-small">Target: '+fmt(g.target)+(g.deadline?' · '+esc(g.deadline):'')+'</div>'+
      '<div class="goal-val">'+fmt(g.saved)+'</div>'+
      '<div class="prog '+(p>=100?'good':'accent')+'"><span style="width:'+p+'%"></span></div>'+
      '<div class="goal-foot"><span>'+p.toFixed(1)+'% tercapai</span><span>'+fmt(Math.max(0,g.target-g.saved))+' lagi</span></div>'+
      '<div class="note-strip" style="margin-top:12px;padding:9px 10px;font-size:10.5px">'+ico('clock',14)+'<div>'+esc(goalETA(g))+'</div></div>'+
      '<div class="goal-actions"><button class="btn-primary btn-sm" style="flex:1" data-action="contribute" data-id="'+g.id+'">'+ico('plus',14)+' Tambah Tabungan</button></div></div>';
  }).join(''):'<div class="card empty" style="grid-column:1/-1"><div class="big">'+ico('spark',26)+'</div><p>Belum ada target. Buat target pertama Anda dan mulai menabung!</p></div>')+'</div>';
}

/* ============================ VIEW: DOMPET & AKUN ============================ */
function viewAccounts(){
  const b=balances(),tw=netWorth();
  return '<div class="page-head"><div><h2>Dompet & Akun</h2><p>Saldo dihitung otomatis dari saldo awal ditambah seluruh transaksi & transfer.</p></div>'+
    '<button class="btn-primary" data-action="add-account">'+ico('plus',16)+' Tambah Dompet</button></div>'+
  '<div class="card" style="margin-bottom:16px;display:flex;justify-content:space-between;align-items:center;gap:14px;flex-wrap:wrap">'+
    '<div><div class="card-sub">TOTAL KEKAYAAN BERSIH</div><div style="font-size:27px;font-weight:800;letter-spacing:-1px;margin-top:4px">'+fmt(tw)+'</div></div>'+
    '<div class="pill income" style="font-size:12px">'+state.accounts.length+' akun terdaftar</div></div>'+
  '<div class="grid three-col">'+(state.accounts.length?state.accounts.map(a=>{
    const meta=ACCT_TYPES[a.type]||ACCT_TYPES.cash;
    const txCount=state.transactions.filter(t=>t.accountId===a.id||t.toAccountId===a.id).length;
    return '<div class="card acc-card"><div class="acc-top"><div class="acc-ico">'+meta.icon+'</div>'+
      '<div style="flex:1;min-width:0"><div class="acc-name">'+esc(a.name)+'</div><div class="acc-type">'+meta.label+'</div></div>'+
      '<button class="mini-btn" data-action="edit-account" data-id="'+a.id+'">'+ico('edit',15)+'</button>'+
      '<button class="mini-btn del" data-action="delete-account" data-id="'+a.id+'">'+ico('trash',15)+'</button></div>'+
      '<div class="acc-bal'+(b[a.id]<0?' neg':'')+'">'+fmt(b[a.id]||0)+'</div>'+
      '<div class="acc-meta"><span>Saldo awal: '+fmt(a.initialBalance)+'</span><span>'+txCount+' transaksi</span></div>'+
      (b[a.id]<0?'<div class="pill expense" style="align-self:flex-start;font-size:10px">Saldo negatif / utang</div>':'')+'</div>';
  }).join(''):'<div class="card empty" style="grid-column:1/-1"><p>Belum ada dompet.</p></div>')+'</div>';
}

/* ============================ VIEW: TRANSAKSI BERULANG ============================ */
function viewRecurring(){
  const names={daily:'Harian',weekly:'Mingguan',monthly:'Bulanan',yearly:'Tahunan'};
  return '<div class="page-head"><div><h2>Transaksi Berulang</h2><p>Gaji, internet, cicilan, dan langganan dibuat otomatis saat aplikasi dibuka.</p></div>'+
    '<button class="btn-primary" data-action="add-recurring">'+ico('plus',16)+' Tambah Jadwal</button></div>'+
  '<div class="card">'+(state.recurring.length?state.recurring.map(r=>{
    const meta=CATS[r.category]||CATS['Lainnya'];
    const acc=byId(state.accounts,r.accountId);
    return '<div class="budget-row" style="display:flex;align-items:center;gap:12px;flex-wrap:wrap">'+
      '<div class="tx-ico">'+meta.icon+'</div>'+
      '<div style="flex:1;min-width:160px"><b style="font-size:13px">'+esc(r.note||r.category)+'</b>'+
        '<div class="card-sub">'+esc(r.category)+(r.subcategory?' · '+esc(r.subcategory):'')+' · '+(acc?esc(acc.name):'—')+'</div></div>'+
      '<div style="text-align:right"><div style="font-weight:800;font-size:13px;color:'+(r.type==='income'?'var(--good)':'var(--text)')+'">'+(r.type==='income'?'+':'−')+fmt(r.amount)+'</div>'+
        '<div class="card-sub">'+names[r.frequency]+' · next '+esc((r.nextDate||'').slice(0,10))+'</div></div>'+
      '<div style="display:flex;gap:4px">'+
        '<button class="mini-btn" data-action="toggle-recurring" data-id="'+r.id+'" title="'+(r.active?'Jeda':'Aktifkan')+'">'+ico(r.active?'check':'refresh',15)+'</button>'+
        '<button class="mini-btn" data-action="edit-recurring" data-id="'+r.id+'">'+ico('edit',15)+'</button>'+
        '<button class="mini-btn del" data-action="delete-recurring" data-id="'+r.id+'">'+ico('trash',15)+'</button></div>'+
      (!r.active?'<span class="pill transfer" style="font-size:9px">dijeda</span>':'')+'</div>';
  }).join(''):'<div class="empty"><div class="big">'+ico('repeat',26)+'</div><p>Belum ada jadwal berulang. Centang "Berulang" saat menambah transaksi.</p></div>')+'</div>'+
  '<div class="note-strip" style="margin-top:16px">'+ico('info',16)+'<div>Jadwal berulang menghasilkan transaksi baru otomatis hingga hari ini saat aplikasi dibuka. Transaksi yang sudah dibuat tidak akan duplikat meski halaman di-refresh.</div></div>';
}

/* ============================ VIEW: PENGATURAN ============================ */
function viewSettings(){
  return '<div class="page-head"><div><h2>Pengaturan & Data</h2><p>Export, import, dan kelola data Anda dengan aman.</p></div></div>'+
  '<div class="grid two-col">'+
    '<div class="card"><div class="card-head"><div><div class="card-title">Tampilan</div><div class="card-sub">Preferensi antarmuka</div></div></div>'+
      '<div class="settings-row"><div><h4>Mode Gelap</h4><p>Default saat aplikasi pertama dibuka.</p></div>'+
        '<button class="btn-ghost btn-sm" data-action="toggle-theme">'+ico(state.theme==='dark'?'sun':'moon',15)+' '+(state.theme==='dark'?'Mode Terang':'Mode Gelap')+'</button></div>'+
      '<div class="settings-row"><div><h4>Mata Uang</h4><p>Format Rupiah Indonesia (Rp 1.500.000).</p></div><span class="pill income">IDR</span></div>'+
    '</div>'+
    '<div class="card"><div class="card-head"><div><div class="card-title">Backup & Restore</div><div class="card-sub">Simpan data ke perangkat Anda</div></div></div>'+
      '<div class="settings-row"><div><h4>Export Backup Lengkap (JSON)</h4><p>Semua akun, transaksi, anggaran, target, dan jadwal.</p></div>'+
        '<button class="btn-ghost btn-sm" data-action="export-json">'+ico('download',15)+' JSON</button></div>'+
      '<div class="settings-row"><div><h4>Export Transaksi (CSV)</h4><p>Kompatibel dengan Excel / Google Sheets.</p></div>'+
        '<button class="btn-ghost btn-sm" data-action="export-csv">'+ico('download',15)+' CSV</button></div>'+
      '<div class="settings-row"><div><h4>Import / Restore Backup</h4><p>Timpa seluruh data dengan file backup JSON.</p></div>'+
        '<button class="btn-ghost btn-sm" data-action="import-json">'+ico('upload',15)+' Import</button></div>'+
    '</div>'+
  '</div>'+
  '<div class="card" style="margin-top:16px"><div class="card-head"><div><div class="card-title" style="color:var(--bad)">Zona Berbahaya</div><div class="card-sub">Tindakan ini tidak dapat dibatalkan.</div></div></div>'+
    '<div class="settings-row"><div><h4>Hapus Semua Data</h4><p>Kembalikan ke kondisi awal: satu dompet kosong, tanpa transaksi.</p></div>'+
      '<button class="btn-ghost btn-sm" style="color:var(--bad)" data-action="clear-data">'+ico('trash',15)+' Hapus Semua</button></div>'+
  '</div>'+
  '<div class="note-strip" style="margin-top:16px">'+ico('info',16)+'<div><strong>Statistik penyimpanan:</strong> '+state.transactions.length+' transaksi · '+state.accounts.length+' akun · '+state.recurring.length+' jadwal · '+state.goals.length+' target. Data disimpan di browser ini (localStorage) dan tidak dikirim ke server mana pun.</div></div>';
}

/* ============================ CHARTS ============================ */
function cssVar(n){return getComputedStyle(document.documentElement).getPropertyValue(n).trim()||'#8b9ab5'}
function destroyChart(k){if(ui.charts[k]){try{ui.charts[k].destroy()}catch(e){}delete ui.charts[k]}}
function chartEmpty(msg){
  return '<div class="chart-empty">'+ico('plus',20)+'<p>'+msg+'</p><small>Grafik akan muncul setelah ada catatan.</small></div>';
}
function renderCharts(){
  ['networth','cashflow','donut'].forEach(destroyChart);
  const muted=cssVar('--muted'),grid=cssVar('--line-soft');
  const hasChart=typeof window.Chart!=='undefined';
  if(hasChart){Chart.defaults.color=muted;Chart.defaults.font.family=getComputedStyle(document.body).fontFamily;}
  /* --- Net worth trend --- */
  const nwLabels=[],nwVals=[];
  for(let i=11;i>=0;i--){
    const k=shiftMonth(ui.month,-i);
    nwLabels.push(shortMonthLabel(k));nwVals.push(netWorthAt(monthEndStr(k)));
  }
  const nb=document.getElementById('networth-box');
  if(nb){
    if(!state.transactions.length&&netWorth()===0){nb.innerHTML=chartEmpty('Belum ada data kekayaan.')}
    else if(hasChart){
      nb.innerHTML='<canvas id="netChart"></canvas>';
      ui.charts.networth=new Chart(document.getElementById('netChart'),{
        type:'line',
        data:{labels:nwLabels,datasets:[{label:'Kekayaan bersih',data:nwVals,borderColor:cssVar('--accent'),
          backgroundColor:cssVar('--accent-soft'),borderWidth:2,pointRadius:0,pointHoverRadius:4,tension:.25,fill:true}]},
        options:{responsive:true,maintainAspectRatio:false,interaction:{mode:'index',intersect:false},
          plugins:{legend:{display:false},tooltip:{callbacks:{label:c=>' '+fmt(c.parsed.y)}}},
          scales:{x:{grid:{display:false},ticks:{color:muted,font:{size:9},maxRotation:0,maxTicksLimit:12}},
            y:{grid:{color:grid},border:{display:false},ticks:{color:muted,font:{size:9},callback:v=>fmtCompact(v)}}}}
      });
    }else{
      const lo=Math.min(0,...nwVals),hi=Math.max(1,...nwVals),span=hi-lo||1;
      nb.innerHTML='<div class="fallback-chart">'+nwLabels.map((l,i)=>'<div class="fb-col"><div class="fb-bars">'+
        '<div class="fb-bar" style="height:'+((nwVals[i]-lo)/span*100)+'%;background:'+cssVar('--accent')+'"></div></div>'+
        '<div class="fb-lbl">'+(i%2===0?l:'')+'</div></div>').join('')+'</div>';
    }
  }
  /* --- Cashflow --- */
  const labels=[],inc=[],exp=[];
  if(ui.cashflowMode==='monthly'){
    const base=ui.month.split('-').map(Number);
    for(let i=5;i>=0;i--){
      const d=new Date(base[0],base[1]-1-i,1);
      const key=monthKey(d),st=monthStats(key);
      labels.push(d.toLocaleDateString('id-ID',{month:'short',year:'2-digit'}));
      inc.push(st.income);exp.push(st.expense);
    }
  }else{
    for(let i=29;i>=0;i--){
      const d=new Date();d.setDate(d.getDate()-i);
      const key=isoD(d);
      labels.push(i%5===0?d.toLocaleDateString('id-ID',{day:'numeric',month:'short'}):'');
      inc.push(sum(state.transactions.filter(t=>t.type==='income'&&t.date.slice(0,10)===key).map(t=>t.amount)));
      exp.push(sum(state.transactions.filter(t=>t.type==='expense'&&t.date.slice(0,10)===key).map(t=>t.amount)));
    }
  }
  const box=document.getElementById('cashflow-box');
  if(box){
    if(!state.transactions.length){box.innerHTML=chartEmpty('Belum ada arus kas.')}
    else if(hasChart){
      box.innerHTML='<canvas id="cashChart"></canvas>';
      ui.charts.cashflow=new Chart(document.getElementById('cashChart'),{
        type:'bar',
        data:{labels,datasets:[
          {label:'Pemasukan',data:inc,backgroundColor:cssVar('--pos'),borderRadius:0,borderSkipped:false,maxBarThickness:22},
          {label:'Pengeluaran',data:exp,backgroundColor:cssVar('--neg'),borderRadius:0,borderSkipped:false,maxBarThickness:22}
        ]},
        options:{responsive:true,maintainAspectRatio:false,interaction:{mode:'index',intersect:false},
          plugins:{legend:{labels:{usePointStyle:true,boxWidth:8,padding:14,font:{size:10}}},tooltip:{callbacks:{label:c=>' '+c.dataset.label+': '+fmt(c.parsed.y)}}},
          scales:{x:{grid:{display:false},ticks:{color:muted,font:{size:9},maxRotation:0}},
            y:{grid:{color:grid},border:{display:false},ticks:{color:muted,font:{size:9},callback:v=>fmtCompact(v)}}}}
      });
    }else{
      const max=Math.max(1,...inc,...exp);
      box.innerHTML='<div class="fallback-chart">'+labels.map((l,i)=>'<div class="fb-col"><div class="fb-bars">'+
        '<div class="fb-bar" style="height:'+(inc[i]/max*100)+'%;background:'+cssVar('--pos')+'"></div>'+
        '<div class="fb-bar" style="height:'+(exp[i]/max*100)+'%;background:'+cssVar('--neg')+'"></div></div>'+
        '<div class="fb-lbl">'+(l||'·')+'</div></div>').join('')+'</div>'+
        '<div class="fb-legend"><span><i class="fb-dot" style="background:'+cssVar('--pos')+'"></i>Pemasukan</span>'+
        '<span><i class="fb-dot" style="background:'+cssVar('--neg')+'"></i>Pengeluaran</span></div>';
    }
  }
  /* --- Donut --- */
  const byCat=expenseByCategory(ui.month);
  const entries=Object.entries(byCat).sort((a,b)=>b[1]-a[1]);
  const dbox=document.getElementById('donut-box');
  if(dbox){
    if(!entries.length){dbox.innerHTML=chartEmpty('Belum ada pengeluaran di '+monthLabel(ui.month)+'.')}
    else if(hasChart){
      dbox.innerHTML='<canvas id="donutChart"></canvas>';
      ui.charts.donut=new Chart(document.getElementById('donutChart'),{
        type:'doughnut',
        data:{labels:entries.map(e=>e[0]),datasets:[{data:entries.map(e=>e[1]),
          backgroundColor:entries.map(e=>catColor(e[0])),borderColor:cssVar('--surface'),borderWidth:2,hoverOffset:6}]},
        options:{responsive:true,maintainAspectRatio:false,cutout:'70%',
          plugins:{legend:{position:'right',labels:{usePointStyle:true,boxWidth:8,padding:10,font:{size:10}}},
            tooltip:{callbacks:{label:c=>' '+c.label+': '+fmt(c.parsed)+' ('+(sum(entries.map(e=>e[1]))?(c.parsed/sum(entries.map(e=>e[1]))*100).toFixed(1):0)+'%)'}}}}
      });
    }else{
      const total=sum(entries.map(e=>e[1]))||1;
      dbox.innerHTML='<div style="display:flex;flex-direction:column;gap:10px;padding:12px">'+entries.map(e=>
        '<div><div style="display:flex;justify-content:space-between;font-size:11px;margin-bottom:4px"><span>'+esc(e[0])+'</span><span>'+fmt(e[1])+'</span></div>'+
        '<div class="prog accent"><span style="width:'+(e[1]/total*100)+'%;background:'+catColor(e[0])+'"></span></div></div>').join('')+'</div>';
    }
  }
}
/* ============================ MODALS ============================ */
const modalRoot=document.getElementById('modal-root');
function openModal(html,wide){
  modalRoot.innerHTML='<div class="modal-back" data-action="close-modal"></div><div class="modal'+(wide?' wide':'')+'">'+html+'</div>';
  modalRoot.classList.add('show');
  document.body.style.overflow='hidden';
  const first=modalRoot.querySelector('input:not([type=hidden]),select');
  if(first) setTimeout(()=>first.focus(),60);
}
function closeModal(){
  modalRoot.classList.remove('show');modalRoot.innerHTML='';
  document.body.style.overflow='';pendingConfirm=null;
}
function modalHead(title,sub){
  return '<div class="modal-head"><div><h3>'+title+'</h3><p>'+sub+'</p></div>'+
    '<button class="icon-btn" data-action="close-modal" style="width:32px;height:32px">'+ico('x',16)+'</button></div>';
}
function askConfirm(title,msg,cb){
  pendingConfirm=cb;
  openModal(modalHead(esc(title),'Konfirmasi tindakan')+
    '<div class="modal-body"><div class="note-strip" style="border-color:color-mix(in srgb,var(--bad) 30%,transparent)">'+ico('alert',16)+
    '<div>'+msg+'</div></div></div>'+
    '<div class="modal-foot"><button class="btn-ghost" data-action="close-modal">Batal</button>'+
    '<button class="btn-primary btn-danger" data-action="confirm-yes">'+ico('check',15)+' Ya, Lanjutkan</button></div>');
}
function toast(msg,type){
  const el=document.createElement('div');
  el.className='toast'+(type?' '+type:'');
  el.innerHTML='<span class="dot"></span><span>'+esc(msg)+'</span>';
  document.getElementById('toast-root').appendChild(el);
  setTimeout(()=>{el.style.opacity='0';el.style.transform='translateX(20px)';el.style.transition='.25s';setTimeout(()=>el.remove(),260)},3200);
}
let pendingUndo=null,undoTimer=null;
function snapshotState(){return JSON.parse(JSON.stringify(state))}
function restoreState(snap){
  state=normalize(snap);syncCustomCats();processRecurring();saveState();renderView();toast('Perubahan dibatalkan');
}
function toastUndo(msg,cb){
  const root=document.getElementById('toast-root');
  root.querySelectorAll('.undo-toast').forEach(x=>x.remove());
  if(undoTimer)clearTimeout(undoTimer);
  pendingUndo=cb;
  const el=document.createElement('div');
  el.className='toast undo-toast';
  el.innerHTML='<span class="dot"></span><span>'+esc(msg)+'</span><button class="undo-btn" data-action="undo">Urungkan</button>';
  root.appendChild(el);
  undoTimer=setTimeout(()=>{
    pendingUndo=null;undoTimer=null;
    el.style.opacity='0';el.style.transition='.25s';setTimeout(()=>el.remove(),260);
  },6500);
}
function opts(arr,sel){return arr.map(x=>'<option value="'+esc(x.v)+'"'+(sel===x.v?' selected':'')+'>'+esc(x.l)+'</option>').join('')}
let EXP_CATS=[],INC_CATS=[];
function refreshCatLists(){
  EXP_CATS=Object.keys(CATS).filter(c=>!['Gaji','Freelance','Investasi','Transfer'].includes(c));
  INC_CATS=Object.keys(CATS).filter(c=>['Gaji','Freelance','Investasi'].includes(c)||state.customCategories.includes(c));
  if(!INC_CATS.includes('Lainnya'))INC_CATS.push('Lainnya');
}
refreshCatLists();
function catOptions(type,sel,withCustom){
  let list=(type==='income'?INC_CATS:type==='transfer'?['Transfer']:EXP_CATS).slice();
  if(sel&&!list.includes(sel))list.push(sel);
  if(withCustom&&type!=='transfer'&&!list.includes('__custom__'))list.push('__custom__');
  return opts(list.map(c=>({v:c,l:c==='__custom__'?'+ Kategori baru...':c})),sel);
}
function accOptions(sel,extra){
  return opts((extra||[]).concat(state.accounts.map(a=>({v:a.id,l:a.name}))),sel);
}
function subDatalist(){
  return '<datalist id="sub-list">'+Object.values(SUBS).flat().filter((v,i,a)=>a.indexOf(v)===i).map(s=>'<option value="'+esc(s)+'"></option>').join('')+'</datalist>';
}

/* ---------- TRANSACTION FORM ---------- */
function openTxModal(id){
  const t=id?byId(state.transactions,id):null;
  const type=t?t.type:'expense';
  const rec=t&&t.recurringId?byId(state.recurring,t.recurringId):null;
  const html=modalHead(t?'Edit Transaksi':'Tambah Transaksi',t?'Perubahan saldo dihitung ulang otomatis.':'Catat pemasukan, pengeluaran, atau transfer antar dompet.')+
  '<form data-form="tx" data-id="'+(t?t.id:'')+'"><div class="modal-body">'+
    '<div class="type-tabs">'+[['income','Pemasukan'],['expense','Pengeluaran'],['transfer','Transfer']].map(x=>
      '<button type="button" class="type-tab'+(type===x[0]?' active':'')+'" data-action="tx-type" data-type="'+x[0]+'">'+x[1]+'</button>').join('')+'</div>'+
    '<div class="field"><label class="lbl">Nominal (Rupiah)</label><input type="text" name="amount" class="amount-input amt-format" inputmode="numeric" placeholder="Rp 0" value="'+groupDigits(t?t.amount:'')+'" required></div>'+
    '<div class="form-grid">'+
      '<div class="field"><label class="lbl">Kategori</label><select name="category" id="tx-category">'+catOptions(type,t?t.category:(type==='income'?'Gaji':type==='transfer'?'Transfer':'Makan & Minum'),!t)+'</select></div>'+
      '<div class="field" id="tx-custom-wrap" style="display:none"><label class="lbl">Nama Kategori Baru</label><input type="text" name="customCategory" id="tx-custom" placeholder="Contoh: Hewan Peliharaan" maxlength="24"></div>'+
      '<div class="field"><label class="lbl">Sub-kategori</label><input type="text" name="subcategory" list="sub-list" placeholder="Opsional" value="'+esc(t?t.subcategory:'')+'">'+subDatalist()+'</div>'+
      '<div class="field"><label class="lbl">Dompet / Akun</label><select name="accountId">'+accOptions(t?t.accountId:(state.accounts[0]||{}).id)+'</select></div>'+
      '<div class="field" id="to-account-wrap" style="'+(type==='transfer'?'':'display:none')+'"><label class="lbl">Ke Dompet</label><select name="toAccountId">'+accOptions(t?t.toAccountId:(state.accounts[1]||state.accounts[0]||{}).id,[{v:'',l:'— Pilih tujuan —'}])+'</select></div>'+
      '<div class="field"><label class="lbl">Tanggal & Waktu</label><input type="datetime-local" name="date" value="'+esc(t?t.date.slice(0,16):isoDT(new Date()).slice(0,16))+'" required></div>'+
      '<div class="field"><label class="lbl">Tag (pisahkan dengan koma)</label><input type="text" name="tags" placeholder="#liburan, #darurat" value="'+esc(t?(t.tags||[]).map(x=>'#'+x).join(', '):'')+'"></div>'+
      '<div class="field full"><label class="lbl">Catatan</label><input type="text" name="note" placeholder="Contoh: Makan siang di kantor" value="'+esc(t?t.note:'')+'"></div>'+
    '</div>'+
    '<label class="check" style="margin-top:2px"><input type="checkbox" name="recurring" id="tx-recurring"'+(rec?' checked':'')+'> Jadikan transaksi berulang (tagihan/gaji)</label>'+
    '<div class="repeat-box" id="repeat-box" style="'+(rec?'':'display:none')+'">'+
      '<div class="form-grid">'+
        '<div class="field"><label class="lbl">Frekuensi</label><select name="frequency">'+opts([{v:'daily',l:'Harian'},{v:'weekly',l:'Mingguan'},{v:'monthly',l:'Bulanan'},{v:'yearly',l:'Tahunan'}],rec?rec.frequency:'monthly')+'</select></div>'+
        '<div class="field"><label class="lbl">Mulai Tanggal</label><input type="date" name="startDate" value="'+esc(rec?rec.startDate.slice(0,10):todayISO())+'"></div>'+
        '<div class="field full"><label class="lbl">Berakhir (kosongkan = selamanya)</label><input type="date" name="endDate" value="'+esc(rec&&rec.endDate?rec.endDate:'')+'"></div>'+
      '</div><div class="hint">Transaksi otomatis akan dibuatkan hingga tanggal hari ini saat aplikasi dibuka. Jadwal lama tidak akan diduplikasi.</div>'+
    '</div>'+
  '</div><div class="modal-foot"><button type="button" class="btn-ghost" data-action="close-modal">Batal</button>'+
    '<button type="submit" class="btn-primary">'+ico('check',15)+' '+(t?'Simpan Perubahan':'Simpan Transaksi')+'</button></div></form>';
  openModal(html,true);
}
function setModalType(type){
  document.querySelectorAll('.type-tab').forEach(b=>b.classList.toggle('active',b.dataset.type===type));
  const cat=document.getElementById('tx-category');
  if(cat){
    const sel=cat.value==='__custom__'?(type==='income'?'Gaji':'Makan & Minum'):cat.value;
    cat.innerHTML=catOptions(type,type==='transfer'?'Transfer':sel,true);
  }
  const cw=document.getElementById('tx-custom-wrap');
  if(cw)cw.style.display='none';
  const wrap=document.getElementById('to-account-wrap');
  if(wrap) wrap.style.display=type==='transfer'?'':'none';
}

/* ---------- OTHER FORMS ---------- */
function openBudgetModal(cat){
  const used=Object.keys(state.budgets),cur=cat||used[0];
  const avail=Object.keys(CATS).filter(c=>c!=='Transfer'&&(!used.includes(c)||c===cur)).sort();
  openModal(modalHead(cat?'Edit Anggaran':'Atur Anggaran','Batas pengeluaran maksimal per bulan per kategori.')+
    '<form data-form="budget" data-cat="'+esc(cur||'')+'"><div class="modal-body">'+
    '<div class="field"><label class="lbl">Kategori</label><select name="category" id="budget-category"'+(cat?' disabled':'')+'>'+opts(avail.map(c=>({v:c,l:c})),cur)+'<option value="__custom__">+ Kategori baru...</option></select></div>'+
    '<div class="field" id="budget-custom-wrap" style="display:none"><label class="lbl">Nama Kategori Baru</label><input type="text" name="customCategory" id="budget-custom" placeholder="Contoh: Hewan Peliharaan" maxlength="24"></div>'+
    '<div class="field"><label class="lbl">Batas Bulanan (Rp)</label><input type="text" name="limit" class="amt-format amount-input" inputmode="numeric" value="'+groupDigits(cur?state.budgets[cur]:'')+'" placeholder="Rp 2.000.000" required></div>'+
    '</div><div class="modal-foot"><button type="button" class="btn-ghost" data-action="close-modal">Batal</button>'+
    '<button type="submit" class="btn-primary">'+ico('check',15)+' Simpan</button></div></form>');
}
function openGoalModal(id){
  const g=id?byId(state.goals,id):null;
  const emojis=['T','D','L','B','R','K','P','E'];
  openModal(modalHead(g?'Edit Target':'Tambah Target Tabungan','Pantau progres dan estimasi waktu tercapai.')+
    '<form data-form="goal" data-id="'+(g?g.id:'')+'"><div class="modal-body">'+
    '<div class="field"><label class="lbl">Nama Target</label><input type="text" name="name" value="'+esc(g?g.name:'')+'" placeholder="Contoh: Dana Darurat" required></div>'+
    '<div class="field"><label class="lbl">Ikon</label><select name="emoji">'+opts(emojis.map(e=>({v:e,l:e})),g?g.emoji:'T')+'</select></div>'+
    '<div class="form-grid">'+
      '<div class="field"><label class="lbl">Target Dana (Rp)</label><input type="text" name="target" class="amt-format" inputmode="numeric" value="'+groupDigits(g?g.target:'')+'" required></div>'+
      '<div class="field"><label class="lbl">Terkumpul (Rp)</label><input type="text" name="saved" class="amt-format" inputmode="numeric" value="'+groupDigits(g?g.saved:0)+'"></div>'+
      '<div class="field full"><label class="lbl">Target Tanggal (opsional)</label><input type="date" name="deadline" value="'+esc(g&&g.deadline?g.deadline:'')+'"></div>'+
    '</div></div><div class="modal-foot"><button type="button" class="btn-ghost" data-action="close-modal">Batal</button>'+
    '<button type="submit" class="btn-primary">'+ico('check',15)+' Simpan</button></div></form>');
}
function openContributionModal(id){
  const g=byId(state.goals,id);if(!g)return;
  openModal(modalHead('Tambah Tabungan — '+esc(g.name),'Terkumpul saat ini: '+fmt(g.saved))+
    '<form data-form="contribute" data-id="'+g.id+'"><div class="modal-body">'+
    '<div class="field"><label class="lbl">Nominal Setoran (Rp)</label><input type="text" name="amount" class="amt-format amount-input" inputmode="numeric" placeholder="Rp 500.000" required></div>'+
    '</div><div class="modal-foot"><button type="button" class="btn-ghost" data-action="close-modal">Batal</button>'+
    '<button type="submit" class="btn-primary">'+ico('plus',15)+' Tambahkan</button></div></form>');
}
function openAccountModal(id){
  const a=id?byId(state.accounts,id):null;
  openModal(modalHead(a?'Edit Dompet':'Tambah Dompet / Akun','Saldo awal menjadi baseline perhitungan saldo.')+
    '<form data-form="account" data-id="'+(a?a.id:'')+'"><div class="modal-body">'+
    '<div class="field"><label class="lbl">Nama Dompet</label><input type="text" name="name" value="'+esc(a?a.name:'')+'" placeholder="Contoh: BCA Utama" required></div>'+
    '<div class="field"><label class="lbl">Jenis</label><select name="type">'+opts(Object.keys(ACCT_TYPES).map(k=>({v:k,l:ACCT_TYPES[k].label})),a?a.type:'bank')+'</select></div>'+
    '<div class="field"><label class="lbl">Saldo Awal (Rp) — boleh negatif untuk utang</label><input type="text" name="initial" class="signed-format" inputmode="numeric" value="'+groupDigits(a?a.initialBalance:0)+'" placeholder="0"></div>'+
    '</div><div class="modal-foot"><button type="button" class="btn-ghost" data-action="close-modal">Batal</button>'+
    '<button type="submit" class="btn-primary">'+ico('check',15)+' Simpan</button></div></form>');
}
function openRecurringModal(id){
  const r=id?byId(state.recurring,id):null;
  if(!r)return;
  openModal(modalHead('Edit Jadwal Berulang','Transaksi yang sudah dibuat sebelumnya tidak diubah.')+
    '<form data-form="recurring" data-id="'+r.id+'"><div class="modal-body">'+
    '<div class="field"><label class="lbl">Nama / Catatan</label><input type="text" name="note" value="'+esc(r.note)+'" required></div>'+
    '<div class="form-grid">'+
      '<div class="field"><label class="lbl">Nominal (Rp)</label><input type="text" name="amount" class="amt-format" inputmode="numeric" value="'+groupDigits(r.amount)+'"></div>'+
      '<div class="field"><label class="lbl">Frekuensi</label><select name="frequency">'+opts([{v:'daily',l:'Harian'},{v:'weekly',l:'Mingguan'},{v:'monthly',l:'Bulanan'},{v:'yearly',l:'Tahunan'}],r.frequency)+'</select></div>'+
      '<div class="field"><label class="lbl">Tanggal Mulai</label><input type="date" name="startDate" value="'+esc(r.startDate.slice(0,10))+'"></div>'+
      '<div class="field"><label class="lbl">Tanggal Berakhir</label><input type="date" name="endDate" value="'+esc(r.endDate||'')+'"></div>'+
    '</div></div><div class="modal-foot"><button type="button" class="btn-ghost" data-action="close-modal">Batal</button>'+
    '<button type="submit" class="btn-primary">'+ico('check',15)+' Simpan</button></div></form>');
}

/* ============================ BACKUP / EXPORT ============================ */
function downloadFile(name,content,mime){
  const blob=new Blob([content],{type:mime});
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a');a.href=url;a.download=name;document.body.appendChild(a);a.click();
  setTimeout(()=>{URL.revokeObjectURL(url);a.remove()},600);
}
function exportJSON(){
  const payload={app:'Wealthy',version:1,exportedAt:new Date().toISOString(),data:state};
  downloadFile('wealthy-backup-'+todayISO()+'.json',JSON.stringify(payload,null,2),'application/json');
  toast('Backup JSON berhasil diunduh');
}
function csvCell(v){return '"'+String(v==null?'':v).replace(/"/g,'""')+'"'}
function exportCSV(){
  const rows=[['Tanggal','Waktu','Tipe','Nominal','Kategori','Subkategori','Dompet','Ke Dompet','Catatan','Tag','Otomatis']];
  state.transactions.slice().sort((a,b)=>a.date.localeCompare(b.date)).forEach(t=>{
    const d=new Date(t.date);
    rows.push([d.toLocaleDateString('id-ID'),pad(d.getHours())+':'+pad(d.getMinutes()),t.type,t.amount,t.category,
      t.subcategory,(byId(state.accounts,t.accountId)||{}).name||'',(byId(state.accounts,t.toAccountId)||{}).name||'',
      t.note,(t.tags||[]).map(x=>'#'+x).join(' '),t.auto?'Ya':'Tidak']);
  });
  downloadFile('wealthy-transaksi-'+todayISO()+'.csv','\uFEFF'+rows.map(r=>r.map(csvCell).join(',')).join('\r\n'),'text/csv;charset=utf-8');
  toast('CSV berhasil diunduh');
}
document.getElementById('import-file').addEventListener('change',function(e){
  const file=e.target.files[0];if(!file)return;
  const reader=new FileReader();
  reader.onload=()=>{
    try{
      const parsed=JSON.parse(reader.result);
      const d=parsed&&parsed.data?parsed.data:parsed;
      if(!d||!Array.isArray(d.accounts)||!Array.isArray(d.transactions)) throw new Error('Format tidak dikenali');
      askConfirm('Restore backup?','Data saat ini (<strong>'+state.transactions.length+' transaksi</strong>) akan ditimpa oleh file ini (<strong>'+d.transactions.length+' transaksi</strong>).',()=>{
        state=normalize(d);syncCustomCats();processRecurring();saveState();renderView();toast('Backup berhasil dipulihkan');
      });
    }catch(err){toast('File tidak valid: '+err.message,'err')}
    e.target.value='';
  };
  reader.readAsText(file);
});
/* ============================ EVENTS ============================ */
document.addEventListener('click',function(e){
  const el=e.target.closest('[data-action]');
  if(!el)return;
  const a=el.dataset.action,id=el.dataset.id;
  switch(a){
    case 'nav':
      ui.view=el.dataset.view;
      document.getElementById('sidebar').classList.remove('open');
      document.getElementById('overlay').classList.remove('show');
      renderView();break;
    case 'toggle-sidebar':
      document.getElementById('sidebar').classList.toggle('open');
      document.getElementById('overlay').classList.toggle('show');break;
    case 'close-sidebar':
      document.getElementById('sidebar').classList.remove('open');
      document.getElementById('overlay').classList.remove('show');break;
    case 'toggle-theme':
      state.theme=state.theme==='dark'?'light':'dark';
      document.documentElement.dataset.theme=state.theme;
      document.getElementById('theme-btn').innerHTML=ico(state.theme==='dark'?'sun':'moon',18);
      saveState();
      if(ui.view==='dashboard'){renderCharts()}else{renderView()}
      break;
    case 'undo':{
      const cb=pendingUndo;pendingUndo=null;
      if(undoTimer){clearTimeout(undoTimer);undoTimer=null}
      document.querySelectorAll('.undo-toast').forEach(x=>x.remove());
      if(cb)cb();break;
    }
    case 'month-prev':{
      const prev=shiftMonth(ui.month,-1);
      if(prev<firstDataMonth())break;
      ui.month=prev;renderView();break;
    }
    case 'month-next':
      if(ui.month>=currentMonth())break;
      ui.month=shiftMonth(ui.month,1);renderView();break;
    case 'month-now':ui.month=currentMonth();renderView();break;
    case 'add-tx':openTxModal();break;
    case 'close-modal':closeModal();break;
    case 'confirm-yes':{const cb=pendingConfirm;closeModal();if(cb)cb();break}
    case 'tx-type':setModalType(el.dataset.type);break;
    case 'edit-tx':openTxModal(id);break;
    case 'delete-tx':{
      const t=byId(state.transactions,id);if(!t)return;
      askConfirm('Hapus transaksi?','Transaksi <strong>'+esc(t.note||t.category)+'</strong> ('+fmt(t.amount)+') akan dihapus. Saldo semua dompet akan dihitung ulang otomatis.',()=>{
        const snap=snapshotState();
        state.transactions=state.transactions.filter(x=>x.id!==id);
        saveState();renderView();toastUndo('Transaksi dihapus',()=>restoreState(snap));
      });break;
    }
    case 'clear-filters':
      ui.filters={q:'',range:'month',from:'',to:'',type:'all',category:'all',account:'all'};
      renderView();break;
    case 'cf-mode':
      ui.cashflowMode=el.dataset.mode;
      document.querySelectorAll('#cashflow-seg button').forEach(b=>b.classList.toggle('active',b.dataset.mode===ui.cashflowMode));
      renderCharts();break;
    case 'add-budget':openBudgetModal();break;
    case 'edit-budget':openBudgetModal(el.dataset.cat);break;
    case 'delete-budget':
      askConfirm('Hapus anggaran?','Anggaran kategori <strong>'+esc(el.dataset.cat)+'</strong> akan dihapus. Transaksi tidak terpengaruh.',()=>{
        const snap=snapshotState();
        delete state.budgets[el.dataset.cat];saveState();renderView();toastUndo('Anggaran dihapus',()=>restoreState(snap));
      });break;
    case 'add-goal':openGoalModal();break;
    case 'edit-goal':openGoalModal(id);break;
    case 'delete-goal':{
      const g=byId(state.goals,id);if(!g)return;
      askConfirm('Hapus target?','Target <strong>'+esc(g.name)+'</strong> akan dihapus permanen.',()=>{
        const snap=snapshotState();
        state.goals=state.goals.filter(x=>x.id!==id);saveState();renderView();toastUndo('Target dihapus',()=>restoreState(snap));
      });break;
    }
    case 'contribute':openContributionModal(id);break;
    case 'add-account':openAccountModal();break;
    case 'edit-account':openAccountModal(id);break;
    case 'delete-account':{
      const acc=byId(state.accounts,id);if(!acc)return;
      const used=state.transactions.filter(t=>t.accountId===id||t.toAccountId===id).length;
      if(used){toast('Dompet masih dipakai '+used+' transaksi. Ubah transaksinya dulu.','err');return}
      if(state.accounts.length<=1){toast('Minimal harus ada satu dompet.','err');return}
      askConfirm('Hapus dompet?','Dompet <strong>'+esc(acc.name)+'</strong> akan dihapus.',()=>{
        const snap=snapshotState();
        state.accounts=state.accounts.filter(x=>x.id!==id);saveState();renderView();toastUndo('Dompet dihapus',()=>restoreState(snap));
      });break;
    }
    case 'add-recurring':
      toast('Tambah jadwal lewat tombol Tambah Transaksi → centang "Berulang"','warn');
      openTxModal();break;
    case 'edit-recurring':openRecurringModal(id);break;
    case 'delete-recurring':{
      const r=byId(state.recurring,id);if(!r)return;
      askConfirm('Hapus jadwal?','Jadwal <strong>'+esc(r.note)+'</strong> akan dihapus. Transaksi yang sudah dibuatkan tetap tersimpan.',()=>{
        const snap=snapshotState();
        state.recurring=state.recurring.filter(x=>x.id!==id);saveState();renderView();toastUndo('Jadwal dihapus',()=>restoreState(snap));
      });break;
    }
    case 'toggle-recurring':{
      const r=byId(state.recurring,id);if(!r)return;
      r.active=!r.active;saveState();renderView();toast(r.active?'Jadwal diaktifkan':'Jadwal dijeda');break;
    }
    case 'export-json':exportJSON();break;
    case 'export-csv':exportCSV();break;
    case 'import-json':document.getElementById('import-file').click();break;
    case 'clear-data':
      askConfirm('Hapus semua data?','Semua transaksi, anggaran, target, dan jadwal akan dihapus. Satu dompet kosong akan dibuat.',()=>{
        const snap=snapshotState();
        const th=state.theme;state=emptyState(th);ui.month=currentMonth();saveState();renderView();toastUndo('Semua data dihapus',()=>restoreState(snap));
      });break;
  }
});

document.addEventListener('input',function(e){
  const t=e.target;
  if(t.id==='tx-search'){ui.filters.q=t.value;renderTxList();return}
  if(t.classList&&t.classList.contains('amt-format')){t.value=groupDigits(t.value);return}
  if(t.classList&&t.classList.contains('signed-format')){
    const neg=t.value.trim().startsWith('-');t.value=(neg?'-':'')+groupDigits(t.value);return;
  }
});

document.addEventListener('change',function(e){
  const t=e.target;
  if(t.id==='f-range'){
    ui.filters.range=t.value;
    const c=document.getElementById('custom-range');
    if(c)c.style.display=t.value==='custom'?'flex':'none';
    renderTxList();return;
  }
  if(t.id==='f-type'){ui.filters.type=t.value;renderTxList();return}
  if(t.id==='f-category'){ui.filters.category=t.value;renderTxList();return}
  if(t.id==='f-account'){ui.filters.account=t.value;renderTxList();return}
  if(t.id==='f-from'){ui.filters.from=t.value;renderTxList();return}
  if(t.id==='f-to'){ui.filters.to=t.value;renderTxList();return}
  if(t.id==='qa-category'){
    const w=document.getElementById('qa-custom-wrap');
    if(w)w.style.display=t.value==='__custom__'?'flex':'none';
    if(t.value==='__custom__'){const c=document.getElementById('qa-custom');if(c)c.focus()}
    return;
  }
  if(t.id==='tx-category'){
    const w=document.getElementById('tx-custom-wrap');
    if(w)w.style.display=t.value==='__custom__'?'flex':'none';
    if(t.value==='__custom__'){const c=document.getElementById('tx-custom');if(c)c.focus()}
    return;
  }
  if(t.id==='budget-category'){
    const w=document.getElementById('budget-custom-wrap');
    if(w)w.style.display=t.value==='__custom__'?'flex':'none';
    if(t.value==='__custom__'){const c=document.getElementById('budget-custom');if(c)c.focus()}
    return;
  }
  if(t.id==='tx-recurring'){
    const b=document.getElementById('repeat-box');if(b)b.style.display=t.checked?'flex':'none';return;
  }
});

document.addEventListener('submit',function(e){
  const f=e.target;
  if(!f.dataset.form)return;
  e.preventDefault();
  const d=new FormData(f),form=f.dataset.form,id=f.dataset.id;
  if(form==='tx'){
    const active=document.querySelector('.type-tab.active');
    const type=active?active.dataset.type:'expense';
    const amount=parseAmount(d.get('amount'));
    const accountId=d.get('accountId');
    const toAccountId=type==='transfer'?d.get('toAccountId'):null;
    if(amount<=0){toast('Nominal harus lebih dari 0','err');return}
    if(!accountId){toast('Pilih dompet terlebih dahulu','err');return}
    if(type==='transfer'&&(!toAccountId||toAccountId===accountId)){toast('Pilih dompet tujuan yang berbeda','err');return}
    const date=String(d.get('date')||'');
    if(!date){toast('Tanggal wajib diisi','err');return}
    const old=id?byId(state.transactions,id):null;
    let cat=type==='transfer'?'Transfer':d.get('category');
    if(cat==='__custom__'){
      cat=registerCustomCategory(d.get('customCategory'));
      if(!cat){toast('Nama kategori wajib diisi (maks. 24 karakter)','err');return}
    }
    const payload={date,type,amount,category:cat,
      subcategory:type==='transfer'?(d.get('subcategory')||'Antar Dompet'):(d.get('subcategory')||''),
      accountId,toAccountId,note:d.get('note')||'',tags:parseTags(d.get('tags'))};
    const wantsRecurring=!!d.get('recurring');
    let recId=old?old.recurringId:null;
    if(wantsRecurring){
      const template={id:recId||uid(),type,amount,category:payload.category,subcategory:payload.subcategory,
        accountId,toAccountId,note:payload.note||payload.category,tags:payload.tags,
        frequency:d.get('frequency')||'monthly',startDate:d.get('startDate')||date.slice(0,10),
        nextDate:d.get('startDate')||date.slice(0,10),endDate:d.get('endDate')||null,active:true};
      const idx=state.recurring.findIndex(r=>r.id===template.id);
      if(idx>=0){template.active=state.recurring[idx].active;state.recurring[idx]=template}
      else state.recurring.push(template);
      recId=template.id;
    }else if(recId){state.recurring=state.recurring.filter(r=>r.id!==recId)}
    if(old){Object.assign(old,payload);old.recurringId=wantsRecurring?recId:null;old.updatedAt=new Date().toISOString()}
    else if(!wantsRecurring){
      state.transactions.push(Object.assign({id:uid(),recurringId:null,auto:false,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()},payload));
    }
    processRecurring();saveState();closeModal();renderView();
    toast(old?'Transaksi diperbarui':(wantsRecurring?'Jadwal berulang dibuat':'Transaksi ditambahkan'));
    return;
  }
  if(form==='quick'){
    const amount=parseAmount(d.get('amount'));
    if(amount<=0){toast('Nominal harus lebih dari 0','err');return}
    let cat=d.get('category');
    if(cat==='__custom__'){
      cat=registerCustomCategory(d.get('customCategory'));
      if(!cat){toast('Nama kategori wajib diisi','err');return}
    }
    const acc=(state.accounts[0]||{}).id;
    if(!acc){toast('Buat dompet dulu di menu Dompet & Akun','err');return}
    state.transactions.push({id:uid(),recurringId:null,auto:false,date:isoDT(new Date()),type:'expense',
      amount,category:cat,subcategory:'',accountId:acc,toAccountId:null,note:d.get('note')||'',tags:[],
      createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()});
    ui.month=currentMonth();saveState();renderView();
    const a=document.querySelector('.quick-add [name=amount]');if(a)a.focus();
    toast('Tercatat: '+fmt(amount)+' · '+cat);
    return;
  }
  if(form==='budget'){
    let cat=f.dataset.cat||d.get('category');
    if(cat==='__custom__'){
      cat=registerCustomCategory(d.get('customCategory'));
      if(!cat){toast('Nama kategori wajib diisi (maks. 24 karakter)','err');return}
    }
    const limit=parseAmount(d.get('limit'));
    if(!cat){toast('Pilih kategori','err');return}
    if(limit<=0){delete state.budgets[cat];toast('Anggaran dihapus (nominal 0)','warn')}
    else{state.budgets[cat]=limit;toast('Anggaran disimpan')}
    saveState();closeModal();renderView();return;
  }
  if(form==='goal'){
    const name=String(d.get('name')||'').trim();
    const target=parseAmount(d.get('target')),saved=parseAmount(d.get('saved'));
    if(!name||target<=0){toast('Nama dan target wajib diisi','err');return}
    const data={name,emoji:d.get('emoji')||'T',target,saved,deadline:d.get('deadline')||null};
    if(id){Object.assign(byId(state.goals,id),data)}else{state.goals.push(Object.assign({id:uid(),createdAt:new Date().toISOString()},data))}
    saveState();closeModal();renderView();toast('Target disimpan');return;
  }
  if(form==='contribute'){
    const g=byId(state.goals,id);const amt=parseAmount(d.get('amount'));
    if(!g||amt<=0){toast('Nominal tidak valid','err');return}
    g.saved+=amt;saveState();closeModal();renderView();toast('Tabungan bertambah '+fmt(amt));return;
  }
  if(form==='account'){
    const name=String(d.get('name')||'').trim();if(!name){toast('Nama wajib diisi','err');return}
    const raw=String(d.get('initial')||'0').replace(/\D/g,'');
    const initial=d.get('initial').trim().startsWith('-')?-parseAmount(raw):parseAmount(raw);
    const data={name,type:d.get('type'),initialBalance:initial};
    if(id){Object.assign(byId(state.accounts,id),data)}else{state.accounts.push(Object.assign({id:uid(),createdAt:new Date().toISOString()},data))}
    saveState();closeModal();renderView();toast('Dompet disimpan');return;
  }
  if(form==='recurring'){
    const r=byId(state.recurring,id);if(!r)return;
    r.note=d.get('note')||r.note;r.amount=parseAmount(d.get('amount'));
    r.frequency=d.get('frequency');r.startDate=d.get('startDate');r.nextDate=d.get('startDate');
    r.endDate=d.get('endDate')||null;
    saveState();processRecurring();closeModal();renderView();toast('Jadwal diperbarui');return;
  }
});

document.addEventListener('keydown',function(e){
  if(e.key==='Escape'){
    if(modalRoot.classList.contains('show'))closeModal();
    else{document.getElementById('sidebar').classList.remove('open');document.getElementById('overlay').classList.remove('show')}
    return;
  }
  const tag=((e.target&&e.target.tagName)||'').toLowerCase();
  const typing=tag==='input'||tag==='textarea'||tag==='select'||(e.target&&e.target.isContentEditable);
  if(typing||e.ctrlKey||e.metaKey||e.altKey||modalRoot.classList.contains('show'))return;
  if(e.key==='n'||e.key==='N'){e.preventDefault();openTxModal();return}
  if(e.key==='/'){
    const a=document.querySelector('.quick-add [name=amount]');
    e.preventDefault();
    if(a)a.focus();else openTxModal();
  }
});

/* ============================ INIT ============================ */
syncCustomCats();
processRecurring();
saveState();
renderView();
