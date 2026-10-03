import React, { useEffect, useRef, useState, useCallback } from 'react';
import { 
  Trophy, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Copy, 
  Check, 
  Sparkles, 
  Flame, 
  Gift, 
  Fuel,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

/* =========================================================
   CẤU HÌNH BIẾN GAME DỄ DÀNG THAY ĐỔI Ở ĐẦU FILE
========================================================= */
const WIN_SCORE = 20;
const GRAVITY = 0.28;
const JUMP_FORCE = -5.8;
const PIPE_SPEED = 1.9;
const PIPE_GAP = 155;
const VOUCHER_TEXT = 'Voucher 2 lít xăng';
const BRAND_NAME = 'VietinBank';
const GAME_TITLE = 'Chờ vui – Chơi hay – Nhận quà liền tay';

interface Pipe {
  x: number;
  topHeight: number;
  bottomY: number;
  passed: boolean;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  alpha: number;
}

export const FlappyGame: React.FC<{ onReturnHome?: () => void }> = ({ onReturnHome }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  // Game states: 'START' | 'PLAYING' | 'WIN' | 'LOSE'
  const [gameState, setGameState] = useState<'START' | 'PLAYING' | 'WIN' | 'LOSE'>('START');
  const [score, setScore] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(0);
  const [latestVoucher, setLatestVoucher] = useState<string | null>(null);
  const [currentVoucher, setCurrentVoucher] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);

  // Audio Context (web audio)
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Animation Frame Ref
  const animFrameRef = useRef<number | null>(null);

  // Game internal variables
  const birdY = useRef<number>(180);
  const birdVelocity = useRef<number>(0);
  const pipes = useRef<Pipe[]>([]);
  const particles = useRef<Particle[]>([]);
  const frameCount = useRef<number>(0);
  const isPlayingRef = useRef<boolean>(false);
  const scoreRef = useRef<number>(0);

  // Play sound helper
  const playSound = useCallback((type: 'jump' | 'score' | 'win' | 'lose') => {
    if (!soundEnabled) return;
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === 'jump') {
        osc.frequency.setValueAtTime(420, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(780, ctx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
        osc.start();
        osc.stop(ctx.currentTime + 0.1);
      } else if (type === 'score') {
        osc.frequency.setValueAtTime(587, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.12);
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.12);
        osc.start();
        osc.stop(ctx.currentTime + 0.12);
      } else if (type === 'win') {
        [523, 659, 784, 1046].forEach((f, i) => {
          const o = ctx.createOscillator();
          const g = ctx.createGain();
          o.connect(g);
          g.connect(ctx.destination);
          o.frequency.value = f;
          g.gain.setValueAtTime(0.1, ctx.currentTime + i * 0.1);
          g.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + i * 0.1 + 0.2);
          o.start(ctx.currentTime + i * 0.1);
          o.stop(ctx.currentTime + i * 0.1 + 0.2);
        });
      } else if (type === 'lose') {
        osc.frequency.setValueAtTime(320, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(140, ctx.currentTime + 0.25);
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);
        osc.start();
        osc.stop(ctx.currentTime + 0.25);
      }
    } catch {
      // Audio not supported or blocked
    }
  }, [soundEnabled]);

  // Load saved high score and latest voucher from localStorage
  useEffect(() => {
    try {
      const savedHigh = localStorage.getItem('vietinbank_flappy_highscore');
      if (savedHigh) setHighScore(parseInt(savedHigh, 10) || 0);

      const savedVoucher = localStorage.getItem('vietinbank_flappy_latest_voucher');
      if (savedVoucher) setLatestVoucher(savedVoucher);
    } catch {
      // ignore storage access errors
    }
  }, []);

  /* =========================================================
     CÁC HÀM XỬ LÝ CHÍNH THEO ĐẶC TẢ YÊU CẦU
  ========================================================= */
  const generateVoucherCode = (): string => {
    const random6Digits = Math.floor(100000 + Math.random() * 900000);
    return `VB-${random6Digits}`;
  };

  const copyVoucherCode = (codeToCopy: string) => {
    if (!codeToCopy) return;
    navigator.clipboard.writeText(codeToCopy).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }).catch(() => {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const resetGame = () => {
    birdY.current = 180;
    birdVelocity.current = 0;
    pipes.current = [];
    particles.current = [];
    frameCount.current = 0;
    scoreRef.current = 0;
    setScore(0);
  };

  const triggerConfetti = () => {
    const colors = ['#e11b22', '#005596', '#f59e0b', '#10b981', '#ffffff', '#38bdf8'];
    const newParticles: Particle[] = [];
    for (let i = 0; i < 90; i++) {
      newParticles.push({
        x: 200,
        y: 150,
        vx: (Math.random() - 0.5) * 8,
        vy: (Math.random() - 0.7) * 9,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 7 + 4,
        alpha: 1
      });
    }
    particles.current = newParticles;
  };

  const winGame = useCallback(() => {
    isPlayingRef.current = false;
    setGameState('WIN');
    playSound('win');

    const newCode = generateVoucherCode();
    setCurrentVoucher(newCode);
    setLatestVoucher(newCode);

    try {
      localStorage.setItem('vietinbank_flappy_latest_voucher', newCode);
      localStorage.setItem('vietinbank_flappy_highscore', '20');
      setHighScore(20);
    } catch {
      // ignore
    }

    triggerConfetti();

    // Gọi callback window.onFlappyVoucherWin
    if (typeof window !== 'undefined' && window.onFlappyVoucherWin) {
      window.onFlappyVoucherWin({
        score: WIN_SCORE,
        voucherCode: newCode,
        reward: VOUCHER_TEXT,
        timestamp: new Date().toISOString()
      });
    }
  }, [playSound]);

  const endGame = useCallback((finalScore: number) => {
    isPlayingRef.current = false;
    setGameState('LOSE');
    playSound('lose');

    try {
      const currentHigh = parseInt(localStorage.getItem('vietinbank_flappy_highscore') || '0', 10);
      if (finalScore > currentHigh) {
        localStorage.setItem('vietinbank_flappy_highscore', finalScore.toString());
        setHighScore(finalScore);
      }
    } catch {
      // ignore
    }

    // Gọi callback window.onFlappyVoucherLose
    if (typeof window !== 'undefined' && window.onFlappyVoucherLose) {
      window.onFlappyVoucherLose({
        score: finalScore,
        timestamp: new Date().toISOString()
      });
    }
  }, [playSound]);

  const startGame = () => {
    resetGame();
    isPlayingRef.current = true;
    setGameState('PLAYING');
    playSound('jump');
  };

  const jump = useCallback(() => {
    if (!isPlayingRef.current) return;
    birdVelocity.current = JUMP_FORCE;
    playSound('jump');
  }, [playSound]);

  // Handle Spacebar & Click/Touch
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        if (gameState === 'START' || gameState === 'LOSE' || gameState === 'WIN') {
          startGame();
        } else if (gameState === 'PLAYING') {
          jump();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState, jump]);

  // Main Canvas Game Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let running = true;

    const render = () => {
      if (!running) return;

      const width = canvas.width;
      const height = canvas.height;

      // 1. Draw Background (Smooth Sky with VietinBank branding clouds)
      const skyGrad = ctx.createLinearGradient(0, 0, 0, height);
      skyGrad.addColorStop(0, '#e0f2fe');
      skyGrad.addColorStop(0.7, '#f0f9ff');
      skyGrad.addColorStop(1, '#e2e8f0');
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, width, height);

      // Distant gentle city skyline / clouds
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.beginPath();
      ctx.arc(80, 80, 30, 0, Math.PI * 2);
      ctx.arc(110, 75, 40, 0, Math.PI * 2);
      ctx.arc(140, 80, 30, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.arc(280, 110, 25, 0, Math.PI * 2);
      ctx.arc(310, 105, 35, 0, Math.PI * 2);
      ctx.arc(335, 110, 25, 0, Math.PI * 2);
      ctx.fill();

      // If playing, update physics
      if (isPlayingRef.current) {
        frameCount.current++;

        // Bird physics
        birdVelocity.current += GRAVITY;
        birdY.current += birdVelocity.current;

        // Ground and ceiling collision
        if (birdY.current < 15) {
          birdY.current = 15;
          birdVelocity.current = 0;
        }
        if (birdY.current > height - 35) {
          endGame(scoreRef.current);
        }

        // Spawn pipes every ~115 frames
        if (frameCount.current % 115 === 0) {
          const minHeight = 50;
          const maxHeight = height - PIPE_GAP - minHeight - 40;
          const topHeight = Math.floor(Math.random() * (maxHeight - minHeight + 1)) + minHeight;
          pipes.current.push({
            x: width + 20,
            topHeight: topHeight,
            bottomY: topHeight + PIPE_GAP,
            passed: false
          });
        }

        // Update and check pipes
        const birdBox = {
          x: 65,
          y: birdY.current,
          width: 38,
          height: 26
        };

        for (let i = 0; i < pipes.current.length; i++) {
          const p = pipes.current[i];
          p.x -= PIPE_SPEED;

          // Check if passed
          if (!p.passed && p.x + 50 < birdBox.x) {
            p.passed = true;
            scoreRef.current += 1;
            setScore(scoreRef.current);
            playSound('score');

            // Win condition: reach WIN_SCORE (20)
            if (scoreRef.current >= WIN_SCORE) {
              winGame();
              break;
            }
          }

          // Collision detection with top pipe
          const pipeWidth = 52;
          if (
            birdBox.x + birdBox.width > p.x &&
            birdBox.x < p.x + pipeWidth &&
            birdBox.y < p.topHeight
          ) {
            endGame(scoreRef.current);
            break;
          }

          // Collision detection with bottom pipe
          if (
            birdBox.x + birdBox.width > p.x &&
            birdBox.x < p.x + pipeWidth &&
            birdBox.y + birdBox.height > p.bottomY
          ) {
            endGame(scoreRef.current);
            break;
          }
        }

        // Clean off-screen pipes
        pipes.current = pipes.current.filter((p) => p.x > -60);
      }

      // 2. Draw Pipes (VietinBank styled architectural pillars)
      pipes.current.forEach((p) => {
        const pipeWidth = 52;

        // Top Pipe
        const topGrad = ctx.createLinearGradient(p.x, 0, p.x + pipeWidth, 0);
        topGrad.addColorStop(0, '#005596');
        topGrad.addColorStop(0.5, '#0284c7');
        topGrad.addColorStop(1, '#003f75');

        ctx.fillStyle = topGrad;
        ctx.fillRect(p.x, 0, pipeWidth, p.topHeight);
        // Top pipe rim
        ctx.fillStyle = '#c4161c';
        ctx.fillRect(p.x - 3, p.topHeight - 12, pipeWidth + 6, 12);

        // Bottom Pipe
        ctx.fillStyle = topGrad;
        ctx.fillRect(p.x, p.bottomY, pipeWidth, height - p.bottomY);
        // Bottom pipe rim
        ctx.fillStyle = '#c4161c';
        ctx.fillRect(p.x - 3, p.bottomY, pipeWidth + 6, 12);
      });

      // 3. Draw Ground
      const groundGrad = ctx.createLinearGradient(0, height - 25, 0, height);
      groundGrad.addColorStop(0, '#0f172a');
      groundGrad.addColorStop(1, '#020617');
      ctx.fillStyle = groundGrad;
      ctx.fillRect(0, height - 25, width, 25);

      // Gold line separating ground
      ctx.fillStyle = '#f59e0b';
      ctx.fillRect(0, height - 25, width, 3);

      // 4. Draw Mascot / Flying Bank Card
      const bx = 65;
      const by = birdY.current;
      const angle = Math.min(Math.PI / 4, Math.max(-Math.PI / 4, (birdVelocity.current * 4 * Math.PI) / 180));

      ctx.save();
      ctx.translate(bx + 19, by + 13);
      ctx.rotate(angle);

      // Card body (VietinBank debit/credit style card)
      const cardGrad = ctx.createLinearGradient(-19, -13, 19, 13);
      cardGrad.addColorStop(0, '#005596');
      cardGrad.addColorStop(1, '#0284c7');
      ctx.fillStyle = cardGrad;
      ctx.beginPath();
      ctx.roundRect(-19, -13, 38, 26, 5);
      ctx.fill();

      // Card border
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Chip
      ctx.fillStyle = '#fbbf24';
      ctx.fillRect(-13, -5, 8, 6);

      // Wing (flapping effect)
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      const wingYOffset = Math.sin(frameCount.current * 0.25) * 5;
      ctx.ellipse(-5, 0 + wingYOffset, 7, 4, Math.PI / 5, 0, Math.PI * 2);
      ctx.fill();

      // Red ribbon / tail
      ctx.fillStyle = '#e11b22';
      ctx.beginPath();
      ctx.moveTo(-19, -2);
      ctx.lineTo(-27, -6);
      ctx.lineTo(-24, 0);
      ctx.lineTo(-27, 6);
      ctx.lineTo(-19, 2);
      ctx.closePath();
      ctx.fill();

      ctx.restore();

      // 5. Draw Confetti Particles
      if (particles.current.length > 0) {
        for (let i = 0; i < particles.current.length; i++) {
          const pt = particles.current[i];
          pt.x += pt.vx;
          pt.y += pt.vy;
          pt.vy += 0.15;
          pt.alpha -= 0.008;

          if (pt.alpha > 0) {
            ctx.save();
            ctx.globalAlpha = pt.alpha;
            ctx.fillStyle = pt.color;
            ctx.fillRect(pt.x, pt.y, pt.size, pt.size);
            ctx.restore();
          }
        }
        particles.current = particles.current.filter((p) => p.alpha > 0);
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      running = false;
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [endGame, playSound, winGame]);

  // Motivational message based on current score
  const getEncouragementText = (curScore: number): string => {
    if (curScore >= 20) return 'Xuất sắc!';
    if (curScore >= 15) return 'Sắp nhận quà rồi!';
    if (curScore >= 10) return 'Một nửa chặng đường rồi!';
    if (curScore >= 5) return 'Tốt lắm, tiếp tục nào!';
    return 'Khởi động nhẹ nhàng!';
  };

  return (
    <div id="flappy-voucher-game" className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
      {/* Game Header Box */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-red-100 text-[#c4161c] text-xs font-bold uppercase tracking-wider">
              {BRAND_NAME} Minigame
            </span>
            <span className="text-xs text-slate-500 font-medium">Dành cho khách hàng tại quầy</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
            {GAME_TITLE}
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`p-2.5 rounded-xl border transition-colors ${
              soundEnabled
                ? 'bg-blue-50 border-blue-200 text-[#005596]'
                : 'bg-slate-100 border-slate-200 text-slate-400'
            }`}
            title={soundEnabled ? 'Tắt âm thanh' : 'Bật âm thanh'}
          >
            {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
          </button>

          <div className="px-4 py-2 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 flex items-center gap-2">
            <Trophy className="w-4 h-4 text-amber-600" />
            <span className="text-xs font-bold">Kỷ lục: {highScore}/20</span>
          </div>
        </div>
      </div>

      {/* Main Game Stage Container */}
      <div className="relative mx-auto max-w-[420px] w-full bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-800 touch-manipulation select-none">
        {/* Canvas Element */}
        <canvas
          ref={canvasRef}
          width={400}
          height={480}
          onClick={gameState === 'PLAYING' ? jump : undefined}
          onTouchStart={(e) => {
            e.preventDefault();
            if (gameState === 'PLAYING') jump();
          }}
          className="w-full h-[460px] sm:h-[480px] block cursor-pointer"
        />

        {/* HUD In-Game Display (While playing) */}
        {gameState === 'PLAYING' && (
          <div className="absolute top-4 left-4 right-4 pointer-events-none space-y-2">
            <div className="flex items-center justify-between bg-black/40 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20 text-white">
              <span className="text-sm font-bold tracking-wide">
                Điểm: <span className="text-yellow-300 text-xl font-black">{score}</span>/{WIN_SCORE}
              </span>
              <span className="text-xs font-semibold text-blue-200">
                {getEncouragementText(score)}
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-white/20 h-2.5 rounded-full overflow-hidden backdrop-blur-sm">
              <div
                className="bg-gradient-to-r from-yellow-400 to-emerald-400 h-full transition-all duration-200 ease-out"
                style={{ width: `${Math.min(100, (score / WIN_SCORE) * 100)}%` }}
              />
            </div>
          </div>
        )}

        {/* 1. START SCREEN OVERLAY */}
        {gameState === 'START' && (
          <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-md p-6 flex flex-col items-center justify-center text-center text-white space-y-6">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-[#005596] to-sky-400 flex items-center justify-center shadow-xl border-2 border-white/30 transform hover:scale-105 transition-transform">
              <Fuel className="w-10 h-10 text-yellow-300" />
            </div>

            <div className="space-y-2">
              <span className="px-3 py-1 rounded-full bg-red-600/80 text-white text-xs font-bold">
                Cơ hội nhận quà 100%
              </span>
              <h3 className="text-2xl font-black">{GAME_TITLE}</h3>
              <p className="text-blue-200 text-sm max-w-xs mx-auto">
                Vượt qua 20 thử thách để nhận {VOUCHER_TEXT}
              </p>
            </div>

            <div className="space-y-3 w-full max-w-xs">
              <button
                onClick={startGame}
                className="w-full py-4 px-6 rounded-2xl bg-[#c4161c] hover:bg-red-700 text-white font-extrabold text-base shadow-lg shadow-red-700/40 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
              >
                <span>Bắt Đầu Chơi</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <p className="text-xs text-slate-300 font-medium">
                Chạm màn hình hoặc nhấn Space để bay
              </p>
            </div>

            {latestVoucher && (
              <div className="p-3 bg-white/10 rounded-xl border border-white/10 text-xs text-yellow-200">
                Mã gần nhất của bạn: <span className="font-mono font-bold text-white">{latestVoucher}</span>
              </div>
            )}
          </div>
        )}

        {/* 3. LOSE SCREEN OVERLAY */}
        {gameState === 'LOSE' && (
          <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-md p-6 flex flex-col items-center justify-center text-center text-white space-y-5 animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center justify-center text-2xl font-bold">
              !
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white">
                Rất tiếc, bạn đã vượt qua {score}/{WIN_SCORE} thử thách
              </h3>
              <p className="text-sm text-slate-300 font-medium">
                Chỉ còn một chút nữa thôi, hãy thử lại nhé!
              </p>
            </div>

            <div className="w-full max-w-xs space-y-2.5 pt-2">
              <button
                onClick={startGame}
                className="w-full py-3.5 px-6 rounded-2xl bg-[#005596] hover:bg-[#003f75] text-white font-bold text-sm shadow-md transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Chơi lại</span>
              </button>

              {onReturnHome && (
                <button
                  onClick={onReturnHome}
                  className="w-full py-2.5 px-4 rounded-xl border border-white/20 hover:bg-white/10 text-slate-300 font-medium text-xs transition-colors"
                >
                  Về màn hình chính
                </button>
              )}
            </div>
          </div>
        )}

        {/* 4. WIN SCREEN OVERLAY */}
        {gameState === 'WIN' && (
          <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-md p-6 flex flex-col items-center justify-center text-center text-white space-y-4 animate-fade-in">
            <div className="w-16 h-16 rounded-3xl bg-amber-400 text-slate-950 flex items-center justify-center shadow-lg shadow-amber-400/30 animate-bounce">
              <Trophy className="w-9 h-9" />
            </div>

            <div className="space-y-1">
              <span className="text-xs uppercase font-extrabold tracking-wider text-yellow-400">
                Chiến Thắng Tuyệt Đối!
              </span>
              <h3 className="text-2xl font-black text-white">Chúc mừng!</h3>
              <p className="text-xs text-slate-200">
                Bạn đã vượt qua 20 thử thách và đủ điều kiện nhận {VOUCHER_TEXT}.
              </p>
            </div>

            {/* Voucher Card Code */}
            <div className="w-full max-w-xs p-4 rounded-2xl bg-gradient-to-r from-red-600 to-[#c4161c] text-white shadow-xl border border-red-400/40 space-y-2">
              <p className="text-[11px] uppercase tracking-wider text-red-100 font-semibold flex items-center justify-center gap-1">
                <Gift className="w-3.5 h-3.5" />
                <span>Mã Quà Tặng VietinBank</span>
              </p>
              <div className="py-2 px-3 bg-white text-slate-900 font-mono text-2xl font-black rounded-xl tracking-wider select-all shadow-inner">
                {currentVoucher}
              </div>
              <p className="text-[11px] text-red-100 leading-tight">
                Vui lòng chụp màn hình hoặc đưa mã này cho nhân viên để nhận quà.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="w-full max-w-xs flex gap-2 pt-1">
              <button
                onClick={() => copyVoucherCode(currentVoucher)}
                className="flex-1 py-3 px-3 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Đã sao chép!' : 'Sao chép mã'}</span>
              </button>

              <button
                onClick={startGame}
                className="py-3 px-4 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Chơi lại</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Rules and Rewards Info Card */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
        <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#005596]" />
          <span>Thể Lệ & Hướng Dẫn Nhận Quà Tại Quầy</span>
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-600">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <p className="font-bold text-slate-800">1. Cách thức chơi:</p>
            <p className="mt-1">Nhấn Space hoặc chạm màn hình để điều khiển thẻ ngân hàng bay qua các cột trụ.</p>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <p className="font-bold text-slate-800">2. Mốc chiến thắng:</p>
            <p className="mt-1">Vượt đủ 20 cột mốc thử thách để hệ thống tự động phát mã voucher xăng xe.</p>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <p className="font-bold text-slate-800">3. Đổi quà trực tiếp:</p>
            <p className="mt-1">Đưa mã trúng thưởng hoặc ảnh chụp màn hình cho Giao dịch viên tại quầy VietinBank để nhận quà.</p>
          </div>
        </div>

        {latestVoucher && (
          <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between gap-3 text-xs text-emerald-900">
            <div>
              <span className="font-bold">Mã trúng thưởng gần nhất lưu trên thiết bị: </span>
              <span className="font-mono font-black text-sm text-emerald-700">{latestVoucher}</span>
            </div>
            <button
              onClick={() => copyVoucherCode(latestVoucher)}
              className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold transition-colors"
            >
              Sao chép lại
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
