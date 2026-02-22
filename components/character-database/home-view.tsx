"use client"

import { Series } from "@/lib/character-data"
import { ChevronRight, Zap, BookOpen } from "lucide-react"
import { useState } from "react"
import { ThemeToggle } from "@/components/theme-toggle"

interface HomeViewProps {
  series: Series[]
  onSelectSeries: (seriesId: string) => void
  onNavigateToPowerSystem: () => void
}

export function HomeView({ series, onSelectSeries, onNavigateToPowerSystem }: HomeViewProps) {
  const [clickedSeriesId, setClickedSeriesId] = useState<string | null>(null)
  const [isMangaButtonPressed, setIsMangaButtonPressed] = useState(false)

  const handleSeriesClick = (seriesId: string) => {
    setClickedSeriesId(seriesId)
    setTimeout(() => {
      onSelectSeries(seriesId)
      setClickedSeriesId(null)
    }, 300)
  }

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 transition-colors duration-300" role="main">
      {/* Header - Monochrome */}
      <header className="bg-gradient-to-r from-slate-800 to-slate-700 py-6 px-4" role="banner">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-white font-bold text-lg">SCHISM SERIES</h1>
              <p className="text-white/80 text-sm">Character Database</p>
            </div>
          </div>
          
          {/* Right side buttons */}
          <div className="flex items-center gap-2">
            {/* Power System Button */}
            <button
              onClick={onNavigateToPowerSystem}
              className="flex items-center gap-2 px-3 py-2 text-sm text-white/70 hover:text-white border border-white/20 hover:border-white/40 rounded-lg transition-all duration-200 hover:bg-white/5"
            >
              <Zap className="w-4 h-4" />
              <span className="hidden sm:inline">Power System</span>
            </button>
            
            {/* Theme Toggle */}
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12" aria-label="Series Selection">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-slate-100 mb-2 animate-fade-in-up">
            SCHISM SERIES
          </h2>
          <h3 className="text-2xl md:text-3xl font-bold text-slate-700 dark:text-slate-300 mb-4 animate-fade-in-up-delay">
            CHARACTER DATA
          </h3>
          
          {/* Baca Manga Button */}
          <div className="flex justify-center mb-6 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <a
              href="https://v0-manga-schism.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              onMouseDown={() => setIsMangaButtonPressed(true)}
              onMouseUp={() => setIsMangaButtonPressed(false)}
              onMouseLeave={() => setIsMangaButtonPressed(false)}
              className={`group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 ${
                isMangaButtonPressed ? "scale-95 shadow-md" : "scale-100"
              }`}
            >
              <BookOpen className="w-5 h-5 group-hover:rotate-12 transition-transform duration-200" />
              <span>Baca Manga</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          <p className="text-black dark:text-slate-400 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>Pilih series wok:</p>
        </div>

        {/* Series Cards Grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {series.map((s) => (
            <button
              key={s.id}
              onClick={() => handleSeriesClick(s.id)}
              className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-700 to-slate-800 aspect-[16/10] transition-all duration-300 ${
                clickedSeriesId === s.id
                  ? "scale-95 opacity-70"
                  : "hover:scale-[1.02] hover:shadow-xl"
              }`}
            >
              <img
                src={s.coverImage || "/placeholder.svg"}
                alt={s.title}
                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-70 transition-opacity"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-6 text-left">
                <h3 className="text-white font-bold text-xl md:text-2xl leading-tight">
                  {s.title.split(": ")[0]}:
                  <br />
                  {s.title.split(": ")[1]}
                </h3>
                <div className="flex items-center gap-1 text-white/80 mt-2 group-hover:text-white transition-colors">
                  <span className="text-sm">Explore</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
              {clickedSeriesId === s.id && (
                <div className="absolute inset-0 bg-white/20 animate-pulse" />
              )}
            </button>
          ))}

          {/* Coming Soon Card */}
          <button
            disabled
            className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800 aspect-[16/10] cursor-not-allowed"
          >
            <div className="absolute inset-0 flex flex-col justify-end p-6 text-left">
              <h3 className="text-slate-600 dark:text-slate-400 font-bold text-xl md:text-2xl leading-tight">
                TO BE
                <br />
                ANNOUNCED
              </h3>
              <span className="inline-block mt-3 px-3 py-1 bg-slate-400/50 dark:bg-slate-600/50 text-slate-600 dark:text-slate-400 text-xs font-medium rounded-full w-fit">
                COMING SOON
              </span>
            </div>
            {/* Decorative lines */}
            <svg
              className="absolute inset-0 w-full h-full opacity-20"
              viewBox="0 0 400 250"
            >
              <line
                x1="50"
                y1="50"
                x2="350"
                y2="200"
                stroke="currentColor"
                strokeWidth="1"
                className="text-slate-400 dark:text-slate-500"
              />
              <line
                x1="100"
                y1="30"
                x2="380"
                y2="180"
                stroke="currentColor"
                strokeWidth="1"
                className="text-slate-400 dark:text-slate-500"
              />
            </svg>
          </button>
        </div>

        {/* Footer text */}
        <p className="text-center text-sm mt-12 font-semibold text-card-foreground tracking-wide border-0">
          Beta test, Cerita revisi dari nol!
        </p>
      </main>
    </div>
  )
}
