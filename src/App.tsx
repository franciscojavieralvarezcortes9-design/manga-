import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  BookOpen,
  Sparkles,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Crown,
  Award,
  Zap,
  RotateCcw,
  Shield,
  Check,
  Star,
  Flame,
  Eye,
  User,
  ShoppingCart,
  TrendingUp,
  Sliders,
  Share2
} from "lucide-react";

import {
  CHARACTERS,
  MANGA_DETAILS,
  PREVIEW_PAGES,
  TESTIMONIALS,
  HOTMART_URL,
  Character,
  PreviewPage
} from "./data";

import { PlayerEvaluation } from "./types";

// Import generated manga assets
import lokyCover from "./assets/images/loky_cover_1783110268379.jpg";
import lokyAction from "./assets/images/loky_action_1783110281841.jpg";

export default function App() {
  // Navigation active tab (for simple smooth scroll focus)
  const [activeTab, setActiveTab] = useState("hero");

  // Character selection for the stats showcase
  const [selectedCharacter, setSelectedCharacter] = useState<Character>(CHARACTERS[0]);

  // Manga reader state
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [readerMode, setReaderMode] = useState<"standard" | "shonen">("shonen"); // Shonen is Right-to-Left!

  // AI Aura Form state
  const [formData, setFormData] = useState({
    name: "",
    position: "Delantero",
    playstyle: "Ojo de Emperador",
    customAura: ""
  });
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState<PlayerEvaluation | null>(null);
  const [evalError, setEvalError] = useState<string | null>(null);

  // Status message rotation during AI generation
  const [loaderMessage, setLoaderMessage] = useState("Invocando el Ojo de Emperador...");

  const loaderMessages = [
    "Invocando el Ojo de Emperador...",
    "Analizando instinto competitivo...",
    "Midiendo presión de aura espiritual...",
    "Trazando mapa táctico del soberano...",
    "Forjando corona shonen de fútbol...",
    "Dictando sentencia absoluta del rey..."
  ];

  // Run player evaluation using server API
  const handleEvaluate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    setIsEvaluating(true);
    setEvalError(null);
    setEvaluationResult(null);

    // Rotate messages every 1.5s
    let msgIndex = 0;
    const interval = setInterval(() => {
      msgIndex = (msgIndex + 1) % loaderMessages.length;
      setLoaderMessage(loaderMessages[msgIndex]);
    }, 1500);

    try {
      const response = await fetch("/api/evaluate-player", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error("La sentencia del Emperador se ha retrasado. Inténtalo de nuevo.");
      }

      const data = await response.json();
      setEvaluationResult(data);
    } catch (err: any) {
      setEvalError(err?.message || "Error al conectar con la base del Emperador.");
    } finally {
      clearInterval(interval);
      setIsEvaluating(false);
    }
  };

  const resetEvaluation = () => {
    setEvaluationResult(null);
    setEvalError(null);
    setFormData({
      name: "",
      position: "Delantero",
      playstyle: "Ojo de Emperador",
      customAura: ""
    });
  };

  // Nav scroll utility
  const scrollToSection = (id: string) => {
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100 font-sans selection:bg-orange-500 selection:text-white manga-grid relative overflow-x-hidden">
      
      {/* Background Decorative Gradient Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-[1200px] right-1/4 w-[500px] h-[500px] bg-orange-900/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-40 left-10 w-96 h-96 bg-zinc-800/20 rounded-full blur-3xl pointer-events-none" />

      {/* FIXED TOP NAVIGATION */}
      <nav id="nav-bar" className="sticky top-0 z-50 bg-[#050505]/95 backdrop-blur-md border-b border-white/5 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollToSection("hero")}>
            <Crown className="w-6 h-6 text-[#FF4D00] animate-pulse" />
            <span className="font-imperial text-lg font-bold tracking-widest text-[#FF4D00]">LOKY</span>
            <span className="text-xs bg-zinc-900 text-zinc-400 font-mono px-2 py-0.5 rounded border border-white/5 ml-1">Manga</span>
          </div>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            <button
              onClick={() => scrollToSection("synopsis")}
              className={`hover:text-[#FF4D00] transition-colors ${activeTab === "synopsis" ? "text-[#FF4D00] font-semibold" : "text-zinc-400"}`}
            >
              Sinopsis
            </button>
            <button
              onClick={() => scrollToSection("characters")}
              className={`hover:text-[#FF4D00] transition-colors ${activeTab === "characters" ? "text-[#FF4D00] font-semibold" : "text-zinc-400"}`}
            >
              Personajes
            </button>
            <button
              onClick={() => scrollToSection("preview")}
              className={`hover:text-[#FF4D00] transition-colors ${activeTab === "preview" ? "text-[#FF4D00] font-semibold" : "text-zinc-400"}`}
            >
              Vista Previa
            </button>
            <button
              onClick={() => scrollToSection("aura-ai")}
              className={`hover:text-[#FF4D00] transition-colors ${activeTab === "aura-ai" ? "text-[#FF4D00] font-semibold" : "text-zinc-400"}`}
            >
              Aura AI
            </button>
            <button
              onClick={() => scrollToSection("reviews")}
              className={`hover:text-[#FF4D00] transition-colors ${activeTab === "reviews" ? "text-[#FF4D00] font-semibold" : "text-zinc-400"}`}
            >
              Opiniones
            </button>
          </div>

          {/* Buy Button */}
          <a
            id="nav-buy-btn"
            href={HOTMART_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-5 py-2.5 bg-white text-black hover:bg-[#FF4D00] hover:text-white font-bold text-xs tracking-[0.15em] uppercase transition-colors shadow-lg hover:shadow-orange-500/10 active:scale-95 duration-150"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            Comprar Ahora
          </a>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section id="hero" className="min-h-[90vh] flex items-center justify-center px-4 py-12 md:py-20 relative">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Text Content */}
          <div className="lg:col-span-7 flex flex-col space-y-6 text-left">
            
            {/* Badge */}
            <div className="inline-flex items-center gap-2 self-start bg-zinc-900/40 border border-white/10 px-3 py-1 rounded-full text-xs font-semibold text-[#FF4D00] backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5" />
              ¡Lanzamiento Oficial Independiente!
            </div>

            {/* Display Title */}
            <div className="space-y-1">
              <h2 className="font-imperial text-2xl md:text-3xl tracking-widest text-zinc-400">EL EMPERADOR DE</h2>
              <h1 className="font-imperial text-6xl md:text-8xl lg:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-100 to-zinc-400 leading-none tracking-tight py-1 relative">
                LOKY
                <span className="absolute -top-3 left-0 md:-top-5">
                  <Crown className="w-8 h-8 md:w-12 md:h-12 text-[#FF4D00] transform -rotate-12 animate-bounce" />
                </span>
              </h1>
              <p className="font-display text-lg md:text-2xl text-[#FF4D00] tracking-wider font-semibold uppercase">
                {MANGA_DETAILS.tagline}
              </p>
            </div>

            {/* Synopsis Brief */}
            <p className="text-zinc-400 text-sm md:text-base leading-relaxed max-w-2xl font-light">
              Adéntrate en una obra de arte visual sin precedentes. Sigue el ascenso de Loky en el fútbol clandestino de alta tensión. Un relato donde las tácticas divinas, el instinto asesino y la ambición forjan leyendas indestructibles. ¿Estás listo para reclamar el trono?
            </p>

            {/* Value Highlights */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 py-2">
              <div className="bg-[#0a0a0a] border border-white/5 p-3 rounded-xl flex items-center gap-2.5">
                <BookOpen className="w-5 h-5 text-[#FF4D00] shrink-0" />
                <div className="text-left">
                  <p className="text-xs text-zinc-400 font-mono">PÁGINAS</p>
                  <p className="text-sm font-semibold font-display">120+ HD</p>
                </div>
              </div>
              <div className="bg-[#0a0a0a] border border-white/5 p-3 rounded-xl flex items-center gap-2.5">
                <Award className="w-5 h-5 text-[#FF4D00] shrink-0" />
                <div className="text-left">
                  <p className="text-xs text-zinc-400 font-mono">FORMATO</p>
                  <p className="text-sm font-semibold font-display">PDF Digital</p>
                </div>
              </div>
              <div className="bg-[#0a0a0a] border border-white/5 p-3 rounded-xl col-span-2 md:col-span-1 flex items-center justify-center md:justify-start gap-2.5">
                <Flame className="w-5 h-5 text-[#FF4D00] shrink-0 animate-pulse" />
                <div className="text-left">
                  <p className="text-xs text-zinc-400 font-mono">EDAD</p>
                  <p className="text-sm font-semibold font-display">+12 Shonen</p>
                </div>
              </div>
            </div>

            {/* Checkout Pricing Card / Buttons */}
            <div className="p-4 md:p-6 rounded-2xl bg-[#0a0a0a] border border-white/5 max-w-xl backdrop-blur-sm flex flex-col md:flex-row items-center gap-6 justify-between">
              <div className="text-center md:text-left">
                <span className="text-zinc-500 line-through text-sm block font-mono">Antes: {MANGA_DETAILS.priceOriginal}</span>
                <span className="text-3xl md:text-4xl font-black font-display text-[#FF4D00] tracking-tight">
                  {MANGA_DETAILS.priceDiscount}
                </span>
                <span className="text-xs text-[#FF4D00] font-bold block mt-0.5 tracking-wider uppercase font-mono">¡50% de Descuento Especial!</span>
              </div>

              <div className="flex flex-col gap-2.5 w-full md:w-auto">
                <a
                  id="hero-buy-btn"
                  href={HOTMART_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-white hover:bg-[#FF4D00] text-black hover:text-white font-bold tracking-wider uppercase transition-all shadow-xl shadow-orange-500/5 hover:shadow-orange-500/20 active:scale-95 duration-150"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Obtener Manga
                </a>
                <button
                  onClick={() => scrollToSection("preview")}
                  className="flex items-center justify-center gap-1.5 px-6 py-2.5 rounded-xl border border-zinc-700 hover:border-[#FF4D00] text-zinc-300 hover:text-[#FF4D00] text-sm font-medium transition-colors"
                >
                  Leer Demo Gratis
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>

          {/* Cover Art Image 3D Card Showcase */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative group cursor-pointer"
            >
              {/* Golden Background Glow */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-orange-500 to-orange-700 rounded-2xl opacity-40 blur-lg group-hover:opacity-75 transition duration-500" />
              
              {/* Outer physical book container */}
              <div className="relative bg-[#0a0a0a] rounded-2xl overflow-hidden border border-white/10 shadow-2xl transition-transform duration-500 group-hover:scale-105 group-hover:rotate-1">
                <img
                  src={lokyCover}
                  alt="Loky El Emperador Manga Cover"
                  referrerPolicy="no-referrer"
                  className="w-[280px] md:w-[340px] aspect-[2/3] object-cover transition-transform duration-700 group-hover:scale-102"
                />
                
                {/* Visual Accent Badge */}
                <div className="absolute top-4 right-4 bg-black/85 backdrop-blur-md px-3 py-1 rounded border border-[#FF4D00] text-[10px] font-mono font-bold tracking-wider text-[#FF4D00]">
                  VOL. 1
                </div>

                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/40 to-transparent p-4 flex items-end justify-between">
                  <div className="text-left">
                    <p className="text-[10px] text-zinc-400 font-mono">CREADOR</p>
                    <p className="text-xs font-semibold font-display text-zinc-200">F. J. Alvarez</p>
                  </div>
                  <div className="bg-[#FF4D00] text-black font-bold font-mono text-[9px] px-2 py-0.5 rounded tracking-widest uppercase">
                    HD DIGITAL
                  </div>
                </div>
              </div>

              {/* Decorative Manga Splatters */}
              <div className="absolute -bottom-6 -left-6 w-12 h-12 border border-zinc-700 rounded bg-zinc-900 flex items-center justify-center text-xs font-mono font-bold text-zinc-500 transform -rotate-12 select-none pointer-events-none shadow">
                無料
              </div>
              <div className="absolute -top-6 -right-6 w-16 h-16 border border-zinc-700 rounded bg-zinc-900 flex items-center justify-center text-xs font-mono font-bold text-zinc-500 transform rotate-12 select-none pointer-events-none shadow">
                SOVEREIGN
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* SOVEREIGN SOLEMN QUOTE BANNER */}
      <section className="py-16 bg-[#050505] border-y border-white/5 relative overflow-hidden">
        {/* Repeating background text */}
        <div className="absolute inset-0 flex items-center justify-center opacity-5 select-none pointer-events-none">
          <span className="font-imperial text-8xl md:text-9xl tracking-widest text-white whitespace-nowrap">
            LOKY EL JUGADOR LOKY EL JUGADOR
          </span>
        </div>

        <div className="max-w-4xl mx-auto px-4 text-center space-y-4 relative z-10">
          <div className="flex justify-center items-center gap-2">
            <span className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#FF4D00]" />
            <Crown className="w-5 h-5 text-[#FF4D00]" />
            <span className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#FF4D00]" />
          </div>

          <p className="font-mono text-xl md:text-2xl text-zinc-500 tracking-widest">
            「俺 es un récordじゃない。伝説だ。」
          </p>
          <p className="font-imperial text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-100 to-zinc-400 uppercase tracking-tight py-1">
            "No soy un récord. Soy una leyenda."
          </p>
          <p className="text-zinc-500 text-xs md:text-sm font-light max-w-md mx-auto">
            El juramento del Emperador absoluto que redefine la historia del deporte shonen.
          </p>
        </div>
      </section>

      {/* CORE DETAILS & SYNOPSIS BENTO */}
      <section id="synopsis" className="py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center space-y-2 mb-12">
          <p className="font-mono text-xs text-[#FF4D00] font-bold tracking-widest uppercase">LA HISTORIA DE UN REY</p>
          <h2 className="font-imperial text-3xl md:text-5xl font-extrabold tracking-wide">SINOPSIS Y ARCHIVOS REALES</h2>
          <div className="w-16 h-[2px] bg-[#FF4D00] mx-auto mt-3" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Main Synopsis Card */}
          <div className="lg:col-span-7 rounded-2xl bg-[#0a0a0a] border border-white/5 p-6 md:p-8 flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF4D00]/5 rounded-full blur-2xl pointer-events-none group-hover:bg-[#FF4D00]/10 transition-all duration-300" />
            
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-[#FF4D00] font-mono text-xs tracking-wider font-bold">
                <BookOpen className="w-4 h-4" />
                EL MANGA ORIGINAL
              </div>
              <h3 className="font-display text-2xl font-bold text-zinc-100">Sinopsis Oficial de la Obra</h3>
              <p className="text-zinc-400 text-sm md:text-base leading-relaxed font-light whitespace-pre-line text-left">
                {MANGA_DETAILS.synopsis}
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center gap-4 justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#0a0a0a] border border-white/10 flex items-center justify-center font-imperial font-bold text-[#FF4D00]">
                  L
                </div>
                <div className="text-left">
                  <p className="text-xs text-zinc-500 font-mono">AUTOR / ILUSTRADOR</p>
                  <p className="text-sm font-semibold text-zinc-200">{MANGA_DETAILS.author}</p>
                </div>
              </div>
              <a
                href={HOTMART_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto text-center px-5 py-2.5 rounded-lg bg-white hover:bg-[#FF4D00] text-black hover:text-white text-xs font-bold tracking-wider uppercase transition-colors"
              >
                Comprar Copia Original
              </a>
            </div>
          </div>

          {/* Technical Specifications Grid */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Format spec */}
            <div className="bg-[#0a0a0a]/50 border border-white/5 p-5 rounded-2xl text-left flex flex-col justify-between">
              <div className="p-2.5 bg-[#0a0a0a] rounded-lg w-fit border border-white/10">
                <Award className="w-5 h-5 text-[#FF4D00]" />
              </div>
              <div className="mt-4">
                <p className="text-[10px] text-zinc-500 font-mono tracking-wider">FORMATO DIGITAL</p>
                <p className="text-sm font-bold text-zinc-200 mt-1">Súper HD PDF</p>
                <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed font-light">Totalmente optimizado para tablets, iPads, ordenadores y smartphones.</p>
              </div>
            </div>

            {/* Pages spec */}
            <div className="bg-[#0a0a0a]/50 border border-white/5 p-5 rounded-2xl text-left flex flex-col justify-between">
              <div className="p-2.5 bg-[#0a0a0a] rounded-lg w-fit border border-white/10">
                <BookOpen className="w-5 h-5 text-[#FF4D00]" />
              </div>
              <div className="mt-4">
                <p className="text-[10px] text-zinc-500 font-mono tracking-wider">EXTENSIÓN DE ARTE</p>
                <p className="text-sm font-bold text-zinc-200 mt-1">120+ Páginas</p>
                <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed font-light">Capítulos cargados de tensión, bocetos y extras de producción.</p>
              </div>
            </div>

            {/* Language spec */}
            <div className="bg-[#0a0a0a]/50 border border-white/5 p-5 rounded-2xl text-left flex flex-col justify-between">
              <div className="p-2.5 bg-[#0a0a0a] rounded-lg w-fit border border-white/10">
                <Shield className="w-5 h-5 text-[#FF4D00]" />
              </div>
              <div className="mt-4">
                <p className="text-[10px] text-zinc-500 font-mono tracking-wider">IDIOMA & SEGURIDAD</p>
                <p className="text-sm font-bold text-zinc-200 mt-1">100% Español</p>
                <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed font-light">Traducido perfectamente con las expresiones shonen más épicas.</p>
              </div>
            </div>

            {/* Platform spec */}
            <div className="bg-[#0a0a0a]/50 border border-white/5 p-5 rounded-2xl text-left flex flex-col justify-between relative overflow-hidden group">
              <div className="absolute top-0 right-0 bg-[#FF4D00] text-white font-bold text-[9px] font-mono px-2 py-0.5 rounded-bl">
                SEGURO
              </div>
              <div className="p-2.5 bg-[#0a0a0a] rounded-lg w-fit border border-white/10">
                <Zap className="w-5 h-5 text-[#FF4D00]" />
              </div>
              <div className="mt-4">
                <p className="text-[10px] text-zinc-500 font-mono tracking-wider">MÉTODO DE COMPRA</p>
                <p className="text-sm font-bold text-zinc-200 mt-1">Garantía Hotmart</p>
                <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed font-light">Acceso inmediato tras el pago. Transacciones cifradas y seguras.</p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* CHARACTER SHOWCASE (STATS GAUGES) */}
      <section id="characters" className="py-20 px-4 bg-[#050505] border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center space-y-2 mb-12">
            <p className="font-mono text-xs text-[#FF4D00] font-bold tracking-widest uppercase">FICHA DE CONTENDIENTES</p>
            <h2 className="font-imperial text-3xl md:text-5xl font-extrabold tracking-wide">EL ELENCO IMPERIAL</h2>
            <div className="w-16 h-[2px] bg-[#FF4D00] mx-auto mt-3" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* List of characters to select */}
            <div className="lg:col-span-4 flex flex-col gap-3">
              <p className="text-left font-mono text-xs text-zinc-500 px-1 mb-1">SELECCIONA UN JUGADOR PARA EVALUAR SUS ESTADÍSTICAS:</p>
              {CHARACTERS.map((char) => (
                <button
                  key={char.id}
                  onClick={() => setSelectedCharacter(char)}
                  className={`w-full p-4 rounded-xl text-left border transition-all duration-200 flex items-center justify-between group ${selectedCharacter.id === char.id ? "bg-[#0a0a0a] border-[#FF4D00] shadow-md shadow-orange-500/5" : "bg-[#0a0a0a]/40 border-white/5 hover:border-white/10"}`}
                >
                  <div className="space-y-1">
                    <p className={`text-sm font-bold font-display ${selectedCharacter.id === char.id ? "text-[#FF4D00]" : "text-zinc-300 group-hover:text-zinc-100"}`}>
                      {char.name}
                    </p>
                    <p className="text-xs text-zinc-500 font-light">{char.role}</p>
                  </div>
                  <ChevronRight className={`w-4 h-4 text-zinc-600 transition-transform ${selectedCharacter.id === char.id ? "text-[#FF4D00] translate-x-1" : "group-hover:translate-x-0.5"}`} />
                </button>
              ))}

              {/* Promo highlight banner inside selector */}
              <div className="p-4 rounded-xl bg-[#0a0a0a] border border-white/5 text-left mt-3">
                <Crown className="w-5 h-5 text-[#FF4D00] mb-2" />
                <p className="text-xs font-semibold text-[#FF4D00]">¿Quieres conocer tu propio rango?</p>
                <p className="text-[11px] text-zinc-400 mt-1 leading-relaxed">Usa nuestra herramienta de Inteligencia Artificial para evaluar tu aura real en la sección de abajo.</p>
              </div>
            </div>

            {/* Selected Character Detail & Dynamic Stat Grid */}
            <div className="lg:col-span-8 rounded-2xl bg-[#0a0a0a] border border-white/5 p-6 md:p-8 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-orange-600/5 rounded-full blur-3xl pointer-events-none" />

              <div className="space-y-6">
                
                {/* Character Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-4">
                  <div className="text-left">
                    <span className="text-[10px] bg-orange-500/10 border border-[#FF4D00]/20 text-[#FF4D00] font-mono px-2 py-0.5 rounded">
                      VERIFICADO POR EL SOBERANO
                    </span>
                    <h3 className="font-imperial text-2xl md:text-3xl font-black text-zinc-100 mt-2">{selectedCharacter.name}</h3>
                    <p className="text-xs text-zinc-500 font-mono mt-0.5">{selectedCharacter.role}</p>
                  </div>

                  <div className="flex items-center gap-1.5 bg-[#0a0a0a] border border-white/10 px-3 py-1.5 rounded-xl self-start">
                    <Award className="w-4 h-4 text-[#FF4D00]" />
                    <span className="text-xs font-mono font-bold text-[#FF4D00]">LOKY OFFICIAL FILE</span>
                  </div>
                </div>

                {/* Shonen Quote & Description */}
                <div className="space-y-3 text-left">
                  <p className="font-mono text-sm italic text-orange-400 bg-orange-500/5 border-l-2 border-[#FF4D00] p-3 rounded-r-lg">
                    {selectedCharacter.quote}
                  </p>
                  <p className="text-zinc-400 text-sm leading-relaxed font-light">
                    {selectedCharacter.description}
                  </p>
                </div>

                {/* Stats Bar Container */}
                <div className="space-y-3 pt-2">
                  <h4 className="text-left font-mono text-xs text-zinc-500 tracking-wider font-semibold uppercase">GRÁFICO DE EVALUACIÓN TÁCTICA:</h4>
                  <div className="space-y-3.5">
                    {Object.entries(selectedCharacter.stats).map(([statName, val]) => (
                      <div key={statName} className="space-y-1">
                        <div className="flex justify-between text-xs font-mono">
                          <span className="text-zinc-400 uppercase tracking-widest">{statName}</span>
                          <span className="text-[#FF4D00] font-bold">{val} / 99</span>
                        </div>
                        <div className="h-2 w-full bg-[#050505] rounded-full overflow-hidden border border-white/5">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${((val as number) / 99) * 100}%` }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="h-full rounded-full bg-gradient-to-r from-[#e03200] via-[#ff4d00] to-[#ff6e54] orange-glow"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Small Footnote */}
              <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] text-zinc-500 font-mono">
                <span>RANGO GENERAL: EXCEPCIONAL</span>
                <span>REGISTRO SOBERANO #106596990V</span>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* INTERACTIVE MANGA DEMO READER */}
      <section id="preview" className="py-20 px-4 bg-[#050505] relative">
        <div className="max-w-5xl mx-auto">
          
          <div className="text-center space-y-2 mb-10">
            <p className="font-mono text-xs text-[#FF4D00] font-bold tracking-widest uppercase">CAPÍTULO PILOTO DE MUESTRA</p>
            <h2 className="font-imperial text-3xl md:text-5xl font-extrabold tracking-wide">Lector de Manga Interactivo</h2>
            <div className="w-16 h-[2px] bg-[#FF4D00] mx-auto mt-3" />
          </div>

          {/* Reader Configuration Bar */}
          <div className="p-3 bg-[#0a0a0a] border border-white/5 rounded-xl mb-6 flex flex-col sm:flex-row gap-3 items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#FF4D00]" />
              <span className="text-xs text-zinc-300 font-medium font-display">
                Página {currentPageIndex + 1} de {PREVIEW_PAGES.length}: <span className="text-[#FF4D00]">{PREVIEW_PAGES[currentPageIndex].title}</span>
              </span>
            </div>

            {/* Toggle standard / shonen mode */}
            <div className="flex items-center gap-2.5">
              <span className="text-[10px] text-zinc-500 font-mono">MODO DE LECTURA:</span>
              <div className="bg-[#050505] p-1 rounded-lg border border-white/5 inline-flex">
                <button
                  onClick={() => setReaderMode("standard")}
                  className={`px-2.5 py-1 rounded text-[10px] font-mono transition-colors ${readerMode === "standard" ? "bg-[#0a0a0a] border border-white/10 text-zinc-100" : "text-zinc-500"}`}
                >
                  Izquierda-Derecha
                </button>
                <button
                  onClick={() => setReaderMode("shonen")}
                  className={`px-2.5 py-1 rounded text-[10px] font-mono transition-colors relative ${readerMode === "shonen" ? "bg-[#FF4D00] text-white font-semibold" : "text-zinc-500"}`}
                >
                  Shonen (RTL) ★
                </button>
              </div>
            </div>
          </div>

          {/* Active Reader Frame */}
          <div className="relative border border-white/5 rounded-2xl overflow-hidden bg-[#0a0a0a] min-h-[460px] p-6 flex flex-col justify-between shadow-2xl">
            
            {/* Page Header Vibe */}
            <div className="flex items-center justify-between text-[11px] text-zinc-600 font-mono pb-4 border-b border-white/5 select-none">
              <span>MANGA LOKY // VOLUMEN 1 // CAPÍTULO 1</span>
              <span className="text-[#FF4D00] font-semibold bg-orange-500/5 px-2 py-0.5 rounded border border-[#FF4D00]/10">
                {readerMode === "shonen" ? "← LEER DE DERECHA A IZQUIERDA ←" : "→ LEER DE IZQUIERDA A DERECHA →"}
              </span>
            </div>

            {/* Content representation of panels */}
            <div className="py-6 flex-1 flex flex-col justify-center">
              <div className="space-y-4 text-center select-none">
                
                {/* Visual Scene Narrative banner */}
                <div className="p-3 bg-[#0a0a0a]/50 border-l border-[#FF4D00] text-zinc-400 text-xs italic font-light rounded max-w-2xl mx-auto leading-relaxed">
                  "{PREVIEW_PAGES[currentPageIndex].sceneDescription}"
                </div>

                {/* Render Simulated Panels (manga layout in web form!) */}
                <div className={PREVIEW_PAGES[currentPageIndex].panelStyle + " py-4 max-w-4xl mx-auto"}>
                  {PREVIEW_PAGES[currentPageIndex].panels.map((panel) => (
                    <motion.div
                      key={panel.id}
                      whileHover={{ scale: 1.01 }}
                      className={`p-5 border rounded-xl flex flex-col justify-between text-left transition-all ${panel.isKeyFrame ? "bg-gradient-to-b border-[#FF4D00]/40 shadow-xl shadow-orange-500/5" : "bg-gradient-to-b border-white/5"} ${panel.bgGradient}`}
                    >
                      <div>
                        <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded ${panel.isKeyFrame ? "bg-[#FF4D00] text-white" : "bg-[#050505] text-zinc-400 border border-white/5"}`}>
                          {panel.subTitle}
                        </span>
                        <p className="text-xs text-zinc-300 mt-3 leading-relaxed font-light">
                          {panel.text}
                        </p>
                      </div>

                      {panel.isKeyFrame && (
                        <div className="mt-4 flex items-center gap-1.5 text-[#FF4D00] font-mono text-[9px] font-bold tracking-widest select-none">
                          <Flame className="w-3 h-3 animate-pulse" />
                          CUADRO CLAVE DEL MANGA
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>

                {/* Dialog Bubble Showcase */}
                <div className="max-w-xl mx-auto mt-2 p-4 bg-[#0a0a0a] border border-white/5 rounded-2xl relative">
                  {/* Speech bubble pointer */}
                  <div className="absolute -bottom-2.5 left-1/2 transform -translate-x-1/2 w-5 h-5 bg-[#0a0a0a] border-r border-b border-white/5 rotate-45" />
                  
                  <div className="space-y-1">
                    <p className="font-mono text-base font-bold text-[#FF4D00] tracking-wider">
                      {PREVIEW_PAGES[currentPageIndex].dialogueJapanese}
                    </p>
                    <p className="text-xs font-medium text-zinc-400 italic">
                      {PREVIEW_PAGES[currentPageIndex].dialogueSpanish}
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Reader Controls Footer */}
            <div className="pt-4 border-t border-white/5 flex items-center justify-between">
              
              {/* Prev Button */}
              <button
                onClick={() => {
                  if (readerMode === "shonen") {
                    // RTL: Next page index is "Prev" button!
                     if (currentPageIndex < PREVIEW_PAGES.length - 1) {
                      setCurrentPageIndex(currentPageIndex + 1);
                    }
                  } else {
                    // LTR
                    if (currentPageIndex > 0) {
                      setCurrentPageIndex(currentPageIndex - 1);
                    }
                  }
                }}
                disabled={readerMode === "shonen" ? currentPageIndex === PREVIEW_PAGES.length - 1 : currentPageIndex === 0}
                className="flex items-center gap-1 px-4 py-2 rounded-lg bg-[#0a0a0a] hover:bg-zinc-900 border border-white/5 hover:border-white/10 text-xs font-mono text-white font-bold disabled:opacity-40 disabled:cursor-not-allowed transition-all select-none"
              >
                <ChevronLeft className="w-4 h-4" />
                {readerMode === "shonen" ? "PÁG. SIGUIENTE" : "PÁG. ANTERIOR"}
              </button>

              <div className="font-mono text-[10px] text-zinc-600">
                PÁG. DE MUESTRA 00{currentPageIndex + 1}
              </div>

              {/* Next Button */}
              <button
                onClick={() => {
                  if (readerMode === "shonen") {
                    // RTL: Prev page index is "Next" button!
                    if (currentPageIndex > 0) {
                      setCurrentPageIndex(currentPageIndex - 1);
                    }
                  } else {
                    // LTR
                    if (currentPageIndex < PREVIEW_PAGES.length - 1) {
                      setCurrentPageIndex(currentPageIndex + 1);
                    }
                  }
                }}
                disabled={readerMode === "shonen" ? currentPageIndex === 0 : currentPageIndex === PREVIEW_PAGES.length - 1}
                className="flex items-center gap-1 px-4 py-2 rounded-lg bg-white hover:bg-[#FF4D00] text-black hover:text-white text-xs font-mono font-bold disabled:opacity-40 disabled:cursor-not-allowed transition-colors select-none"
              >
                {readerMode === "shonen" ? "PÁG. ANTERIOR" : "PÁG. SIGUIENTE"}
                <ChevronRight className="w-4 h-4" />
              </button>

            </div>

          </div>

          {/* Quick link to buy full experience */}
          <div className="mt-8 text-center space-y-3">
            <p className="text-xs text-zinc-400 font-light">
              Este es solo un adelanto conceptual del primer capítulo para destacar la dinámica del guion y el arte.
            </p>
            <a
              id="preview-buy-cta"
              href={HOTMART_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-white/10 hover:border-[#FF4D00] text-[#FF4D00] hover:text-[#FF4D00]/85 font-display text-xs font-bold uppercase tracking-wider transition-colors"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              Obtén el tomo completo de 120+ páginas en alta calidad
            </a>
          </div>

        </div>
      </section>

      {/* GEMINI SERVER-SIDE AI EVALUATION */}
      <section id="aura-ai" className="py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center space-y-2 mb-12">
          <p className="font-mono text-xs text-[#FF4D00] font-bold tracking-widest uppercase">INTELIGENCIA ARTIFICIAL SOBERANA</p>
          <h2 className="font-imperial text-3xl md:text-5xl font-extrabold tracking-wide">ANALIZADOR DE AURA SHONEN</h2>
          <div className="w-16 h-[2px] bg-[#FF4D00] mx-auto mt-3" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Form Input Section */}
          <div className="lg:col-span-5 rounded-2xl bg-[#0a0a0a] border border-white/5 p-6 flex flex-col justify-between relative">
            
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-[#FF4D00] font-mono text-xs tracking-wider font-bold text-left">
                <Sparkles className="w-4 h-4" />
                SISTEMA GEMINI 3.5 FLASH
              </div>
              <h3 className="font-display text-xl font-bold text-zinc-100 text-left">Descubre tu Vínculo con Loky</h3>
              <p className="text-zinc-400 text-xs md:text-sm leading-relaxed text-left font-light">
                Ingresa tus datos futbolísticos y deja que el Ojo del Emperador evalúe tu talento, forje tu rango militar soberano y dicte tu frase de leyenda definitiva.
              </p>

              <form onSubmit={handleEvaluate} className="space-y-4 pt-2 text-left">
                
                {/* Name */}
                <div className="space-y-1">
                  <label className="text-[10px] text-zinc-400 font-mono tracking-wider block">NOMBRE O ALIAS:</label>
                  <input
                    type="text"
                    required
                    maxLength={30}
                    placeholder="Ej. Francisco, El Gato, Kaiser"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#050505] border border-white/10 focus:border-[#FF4D00] rounded-xl px-4 py-2.5 text-zinc-200 text-sm focus:outline-none transition-colors"
                  />
                </div>

                {/* Position */}
                <div className="space-y-1">
                  <label className="text-[10px] text-zinc-400 font-mono tracking-wider block">POSICIÓN DE PREFERENCIA:</label>
                  <select
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    className="w-full bg-[#050505] border border-white/10 focus:border-[#FF4D00] rounded-xl px-4 py-2.5 text-zinc-200 text-sm focus:outline-none transition-colors cursor-pointer"
                  >
                    <option value="Delantero">Delantero (Instinto Letal)</option>
                    <option value="Mediocampista">Mediocampista (Cerebro y Control)</option>
                    <option value="Defensor">Defensor (El Sector Infranqueable)</option>
                    <option value="Portero">Portero (La Sentencia Final)</option>
                  </select>
                </div>

                {/* Playstyle */}
                <div className="space-y-1">
                  <label className="text-[10px] text-zinc-400 font-mono tracking-wider block">ESTILO DE JUEGO PRINCIPAL:</label>
                  <select
                    value={formData.playstyle}
                    onChange={(e) => setFormData({ ...formData, playstyle: e.target.value })}
                    className="w-full bg-[#050505] border border-white/10 focus:border-[#FF4D00] rounded-xl px-4 py-2.5 text-zinc-200 text-sm focus:outline-none transition-colors cursor-pointer"
                  >
                    <option value="Ojo de Emperador">Ojo de Emperador (Visión Futura y Análisis)</option>
                    <option value="Velocidad Relámpago">Velocidad Relámpago (Aceleración y Escape)</option>
                    <option value="Fuerza y Colisión">Fuerza y Colisión (Dominio Físico Absoluto)</option>
                    <option value="Técnica Divina">Técnica Divina (Regate Perfecto y Tiro con Efecto)</option>
                  </select>
                </div>

                {/* Custom Aura Input */}
                <div className="space-y-1">
                  <label className="text-[10px] text-zinc-400 font-mono tracking-wider block">AURA DE PODER (OPCIONAL):</label>
                  <input
                    type="text"
                    maxLength={25}
                    placeholder="Ej. Trueno Púrpura, Fuego Celestial, Sombra"
                    value={formData.customAura}
                    onChange={(e) => setFormData({ ...formData, customAura: e.target.value })}
                    className="w-full bg-[#050505] border border-white/10 focus:border-[#FF4D00] rounded-xl px-4 py-2.5 text-zinc-200 text-sm focus:outline-none transition-colors"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isEvaluating}
                  className="w-full py-3 rounded-xl bg-white hover:bg-[#FF4D00] text-black hover:text-white font-bold tracking-wider uppercase transition-colors shadow-md active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-xs"
                >
                  <Zap className="w-4 h-4 animate-bounce" />
                  {isEvaluating ? "Generando Sentencia..." : "Despertar mi Aura de Emperador"}
                </button>

              </form>
            </div>

            {/* Error Message */}
            {evalError && (
              <div className="mt-4 p-3 bg-red-950/30 border border-red-500/20 rounded-xl text-red-400 text-xs text-left">
                {evalError}
              </div>
            )}

            {/* Note */}
            <p className="text-[10px] text-zinc-500 font-mono text-left mt-6">
              *Este informe se genera dinámicamente utilizando inteligencia artificial y se ajusta a la ambientación deportiva y estética oficial del manga LOKY.
            </p>

          </div>

          {/* Evaluation Result / Showcase Section */}
          <div className="lg:col-span-7 rounded-2xl bg-[#0a0a0a] border border-white/5 p-6 md:p-8 flex flex-col justify-center items-center relative overflow-hidden min-h-[480px]">
            <div className="absolute inset-0 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />

            <AnimatePresence mode="wait">
              
              {/* LOADING STATE */}
              {isEvaluating && (
                <motion.div
                  key="loader"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center space-y-6 text-center py-12"
                >
                  <div className="relative">
                    <div className="w-20 h-20 border-4 border-zinc-800 border-t-[#FF4D00] rounded-full animate-spin" />
                    <Crown className="w-8 h-8 text-[#FF4D00] absolute inset-0 m-auto animate-pulse" />
                  </div>
                  <div className="space-y-2">
                    <p className="font-display font-semibold text-zinc-200 animate-pulse">{loaderMessage}</p>
                    <p className="text-xs text-zinc-500 font-mono">EL OJO DEL EMPERADOR ESTÁ INSPECCIONANDO TU ALMA...</p>
                  </div>
                </motion.div>
              )}

              {/* SUCCESS STATE */}
              {!isEvaluating && evaluationResult && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full space-y-6 text-left"
                >
                  {/* Card Header */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-4">
                    <div className="space-y-1">
                      <span className="text-[9px] bg-[#FF4D00] text-white font-mono font-bold px-2 py-0.5 rounded tracking-widest uppercase shadow">
                        AURA SOBERANA CONFIRMADA
                      </span>
                      <h4 className="font-imperial text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-400 leading-tight pt-1">
                        {formData.name.toUpperCase()}
                      </h4>
                      <p className="font-mono text-xs text-zinc-400 font-semibold">{evaluationResult.nickname}</p>
                    </div>

                    {/* Sovereign Rank Badge */}
                    <div className="flex items-center justify-center w-20 h-20 rounded-xl bg-gradient-to-br from-orange-950/40 to-black border border-[#FF4D00] shadow-lg shadow-orange-500/10 text-center shrink-0">
                      <div>
                        <p className="text-[8px] text-[#FF4D00] font-mono uppercase tracking-widest font-bold">RANGO</p>
                        <p className="text-3xl font-black font-display text-[#FF4D00] leading-none mt-1 animate-pulse">
                          {evaluationResult.sovereignRank}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Body analysis / stats / moves */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                    
                    <div className="space-y-4">
                      {/* Aura vibe */}
                      <div className="text-xs">
                        <span className="text-zinc-500 font-mono block">COLOR Y ESENCIA DEL AURA:</span>
                        <span className="text-zinc-200 font-semibold font-display">{evaluationResult.auraColor}</span>
                      </div>

                      {/* Special Technique */}
                      <div className="p-3.5 bg-[#0a0a0a] border border-white/10 rounded-xl space-y-1.5 text-xs">
                        <span className="text-[#FF4D00] font-bold font-mono tracking-widest block uppercase">★ TÉCNICA DEFINITIVA:</span>
                        <p className="text-sm font-bold text-zinc-100 font-display">{evaluationResult.specialMove}</p>
                        <p className="text-zinc-400 font-light leading-relaxed">{evaluationResult.specialMoveDescription}</p>
                      </div>

                      {/* Tactical description */}
                      <div className="text-xs space-y-1.5">
                        <span className="text-zinc-500 font-mono block">INFORME TÁCTICO DEL EMPERADOR:</span>
                        <p className="text-zinc-400 font-light leading-relaxed">{evaluationResult.tacticalAnalysis}</p>
                      </div>
                    </div>

                    {/* Stats block */}
                    <div className="p-4 rounded-xl bg-[#0a0a0a]/50 border border-white/5 space-y-3.5">
                      <span className="text-[10px] text-zinc-500 font-mono block tracking-wider uppercase">VALORES TÁCTICOS ASIGNADOS:</span>
                      
                      {Object.entries(evaluationResult.stats).map(([statName, val]) => (
                        <div key={statName} className="space-y-1 text-xs">
                          <div className="flex justify-between font-mono">
                            <span className="text-zinc-400 uppercase tracking-wider">{statName}</span>
                            <span className="text-[#FF4D00] font-bold">{val} / 99</span>
                          </div>
                          <div className="h-1.5 w-full bg-[#050505] rounded-full overflow-hidden border border-white/5">
                            <div
                              style={{ width: `${((val as number) / 99) * 100}%` }}
                              className="h-full rounded-full bg-[#FF4D00] orange-glow"
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                  </div>

                  {/* Tailored Quote */}
                  <div className="p-4 rounded-xl bg-orange-500/5 border border-[#FF4D00]/20 text-xs italic font-light text-orange-400 relative">
                    <p className="font-mono text-[10px] text-[#FF4D00] not-italic uppercase tracking-widest font-bold mb-1">CITA DE BATALLA RECALIBRADA:</p>
                    "{evaluationResult.emperorQuote}"
                  </div>

                  {/* Reset action and CTA */}
                  <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                    <button
                      onClick={resetEvaluation}
                      className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-white/5 hover:border-white/10 text-zinc-400 hover:text-zinc-100 text-xs font-mono"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      REAVALUAR TALENTO
                    </button>

                    <a
                      href={HOTMART_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:flex-1 py-2.5 rounded-lg bg-white hover:bg-[#FF4D00] text-black hover:text-white text-center font-bold text-xs tracking-wider uppercase transition-colors"
                    >
                      Conquistar el Campo con Loky en Hotmart
                    </a>
                  </div>

                </motion.div>
              )}

              {/* DEFAULT PLACEHOLDER STATE */}
              {!isEvaluating && !evaluationResult && (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center space-y-6 text-center max-w-md py-12"
                >
                  <div className="w-16 h-16 rounded-full bg-[#0a0a0a]/50 border border-white/5 flex items-center justify-center text-zinc-500">
                    <Eye className="w-8 h-8 text-[#FF4D00]/40 animate-pulse" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-display font-bold text-lg text-zinc-200">El Trono Espera tu Sentencia</h4>
                    <p className="text-zinc-400 text-xs font-light leading-relaxed">
                      Completa el formulario de la izquierda con tu nombre, posición y playstyle. El Ojo del Emperador evaluará tu alma de fútbol y te otorgará un rango soberano instantáneo.
                    </p>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>

          </div>

        </div>
      </section>

      {/* LATEST TESTIMONIALS */}
      <section id="reviews" className="py-20 px-4 bg-[#050505] border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center space-y-2 mb-12">
            <p className="font-mono text-xs text-[#FF4D00] font-bold tracking-widest uppercase">LA VOZ DEL PUEBLO DE LOKY</p>
            <h2 className="font-imperial text-3xl md:text-5xl font-extrabold tracking-wide">OPINIONES DE LECTORES</h2>
            <div className="w-16 h-[2px] bg-[#FF4D00] mx-auto mt-3" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((test) => (
              <div
                key={test.id}
                className="p-6 rounded-2xl bg-[#0a0a0a] border border-white/5 flex flex-col justify-between text-left relative overflow-hidden group"
              >
                <div className="space-y-4">
                  {/* Stars */}
                  <div className="flex items-center gap-1">
                    {[...Array(test.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#FF4D00] text-[#FF4D00]" />
                    ))}
                  </div>

                  {/* Comment */}
                  <p className="text-zinc-300 text-xs md:text-sm leading-relaxed font-light">
                    "{test.comment}"
                  </p>
                </div>

                {/* Reader Profile */}
                <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#0a0a0a] border border-white/10 flex items-center justify-center font-display font-bold text-xs text-[#FF4D00] uppercase select-none">
                    {test.avatarInitials}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-zinc-200 font-display">{test.name}</p>
                    <p className="text-[10px] text-zinc-500 font-mono">{test.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* FINAL CHECKOUT CTA */}
      <section className="py-20 px-4 relative overflow-hidden bg-[#050505] text-center border-t border-white/5">
        {/* Background Action Banner blurred */}
        <div className="absolute inset-0 opacity-15 select-none pointer-events-none">
          <img
            src={lokyAction}
            alt="Action Background"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover filter blur-xs"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black" />
        </div>

        <div className="max-w-3xl mx-auto space-y-8 relative z-10">
          
          <div className="flex justify-center">
            <div className="w-16 h-16 rounded-full bg-orange-950/40 border border-[#FF4D00]/20 flex items-center justify-center shadow-lg shadow-orange-500/10">
              <Crown className="w-8 h-8 text-[#FF4D00] animate-pulse" />
            </div>
          </div>

          <div className="space-y-3">
            <span className="font-mono text-xs text-[#FF4D00] tracking-widest font-bold bg-orange-500/10 border border-[#FF4D00]/20 px-3 py-1 rounded-full uppercase">
              OFERTA DE TIEMPO LIMITADO
            </span>
            <h2 className="font-imperial text-4xl md:text-6xl font-black text-zinc-100 uppercase tracking-tight pt-2">
              RECLAMA TU TRONO HOY
            </h2>
            <p className="text-zinc-400 text-sm md:text-base font-light max-w-xl mx-auto leading-relaxed">
              No dejes pasar la oportunidad de tener este manga deportivo revolucionario en tu biblioteca digital. Acceso inmediato, formato HD de élite y garantía de satisfacción.
            </p>
          </div>

          {/* Pricing Highlight */}
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-[#0a0a0a] border border-white/5 rounded-2xl p-4 sm:p-6 backdrop-blur-sm shadow-xl">
            <div className="text-center sm:text-left pr-0 sm:pr-6 border-r-0 sm:border-r border-white/5 pb-3 sm:pb-0">
              <span className="text-zinc-500 line-through text-xs block font-mono">Precio Oficial: {MANGA_DETAILS.priceOriginal}</span>
              <span className="text-3xl md:text-4xl font-black font-display text-[#FF4D00]">
                {MANGA_DETAILS.priceDiscount}
              </span>
              <span className="text-[10px] text-[#FF4D00] font-bold block mt-0.5 font-mono uppercase tracking-wider">PRECIO DE LANZAMIENTO</span>
            </div>

            <div className="text-center sm:text-left text-xs text-zinc-400 space-y-1 max-w-xs">
              <div className="flex items-center gap-1.5 justify-center sm:justify-start">
                <Check className="w-3.5 h-3.5 text-[#FF4D00] shrink-0" />
                <span>Pago único, acceso ilimitado de por vida</span>
              </div>
              <div className="flex items-center gap-1.5 justify-center sm:justify-start">
                <Check className="w-3.5 h-3.5 text-[#FF4D00] shrink-0" />
                <span>Compatible con móviles, tablets y PCs</span>
              </div>
              <div className="flex items-center gap-1.5 justify-center sm:justify-start">
                <Check className="w-3.5 h-3.5 text-[#FF4D00] shrink-0" />
                <span>Procesado seguro por la plataforma Hotmart</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center gap-4">
            <a
              id="final-checkout-buy-btn"
              href={HOTMART_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex items-center justify-center gap-3 px-12 py-4 rounded-xl bg-white hover:bg-[#FF4D00] text-black hover:text-white font-black text-sm tracking-widest uppercase transition-colors shadow-xl shadow-orange-500/5 hover:shadow-orange-500/20 active:scale-95 duration-150"
            >
              <ShoppingCart className="w-5 h-5" />
              ¡COMPRAR AHORA EN HOTMART!
            </a>

            <div className="flex flex-wrap items-center justify-center gap-4 text-zinc-500 text-xs font-mono pt-2">
              <span className="flex items-center gap-1">
                <Shield className="w-3.5 h-3.5" /> Compra 100% Segura
              </span>
              <span>•</span>
              <span>Garantía de reembolso de 7 días</span>
              <span>•</span>
              <span>Soporte 24/7 de Hotmart</span>
            </div>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#050505] text-zinc-500 text-xs py-10 px-4 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="flex items-center gap-2">
            <Crown className="w-5 h-5 text-[#FF4D00]" />
            <span className="font-imperial text-sm font-extrabold tracking-widest text-[#FF4D00] uppercase">LOKY EL JUGADOR</span>
          </div>

          <p className="font-light text-center md:text-right">
            © {new Date().getFullYear()} Francisco Javier Alvarez. Todos los derechos reservados. <br />
            Esta es una obra independiente de manga deportivo de élite. Las compras se procesan de forma externa y segura a través de Hotmart.
          </p>

        </div>
      </footer>

    </div>
  );
}
