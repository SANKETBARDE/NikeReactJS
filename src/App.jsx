import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useParams, Link, useNavigate } from 'react-router-dom';
import shoeAJ1OGC from './assets/AJ1OGC.png';
import shoeAJ1OWUB from './assets/AJ1OWUB.png';
import shoeAJ1TSO from './assets/AJ1TSO.png';
import shoeAJ4YT from './assets/AJ4YT.png';
import jordanLogo from './assets/jordan.jpg';
import './App.css';

// Sound Effects using Web Audio API
let soundEnabled = true;

const playSwoosh = () => {
  if (!soundEnabled) return;
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
  oscillator.frequency.exponentialRampToValueAtTime(600, audioContext.currentTime + 0.15);
  
  gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15);
  
  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + 0.15);
};

const playClick = () => {
  if (!soundEnabled) return;
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  oscillator.type = 'square';
  oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
  
  gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.08);
  
  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + 0.08);
};

const playSlide = () => {
  if (!soundEnabled) return;
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  oscillator.type = 'sawtooth';
  oscillator.frequency.setValueAtTime(150, audioContext.currentTime);
  oscillator.frequency.linearRampToValueAtTime(100, audioContext.currentTime + 0.3);
  
  gainNode.gain.setValueAtTime(0.03, audioContext.currentTime);
  gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.3);
  
  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + 0.3);
};

const toggleSound = () => {
  soundEnabled = !soundEnabled;
  return soundEnabled;
};

const shoes = [
  {
    id: 'og-chicago',
    model: 'AIR JORDAN 1',
    type: 'HIGH',
    name: 'OG CHICAGO',
    color: '#660413',
    img: shoeAJ1OGC,
    desc: 'The 1985 original that started it all. The Chicago colorway features the iconic red, white, and black that defined basketball footwear history. Worn by Michael Jordan during his rookie season, this silhouette revolutionized the game with its premium leather construction and Air cushioning technology. The "Banned" story only added to its legendary status, making it one of the most sought-after sneakers of all time.',
    sideTag: '1985 OG'
  },
  {
    id: 'ow-unc',
    model: 'AIR JORDAN 1',
    type: 'HIGH',
    name: 'OFF-WHITE UNC',
    color: '#1480a7',
    img: shoeAJ1OWUB,
    desc: 'Virgil Abloh\'s解构 masterpiece. The University Blue colorway features Off-White\'s signature deconstructed aesthetic with exposed foam, industrial text, and the iconic zip-tie. A collaboration that bridged streetwear and high fashion, creating one of the most influential sneakers of the modern era.',
    sideTag: 'THE TEN'
  },
  {
    id: 'travis-olive',
    model: 'AIR JORDAN 1',
    type: 'LOW',
    name: 'TRAVIS OLIVE',
    color: '#3c3527',
    img: shoeAJ1TSO,
    desc: 'Travis Scott\'s signature take on the AJ1 Low. Featuring reversed Swoosh branding, premium suede materials in earthy olive tones, and Cactus Jack detailing. This collaboration represents the fusion of Houston hip-hop culture with Jordan Brand heritage.',
    sideTag: 'CACTUS JACK'
  },
  {
    id: 'thunder',
    model: 'AIR JORDAN 4',
    type: 'RETRO',
    name: 'THUNDER',
    color: '#D4AF37',
    img: shoeAJ4YT,
    desc: 'Striking yellow and black contrast on the iconic AJ4 silhouette. The Thunder colorway brings bold energy to Tinker Hatfield\'s 1989 design, featuring mesh panels, signature wing eyelets, and visible Air cushioning. A statement piece that commands attention on and off the court.',
    sideTag: '2006 RETRO'
  }
];

function LoadingScreen({ onComplete }) {
  const [loadingWord, setLoadingWord] = useState('LOADING');
  const [progress, setProgress] = useState(0);
  const [hidden, setHidden] = useState(false);

  const loadingWords = ['LOADING', 'RUNNING', 'JUMPING', 'HOOPING', 'FLYING', 'DUNKING', 'SCORING'];

  useEffect(() => {
    let wordIndex = 0;
    const wordInterval = setInterval(() => {
      wordIndex = (wordIndex + 1) % loadingWords.length;
      setLoadingWord(loadingWords[wordIndex]);
    }, 400);

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const next = prev + Math.random() * 15;
        if (next >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return next;
      });
    }, 200);

    const timer = setTimeout(() => {
      clearInterval(wordInterval);
      setProgress(100);
      setTimeout(() => {
        setHidden(true);
        setTimeout(onComplete, 500);
      }, 300);
    }, 1500);

    return () => {
      clearInterval(wordInterval);
      clearInterval(progressInterval);
      clearTimeout(timer);
    };
  }, [onComplete]);

  return (
    <div className={`loader ${hidden ? 'hidden' : ''}`}>
      <div className="loader-logos">
        <div className="nike-logo-placeholder">NIKE</div>
        <span className="logo-separator">|</span>
        <div className="jordan-logo-placeholder">JORDAN</div>
      </div>
      <div className="loader-text">
        <span>{loadingWord}</span>
      </div>
      <div className="loader-bar">
        <div className="loader-progress" style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  );
}

function ShoeShowcase() {
  const { shoeId } = useParams();
  const navigate = useNavigate();
  const [panelOpen, setPanelOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const shoe = shoes.find(s => s.id === shoeId) || shoes[0];

  useEffect(() => {
    const handleKeyDown = (e) => {
      const currentIndex = shoes.findIndex(s => s.id === shoeId);
      
      switch(e.key) {
        case 'ArrowRight':
          e.preventDefault();
          const nextIndex = (currentIndex + 1) % shoes.length;
          playSwoosh();
          navigate(`/${shoes[nextIndex].id}`);
          break;
        case 'ArrowLeft':
          e.preventDefault();
          const prevIndex = (currentIndex - 1 + shoes.length) % shoes.length;
          playSwoosh();
          navigate(`/${shoes[prevIndex].id}`);
          break;
        case 'Escape':
          if (panelOpen) playSlide();
          setPanelOpen(false);
          break;
        case 'p':
        case 'P':
          playSlide();
          setPanelOpen(prev => !prev);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [shoeId, navigate, panelOpen]);

  return (
    <div className="main" style={{ '--accent-color': shoe.color, '--shoe-color': shoe.color }}>
      <img src={jordanLogo} alt="Jordan" className="bottom-jordan-logo" />
      
      <div className="details" key={shoe.id}>
        <h1>{shoe.model}</h1>
        <h1>{shoe.type}</h1>
        <h1 className="shoe-name">{shoe.name}</h1>
        <p className="shoe-desc">{shoe.desc}</p>
      </div>

      <div className="stripes" key={`stripes-${shoe.id}`}>
        <div id="stripe1"></div>
        <div id="stripe2"></div>
        <div id="stripe3"></div>
        <div id="stripe4"></div>
        <div id="stripe5"></div>
      </div>

      <div className="img">
        <img src={shoe.img} alt={shoe.name} />
      </div>

      <button 
        className={`side-nav-btn ${panelOpen ? 'active' : ''}`}
        onClick={() => {
          playSlide();
          setPanelOpen(!panelOpen);
        }}
      ></button>
      
      <div className="side-tag">{shoe.sideTag}</div>

      <div className={`shoe-panel ${panelOpen ? 'open' : ''}`}>
        {shoes.map((s) => (
          <Link 
            key={s.id}
            to={`/${s.id}`}
            className={`panel-shoe ${shoe.id === s.id ? 'active' : ''}`}
            style={{ '--shoe-color': s.color }}
            onMouseEnter={playClick}
            onClick={() => {
              playSwoosh();
              setPanelOpen(false);
            }}
          >
            <img src={s.img} alt={s.name} />
          </Link>
        ))}
      </div>

      <div className="keyboard-hints">
        <span><kbd>←</kbd> <kbd>→</kbd> Navigate</span>
        <span><kbd>P</kbd> Panel</span>
        <span><kbd>ESC</kbd> Close</span>
      </div>

      <button 
        className={`sound-toggle ${soundOn ? 'on' : 'off'}`}
        onClick={() => {
          const newState = toggleSound();
          setSoundOn(newState);
          if (newState) playClick();
        }}
        title={soundOn ? 'Mute sounds' : 'Enable sounds'}
      >
        <span className="sound-icon">♪</span>
      </button>
    </div>
  );
}

function App() {
  const [loading, setLoading] = useState(true);

  if (loading) {
    return <LoadingScreen onComplete={() => setLoading(false)} />;
  }

  return (
    <Router>
      <Routes>
        <Route path="/:shoeId" element={<ShoeShowcase />} />
        <Route path="/" element={<Navigate to="/og-chicago" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
