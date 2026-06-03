"use client"

import { Series } from "@/lib/character-data"
import { ArrowRight, Bolt, Info, Users, Hourglass } from "lucide-react"
import { useState } from "react"

interface HomeViewProps {
  series: Series[]
  onSelectSeries: (seriesId: string) => void
  onNavigateToPowerSystem: () => void
}

export function HomeView({ series, onSelectSeries, onNavigateToPowerSystem }: HomeViewProps) {
  const [showAbout, setShowAbout] = useState(false)

  // Get series badge info
  const getSeriesBadge = (seriesId: string) => {
    switch (seriesId) {
      case "schism-termina":
        return { label: "MAIN TIMELINE", color: "bg-emerald-600" }
      case "schism-the-beginning":
        return { label: "PREQUEL", color: "bg-amber-600" }
      case "schism-hell":
        return { label: "MYSTERY", color: "bg-red-600" }
      default:
        return { label: "SERIES", color: "bg-zinc-600" }
    }
  }

  const getSeriesSubtitle = (seriesId: string) => {
    switch (seriesId) {
      case "schism-termina":
        return "Timeline Utama • Act 0"
      case "schism-the-beginning":
        return "Asal-usul • Keluarga Primordium"
      case "schism-hell":
        return "??? • Belum Terungkap"
      default:
        return ""
    }
  }

  const getSeriesAccentColor = (seriesId: string) => {
    switch (seriesId) {
      case "schism-termina":
        return "text-emerald-400"
      case "schism-the-beginning":
        return "text-amber-400"
      case "schism-hell":
        return "text-red-400"
      default:
        return "text-zinc-400"
    }
  }

  if (showAbout) {
    return (
      <div className="min-h-screen bg-[#0a0a0b]">
        {/* Navbar */}
        <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#0a0a0b]/95 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-x-3">
                <span onClick={() => setShowAbout(false)} className="font-bold text-2xl tracking-[-1.5px] cursor-pointer text-zinc-100">SCHISM BASE</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-white/40 font-mono tracking-widest">v2</span>
              </div>
              <button onClick={() => setShowAbout(false)} className="text-sm px-4 py-2 rounded-full border border-white/10 hover:bg-white/5 transition-colors text-white/70 hover:text-white">
                Kembali
              </button>
            </div>
          </div>
        </nav>

        {/* About Content */}
        <div className="max-w-3xl mx-auto px-8 py-16 text-center">
          <h2 className="text-4xl font-semibold tracking-tight mb-4 text-zinc-100">Tentang Schism Base</h2>
          <p className="text-white/70 max-w-md mx-auto">Database ini dibuat sebagai arsip resmi untuk semua informasi karakter, kekuatan, dan lore dari Schism Series. Semua data dikumpulkan dan diverifikasi langsung dari sumber cerita.</p>
          
          <div className="mt-10 text-xs text-white/40">
            Versi remake ini dibuat ulang dengan desain yang lebih personal dan immersive.<br />
            Tidak ada elemen generik AI. Semua komponen dibuat dengan tangan.
          </div>
          
          <button onClick={() => setShowAbout(false)} className="mt-10 px-6 py-3 text-sm border border-white/20 rounded-2xl hover:bg-white/5 text-zinc-200">
            Kembali ke Beranda
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0a0b]" role="main">
      {/* Navbar - Minimal */}
      <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#0a0a0b]/95 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex items-center justify-between h-16">
            {/* Brand */}
            <div className="flex items-center gap-x-3">
              <span className="font-bold text-2xl tracking-[-1.5px] cursor-pointer text-zinc-100">SCHISM BASE</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-white/40 font-mono tracking-widest">v2</span>
            </div>

            {/* Nav Links */}
            <div className="hidden md:flex items-center gap-x-8 text-sm">
              <button className="nav-link active px-3 py-1.5 text-white font-medium">Beranda</button>
              <button onClick={onNavigateToPowerSystem} className="nav-link px-3 py-1.5 text-white/70 hover:text-white font-medium">Power System</button>
            </div>

            <div className="flex items-center gap-x-3">
              <button 
                onClick={() => setShowAbout(true)}
                className="text-xs px-4 py-2 rounded-full border border-white/10 hover:bg-white/5 transition-colors flex items-center gap-x-2 text-white/70 hover:text-white"
              >
                <Info className="w-3.5 h-3.5" />
                <span className="hidden sm:inline text-xs">Tentang</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-8 pt-16 pb-20">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-x-2 px-3.5 py-1 rounded-full bg-white/5 text-xs tracking-[2px] mb-6 border border-white/10">
            <div className="w-1.5 h-1.5 bg-rose-500 rounded-full animate-pulse"></div>
            <span className="font-medium text-white/60">BETA • REVISI DARI AWAL</span>
          </div>

          <h1 className="heading-display text-7xl md:text-[5.25rem] leading-[0.92] tracking-[-4.5px] font-bold text-zinc-100">
            SCHISM<br />BASE
          </h1>
          
          <p className="mt-6 text-2xl text-white/60 max-w-md">
            Arsip lengkap karakter dari semesta yang retak.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <button 
              onClick={() => {
                const seriesSection = document.getElementById('series-section')
                seriesSection?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="px-9 py-4 bg-white text-[#0a0a0b] rounded-2xl font-semibold flex items-center gap-x-3 hover:bg-zinc-200 active:scale-[0.985] transition-all text-base shadow-xl shadow-black/30"
            >
              <span>Jelajahi Semua Series</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            
            <button 
              onClick={onNavigateToPowerSystem}
              className="px-7 py-4 rounded-2xl border border-white/15 hover:bg-white/5 flex items-center gap-x-3 text-base transition-all text-zinc-200"
            >
              <Bolt className="w-5 h-5" />
              <span>Power System</span>
            </button>
          </div>

          <div className="mt-12 flex items-center gap-x-4 text-sm text-white/50">
            <div>{series.length} Series Aktif</div>
            <div className="w-px h-3 bg-white/20"></div>
            <div>{series.reduce((acc, s) => acc + s.characters.length, 0)}+ Karakter Terdata</div>
            <div className="w-px h-3 bg-white/20"></div>
            <div>4 Omniverses</div>
          </div>
        </div>
      </div>

      {/* Series Overview Section */}
      <div id="series-section" className="max-w-7xl mx-auto px-8 pb-24">
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="uppercase tracking-[3px] text-xs font-semibold text-rose-400 mb-2">EXPLORE THE FRACTURE</div>
            <h2 className="section-header text-zinc-100">Semua Series</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {series.map((s) => {
            const badge = getSeriesBadge(s.id)
            const subtitle = getSeriesSubtitle(s.id)
            const accentColor = getSeriesAccentColor(s.id)
            
            return (
              <div 
                key={s.id}
                onClick={() => onSelectSeries(s.id)} 
                className="lore-card group cursor-pointer rounded-3xl overflow-hidden bg-zinc-900 border border-white/10"
              >
                <div className="relative h-56">
                  <img 
                    src={s.coverImage || "/placeholder.svg"} 
                    alt={s.title} 
                    className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/60 to-black/90"></div>
                  <div className="absolute top-5 right-5">
                    <span className={`series-badge ${badge.color} text-white text-[10px]`}>{badge.label}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-3xl tracking-tight text-zinc-100">{s.title}</h3>
                  <p className={`${accentColor} text-sm mt-1 mb-4`}>{subtitle}</p>
                  <p className="text-white/70 text-[15px] leading-relaxed line-clamp-2">{s.description}</p>
                  <div className="mt-6 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-x-1.5 text-white/60">
                      <Users className="w-3.5 h-3.5" />
                      <span>{s.characters.length} Karakter</span>
                    </div>
                    <span className="text-rose-400 group-hover:underline">Lihat Karakter →</span>
                  </div>
                </div>
              </div>
            )
          })}

          {/* Coming Soon Card */}
          <div className="lore-card rounded-3xl overflow-hidden bg-zinc-900/60 border border-white/10 flex flex-col">
            <div className="h-56 bg-zinc-950 flex items-center justify-center relative">
              <div className="text-center">
                <Hourglass className="w-12 h-12 text-white/20 mx-auto mb-4" />
                <div className="text-white/50 text-sm tracking-widest">COMING SOON</div>
              </div>
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <h3 className="font-bold text-3xl tracking-tight text-white/70">SCHISM: ???</h3>
              <p className="text-white/40 text-sm mt-1 mb-auto">Babak baru sedang ditulis di balik retakan.</p>
              <div className="text-xs text-white/40 mt-4">Segera hadir</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
