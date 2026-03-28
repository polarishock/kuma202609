import { useState, useEffect, createContext, useContext, ReactNode, FormEvent } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, Navigate, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Calendar, Briefcase, Languages, Users, LogOut, Plus, Trash2, Volume2, ChevronRight, Lock, Receipt, Wallet, ShieldCheck, Phone, AlertCircle, Info, X } from 'lucide-react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { cn } from './lib/utils';
import { ITINERARY, MEMBERS, PHRASES, LOCATION_DETAILS } from './constants';
import { PrepItem, Member, Phrase, Expense, LocationDetail } from './types';

// --- Auth Context ---

interface AuthContextType {
  user: Member | null;
  login: (member: Member) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

// --- Components ---

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2500); // Increased time slightly for better experience
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-latte-paper">
      <div className="w-64 h-64">
        <DotLottieReact
          src="/lotties/dog-walking.lottie"
          loop
          autoplay
        />
      </div>
      <h1 className="mt-4 text-2xl tracking-widest text-latte-accent serif">北九州之旅</h1>
      <p className="mt-2 text-sm tracking-widest text-latte-accent/60 uppercase">Verifying Access</p>
    </div>
  );
};

const Header = () => {
  const { user } = useAuth();
  const [dotLottie, setDotLottie] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const togglePlay = () => {
    if (dotLottie) {
      if (isPlaying) {
        dotLottie.pause();
      } else {
        dotLottie.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FBFBF9]/80 backdrop-blur-md border-b border-latte-accent/5 px-6 py-4 flex justify-between items-center">
      <div>
        <h2 className="text-sm font-bold text-slate-800">北九州之旅</h2>
        <p className="text-[10px] text-slate-400 uppercase tracking-widest">September 2026, 25 to 28</p>
      </div>
      <div className="flex items-center gap-0">
        <div 
          className="w-16 h-16 -my-4 -mr-2 cursor-pointer active:scale-90 transition-transform"
          onClick={togglePlay}
          title={isPlaying ? "點擊暫停" : "點擊播放"}
        >
          <DotLottieReact
            src="/lotties/dog-walking.lottie"
            loop
            autoplay
            dotLottieRefCallback={setDotLottie}
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-latte-accent">{user?.name}</span>
          <div className="w-8 h-8 rounded-full overflow-hidden border border-latte-accent/20">
            <img 
              src={user?.avatar} 
              alt={user?.name} 
              className="w-full h-full object-cover"
              onError={(e) => { (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${user?.id}/100`; }}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

const LoginPage = () => {
  const { login } = useAuth();
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleLogin = () => {
    if (password === '20261758' && selectedMember) {
      setIsVerifying(true);
      setTimeout(() => {
        login(selectedMember);
      }, 1500);
    } else {
      setError(true);
      setTimeout(() => setError(false), 500);
    }
  };

  if (isVerifying) {
    return <LoadingScreen onComplete={() => {}} />;
  }

  return (
    <div className="min-h-screen bg-latte-paper flex flex-col items-center justify-center px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl serif italic text-latte-accent mb-2">北九州之旅</h1>
        <p className="text-xs tracking-[0.3em] text-latte-accent/60 uppercase">Member Login</p>
      </div>

      {!selectedMember ? (
        <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
          {MEMBERS.map((member) => (
            <motion.button
              key={member.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedMember(member)}
              className="flex flex-col items-center p-6 bg-white rounded-xl magazine-shadow border border-latte-accent/5"
            >
              <div className="w-20 h-20 rounded-full overflow-hidden mb-4 border-2 border-latte-light">
                <img 
                  src={member.avatar} 
                  alt={member.name} 
                  className="w-full h-full object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${member.id}/200`; }}
                />
              </div>
              <span className="text-sm font-bold text-slate-800">{member.name}</span>
            </motion.button>
          ))}
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-sm bg-white p-8 rounded-2xl magazine-shadow border border-latte-accent/5 text-center"
        >
          <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-6 border-4 border-latte-light">
            <img 
              src={selectedMember.avatar} 
              alt={selectedMember.name} 
              className="w-full h-full object-cover"
              onError={(e) => { (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${selectedMember.id}/200`; }}
            />
          </div>
          <h2 className="text-xl font-bold mb-8">Hello, {selectedMember.name}</h2>
          
          <div className="relative mb-6">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              placeholder="Enter Password"
              autoFocus
              className={cn(
                "w-full px-4 py-4 bg-latte-light rounded-xl text-center font-bold tracking-widest focus:outline-none transition-all",
                error ? "border-2 border-red-400 animate-shake" : "border-2 border-transparent focus:border-latte-accent/20"
              )}
            />
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-latte-accent/40">
              <Lock size={18} />
            </div>
          </div>

          <div className="flex gap-3">
            <button 
              onClick={() => setSelectedMember(null)}
              className="flex-1 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest"
            >
              Back
            </button>
            <button 
              onClick={handleLogin}
              className="flex-[2] py-4 bg-latte-accent text-white rounded-xl text-xs font-bold uppercase tracking-widest magazine-shadow"
            >
              Login
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

const PageWrapper = ({ children }: { children: ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.4, ease: "easeOut" }}
    className="pb-40"
  >
    {children}
  </motion.div>
);

// --- Pages ---

const LocationModal = ({ detail, onClose }: { detail: LocationDetail, onClose: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-center justify-center px-6 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="bg-white w-full max-w-sm rounded-3xl overflow-hidden magazine-shadow relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 pb-0 flex items-start justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-latte-accent font-bold mb-1">Location Spotlight</p>
            <h3 className="text-3xl serif italic text-slate-800">{detail.location}</h3>
          </div>
          <button 
            onClick={onClose}
            className="p-2 bg-latte-light text-latte-accent rounded-full hover:bg-latte-accent hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto no-scrollbar">
          <section className="space-y-2">
            <h4 className="text-[10px] font-bold text-latte-accent uppercase tracking-widest flex items-center gap-2">
              <div className="w-4 h-px bg-latte-accent" /> 歷史背景
            </h4>
            <p className="text-sm text-slate-600 leading-relaxed italic">
              {detail.history}
            </p>
          </section>

          <div className="grid grid-cols-2 gap-6">
            <section className="space-y-3">
              <h4 className="text-[10px] font-bold text-latte-accent uppercase tracking-widest">必做清單</h4>
              <ul className="space-y-2">
                {detail.mustDo.map((item, i) => (
                  <li key={i} className="text-xs text-slate-500 flex items-start gap-2">
                    <span className="text-latte-accent mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="space-y-3">
              <h4 className="text-[10px] font-bold text-latte-accent uppercase tracking-widest">推薦美食</h4>
              <ul className="space-y-2">
                {detail.food.map((item, i) => (
                  <li key={i} className="text-xs text-slate-500 flex items-start gap-2">
                    <span className="text-latte-accent mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>

        <div className="p-6 bg-latte-light/30 border-t border-latte-accent/5 text-center">
          <p className="text-[10px] text-slate-400 uppercase tracking-[0.3em]">Enjoy Your Journey</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

const HomePage = () => {
  const [activeDay, setActiveDay] = useState(1);
  const [selectedLocation, setSelectedLocation] = useState<LocationDetail | null>(null);
  const currentDayPlan = ITINERARY.find(d => d.day === activeDay) || ITINERARY[0];

  const handleNextDay = () => {
    if (activeDay < ITINERARY.length) {
      setActiveDay(activeDay + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevDay = () => {
    if (activeDay > 1) {
      setActiveDay(activeDay - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const onDragEnd = (event: any, info: any) => {
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold) {
      handleNextDay();
    } else if (info.offset.x > swipeThreshold) {
      handlePrevDay();
    }
  };

  return (
    <PageWrapper>
      <div className="sticky top-0 z-30 bg-latte-paper/80 backdrop-blur-md px-6 py-4">
        <div className="flex gap-3 overflow-x-auto no-scrollbar">
          {ITINERARY.map((day) => (
            <button
              key={day.day}
              onClick={() => {
                setActiveDay(day.day);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={cn(
                "px-6 py-2 rounded-full text-xs font-bold tracking-widest transition-all whitespace-nowrap",
                activeDay === day.day 
                  ? "bg-latte-accent text-white magazine-shadow" 
                  : "bg-white text-slate-400 border border-latte-accent/10"
              )}
            >
              DAY 0{day.day}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={activeDay}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={onDragEnd}
          className="pb-40 cursor-grab active:cursor-grabbing"
        >
          <div className="relative h-64 overflow-hidden">
            <img 
              src={currentDayPlan.image} 
              alt={`Day ${currentDayPlan.day}`} 
              className="object-cover w-full h-full"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute bottom-6 left-6 text-white">
              <h2 className="text-4xl serif italic">Day 0{currentDayPlan.day}</h2>
              <p className="text-sm tracking-widest opacity-80">{currentDayPlan.date} KYUSHU JOURNEY</p>
            </div>
          </div>
          
          <div className="px-6 mt-8 space-y-8">
            {currentDayPlan.items.map((item) => (
              <div key={item.id} className="flex gap-6 group">
                <div className="flex flex-col items-center">
                  <div className="text-xs font-bold tracking-tighter text-latte-accent">{item.time}</div>
                  <div className="w-px h-full mt-2 bg-latte-accent/20" />
                </div>
                <div className="flex-1 pb-8 border-b border-latte-accent/5">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-bold text-slate-800">{item.location}</h3>
                        {LOCATION_DETAILS.some(d => d.location === item.location) && (
                          <button 
                            onClick={() => setSelectedLocation(LOCATION_DETAILS.find(d => d.location === item.location) || null)}
                            className="p-1 text-latte-accent hover:bg-latte-light rounded-full transition-colors"
                          >
                            <Info size={14} />
                          </button>
                        )}
                      </div>
                      <p className="mt-1 text-sm text-slate-500 leading-relaxed">{item.description}</p>
                    </div>
                    {item.mapUrl && (
                      <a 
                        href={item.mapUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-2 transition-colors rounded-full bg-latte-light text-latte-accent hover:bg-latte-accent hover:text-white"
                      >
                        <MapPin size={18} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {activeDay < ITINERARY.length && (
              <button 
                onClick={handleNextDay}
                className="w-full py-6 mt-8 border-2 border-dashed border-latte-accent/10 rounded-2xl flex flex-col items-center justify-center gap-2 group hover:border-latte-accent/30 transition-all"
              >
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Next Day</div>
                <div className="text-xl serif italic text-latte-accent group-hover:translate-x-1 transition-transform">
                  前往 Day 0{activeDay + 1} <ChevronRight className="inline-block" size={20} />
                </div>
              </button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        {selectedLocation && (
          <LocationModal 
            detail={selectedLocation} 
            onClose={() => setSelectedLocation(null)} 
          />
        )}
      </AnimatePresence>
    </PageWrapper>
  );
};

const BookingsPage = () => {
  const [activeTab, setActiveTab] = useState<'flight' | 'hotel' | 'transport'>('flight');

  return (
    <PageWrapper>
      <div className="px-6 pt-8">
        <h1 className="text-3xl serif mb-8">預定資訊</h1>
        
        <div className="flex gap-2 p-1 mb-8 rounded-xl bg-latte-light">
          {(['flight', 'hotel', 'transport'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "flex-1 py-2 text-xs font-bold tracking-widest uppercase rounded-lg transition-all",
                activeTab === tab ? "bg-white text-latte-accent magazine-shadow" : "text-slate-400"
              )}
            >
              {tab === 'flight' ? '機票' : tab === 'hotel' ? '住宿' : '交通'}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'flight' && (
            <motion.div
              key="flight"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="space-y-4"
            >
              <div className="p-6 bg-white rounded-xl magazine-shadow border border-latte-accent/5">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-xs font-bold text-latte-accent tracking-widest uppercase">STARLUX AIRLINES (去程)</span>
                  <span className="px-2 py-1 bg-latte-light text-[10px] font-bold rounded">JX846</span>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold">TPE</div>
                    <div className="text-[10px] text-slate-400">07:30</div>
                  </div>
                  <div className="flex-1 flex flex-col items-center px-4">
                    <div className="w-full h-px bg-latte-accent/20 relative">
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2">
                        <ChevronRight size={14} className="text-latte-accent" />
                      </div>
                    </div>
                    <span className="mt-2 text-[10px] text-slate-400">2H 15M</span>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">KMJ</div>
                    <div className="text-[10px] text-slate-400">10:45</div>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-white rounded-xl magazine-shadow border border-latte-accent/5">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-xs font-bold text-latte-accent tracking-widest uppercase">STARLUX AIRLINES (回程)</span>
                  <span className="px-2 py-1 bg-latte-light text-[10px] font-bold rounded">JX847</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold">KMJ</div>
                    <div className="text-[10px] text-slate-400">11:55</div>
                  </div>
                  <div className="flex-1 flex flex-col items-center px-4">
                    <div className="w-full h-px bg-latte-accent/20 relative">
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2">
                        <ChevronRight size={14} className="text-latte-accent rotate-180" />
                      </div>
                    </div>
                    <span className="mt-2 text-[10px] text-slate-400">2H 25M</span>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">TPE</div>
                    <div className="text-[10px] text-slate-400">13:20</div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'hotel' && (
            <motion.div
              key="hotel"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="space-y-4"
            >
              <div className="p-6 bg-white rounded-xl magazine-shadow border border-latte-accent/5">
                <h3 className="text-lg font-bold mb-2">熊本相鐵FRESHA</h3>
                <p className="text-sm text-slate-500 mb-4">Sotetsu Fresa Inn Kumamoto-Shimotori</p>
                <div className="text-xs text-slate-400 space-y-2">
                  <p>地址：2 Chome-2-23 Shimotori, Chuo Ward, Kumamoto, 860-0807日本</p>
                  <p>電話：+81 96-353-0203</p>
                  <p className="pt-2 border-t border-latte-accent/5">入住：15:00 | 退房：11:00</p>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'transport' && (
            <motion.div
              key="transport"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="space-y-4"
            >
              <div className="p-6 bg-white rounded-xl magazine-shadow border border-latte-accent/5">
                <h3 className="text-lg font-bold mb-2">JR 全九州鐵路周遊券</h3>
                <p className="text-sm text-slate-500 mb-4">3日券 (連續使用)</p>
                <div className="text-xs text-slate-400 space-y-1">
                  <p>兌換地點：JR 博多站綠色窗口</p>
                  <p>需攜帶：護照、預約憑證</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageWrapper>
  );
};

const ExpensesPage = () => {
  const [expenses, setExpenses] = useState<Expense[]>(() => {
    const saved = localStorage.getItem('trip-expenses');
    return saved ? JSON.parse(saved) : [];
  });
  const [amount, setAmount] = useState('');
  const [item, setItem] = useState('');
  const [category, setCategory] = useState<Expense['category']>('food');
  const [payerId, setPayerId] = useState(MEMBERS[0].id);
  const [showAdd, setShowAdd] = useState(false);

  useEffect(() => {
    localStorage.setItem('trip-expenses', JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = (e: FormEvent) => {
    e.preventDefault();
    if (!amount || !item) return;

    const newExpense: Expense = {
      id: Date.now().toString(),
      amount: parseFloat(amount),
      item,
      category,
      payerId,
      date: new Date().toLocaleDateString(),
    };

    setExpenses([newExpense, ...expenses]);
    setAmount('');
    setItem('');
    setShowAdd(false);
  };

  const deleteExpense = (id: string) => {
    setExpenses(expenses.filter(e => e.id !== id));
  };

  const totalAmount = expenses.reduce((sum, e) => sum + e.amount, 0);
  const averageAmount = totalAmount / MEMBERS.length;

  return (
    <PageWrapper>
      <div className="px-6 pt-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl serif">記帳本</h1>
          <button 
            onClick={() => setShowAdd(!showAdd)}
            className="p-3 bg-latte-accent text-white rounded-full magazine-shadow"
          >
            {showAdd ? <Trash2 size={20} className="rotate-45" /> : <Plus size={20} />}
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="p-6 bg-latte-accent text-white rounded-2xl magazine-shadow">
            <div className="text-[10px] uppercase tracking-widest opacity-60 mb-1">總支出</div>
            <div className="text-2xl font-bold">¥ {totalAmount.toLocaleString()}</div>
          </div>
          <div className="p-6 bg-white border border-latte-accent/10 rounded-2xl magazine-shadow">
            <div className="text-[10px] uppercase tracking-widest text-slate-400 mb-1">每人平均</div>
            <div className="text-2xl font-bold text-latte-accent">¥ {Math.round(averageAmount).toLocaleString()}</div>
          </div>
        </div>

        <AnimatePresence>
          {showAdd && (
            <motion.form 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              onSubmit={addExpense}
              className="mb-8 p-6 bg-latte-light rounded-2xl space-y-4 overflow-hidden"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">金額 (JPY)</label>
                  <input 
                    type="number" 
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0"
                    className="w-full p-3 bg-white rounded-xl border-none focus:ring-2 focus:ring-latte-accent/20 font-bold"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">分類</label>
                  <select 
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full p-3 bg-white rounded-xl border-none focus:ring-2 focus:ring-latte-accent/20 text-sm"
                  >
                    <option value="food">食物</option>
                    <option value="transport">交通</option>
                    <option value="shopping">購物</option>
                    <option value="other">其他</option>
                  </select>
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">品項名稱</label>
                <input 
                  type="text" 
                  value={item}
                  onChange={(e) => setItem(e.target.value)}
                  placeholder="例如：一蘭拉麵"
                  className="w-full p-3 bg-white rounded-xl border-none focus:ring-2 focus:ring-latte-accent/20"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">付款人</label>
                <select 
                  value={payerId}
                  onChange={(e) => setPayerId(e.target.value)}
                  className="w-full p-3 bg-white rounded-xl border-none focus:ring-2 focus:ring-latte-accent/20 text-sm"
                >
                  {MEMBERS.map(m => (
                    <option key={m.id} value={m.id}>{m.name}</option>
                  ))}
                </select>
              </div>
              <button 
                type="submit"
                className="w-full py-4 bg-latte-accent text-white rounded-xl font-bold uppercase tracking-widest text-xs magazine-shadow"
              >
                新增紀錄
              </button>
            </motion.form>
          )}
        </AnimatePresence>

        <div className="space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400">支出明細</h2>
          {expenses.length === 0 ? (
            <div className="text-center py-12 text-slate-400 italic text-sm">尚無支出紀錄</div>
          ) : (
            expenses.map((exp) => {
              const payer = MEMBERS.find(m => m.id === exp.payerId);
              return (
                <div key={exp.id} className="p-4 bg-white rounded-xl border border-latte-accent/5 flex items-center gap-4 magazine-shadow">
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center",
                    exp.category === 'food' ? "bg-orange-100 text-orange-500" :
                    exp.category === 'transport' ? "bg-blue-100 text-blue-500" :
                    exp.category === 'shopping' ? "bg-purple-100 text-purple-500" : "bg-slate-100 text-slate-500"
                  )}>
                    {exp.category === 'food' ? <Receipt size={18} /> : 
                     exp.category === 'transport' ? <MapPin size={18} /> :
                     exp.category === 'shopping' ? <Briefcase size={18} /> : <Wallet size={18} />}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-slate-800">{exp.item}</h4>
                      <span className="font-bold text-latte-accent">¥ {exp.amount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-[10px] text-slate-400 uppercase tracking-widest">
                        {payer?.name} 代墊 • {exp.date}
                      </span>
                      <button 
                        onClick={() => deleteExpense(exp.id)}
                        className="text-slate-300 hover:text-red-400 transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </PageWrapper>
  );
};

const DEFAULT_PREP_ITEMS: PrepItem[] = [
  // 手提行李 (hand)
  { id: 'h1', text: '重要文件', completed: false, category: 'hand', isHeader: true },
  { id: 'h2', text: '護照', completed: false, category: 'hand' },
  { id: 'h3', text: '護照影本', completed: false, category: 'hand' },
  { id: 'h4', text: '大頭照2張', completed: false, category: 'hand' },
  { id: 'h5', text: '身分證', completed: false, category: 'hand' },
  { id: 'h6', text: '信用卡', completed: false, category: 'hand' },
  { id: 'h7', text: '日幣現金', completed: false, category: 'hand' },
  { id: 'h8', text: '機票/登機證', completed: false, category: 'hand' },
  { id: 'h9', text: '住宿證明', completed: false, category: 'hand' },
  { id: 'h10', text: '機上用品', completed: false, category: 'hand', isHeader: true },
  { id: 'h11', text: '水壺', completed: false, category: 'hand' },
  { id: 'h12', text: '頸枕', completed: false, category: 'hand' },
  { id: 'h13', text: '眼罩', completed: false, category: 'hand' },
  { id: 'h14', text: '筆', completed: false, category: 'hand' },
  { id: 'h15', text: '3C產品', completed: false, category: 'hand', isHeader: true },
  { id: 'h16', text: '手機', completed: false, category: 'hand' },
  { id: 'h17', text: 'SIM卡', completed: false, category: 'hand' },
  { id: 'h18', text: '充電線', completed: false, category: 'hand' },
  { id: 'h19', text: '行動電源', completed: false, category: 'hand' },
  { id: 'h20', text: '相機', completed: false, category: 'hand' },
  { id: 'h21', text: '耳機', completed: false, category: 'hand' },
  { id: 'h22', text: '其他', completed: false, category: 'hand', isHeader: true },
  { id: 'h23', text: '衛生紙/棉', completed: false, category: 'hand' },
  { id: 'h24', text: '個人藥品', completed: false, category: 'hand' },
  { id: 'h25', text: '乳液等(小於100ml)', completed: false, category: 'hand' },

  // 托運行李 (checked)
  { id: 'c1', text: '衣物類', completed: false, category: 'checked', isHeader: true },
  { id: 'c2', text: '外出服', completed: false, category: 'checked' },
  { id: 'c3', text: '睡衣', completed: false, category: 'checked' },
  { id: 'c4', text: '內衣褲', completed: false, category: 'checked' },
  { id: 'c5', text: '襪子', completed: false, category: 'checked' },
  { id: 'c6', text: '圍巾', completed: false, category: 'checked' },
  { id: 'c7', text: '手套', completed: false, category: 'checked' },
  { id: 'c8', text: '拖鞋', completed: false, category: 'checked' },
  { id: 'c9', text: '太陽眼鏡', completed: false, category: 'checked' },
  { id: 'c10', text: '帽子', completed: false, category: 'checked' },
  { id: 'c11', text: '盥洗類', completed: false, category: 'checked', isHeader: true },
  { id: 'c12', text: '牙刷', completed: false, category: 'checked' },
  { id: 'c13', text: '牙膏', completed: false, category: 'checked' },
  { id: 'c14', text: '洗發精', completed: false, category: 'checked' },
  { id: 'c15', text: '沐浴乳', completed: false, category: 'checked' },
  { id: 'c16', text: '洗面乳', completed: false, category: 'checked' },
  { id: 'c17', text: '梳子', completed: false, category: 'checked' },
  { id: 'c18', text: '刮鬍刀', completed: false, category: 'checked' },
  { id: 'c19', text: '指甲剪', completed: false, category: 'checked' },
  { id: 'c20', text: '毛巾', completed: false, category: 'checked' },
  { id: 'c21', text: '保養品', completed: false, category: 'checked' },
  { id: 'c22', text: '防曬乳', completed: false, category: 'checked' },
  { id: 'c23', text: '其他', completed: false, category: 'checked', isHeader: true },
  { id: 'c24', text: '環保購物袋', completed: false, category: 'checked' },
  { id: 'c25', text: '環保餐具', completed: false, category: 'checked' },
  { id: 'c26', text: '掛勾/摺疊衣架', completed: false, category: 'checked' },
  { id: 'c27', text: '口罩', completed: false, category: 'checked' },
  { id: 'c28', text: '酒精棉片', completed: false, category: 'checked' },
  { id: 'c29', text: '摺疊傘', completed: false, category: 'checked' },
  { id: 'c30', text: '行李吊牌', completed: false, category: 'checked' },
  { id: 'c31', text: '電子秤', completed: false, category: 'checked' },

  // 注意事項 (notes)
  { id: 'n1', text: '注意事項', completed: false, category: 'notes', isHeader: true },
  { id: 'n2', text: '只能手提: 行動電源/鋰電池, 打火機', completed: false, category: 'notes' },
  { id: 'n3', text: '只能託運: 刀類, 尖銳物品, 單瓶超過100ml液體', completed: false, category: 'notes' },
  { id: 'n4', text: '只能託運: 管徑超過1cm,收合超過60cm之自拍棒或腳架', completed: false, category: 'notes' },

  // 其他準備 (essential)
  { id: 'e1', text: '其他準備', completed: false, category: 'essential', isHeader: true },
  { id: 'e2', text: '旅遊保險', completed: false, category: 'essential' },

  // APP (apps)
  { id: 'a1', text: '推薦 APP', completed: false, category: 'apps', isHeader: true },
  { id: 'a2', text: 'Japan Transit Planner', completed: false, category: 'apps' },
  { id: 'a3', text: '食べログ Tabelog', completed: false, category: 'apps' },
  { id: 'a4', text: 'TaxiGO', completed: false, category: 'apps' },
  { id: 'a5', text: 'Payke', completed: false, category: 'apps' },
  { id: 'a6', text: 'tenki.jp', completed: false, category: 'apps' },
];

const PrepPage = () => {
  const [items, setItems] = useState<PrepItem[]>(() => {
    const saved = localStorage.getItem('prep-items');
    if (saved) {
      const parsed = JSON.parse(saved);
      return parsed.length > 0 ? parsed : DEFAULT_PREP_ITEMS;
    }
    return DEFAULT_PREP_ITEMS;
  });
  const [category, setCategory] = useState<PrepItem['category']>('hand');
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    localStorage.setItem('prep-items', JSON.stringify(items));
  }, [items]);

  const resetToDefaults = () => {
    if (window.confirm('確定要重置清單為預設項目嗎？這將會清除您目前的勾選狀態。')) {
      setItems(DEFAULT_PREP_ITEMS);
    }
  };

  const addItem = () => {
    if (!inputValue.trim()) return;
    const newItem: PrepItem = {
      id: Date.now().toString(),
      text: inputValue,
      completed: false,
      category
    };
    setItems([...items, newItem]);
    setInputValue('');
  };

  const toggleItem = (id: string) => {
    setItems(items.map(item => item.id === id ? { ...item, completed: !item.completed } : item));
  };

  const deleteItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const categories: { id: PrepItem['category'], label: string }[] = [
    { id: 'hand', label: '手提' },
    { id: 'checked', label: '托運' },
    { id: 'essential', label: '準備' },
    { id: 'apps', label: 'APP' },
    { id: 'notes', label: '注意' },
    { id: 'shopping', label: '購物' },
  ];

  return (
    <PageWrapper>
      <div className="px-6 pt-8 pb-40">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl serif">行前準備</h1>
          <button 
            onClick={resetToDefaults}
            className="text-[10px] font-bold text-latte-accent uppercase tracking-widest px-3 py-1 border border-latte-accent/20 rounded-full hover:bg-latte-accent hover:text-white transition-all"
          >
            重置清單
          </button>
        </div>
        
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              className={cn(
                "px-4 py-2 text-xs font-bold whitespace-nowrap rounded-full transition-all border",
                category === cat.id 
                  ? "bg-latte-accent text-white border-latte-accent" 
                  : "bg-white text-slate-400 border-latte-accent/10"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="flex gap-2 mb-8">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addItem()}
            placeholder="新增項目..."
            className="flex-1 px-4 py-3 bg-white rounded-xl border border-latte-accent/10 focus:outline-none focus:ring-2 focus:ring-latte-accent/20"
          />
          <button 
            onClick={addItem}
            className="p-3 bg-latte-accent text-white rounded-xl"
          >
            <Plus size={24} />
          </button>
        </div>

        <div className="space-y-3">
          {items.filter(item => item.category === category).map((item) => (
            <div 
              key={item.id}
              className={cn(
                "flex items-center gap-3 p-4 rounded-xl magazine-shadow transition-all",
                item.isHeader 
                  ? "bg-latte-light border-none mt-6 first:mt-0" 
                  : "bg-white border border-latte-accent/5"
              )}
            >
              {!item.isHeader && (
                <button 
                  onClick={() => toggleItem(item.id)}
                  className={cn(
                    "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors",
                    item.completed ? "bg-latte-accent border-latte-accent" : "border-latte-accent/20"
                  )}
                >
                  {item.completed && <div className="w-2 h-2 bg-white rounded-full" />}
                </button>
              )}
              <span className={cn(
                "flex-1",
                item.isHeader ? "text-xs font-bold text-latte-accent uppercase tracking-widest" : "text-sm",
                item.completed && "text-slate-300 line-through"
              )}>
                {item.text}
              </span>
              {!item.isHeader && (
                <button onClick={() => deleteItem(item.id)} className="text-slate-300 hover:text-red-400">
                  <Trash2 size={16} />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
};

const TranslatePage = () => {
  const [activeCategory, setActiveCategory] = useState<Phrase['category']>('basic');

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ja-JP';
    window.speechSynthesis.speak(utterance);
  };

  const categories: { id: Phrase['category'], label: string }[] = [
    { id: 'basic', label: '基本' },
    { id: 'dining', label: '用餐' },
    { id: 'shopping', label: '購物' },
    { id: 'transport', label: '交通' },
    { id: 'emergency', label: '緊急' },
  ];

  return (
    <PageWrapper>
      <div className="px-6 pt-8">
        <h1 className="text-3xl serif mb-8">實用日語</h1>

        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar mb-8">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "px-4 py-2 text-xs font-bold whitespace-nowrap rounded-full transition-all border",
                activeCategory === cat.id 
                  ? "bg-latte-accent text-white border-latte-accent" 
                  : "bg-white text-slate-400 border-latte-accent/10"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="grid gap-4">
          {PHRASES.filter(p => p.category === activeCategory).map((phrase) => (
            <div key={phrase.id} className="p-6 bg-white rounded-xl magazine-shadow border border-latte-accent/5">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-800">{phrase.zh}</h3>
                  <p className="text-sm text-latte-accent font-bold mt-1">{phrase.jp}</p>
                  <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-1">{phrase.romaji}</p>
                </div>
                <button 
                  onClick={() => speak(phrase.jp)}
                  className="p-3 bg-latte-light text-latte-accent rounded-full hover:bg-latte-accent hover:text-white transition-colors"
                >
                  <Volume2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
};

const MembersPage = () => {
  const { logout } = useAuth();
  const [showOath, setShowOath] = useState(false);

  const oathItems = [
    { title: '胃袋覺醒', content: '我宣誓：面對美食，絕不提起「體脂」二字！回國後的體重，是我對九州美食最基本的尊重。' },
    { title: '快樂購物', content: '我宣誓：踏進百貨公司與藥妝店的那刻起，我的字典裡沒有「預算」！看到喜歡的就下手，因為有些東西現在不買，回台灣後會後悔一輩子。' },
    { title: '情緒穩定', content: '我宣誓：無論遇到延誤、排隊還是下雨，我都會保持內心平靜。不抱怨、不臭臉、不當「氣氛破壞者」，因為只要大家在一起，哪裡都是好風景！' },
    { title: '迷路萬歲', content: '我宣誓：走錯路不叫迷路，叫「開發隱藏版景點」！如果導航出錯，那是 Google Map 想要休息，絕對不是我的錯。' },
    { title: '玩到斷腿', content: '我宣誓：絕對不喊累！如果腳酸了，那是因為九州的土地太迷人，黏住了我的鞋底，不讓我離開。' },
  ];

  return (
    <PageWrapper>
      <div className="px-6 pt-8 pb-40">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl serif">成員</h1>
          <button onClick={logout} className="p-2 text-slate-400 hover:text-latte-accent">
            <LogOut size={20} />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          {MEMBERS.map((member) => (
            <div key={member.id} className="flex flex-col items-center p-6 bg-white rounded-xl magazine-shadow border border-latte-accent/5">
              <div className="w-16 h-16 rounded-full overflow-hidden mb-3 border-2 border-latte-light">
                <img 
                  src={member.avatar} 
                  alt={member.name} 
                  className="w-full h-full object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${member.id}/200`; }}
                />
              </div>
              <span className="text-sm font-bold text-slate-800">{member.name}</span>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <button 
            onClick={() => setShowOath(!showOath)}
            className="w-full p-6 bg-latte-accent text-white rounded-2xl magazine-shadow flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <ShieldCheck size={24} />
              <div className="text-left">
                <h3 className="text-lg font-bold tracking-widest uppercase">旅遊宣誓</h3>
                <p className="text-[10px] opacity-60 uppercase tracking-widest">Travel Oath</p>
              </div>
            </div>
            <ChevronRight 
              size={20} 
              className={cn("transition-transform duration-300", showOath ? "rotate-90" : "")} 
            />
          </button>

          <AnimatePresence>
            {showOath && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="p-6 bg-white border border-latte-accent/10 rounded-2xl magazine-shadow space-y-6">
                  {oathItems.map((item, idx) => (
                    <div key={idx} className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-latte-accent bg-latte-light px-2 py-0.5 rounded uppercase tracking-widest">0{idx + 1}</span>
                        <h4 className="font-bold text-slate-800">【{item.title}】</h4>
                      </div>
                      <p className="text-sm text-slate-500 leading-relaxed pl-10">
                        {item.content}
                      </p>
                    </div>
                  ))}
                  <div className="pt-4 border-t border-latte-accent/5 text-center">
                    <p className="text-[10px] text-slate-400 italic">
                      — 2026 九州美食斷腿團 全體成員一致通過 —
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-12 p-6 bg-white border-2 border-red-50 rounded-2xl magazine-shadow space-y-6">
          <div className="flex items-center gap-3 text-red-500">
            <AlertCircle size={24} />
            <div>
              <h3 className="text-lg font-bold tracking-widest uppercase">緊急聯絡</h3>
              <p className="text-[10px] opacity-60 uppercase tracking-widest">Emergency Contacts</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-3 p-3 bg-red-50/50 rounded-xl border border-red-100 group transition-all">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-red-500 shadow-sm">
                  <Phone size={14} />
                </div>
                <div>
                  <div className="text-[10px] text-red-400 font-bold uppercase tracking-tighter">警察</div>
                  <div className="text-sm font-bold text-slate-800">110</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-red-50/50 rounded-xl border border-red-100 group transition-all">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-red-500 shadow-sm">
                  <Phone size={14} />
                </div>
                <div>
                  <div className="text-[10px] text-red-400 font-bold uppercase tracking-tighter">救護/火警</div>
                  <div className="text-sm font-bold text-slate-800">119</div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100 transition-all">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-slate-600 shadow-sm">
                <Phone size={18} />
              </div>
              <div className="flex-1">
                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">日本旅遊專線 (24H中文)</div>
                <div className="text-sm font-bold text-slate-800">050-3816-2787</div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-3">
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest pb-2 border-b border-slate-200">中華民國駐外辦事處 (大阪)</div>
              <div className="space-y-3">
                <div className="flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-latte-accent shadow-sm">
                      <Phone size={14} />
                    </div>
                    <span className="text-xs font-medium text-slate-600">急難救助專線</span>
                  </div>
                  <span className="text-sm font-bold text-slate-800">090-8794-4568</span>
                </div>
                <div className="flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-latte-accent shadow-sm">
                      <Phone size={14} />
                    </div>
                    <span className="text-xs font-medium text-slate-600">辦公室電話</span>
                  </div>
                  <span className="text-sm font-bold text-slate-800">06-6227-8623</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-latte-light/30 rounded-xl border border-latte-accent/10 transition-all">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-latte-accent shadow-sm">
                <Phone size={18} />
              </div>
              <div className="flex-1">
                <div className="text-[10px] text-latte-accent/60 font-bold uppercase tracking-widest">外交部緊急服務專線</div>
                <div className="text-sm font-bold text-slate-800">+886-3-398-5807</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

// --- Main Layout ---

const AppContent = () => {
  const { user } = useAuth();

  if (!user) {
    return <LoginPage />;
  }

  return (
    <div className="min-h-screen bg-latte-paper">
      <main className="max-w-md mx-auto bg-white min-h-screen relative shadow-2xl">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/bookings" element={<BookingsPage />} />
          <Route path="/expenses" element={<ExpensesPage />} />
          <Route path="/prep" element={<PrepPage />} />
          <Route path="/translate" element={<TranslatePage />} />
          <Route path="/members" element={<MembersPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md glass-nav flex justify-between items-stretch z-40 rounded-t-[2rem] overflow-hidden shadow-[0_-8px_30px_rgb(0,0,0,0.04)]">
          <NavLink to="/" className={({ isActive }) => cn("flex-1 flex flex-col items-center justify-center gap-1.5 py-4 pt-5 pb-[calc(1.25rem+env(safe-area-inset-bottom,1.5rem))] transition-all active:scale-95", isActive ? "text-latte-accent bg-latte-accent/5" : "text-slate-400 hover:bg-slate-50/50")}>
            <Calendar size={22} strokeWidth={2.5} />
            <span className="text-[10px] font-bold uppercase tracking-tighter">旅程</span>
          </NavLink>
          <NavLink to="/bookings" className={({ isActive }) => cn("flex-1 flex flex-col items-center justify-center gap-1.5 py-4 pt-5 pb-[calc(1.25rem+env(safe-area-inset-bottom,1.5rem))] transition-all active:scale-95", isActive ? "text-latte-accent bg-latte-accent/5" : "text-slate-400 hover:bg-slate-50/50")}>
            <ChevronRight size={22} strokeWidth={2.5} className="rotate-[-90deg]" />
            <span className="text-[10px] font-bold uppercase tracking-tighter">預定</span>
          </NavLink>
          <NavLink to="/expenses" className={({ isActive }) => cn("flex-1 flex flex-col items-center justify-center gap-1.5 py-4 pt-5 pb-[calc(1.25rem+env(safe-area-inset-bottom,1.5rem))] transition-all active:scale-95", isActive ? "text-latte-accent bg-latte-accent/5" : "text-slate-400 hover:bg-slate-50/50")}>
            <Receipt size={22} strokeWidth={2.5} />
            <span className="text-[10px] font-bold uppercase tracking-tighter">記帳</span>
          </NavLink>
          <NavLink to="/prep" className={({ isActive }) => cn("flex-1 flex flex-col items-center justify-center gap-1.5 py-4 pt-5 pb-[calc(1.25rem+env(safe-area-inset-bottom,1.5rem))] transition-all active:scale-95", isActive ? "text-latte-accent bg-latte-accent/5" : "text-slate-400 hover:bg-slate-50/50")}>
            <Briefcase size={22} strokeWidth={2.5} />
            <span className="text-[10px] font-bold uppercase tracking-tighter">準備</span>
          </NavLink>
          <NavLink to="/translate" className={({ isActive }) => cn("flex-1 flex flex-col items-center justify-center gap-1.5 py-4 pt-5 pb-[calc(1.25rem+env(safe-area-inset-bottom,1.5rem))] transition-all active:scale-95", isActive ? "text-latte-accent bg-latte-accent/5" : "text-slate-400 hover:bg-slate-50/50")}>
            <Languages size={22} strokeWidth={2.5} />
            <span className="text-[10px] font-bold uppercase tracking-tighter">翻譯</span>
          </NavLink>
          <NavLink to="/members" className={({ isActive }) => cn("flex-1 flex flex-col items-center justify-center gap-1.5 py-4 pt-5 pb-[calc(1.25rem+env(safe-area-inset-bottom,1.5rem))] transition-all active:scale-95", isActive ? "text-latte-accent bg-latte-accent/5" : "text-slate-400 hover:bg-slate-50/50")}>
            <Users size={22} strokeWidth={2.5} />
            <span className="text-[10px] font-bold uppercase tracking-tighter">成員</span>
          </NavLink>
        </nav>
      </main>
    </div>
  );
};

export default function App() {
  const [user, setUser] = useState<Member | null>(() => {
    const saved = localStorage.getItem('auth-user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = (member: Member) => {
    localStorage.setItem('auth-user', JSON.stringify(member));
    setUser(member);
  };

  const logout = () => {
    localStorage.removeItem('auth-user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      <Router>
        <AppContent />
      </Router>
    </AuthContext.Provider>
  );
}
