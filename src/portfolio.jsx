import { useState, useEffect, useRef } from "react";
import profilePic from "/76fc46fd-9cea-4dd4-a02b-596a5618d20d.jpg";
import heroImg from "./assets/hero.jpg";
import sqlCert from "./assets/SQL.png";
import python101 from "./assets/phyton101.png";
import pybeg from "./assets/pybeg.png";
import introCert from "./assets/Intro.png";
import cert5 from "./assets/cert5.png";
import cert6 from "./assets/cert6.png";
import ricesureAward from "./assets/RicesureAward.jpg";
import certOfRecog from "./assets/Cert of recog.jpg";

// ─── DATA ────────────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { id: "home", label: "HOME", icon: ">_" },
  { id: "about", label: "ABOUT", icon: "$" },
  { id: "skills", label: "SKILLS", icon: "#" },
  { id: "projects", label: "PROJECTS", icon: "{}" },
  { id: "certifications", label: "CERTS", icon: "©" },
  { id: "contact", label: "CONTACT", icon: "@" },
];

const SKILLS_TECH = [
  { name: "HTML / CSS", level: 85 },
  { name: "React.js", level: 80 },
  { name: "JavaScript", level: 75 },
  { name: "React Native & Expo", level: 75 },
  { name: "Basic MySQL", level: 65 },
];

const SKILLS_SOFT = ["Flexibility", "Adaptability", "Willingness to Learn", "Communication Skills", "Creativity"];

const PROJECTS = [
  {
    name: "RiceSure",
    tag: "ML · Mobile · CNN",
    desc: "Rice Adulteration Detection System — A mobile-based app using Convolutional Neural Networks (CNN) to detect rice adulteration through mobile camera image classification.",
    stack: ["React Native", "CNN", "Expo"],
    status: "COMPLETED",
  },
  {
    name: "ShoppingList App",
    tag: "Mobile · Firebase",
    desc: "A mobile application built with React Native + Firebase featuring Authentication, Firestore CRUD operations, user login, and add/edit/delete item functionality.",
    stack: ["React Native", "Firebase", "Firestore"],
    status: "COMPLETED",
  },
  {
    name: "PZAM Ordering System",
    tag: "Web • Inventory • Ordering",
    desc: "A web-based ordering and inventory management system developed for PZAM Cups Printing Davao and Packaging Supplies. Features customer order tracking, inventory monitoring, billing management, and automated record keeping to streamline daily business operations.",
    stack: ["React", "Firebase", "MySQL", "Inventory System"],
    status: "COMPLETED",
  },
  {
    name: "ICT-Inventory management system NAVAL",
    tag: "",
    desc: "A Laravel-based web inventory system for managing ICT assets, tracking records, and monitoring inventory status efficiently. It includes responsive interfaces and streamlined CRUD operations for daily inventory management.",
    stack: ["Laravel", "React-Native"],
    status: "COMPLETED",
  },
];

const CERTIFICATIONS = [
  { title: "SQL Database Fundamentals", issuer: "Udemy", date: "2026", id: "CERT-WD-2026-001", image: sqlCert },
  { title: "Python 101 Fundamentals", issuer: "Cognitive Class.ai", date: "2026", id: "CERT-PY101-2026-002", image: python101 },
  { title: "Python for Beginners", issuer: "Simplilearn", date: "2026", id: "CERT-PYBEG-2026-003", image: pybeg },
  { title: "Introduction to Frontend Development", issuer: "Simplilearn", date: "2026", id: "CERT-FB-2026-004", image: introCert },
  { title: "Professional Development Certificate", issuer: "Technical Training Institute", date: "2026", id: "CERT-PROF-2026-005", image: cert5 },
  { title: "Advanced Web Development Certificate", issuer: "Digital Academy", date: "2026", id: "CERT-ADV-2026-006", image: cert6 },
];

const AWARDS = [
  { title: "Best Mobile App", issuer: "College Innovation Fair", date: "2023", id: "AWARD-BMA-2023-001", image: ricesureAward },
  { title: "Certificate of Recognition", issuer: "Holy Cross of Davao College", date: "2024", id: "AWARD-COR-2024-002", image: certOfRecog },
];

// ─── SHARED COMPONENTS ───────────────────────────────────────────────────────
function ScanlineOverlay() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-50 opacity-[0.12]"
      style={{ backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,255,0,0.18) 2px,rgba(0,255,0,0.18) 4px)" }}
    />
  );
}

function MatrixRain() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);
    const cols = Math.floor(canvas.width / 20);
    const drops = Array(cols).fill(1);
    const chars = "アイウエオカキクケコサシスセソABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789</>{}[]#@!";
    const draw = () => {
      ctx.fillStyle = "rgba(0,0,0,0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#0f0";
      ctx.font = "14px monospace";
      drops.forEach((y, i) => {
        ctx.fillText(chars[Math.floor(Math.random() * chars.length)], i * 20, y * 20);
        if (y * 20 > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      });
    };
    const id = setInterval(draw, 35);
    return () => { clearInterval(id); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} className="fixed inset-0 z-0 opacity-20" />;
}

function GlitchText({ text, className = "" }) {
  return (
    <span className={`relative inline-block ${className}`}>
      <span className="absolute top-0 left-0 text-red-500 opacity-70"
        style={{ clipPath: "polygon(0 30%,100% 30%,100% 50%,0 50%)", transform: "translateX(-2px)", animation: "glitch1 3s infinite" }}
        aria-hidden>{text}</span>
      <span className="absolute top-0 left-0 text-cyan-400 opacity-70"
        style={{ clipPath: "polygon(0 60%,100% 60%,100% 80%,0 80%)", transform: "translateX(2px)", animation: "glitch2 3s infinite" }}
        aria-hidden>{text}</span>
      {text}
    </span>
  );
}

function TypewriterText({ text, speed = 65, startDelay = 0, keepCursor = false, className = "" }) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);
  useEffect(() => { const t = setTimeout(() => setStarted(true), startDelay); return () => clearTimeout(t); }, [startDelay]);
  useEffect(() => {
    if (!started || displayed.length >= text.length) return;
    const nextChar = text[displayed.length];
    const pause = /[\s,.;:!?]/.test(nextChar) ? 120 : 0;
    const t = setTimeout(() => setDisplayed(text.slice(0, displayed.length + 1)), speed + pause);
    return () => clearTimeout(t);
  }, [displayed, started, text, speed]);
  return (
    <span className={className}>
      {displayed}
      {(displayed.length < text.length || keepCursor) && <span className="animate-pulse text-green-400">█</span>}
    </span>
  );
}

function TerminalBox({ children, title = "terminal", className = "" }) {
  return (
    <div className={`w-full ${className}`}>
      {title && (
        <div className="text-green-300 text-base md:text-lg font-mono mb-2">
          <TypewriterText text={title} speed={65} />
        </div>
      )}
      <div className="text-green-200 text-sm leading-relaxed">{children}</div>
    </div>
  );
}

function PageSection({ title, subtitle, children, className = "" }) {
  return (
    <section className={`mx-auto w-full max-w-7xl p-12 ${className}`}>
      <div className="mb-4 text-center -mt-8">
        <div className="text-green-600 text-xl uppercase tracking-[0.45em] mb-3 font-bold">{title}</div>
        {subtitle && <h2 className="text-5xl md:text-6xl font-extrabold text-green-300 leading-tight" style={{ fontFamily: "'Orbitron', monospace" }}>{subtitle}</h2>}
        <div className="mx-auto translate-y-13 h-px w-40 bg-gradient-to-r from-transparent via-green-400 to-transparent" />
      </div>
      <div className="text-green-300">{children}</div>
    </section>
  );
}

function SkillBar({ name, level, animate }) {
  return (
    <div className="mb-6">
      <div className="flex justify-between mb-2">
        <span className="text-green-400 font-mono text-sm md:text-base">{name}</span>
        <span className="text-green-600 font-mono text-sm md:text-base">{level}%</span>
      </div>
      <div className="h-2.5 bg-green-950/60 border border-green-900/50 overflow-hidden rounded-full">
        <div className="h-full bg-green-400 transition-all duration-1000 ease-out relative"
          style={{ width: animate ? `${level}%` : "0%" }}>
          <div className="absolute right-0 top-0 h-full w-4 bg-white/30 animate-pulse" />
        </div>
      </div>
    </div>
  );
}

function CertCard({ cert, onImageClick }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <div onClick={() => {
      if (cert.image && !flipped) {
        onImageClick?.(cert);
      } else {
        setFlipped(!flipped);
      }
    }}
      className="cursor-pointer border border-green-500/30 bg-black hover:border-green-400 transition-all duration-200 p-4 relative group">
      <div className="absolute top-2 right-2 text-green-800 font-mono text-xs group-hover:text-green-500">
        {flipped ? "[ CLOSE ]" : "[ VIEW ]"}
      </div>
      {!flipped ? (
        <>
          <div className="text-green-400 font-mono text-sm mb-1 tracking-widest">
            <TypewriterText text="CERTIFICATE" speed={65} />
          </div>
          <div className="text-green-300 font-mono text-base font-bold mb-1">{cert.title}</div>
          <div className="text-green-400 font-mono text-sm">
            <TypewriterText text={`${cert.issuer} · ${cert.date}`} speed={65} startDelay={50} />
          </div>
          <div className="mt-3 text-green-300 font-mono text-sm">
            <TypewriterText text="Click to verify ▶" speed={65} startDelay={90} />
          </div>
        </>
      ) : (
        <>
          <div className="text-green-600 font-mono text-sm mb-1 tracking-widest">
            <TypewriterText text="CERT ID" speed={65} />
          </div>
          <div className="text-green-400 font-mono text-sm mb-2 tracking-widest">
            <TypewriterText text={cert.id} speed={65} startDelay={40} />
          </div>
          <div className="text-green-300 font-mono text-sm mb-1">
            <TypewriterText text={`ISSUER: ${cert.issuer}`} speed={65} startDelay={80} />
          </div>
          <div className="text-green-300 font-mono text-sm mb-1">
            <TypewriterText text={`ISSUED: ${cert.date}`} speed={65} startDelay={120} />
          </div>
          <div className="text-green-300 font-mono text-sm">
            <TypewriterText text="STATUS: ● VERIFIED" speed={65} startDelay={160} />
          </div>
          <div className="mt-2 border border-green-800 p-1 text-center">
            <TypewriterText text="CRYPTOGRAPHIC SEAL VALID" speed={65} startDelay={200} className="text-green-500 font-mono text-sm tracking-widest" />
          </div>
        </>
      )}
    </div>
  );
}



function TerminalInput({ type = "text", placeholder = "", name }) {
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);

  return (
    <div className="relative">
      <input
        type={type}
        name={name}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full bg-black/90 border border-green-500/90 text-transparent placeholder-transparent text-base pl-3 pr-3 py-3 font-mono focus:outline-none focus:border-green-400"
        style={{ caretColor: "transparent" }}
        autoComplete="off"
      />
      <div className="pointer-events-none absolute inset-0 pl-3 pr-3 flex items-center">
        <span className="whitespace-pre text-green-200 font-mono text-base flex items-center gap-1">
          {focused && !value && <span className="text-green-400 animate-pulse">█</span>}
          {value || <span className="text-green-700/50">{placeholder}</span>}
          {focused && value && <span className="ml-1 text-green-400 animate-pulse">█</span>}
        </span>
      </div>
    </div>
  );
}

function TerminalTextarea({ placeholder = "", name, rows = 4 }) {
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);

  return (
    <div className="relative">
      <textarea
        name={name}
        rows={rows}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full min-h-[10rem] resize-none bg-black/90 border border-green-500/90 text-transparent placeholder-transparent text-base p-3 font-mono focus:outline-none focus:border-green-400"
        style={{ caretColor: "transparent" }}
        autoComplete="off"
      />
      <div className="pointer-events-none absolute inset-0 p-3 flex items-start">
        <span className="whitespace-pre-wrap text-green-200 font-mono text-base leading-relaxed block w-full">
          {focused && !value && <span className="text-green-400 animate-pulse">█</span>}
          {value || <span className="text-green-700/50">{placeholder}</span>}
          {focused && value && <span className="ml-1 text-green-400 animate-pulse">█</span>}
        </span>
      </div>
    </div>
  );
}

// ─── PAGE TRANSITION ─────────────────────────────────────────────────────────
function PageTransition({ children, pageKey }) {
  const [visible, setVisible] = useState(false);
  const [glitching, setGlitching] = useState(false);
  const [blackFade, setBlackFade] = useState(false);

  useEffect(() => {
    setGlitching(true);
    setVisible(false);
    setBlackFade(true);
    const glitchTimer = setTimeout(() => setGlitching(false), 200);
    const showTimer = setTimeout(() => setVisible(true), 150);
    const fadeTimer = setTimeout(() => setBlackFade(false), 300);
    return () => {
      clearTimeout(glitchTimer);
      clearTimeout(showTimer);
      clearTimeout(fadeTimer);
    };
  }, [pageKey]);

  const glitchBars = glitching ? Array(4).fill(0).map((_, i) => ({
    id: i,
    top: Math.random() * 80,
    height: Math.random() * 15 + 5,
    duration: Math.random() * 0.2 + 0.1,
    delay: Math.random() * 0.1,
  })) : [];

  return (
    <div style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(14px)",
      transition: "opacity 0.3s ease, transform 0.3s ease",
      position: "relative",
      animation: glitching ? "text-glitch-shake 0.2s ease-in-out" : "none",
    }}>
      {blackFade && (
        <div className="fixed inset-0 pointer-events-none z-40 bg-black" style={{
          animation: "fadeToBlack 0.3s ease-in-out",
          opacity: 0.9,
        }} />
      )}
      {glitching && (
        <>
          <div className="fixed inset-0 pointer-events-none z-50" style={{
            animation: "glitch-corruption 0.2s ease-in-out",
            background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,0,0.02) 2px, rgba(0,255,0,0.02) 4px)",
          }} />
          {glitchBars.map((bar) => (
            <div
              key={bar.id}
              className="fixed left-0 right-0 pointer-events-none z-50 bg-green-500/20"
              style={{
                top: `${bar.top}%`,
                height: `${bar.height}%`,
                animation: `glitch-flicker ${bar.duration}s ease-in-out ${bar.delay}s`,
                boxShadow: `0 0 10px rgba(34,197,94,0.4), inset 0 0 10px rgba(34,197,94,0.2)`,
              }}
            />
          ))}
        </>
      )}
      {children}
    </div>
  );
}

// ─── NAVBAR ──────────────────────────────────────────────────────────────────
function NavBar({ active, setPage }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-black/95 backdrop-blur-sm shadow-lg py-4">
      <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">
        <button onClick={() => setPage("home")}
          className="cursor-pointer text-green-300 font-mono text-sm tracking-[0.5em] uppercase hover:text-green-100 transition-colors">
          <span className="text-green-500">&gt;_ </span>DREXLER.SYS
        </button>
        <div className="hidden md:flex flex-1 justify-center gap-15">
          {NAV_ITEMS.map((item) => (
            <button key={item.id} onClick={() => setPage(item.id)}
              className={`cursor-pointer rounded-lg px-6 py-4 text-lg font-mono tracking-widest border transition-all duration-150 flex items-center gap-3 ${
                active === item.id
                  ? "bg-green-400 text-black border-green-400 shadow-[0_10px_30px_rgba(16,185,129,0.15)]"
                  : "border-green-900/60 text-green-400 hover:border-green-500 hover:text-green-200 hover:bg-green-900/40"
              }`}>
              <span className="text-2xl font-bold">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </div>
        <button className="cursor-pointer md:hidden text-green-400 font-mono text-2xl" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>
      {menuOpen && (
        <div className="md:hidden bg-black/98 px-4 pb-4 flex flex-col gap-2">
          {NAV_ITEMS.map((item) => (
            <button key={item.id} onClick={() => { setPage(item.id); setMenuOpen(false); }}
              className={`cursor-pointer text-left text-base font-mono tracking-widest py-4 px-4 rounded-md transition-colors flex items-center gap-3 ${
                active === item.id
                  ? "bg-green-900/40 text-green-200"
                  : "text-green-500 hover:text-green-200"
              }`}>
              <span className="text-2xl font-bold">{item.icon}</span>{item.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

// ─── BREADCRUMB ──────────────────────────────────────────────────────────────
function Breadcrumb({ page }) {
  const item = NAV_ITEMS.find(n => n.id === page);
  return (
    <div className="max-w-6xl mx-auto mb-8 px-4 py-4 rounded-[1.5rem] border border-green-500/10 bg-black/80 backdrop-blur-sm shadow-[0_0_40px_rgba(0,255,0,0.08)]">
      <div className="flex flex-wrap items-center justify-center gap-3 text-green-400 text-xs font-mono tracking-widest">
        <span className="text-green-500">drexler.sys</span>
        <span className="text-green-900/60">/</span>
        <span className="text-green-300">{item?.label ?? page}</span>
        <span className="text-green-900/30">|</span>
        <span className="text-green-700/80">Centralized portfolio experience</span>
      </div>
    </div>
  );
}

// ─── PAGES ───────────────────────────────────────────────────────────────────
function PageHome({ setPage }) {
  return (
    <PageSection title="HOME" className="relative min-h-screen !pt-15 !pb-12 !px-6 md:!px-12">
      <div className="flex flex-col h-full !pt-15 gap-6">
        <div className="grid gap-8 xl:grid-cols-[2fr_1fr] items-center">
          <div>
            <div className="text-green-700 text-xs tracking-widest mb-1">
              <TypewriterText text="// IDENTITY FILE LOADED" speed={65} />
            </div>
            <h1 style={{ fontFamily: "'Orbitron', monospace" }}>
              <div className="text-green-400 text-7xl md:text-8xl font-extrabold leading-none">
                <GlitchText text="DREXLER" className="text-green-400 text-7xl md:text-8xl" />
              </div>
              <div className="text-white text-2xl md:text-4xl font-bold leading-none -mt-6">VAN R. ARROYO</div>
            </h1>
            <div className="mt-0.5 text-green-600 text-base tracking-widest font-medium">
              <TypewriterText text="> BSIT Student · Developer · Programmer" speed={65} startDelay={900} keepCursor />
            </div>
            <p className="mt-1 text-green-300/80 text-base leading-relaxed max-w-2xl">
              Hi ! I’m a BSIT student from Davao City building ideas into real projects and constantly learning along the way.
            </p>
            <div className="mt-2 flex flex-wrap gap-3">
              <button onClick={() => setPage("contact")}
                className="px-8 py-3 bg-green-400 text-black font-mono text-sm tracking-widest hover:bg-green-300 transition-colors border border-green-400 rounded-md cursor-pointer">
                ./CONTACT_ME
              </button>
              <a href="#" className="px-8 py-3 border border-green-900 text-green-300 font-mono text-sm tracking-widest hover:border-green-600 hover:text-green-500 transition-colors rounded-md">
                ./DOWNLOAD_CV
              </a>
            </div>
          </div>
          <div className="hidden xl:flex items-center justify-center">
            <div className="relative w-65 h-65 rounded-full overflow-hidden border-2 border-green-500/70 shadow-[0_0_45px_rgba(34,197,94,0.3)]">
              <img src={heroImg} alt="Profile" className="w-full h-full object-cover" style={{ objectPosition: 'center 55%' }} />
              <div className="absolute inset-0 rounded-full border border-green-400/20" />
            </div>
          </div>
        </div>
        <div className="flex justify-start ">
          <div className="border border-green-500/40 bg-black/90 rounded-[0.5rem] w-full max-w-3xl shadow-[0_10px_40px_rgba(0,255,0,0.06)] pt-6">
            {/* Terminal header */}
            <div className="flex items-center gap-2 pl-16 pr-10 py-5 border-b border-green-500/30 bg-green-950/10 rounded-t-[1.25rem]">
              <span className="w-2 h-2 rounded-full bg-red-500/80" />
              <span className="w-2 h-2 rounded-full bg-yellow-500/80" />
              <span className="w-2 h-2 rounded-full bg-green-500/80" />
              <span className="ml-2 text-green-600 font-mono text-xs tracking-widest">sys.info</span>
            </div>
            <div className="pl-30 pr-10 py-6 text-base font-mono space-y-4">
              {[
                ["USER", "drexler.arroyo"],
                ["ROLE", "BSIT Student"],
                ["SCHOOL", "Holy Cross of Davao"],
                ["LOCATION", "Davao City, PH"],
                ["PHONE", "09275120692"],
                ["EMAIL", "drexlerarroyo16@gmail.com"],
                ["STATUS", "👽  ☠️ 👽  ☠️"],
              ].map(([k, v]) => (
                <div key={k} className="flex gap-2">
                  <span className="text-green-700 w-24 shrink-0 font-semibold">{k}:</span>
                  <span className={k === "STATUS" ? "text-yellow-400 font-semibold animate-pulse" : "text-green-300"}>{v}</span>
                </div>
              ))}
              <div className="pt-2 border-t border-green-900/50 flex gap-2 flex-wrap">
                {["React", "JS", "MySQL", "Firebase", "Expo"].map(t => (
                  <span key={t} className="text-green-900 border border-green-900/50 px-2 py-0.5 text-xs hover:text-green-700 hover:border-green-700 transition-colors">{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="absolute left-0 right-0 bottom-6">
          <div className="max-w-7xl mx-auto px-6">
            <div className="border-t border-green-900/40 pt-6">
              <div className="w-full flex justify-center gap-8 items-center">
                {NAV_ITEMS.filter(n => n.id !== "home").map((item) => (
                  <button key={item.id} onClick={() => setPage(item.id)}
                    className="flex-1 max-w-[280px] px-6 py-4 rounded-lg border border-green-900/50 hover:border-green-500 hover:bg-green-950/20 transition-all flex items-center gap-3 group">
                    <div className="text-3xl group-hover:text-green-400 font-mono font-bold">{item.icon}</div>
                    <div className="text-green-800 text-sm font-mono group-hover:text-green-600">{item.label}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageSection>
  );
}

function PageAbout({ setPage }) {
  return (
<PageSection subtitle="ABOUT.exe" className="pt-286 pb-20 !pt-18">
  <div className="grid gap-12 xl:grid-cols-[2.6fr_1.4fr] !pt-18">
    
    {/* LEFT SIDE */}
    <div className="md:col-span-2">
      <TerminalBox title="about.me">
        <p className="text-green-600 text-xs mb-3"><TypewriterText text="$ cat about.txt" speed={65} keepCursor /></p>

        <p className="text-green-300 text-lg leading-relaxed">
          An Information Technology student with hands-on experience in developing mobile and web applications through academic projects and OJT experiences. Through academic coursework, school projects, and hands-on experiences, I have developed practical knowledge in building applications using modern programming tools and technologies. I am eager to continuously improve my technical skills and expand my understanding of software development and problem-solving.
          <br />
          <br />
          During my studies, I hav  e worked on various projects that strengthened my skills in application development, database management, and user-centered design. I also gained valuable hands-on experience during my On-the-Job Training (OJT), where I had the opportunity to create systems and websites for practical use. This experience helped me improve my technical abilities, adaptability, teamwork, and understanding of real-world development processes.
          <br />
          <br />
          Currently, I am pursuing a Bachelor of Science in Information Technology (BSIT) at <span className="text-green-600 font-extrabold">
            Holy Cross of Davao College
          </span> My goal is to continue growing as an IT professional by applying my knowledge, contributing to meaningful projects, and developing innovative solutions that create positive impact in the technology industry.
        </p>

        {/* STATS */}
        <div className="mt-6 grid grid-cols-3 gap-4 border-t border-green-900/50 pt-4">
          {[
            ["2+", "PROJECTS"],
            ["5+", "TECHNOLOGIES"],
            ["100%", "COMMITTED"],
          ].map(([val, label]) => (
            <div key={label} className="text-center">
              <div
                className="text-green-400 text-2xl font-black"
                style={{ fontFamily: "'Orbitron', monospace" }}
              >
                {val}
              </div>
              <div className="text-green-700 text-xs tracking-widest mt-1">
                {label}
              </div>
            </div>
          ))}
        </div>
      </TerminalBox>

      {/* EDUCATION HEADER */}
      <div className="mt-20">
        <PageSection
          subtitle="EDUCATION.cs"
          className="pt-10 pb-4 !pt-18"
        />
      </div>
    </div>

    {/* RIGHT SIDE */}
    <div>
      <TerminalBox title="education.log" className="h-full !pt-3">
        <p className="text-green-600 text-xs mb-5">
          <TypewriterText text="$ cat education.log" speed={65} />
        </p>

        {[
          {
            school: "Vicente Hizon Sr. Elementary School",
            level: "Elementary",
            last: false,
          },
          {
            school: "Holy Cross College of Sasa",
            level: "Junior HighSchool",
            last: false,
          },
          {
            school: "Assumption College of Davao",
            level: "Senior HS · ABM Strand",
            last: false,
          },
          {
            school: "Holy Cross of Davao College",
            level: "BSIT (Current)",
            last: true,
          },
        ].map((e, i) => (
          <div key={i} className="flex items-start gap-3 mb-5">
            <div className="flex flex-col items-center">
              <div className="w-2.5 h-2.5 bg-green-500 shrink-0 animate-pulse" />
              {!e.last && (
                <div className="w-px h-10 bg-green-900/50 mt-1" />
              )}
            </div>

            {/* ✅ UPDATED TEXT SIZE HERE */}
            <div>
              <div className="text-green-300 text-sm md:text-lg font-bold !pt-5">
                {e.school}
              </div>

              <div className="text-green-700 text-xs md:text-lg mt-1">
                {e.level}
              </div>
            </div>
          </div>
        ))}
      </TerminalBox>
    </div>
  </div>

  {/* BUTTONS */}
  <div className="mt-8 flex flex-wrap gap-3 justify-center md:justify-start !pt-5">
    <button
      onClick={() => setPage("skills")}
      className="px-6 py-2 border border-green-700 text-green-500 text-xs font-mono tracking-widest hover:border-green-400 hover:text-green-300 transition-colors rounded-full"
    >
      ./VIEW_SKILLS →
    </button>

    <button
      onClick={() => setPage("projects")}
      className="px-6 py-2 border border-green-900 text-green-700 text-xs font-mono tracking-widest hover:border-green-700 hover:text-green-500 transition-colors rounded-full"
    >
      ./VIEW_PROJECTS →
    </button>
  </div>
</PageSection>
  );
}

function PageSkills({ setPage }) {
  const [animate, setAnimate] = useState(false);
  useEffect(() => { const t = setTimeout(() => setAnimate(true), 200); return () => clearTimeout(t); }, []);
  return (
    <PageSection subtitle="SKILLS.dat" className="pt-36 pb-32 !pt-18">
      <div className="grid gap-12 md:grid-cols-2 !pt-18">
        <TerminalBox title="technical_skills.log" className="pb-6">
  <p className="text-green-600 text-sm md:text-base mb-6">
    <TypewriterText text="$ ls -la ./tech_stack" speed={65} />
  </p>

  <div className="flex flex-col gap-8">
    {SKILLS_TECH.map((s) => (
      <div key={s.name}>
        <SkillBar {...s} animate={animate} />
      </div>
    ))}
  </div>
</TerminalBox>
        <TerminalBox title="soft_skills.log" className="pb-6">
          <p className="text-green-600 text-sm md:text-base mb-6"><TypewriterText text="$ ls -la ./soft_stack" speed={65} startDelay={200} /></p>
          {SKILLS_SOFT.map((s) => (
            <div key={s} className="flex items-center gap-4 mb-6 group">
              <span className="text-green-500 text-lg group-hover:text-green-300 transition-colors">▶</span>
              <span className="text-green-300 text-base md:text-lg">{s}</span>
              <span className="ml-auto text-green-700 text-xs md:text-sm border border-green-900 px-3 py-1 rounded-full">ACTIVE</span>
            </div>
          ))}
          <div className="mt-8 border-t border-green-900/40 pt-6">
            <p className="text-green-600 text-sm md:text-base mb-4">
              <TypewriterText text="// Tech Tags" speed={65} keepCursor />
            </p>
            <div className="flex flex-wrap gap-5">
              {["HTML", "CSS", "React.js", "React Native", "JavaScript", "Expo", "MySQL", "Firebase", "Firestore",].map(t => (
                <span key={t} className="text-green-500 text-sm border border-green-800 px-3 py-2 hover:border-green-500 hover:bg-green-950/30 transition-colors cursor-default rounded-full">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </TerminalBox>
      </div>
      <div className="mt-10 flex justify-center md:justify-start !pt-7">
        <button onClick={() => setPage("projects")}
          className="px-8 py-3 border border-green-700 text-green-500 text-sm md:text-base font-mono tracking-widest hover:border-green-400 hover:text-green-300 transition-colors rounded-full cursor-pointer">
          ./VIEW_PROJECTS →
        </button>
      </div>
    </PageSection>
  );
}

function PageProjects({ setPage }) {
  return (
    <PageSection subtitle="PROJECTS.db" className="pt-28 pb-20 !pt-18">
      <p className="text-green-600 text-sm md:text-base mb-6"><TypewriterText text="$ ls -la ./projects" speed={65} /></p>
      <div className="grid gap-12 md:grid-cols-2 !pt-18">
        {PROJECTS.map((p, index) => (
          <TerminalBox key={p.name} title={`${p.name.toLowerCase().replace(/ /g, "_")}.sh`} className="flex flex-col">
            <div className="flex items-start justify-between mb-2">
              <div>
                <div className="text-green-400 font-black text-2xl md:text-3xl" style={{ fontFamily: "'Orbitron', monospace" }}>{p.name}</div>
                <div className="text-green-700 text-sm md:text-base mt-0.5">
                  <TypewriterText text={p.tag} speed={65} startDelay={50} />
                </div>
              </div>
              <span className="text-green-400 text-sm md:text-base border border-green-700 px-2 py-0.5 animate-pulse">
                <TypewriterText text={p.status} speed={65} startDelay={80} keepCursor={index === PROJECTS.length - 1} />
              </span>
            </div>
            <p className="text-green-200 text-sm md:text-base leading-relaxed mt-3 mb-4 flex-1">{p.desc}</p>
            <div className="flex flex-wrap gap-1.5 mb-5">
              {p.stack.map((t) => (
                <span key={t} className="text-green-700 text-sm md:text-base border border-green-900 px-2 py-0.5 hover:border-green-600 hover:text-green-500 transition-colors">
                  {t}
                </span>
              ))}
            </div>
            <div className="flex gap-2">
            </div>
          </TerminalBox>
        ))}
      </div>
      <div className="mt-8 flex flex-wrap gap-3 justify-center md:justify-start !pt-5">
        <button onClick={() => setPage("certifications")}
          className="px-6 py-2 border border-green-700 text-green-500 text-xs font-mono tracking-widest hover:border-green-400 hover:text-green-300 transition-colors rounded-full cursor-pointer">
          ./VIEW_CERTS →
        </button>
        <button onClick={() => setPage("contact")}
          className="px-6 py-2 bg-green-400 text-black font-mono text-xs tracking-widest hover:bg-green-300 transition-colors rounded-full cursor-pointer">
          ./HIRE_ME →
        </button>
      </div>
    </PageSection>
  );
}

function PageAwards({ setPage }) {
  const [fadeIn, setFadeIn] = useState(false);
  const [lightbox, setLightbox] = useState({ open: false, src: "", title: "" });
  const [glitching, setGlitching] = useState(false);

  const openLightbox = (award) => {
    if (award.image) {
      setGlitching(true);
      setLightbox({ open: true, src: award.image, title: award.title });
      setTimeout(() => setGlitching(false), 400);
    }
  };
  const closeLightbox = () => setLightbox({ open: false, src: "", title: "" });

  useEffect(() => {
    setFadeIn(true);
  }, []);

  useEffect(() => {
    if (lightbox.open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => { 
        document.body.style.overflow = prev || "";
      };
    }
    document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [lightbox.open]);

  return (
    <>
      <PageSection subtitle="AWARDS.vault" className="pt-28 pb-20 !pt-18">
        <div style={{
          animation: fadeIn ? "fadeIn 0.8s ease-in" : "none",
          opacity: fadeIn ? 1 : 0,
        }}>
          <p className="text-green-300 text-sm mb-8 !pt-18"><TypewriterText text="Click any award card to verify accomplishments →" speed={65} /></p>
          <div className="grid sm:grid-cols-2 gap-4">
            {AWARDS.map((a) => (
              <div key={a.id} onClick={() => openLightbox(a)} className="border border-green-500/30 bg-black hover:border-green-400 transition-all duration-200 p-4 cursor-pointer relative group">
                {a.image && <div className="absolute top-2 right-2 text-green-800 font-mono text-xs group-hover:text-green-500">[ VIEW ]</div>}
                <div className="text-green-400 font-mono text-sm mb-1 tracking-widest">AWARD</div>
                <div className="text-green-300 font-mono text-base font-bold mb-1">{a.title}</div>
                <div className="text-green-400 font-mono text-sm mb-2">{a.issuer}</div>
                <div className="text-green-700 text-xs uppercase tracking-[0.18em]">{a.date}</div>
              </div>
            ))}
          </div>
        <div className="mt-8">
          <TerminalBox title="verification.log" className="max-w-xl !pt-5">
            <p className="text-green-300 text-base mb-3"><TypewriterText text="$ verify --all-awards" speed={65} startDelay={150} /></p>
            {AWARDS.map((a) => (
              <div key={a.id} className="flex items-center gap-2 mb-2 text-sm font-mono">
                <span className="text-green-500">●</span>
                <span className="text-green-700">{a.id}</span>
                <span className="text-green-900 flex-1 overflow-hidden">{"·".repeat(16)}</span>
                <span className="text-green-400">OK</span>
              </div>
            ))}
            <div className="mt-3 pt-3 border-t border-green-900/40 text-green-600 text-sm">
              <TypewriterText
                text={`${AWARDS.length} awards verified. No anomalies detected.`}
                speed={65}
                startDelay={250}
                keepCursor
              />
            </div>
          </TerminalBox>
        </div>
        <div className="mt-8 flex flex-wrap gap-3 justify-center !pt-5">
          <button onClick={() => setPage("certifications")}
            className="px-6 py-2 border border-green-700 text-green-500 text-xs font-mono tracking-widest hover:border-green-400 hover:text-green-300 transition-colors rounded-full cursor-pointer">
            ← ./CERTS.vault
          </button>
          <button onClick={() => setPage("contact")}
            className="px-6 py-2 bg-green-400 text-black font-mono text-xs tracking-widest hover:bg-green-300 transition-colors rounded-full cursor-pointer">
            ./CONTACT_ME →
          </button>
        </div>
      </div>
    </PageSection>

    {lightbox.open && (
      <div
        style={{
          position: 'fixed',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 50,
          backgroundColor: 'rgba(0,0,0,0.95)',
          paddingTop: '0px'
        }}
        onClick={closeLightbox}
      >
        {glitching && (
          <>
            <div className="fixed inset-0 pointer-events-none z-50" style={{
              animation: "glitch-corruption 0.4s ease-in-out",
              background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,0,0.06) 2px, rgba(0,255,0,0.06) 4px)",
            }} />
            {Array(5).fill(0).map((_, i) => {
              const top = Math.random() * 80;
              const height = Math.random() * 15 + 5;
              const duration = Math.random() * 0.25 + 0.1;
              const delay = Math.random() * 0.1;
              return (
                <div
                  key={i}
                  className="fixed left-0 right-0 pointer-events-none z-50 bg-green-500/30"
                  style={{
                    top: `${top}%`,
                    height: `${height}%`,
                    animation: `glitch-flicker ${duration}s ease-in-out ${delay}s`,
                    boxShadow: `0 0 15px rgba(34,197,94,0.6), inset 0 0 15px rgba(34,197,94,0.3)`,
                  }}
                />
              );
            })}
          </>
        )}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          position: 'relative',
          paddingTop: '330px'
        }}>
          <img src={lightbox.src} alt={lightbox.title} style={{
            maxWidth: '70vw',
            maxHeight: '70vh',
            width: 'auto',
            height: 'auto',
            objectFit: 'contain',
            display: 'block',
            animation: glitching ? 'lightbox-image-glitch 0.4s ease-out' : 'none',
          }} />
        </div>
        <button onClick={closeLightbox} style={{
          position: 'fixed',
          top: '100px',
          right: '-170px',
          zIndex: 51,
          padding: '8px 16px',
          backgroundColor: '#4ade80',
          color: '#000000',
          fontSize: '20px',
          fontFamily: 'monospace',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer'
        }}>✕</button>
      </div>
    )}
    </>
  );
}

function PageCertifications({ setPage }) {
  const [lightbox, setLightbox] = useState({ open: false, src: "", title: "" });
  const [loading, setLoading] = useState(false);
  const [glitching, setGlitching] = useState(false);
  const openLightbox = (cert) => {
    if (cert.image) {
      setGlitching(true);
      setLightbox({ open: true, src: cert.image, title: cert.title });
      setTimeout(() => setGlitching(false), 400);
    }
  };
  const closeLightbox = () => setLightbox({ open: false, src: "", title: "" });
  useEffect(() => {
    if (lightbox.open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => { 
        document.body.style.overflow = prev || "";
      };
    }
    // ensure scroll restored when lightbox not open
    document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [lightbox.open]);

  return (
    <>
      <PageSection subtitle="CERTS.vault" className="pt-28 pb-20 !pt-18">
        <p className="text-green-300 text-sm mb-8 !pt-18"><TypewriterText text="Click any certificate card to verify credentials →" speed={65} /></p>
        <div className="flex justify-center">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CERTIFICATIONS.map((c) => <CertCard key={c.id} cert={c} onImageClick={openLightbox} />)}
          </div>
        </div>
        <div className="mt-8">
          <TerminalBox title="verification.log" className="max-w-xl !pt-5">
            <p className="text-green-300 text-base mb-3"><TypewriterText text="$ verify --all-certs" speed={65} startDelay={150} /></p>
            {CERTIFICATIONS.filter(c => c.image).map((c) => (
              <div key={c.id} className="flex items-center gap-2 mb-2 text-sm font-mono">
                <span className="text-green-500">●</span>
                <span className="text-green-700">{c.id}</span>
                <span className="text-green-900 flex-1 overflow-hidden">{"·".repeat(16)}</span>
                <span className="text-green-400">OK</span>
              </div>
            ))}
            <div className="mt-3 pt-3 border-t border-green-900/40 text-green-600 text-sm">
              <TypewriterText
                text={`${CERTIFICATIONS.filter(c => c.image).length} certificates verified. No anomalies detected.`}
                speed={65}
                startDelay={250}
                keepCursor
              />
            </div>
          </TerminalBox>
        </div>
        <div className="mt-16 flex justify-center !pt-15">
          <button onClick={() => setPage("awards")}
            className="px-16 py-5 bg-green-400 text-black font-mono text-lg tracking-widest hover:bg-green-300 transition-colors border border-green-400 rounded-full cursor-pointer">
            ./AWARDS.vault →
          </button>
        </div>
      </PageSection>

      {lightbox.open && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 50,
            backgroundColor: 'rgba(0,0,0,0.9)',
            paddingTop: '60px'
          }}
          onClick={closeLightbox}
        >
          {glitching && (
            <>
              <div className="fixed inset-0 pointer-events-none z-50" style={{
                animation: "glitch-corruption 0.4s ease-in-out",
                background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,0,0.06) 2px, rgba(0,255,0,0.06) 4px)",
              }} />
              {Array(5).fill(0).map((_, i) => {
                const top = Math.random() * 80;
                const height = Math.random() * 15 + 5;
                const duration = Math.random() * 0.25 + 0.1;
                const delay = Math.random() * 0.1;
                return (
                  <div
                    key={i}
                    className="fixed left-0 right-0 pointer-events-none z-50 bg-green-500/30"
                    style={{
                      top: `${top}%`,
                      height: `${height}%`,
                      animation: `glitch-flicker ${duration}s ease-in-out ${delay}s`,
                      boxShadow: `0 0 15px rgba(34,197,94,0.6), inset 0 0 15px rgba(34,197,94,0.3)`,
                    }}
                  />
                );
              })}
            </>
          )}
          <div
            style={{
              position: 'relative',
              width: 'clamp(320px, 85vw, 900px)',
              height: 'auto',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(0,0,0,0.9)',
              borderRadius: '8px',
              overflow: 'visible',
              boxShadow: '0 35px 110px rgba(0,255,0,0.25)',
              padding: '20px',
              animation: glitching ? 'element-glitch-in 0.4s ease-out' : 'none',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={closeLightbox} style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              zIndex: 50,
              padding: '6px 12px',
              backgroundColor: '#4ade80',
              color: '#000000',
              fontSize: '18px',
              fontFamily: 'monospace',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer'
            }}>✕</button>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              minHeight: '100px'
            }}>
              <img src={lightbox.src} alt={lightbox.title} style={{
                maxWidth: '100%',
                maxHeight: '65vh',
                width: 'auto',
                height: 'auto',
                objectFit: 'contain',
                borderRadius: '4px',
                display: 'block',
                animation: glitching ? 'lightbox-image-glitch 0.4s ease-out' : 'none',
              }} />
            </div>
            <div style={{
              color: '#4ade80',
              textAlign: 'center',
              padding: '12px 0 0 0',
              fontSize: '14px',
              fontFamily: 'monospace',
              width: '100%',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'wrap'
            }}>{lightbox.title}</div>
          </div>
        </div>
      )}
    </>
  );
}



function PageContact() {
  const [sent, setSent] = useState(false);
  return (
    <PageSection subtitle="CONTACT.sh" className="pt-28 pb-20 !pt-18">  
      <div className="grid gap-10 lg:grid-cols-2 !pt-18">
        <TerminalBox title="send_message.sh">
          <p className="text-green-300 text-base mb-5"><TypewriterText text="$ ./initiate_connection" speed={65} /></p>
          {!sent ? (
            <div className="space-y-4">
              <div>
                <label className="text-green-700 text-sm block mb-1 !pt-5">
                  <TypewriterText text="// YOUR_NAME" speed={65} />
                </label>
                <TerminalInput
                  type="text"
                  name="contact_name"
                  placeholder="enter identifier..."
                />
              </div>
              <div>
                <label className="text-green-700 text-sm block mb-1 !pt-5">
                  <TypewriterText text="// EMAIL_ADDRESS" speed={65} startDelay={50} />
                </label>
                <TerminalInput
                  type="email"
                  name="contact_email"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="text-green-700 text-sm block mb-1 !pt-5">
                  <TypewriterText text="// MESSAGE_BODY" speed={65} startDelay={100} />
                </label>
                <TerminalTextarea
                  name="contact_message"
                  placeholder="enter message payload..."
                  rows={5}
                />
              </div>
              <button onClick={() => setSent(true)}
                className="w-full py-3 bg-green-400 text-black font-mono text-sm tracking-widest hover:bg-green-300 transition-colors border border-green-400 cursor-pointer">
                ./SEND_MESSAGE ▶
              </button>
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="text-green-400 text-5xl mb-4">✓</div>
              <div className="text-green-300 font-mono text-base">
                <TypewriterText text="Message transmitted successfully." speed={65} />
              </div>
              <div className="text-green-300 font-mono text-base mt-2">
                <TypewriterText text="Awaiting response from drexler.arroyo..." speed={65} startDelay={50} />
              </div>
              <button onClick={() => setSent(false)}
                className="mt-6 px-4 py-3 border border-green-700 text-green-300 text-sm font-mono hover:border-green-500 hover:text-green-200 transition-colors">
                <TypewriterText text="./NEW_MESSAGE" speed={65} startDelay={100} />
              </button>
            </div>
          )}
        </TerminalBox>
        <div className="flex flex-col gap-4">
          <TerminalBox title="contact_info.cfg">
            <p className="text-green-300 text-base mb-4"><TypewriterText text="$ cat contact.cfg" speed={65} /></p>
            {[
              ["PHONE", "09275120692"],
              ["EMAIL", "drexlerarroyo16@gmail.com"],
              ["LOCATION", "km.10 Doña Salud, Sasa, Davao City"],
            ].map(([k, v], i) => (
              <div key={k} className="flex gap-3 text-base mb-3">
                <span className="text-green-500 w-24 shrink-0">
                  <TypewriterText text={`${k}:`} speed={65} startDelay={i * 40} />
                </span>
                <span className="text-green-200">
                  <TypewriterText text={v} speed={65} startDelay={i * 40 + 80} />
                </span>
              </div>
            ))}
          </TerminalBox>
          <TerminalBox title="socials.links">
            <p className="text-green-300 text-base mb-4"><TypewriterText text="$ ls ./socials" speed={65} startDelay={100} /></p>
            {[
              ["GitHub", "github.com/drexlerarroyo10"],
              ["LinkedIn", "linkedin.com/in/drexlerarroyo"],
              ["Instagram", "www.instagram.com/drxlr_vn/"],
            ].map(([name, url], i) => (
              <a key={name} href={`https://${url}`} target="_blank" rel="noreferrer"
                className="flex items-center justify-between mb-3 border border-green-700 px-3 py-2 hover:border-green-500 hover:bg-green-950/20 transition-all group">
                <span className="text-green-500 text-base font-mono group-hover:text-green-200">
                  <TypewriterText text={name} speed={65} startDelay={i * 50} />
                </span>
                <span className="text-green-300 text-base font-mono group-hover:text-green-200">
                  <TypewriterText text={`${url} →`} speed={65} startDelay={i * 50 + 80} keepCursor={i === 1} />
                </span>
              </a>
              
            ))}
          </TerminalBox>
        </div>
      </div>
    </PageSection>
  );
}

// ─── BOOT SCREEN ─────────────────────────────────────────────────────────────
function BootScreen({ onDone }) {
  const [pct, setPct] = useState(0);
  const [lines, setLines] = useState([]);
  const [stepIdx, setStepIdx] = useState(0);

  const steps = [
    { pct: 15, label: "1. BIOS v2.4.0 — Initializing system..." },
    { pct: 30, label: "2. Loading kernel modules............. [OK]" },
    { pct: 50, label: "3. Mounting /dev/portfolio............. [OK]" },
    { pct: 65, label: "4. Verifying identity.................. [OK]" },
    { pct: 80, label: "5. Starting Drexler.sys................ [OK]" },
    { pct: 100, label: "6. Access granted. Welcome, operator." },
  ];

  useEffect(() => {
    if (stepIdx >= steps.length) {
      const t = setTimeout(onDone, 800);
      return () => clearTimeout(t);
    }
    const target = steps[stepIdx].pct;
    if (pct < target) {
      const t = setTimeout(() => setPct(p => p + 1), 14);
      return () => clearTimeout(t);
    } else {
      setLines(l => [...l, steps[stepIdx].label]);
      const t = setTimeout(() => setStepIdx(i => i + 1), 220);
      return () => clearTimeout(t);
    }
  }, [pct, stepIdx]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center font-mono relative overflow-hidden">
      {/* Scanlines */}
      <div className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,255,0,0.04) 2px,rgba(0,255,0,0.04) 4px)" }} />

      {/* Corner brackets */}
      {["top-4 left-4 border-t-2 border-l-2","top-4 right-4 border-t-2 border-r-2",
        "bottom-4 left-4 border-b-2 border-l-2","bottom-4 right-4 border-b-2 border-r-2"]
        .map((cls, i) => (
          <div key={i} className={`absolute w-5 h-5 border-green-500/50 ${cls}`} />
        ))}

      <div className="text-center w-80">

        {/* Label */}
        <div className="text-green-400 text-sm tracking-[0.25em] mb-4">INITIALIZING SYSTEM</div>

        {/* Progress bar */}
        <div className="w-full h-5 border border-green-500 bg-black mb-2 overflow-hidden">
          <div className="h-full transition-all duration-75"
            style={{
              width: `${pct}%`,
              background: "repeating-linear-gradient(90deg,#00cc00 0px,#00cc00 8px,#000 8px,#000 10px)"
            }} />
        </div>

        {/* Percentage */}
        <div className="text-green-400 text-sm tracking-widest mb-4">{pct}%</div>

        {/* Status lines */}
        <div className="text-left space-y-1">
          {lines.map((line, i) => (
            <div key={i} className="text-green-400 text-xs tracking-wide" style={{ opacity: 0, animation: "fadeIn 0.3s forwards" }}>
              {line}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
// ─── ACCESS GRANTED SCREEN ───────────────────────────────────────────────────
function AccessGrantedScreen({ onDone }) {
  const [glitching, setGlitching] = useState(true);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const glitchTimer = setTimeout(() => setGlitching(false), 300);
    const textTimer = setTimeout(() => setShowText(true), 400);
    const doneTimer = setTimeout(onDone, 3200);
    return () => {
      clearTimeout(glitchTimer);
      clearTimeout(textTimer);
      clearTimeout(doneTimer);
    };
  }, [onDone]);

  const glitchBars = glitching ? Array(5).fill(0).map((_, i) => ({
    id: i,
    top: Math.random() * 100,
    height: Math.random() * 20 + 8,
    duration: Math.random() * 0.3 + 0.15,
    delay: Math.random() * 0.15,
  })) : [];

  return (
    <div className="min-h-screen bg-black flex items-center justify-center font-mono relative overflow-hidden">
      <MatrixRain />
      <ScanlineOverlay />

      {glitching && (
        <>
          <div className="fixed inset-0 pointer-events-none z-40" style={{
            animation: "glitch-corruption 0.3s ease-in-out",
            background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,0,0.03) 2px, rgba(0,255,0,0.03) 4px)",
          }} />
          {glitchBars.map((bar) => (
            <div
              key={bar.id}
              className="fixed left-0 right-0 pointer-events-none z-40 bg-green-500/25"
              style={{
                top: `${bar.top}%`,
                height: `${bar.height}%`,
                animation: `glitch-flicker ${bar.duration}s ease-in-out ${bar.delay}s`,
                boxShadow: `0 0 15px rgba(34,197,94,0.5), inset 0 0 15px rgba(34,197,94,0.3)`,
              }}
            />
          ))}
        </>
      )}

      <div className="text-center z-30 relative" style={{
        opacity: showText ? 1 : 0,
        transform: showText ? "scale(1)" : "scale(0.8)",
        transition: "opacity 0.6s ease, transform 0.6s ease",
        animation: showText ? "access-granted-glow 2s ease-in-out infinite" : "none",
      }}>
        <div className="mb-2 flex justify-center">
          {["top-4 left-4 border-t-2 border-l-2","top-4 right-4 border-t-2 border-r-2"]
            .map((cls, i) => (
              <div key={i} className={`absolute w-8 h-8 border-green-500/70 ${cls}`} style={{ top: "-20px", width: "40px", height: "40px" }} />
            ))}
        </div>
        <div className="text-green-400 text-6xl font-black tracking-widest mb-4" style={{ fontFamily: "'Orbitron', monospace", textShadow: "0 0 20px rgba(34,197,94,0.8)" }}>
          ACCESS
          <br />
          GRANTED
        </div>
        <div className="text-green-300 text-xl tracking-[0.3em] mb-2" style={{ fontFamily: "'Orbitron', monospace" }}>
          WELCOME, USER
        </div>
        <div className="text-green-600 text-sm tracking-widest">
          <TypewriterText text="// SYSTEM ONLINE" speed={80} keepCursor={false} />
        </div>
        <div className="mb-2 flex justify-center">
          {["bottom-4 left-4 border-b-2 border-l-2","bottom-4 right-4 border-b-2 border-r-2"]
            .map((cls, i) => (
              <div key={i} className={`absolute w-8 h-8 border-green-500/70 ${cls}`} style={{ bottom: "-20px", width: "40px", height: "40px" }} />
            ))}
        </div>
      </div>
    </div>
  );
}

// ─── ROOT ────────────────────────────────────────────────────────────────────
export default function Portfolio() {
  const [booted, setBooted] = useState(false);
  const [accessGranted, setAccessGranted] = useState(false);
  const [page, setPage] = useState("home");

  const goToPage = (id) => {
    setPage(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderPage = () => {
    switch (page) {
      case "home": return <PageHome setPage={goToPage} />;
      case "about": return <PageAbout setPage={goToPage} />;
      case "skills": return <PageSkills setPage={goToPage} />;
      case "projects": return <PageProjects setPage={goToPage} />;
      case "certifications": return <PageCertifications setPage={goToPage} />;
      case "awards": return <PageAwards setPage={goToPage} />;
      case "contact": return <PageContact />;
      default: return <PageHome setPage={goToPage} />;
    }
  };

  if (!booted) return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Orbitron:wght@400;700;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: radial-gradient(circle at top, rgba(0,255,0,0.08), transparent 22%), linear-gradient(180deg, #050505 0%, #090909 100%); color: #c6ffd5; font-family: 'Share Tech Mono', monospace; }
        .text-green-300 { color: #b7ffd4 !important; }
        .text-green-400 { color: #8cff99 !important; }
        .text-green-500 { color: #70ff70 !important; }
        .text-green-600 { color: #5aff5a !important; }
        .text-green-700 { color: #39c739 !important; }
        .text-green-800 { color: #20a020 !important; }
        .text-green-900 { color: #0d330d !important; }
        @keyframes fadeIn { to { opacity: 1; } }
        @keyframes glitch-corruption {
          0% { transform: scaleX(1) scaleY(1); filter: hue-rotate(0deg); }
          20% { transform: scaleX(0.98) scaleY(1.02); filter: hue-rotate(90deg); }
          40% { transform: scaleX(1.02) scaleY(0.98); filter: hue-rotate(-90deg); }
          60% { transform: scaleX(0.99) scaleY(1.01); filter: hue-rotate(45deg); }
          100% { transform: scaleX(1) scaleY(1); filter: hue-rotate(0deg); }
        }
        @keyframes glitch-flicker {
          0%, 100% { opacity: 0; }
          50% { opacity: 0.8; }
        }
        @keyframes access-granted-glow {
          0%, 100% { text-shadow: 0 0 20px rgba(34,197,94,0.8), 0 0 40px rgba(34,197,94,0.4); }
          50% { text-shadow: 0 0 30px rgba(34,197,94,1), 0 0 60px rgba(34,197,94,0.6); }
        }
        @keyframes fadeToBlack {
          0% { opacity: 0; }
          50% { opacity: 0.9; }
          100% { opacity: 0; }
        }
      `}</style>
      <BootScreen onDone={() => setBooted(true)} />
    </>
  );

  if (!accessGranted) return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Orbitron:wght@400;700;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: radial-gradient(circle at top, rgba(0,255,0,0.08), transparent 22%), linear-gradient(180deg, #050505 0%, #090909 100%); color: #c6ffd5; font-family: 'Share Tech Mono', monospace; }
        .text-green-300 { color: #b7ffd4 !important; }
        .text-green-400 { color: #8cff99 !important; }
        .text-green-500 { color: #70ff70 !important; }
        .text-green-600 { color: #5aff5a !important; }
        .text-green-700 { color: #39c739 !important; }
        .text-green-800 { color: #20a020 !important; }
        .text-green-900 { color: #0d330d !important; }
        @keyframes fadeIn { to { opacity: 1; } }
        @keyframes glitch-corruption {
          0% { transform: scaleX(1) scaleY(1); filter: hue-rotate(0deg); }
          20% { transform: scaleX(0.98) scaleY(1.02); filter: hue-rotate(90deg); }
          40% { transform: scaleX(1.02) scaleY(0.98); filter: hue-rotate(-90deg); }
          60% { transform: scaleX(0.99) scaleY(1.01); filter: hue-rotate(45deg); }
          100% { transform: scaleX(1) scaleY(1); filter: hue-rotate(0deg); }
        }
        @keyframes glitch-flicker {
          0%, 100% { opacity: 0; }
          50% { opacity: 0.8; }
        }
        @keyframes access-granted-glow {
          0%, 100% { text-shadow: 0 0 20px rgba(34,197,94,0.8), 0 0 40px rgba(34,197,94,0.4); }
          50% { text-shadow: 0 0 30px rgba(34,197,94,1), 0 0 60px rgba(34,197,94,0.6); }
        }
      `}</style>
      <AccessGrantedScreen onDone={() => setAccessGranted(true)} />
    </>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Orbitron:wght@400;700;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: radial-gradient(circle at top, rgba(0,255,0,0.08), transparent 22%), linear-gradient(180deg, #050505 0%, #090909 100%); color: #c6ffd5; font-family: 'Share Tech Mono', monospace; }
        .text-green-300 { color: #b7ffd4 !important; }
        .text-green-400 { color: #8cff99 !important; }
        .text-green-500 { color: #70ff70 !important; }
        .text-green-600 { color: #5aff5a !important; }
        .text-green-700 { color: #39c739 !important; }
        .text-green-800 { color: #20a020 !important; }
        .text-green-900 { color: #0d330d !important; }
        @keyframes glitch1 {
          0%,100%{transform:translateX(-2px) skewX(0)} 20%{transform:translateX(-4px) skewX(-2deg)}
          40%{transform:translateX(2px) skewX(1deg)} 60%{transform:translateX(-2px) skewX(0)}
        }
        @keyframes glitch2 {
          0%,100%{transform:translateX(2px) skewX(0)} 20%{transform:translateX(4px) skewX(2deg)}
          40%{transform:translateX(-2px) skewX(-1deg)} 60%{transform:translateX(2px) skewX(0)}
        }
        @keyframes fadeIn { to { opacity: 1; } }
        @keyframes glitch-corruption {
          0% { transform: scaleX(1) scaleY(1); filter: hue-rotate(0deg); }
          20% { transform: scaleX(0.98) scaleY(1.02); filter: hue-rotate(90deg); }
          40% { transform: scaleX(1.02) scaleY(0.98); filter: hue-rotate(-90deg); }
          60% { transform: scaleX(0.99) scaleY(1.01); filter: hue-rotate(45deg); }
          100% { transform: scaleX(1) scaleY(1); filter: hue-rotate(0deg); }
        }
        @keyframes glitch-flicker {
          0%, 100% { opacity: 0; }
          50% { opacity: 0.8; }
        }
        @keyframes text-glitch-shake {
          0% { transform: translate(0, 0) skewX(0deg); }
          10% { transform: translate(-2px, 2px) skewX(-1deg); }
          20% { transform: translate(3px, -1px) skewX(1.5deg); }
          30% { transform: translate(-1px, 3px) skewX(-0.5deg); }
          40% { transform: translate(2px, -2px) skewX(1deg); }
          50% { transform: translate(-3px, 1px) skewX(-1.5deg); }
          60% { transform: translate(1px, 2px) skewX(0.5deg); }
          70% { transform: translate(-2px, -2px) skewX(-1deg); }
          80% { transform: translate(3px, 1px) skewX(1.5deg); }
          90% { transform: translate(-1px, -1px) skewX(-0.5deg); }
          100% { transform: translate(0, 0) skewX(0deg); }
        }
        @keyframes access-granted-glow {
          0%, 100% { text-shadow: 0 0 20px rgba(34,197,94,0.8), 0 0 40px rgba(34,197,94,0.4); }
          50% { text-shadow: 0 0 30px rgba(34,197,94,1), 0 0 60px rgba(34,197,94,0.6); }
        }
        @keyframes card-glitch {
          0% { transform: translate(0) skewX(0deg); box-shadow: -2px 2px 0 rgba(34,197,94,0.3); }
          25% { transform: translate(-1px, 1px) skewX(-0.5deg); box-shadow: 2px -2px 0 rgba(34,197,94,0.4); }
          50% { transform: translate(1px, -1px) skewX(0.5deg); box-shadow: -2px -2px 0 rgba(34,197,94,0.3); }
          75% { transform: translate(-1px, -1px) skewX(-0.3deg); box-shadow: 2px 2px 0 rgba(34,197,94,0.4); }
          100% { transform: translate(0) skewX(0deg); box-shadow: -2px 2px 0 rgba(34,197,94,0.3); }
        }
        @keyframes text-distort {
          0% { letter-spacing: 0; opacity: 1; }
          25% { letter-spacing: 2px; opacity: 0.95; }
          50% { letter-spacing: -1px; opacity: 0.98; }
          75% { letter-spacing: 1px; opacity: 0.96; }
          100% { letter-spacing: 0; opacity: 1; }
        }
        @keyframes element-glitch-in {
          0% { opacity: 0; transform: translate(-4px, 2px) skewX(-2deg); filter: hue-rotate(-20deg); }
          50% { opacity: 0.7; transform: translate(2px, -2px) skewX(1deg); filter: hue-rotate(20deg); }
          100% { opacity: 1; transform: translate(0) skewX(0deg); filter: hue-rotate(0deg); }
        }
        @keyframes lightbox-image-glitch {
          0% { opacity: 0; transform: scaleX(0.98) scaleY(1.02) translate(-2px, 1px); filter: hue-rotate(-30deg) brightness(0.9); }
          25% { opacity: 0.6; transform: scaleX(1.02) scaleY(0.99) translate(3px, -2px); filter: hue-rotate(30deg) brightness(1.1); }
          50% { opacity: 0.8; transform: scaleX(0.99) scaleY(1.01) translate(-1px, 2px); filter: hue-rotate(-15deg) brightness(0.95); }
          75% { opacity: 0.9; transform: scaleX(1.01) scaleY(0.98) translate(2px, -1px); filter: hue-rotate(15deg) brightness(1.05); }
          100% { opacity: 1; transform: scaleX(1) scaleY(1) translate(0, 0); filter: hue-rotate(0deg) brightness(1); }
        }
        ::-webkit-scrollbar { width: 4px; background: #000; }
        ::-webkit-scrollbar-thumb { background: #0f0; }
      `}</style>

      <ScanlineOverlay />
      <MatrixRain />
      <NavBar active={page} setPage={goToPage} />

      <main className="relative z-10 pt-28 w-full mx-auto px-10 xl:px-16 pb-40 min-h-screen flex flex-col items-center">
        <PageTransition pageKey={page}>
          {renderPage()}
        </PageTransition>
      </main>
      <footer className="fixed bottom-0 left-0 right-0 z-30 border-t border-green-900/30 bg-black/95 backdrop-blur-sm py-4">
        <div className="max-w-6xl mx-auto w-full px-10 xl:px-16 flex flex-col gap-3 text-green-300 text-xs font-mono md:flex-row md:justify-between">
          <div>© 2026 Drexler Van R. Arroyo</div>
          <div>&gt; {NAV_ITEMS.find(n => n.id === page)?.label} · All systems operational</div>
        </div>
      </footer>
    </>
  );
}
