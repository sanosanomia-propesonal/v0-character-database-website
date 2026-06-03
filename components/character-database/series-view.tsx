"use client"

import { Series } from "@/lib/character-data"
import { ArrowLeft, Bolt, Info, Clock } from "lucide-react"
import { useState, useMemo } from "react"

interface SeriesViewProps {
  series: Series
  onBack: () => void
  onSelectCharacter: (characterId: string) => void
  onNavigateToPowerSystem?: () => void
}

// Age tier configuration for Schism: The Beginning
interface AgeTier {
  label: string
  description: string
  minAge: number
  maxAge: number
}

const BEGINNING_AGE_TIERS: AgeTier[] = [
  { label: "Primordites Purba", description: "Olang Tuwa", minAge: 10000, maxAge: Infinity },
  { label: "Primordites Milenium", description: "Saksi Sejarah", minAge: 1500, maxAge: 9999 },
  { label: "Primordites Penasaran", description: "Kepencet Lahir", minAge: 0, maxAge: 1499 },
]

export function SeriesView({
  series,
  onBack,
  onSelectCharacter,
  onNavigateToPowerSystem,
}: SeriesViewProps) {
  const [clickedCharacterId, setClickedCharacterId] = useState<string | null>(null)

  const handleCharacterClick = (characterId: string) => {
    setClickedCharacterId(characterId)
    setTimeout(() => {
      onSelectCharacter(characterId)
      setClickedCharacterId(null)
    }, 300)
  }

  // Get series badge info
  const getSeriesBadge = () => {
    switch (series.id) {
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

  const badge = getSeriesBadge()

  // Check if this is the Schism: The Beginning series for special layout
  const isBeginningSeriesLayout = series.id === "schism-the-beginning"

  // Sort and group characters by age for The Beginning series
  const charactersByAgeTier = useMemo(() => {
    if (!isBeginningSeriesLayout) return null

    const sortedCharacters = [...series.characters].sort(
      (a, b) => b.details.age - a.details.age
    )

    return BEGINNING_AGE_TIERS.map((tier) => ({
      ...tier,
      characters: sortedCharacters.filter(
        (char) => char.details.age >= tier.minAge && char.details.age <= tier.maxAge
      ),
    })).filter((tier) => tier.characters.length > 0)
  }, [series.characters, isBeginningSeriesLayout])

  return (
    <div className="min-h-screen bg-[#0a0a0b]">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#0a0a0b]/95 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex items-center justify-between h-16">
            {/* Brand */}
            <div className="flex items-center gap-x-3">
              <span onClick={onBack} className="font-bold text-2xl tracking-[-1.5px] cursor-pointer text-zinc-100">SCHISM BASE</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-white/40 font-mono tracking-widest">v2</span>
            </div>

            {/* Nav Links */}
            <div className="hidden md:flex items-center gap-x-8 text-sm">
              <button onClick={onBack} className="nav-link px-3 py-1.5 text-white/70 hover:text-white font-medium">Beranda</button>
              <button className="nav-link active px-3 py-1.5 text-white font-medium">Series</button>
              {onNavigateToPowerSystem && (
                <button onClick={onNavigateToPowerSystem} className="nav-link px-3 py-1.5 text-white/70 hover:text-white font-medium">Power System</button>
              )}
            </div>

            <button 
              onClick={onBack} 
              className="text-sm flex items-center gap-x-2 px-5 py-2.5 rounded-full border border-white/10 hover:bg-white/5 text-zinc-300"
            >
              <ArrowLeft className="w-4 h-4 mr-1" /> Kembali ke Series
            </button>
          </div>
        </div>
      </nav>

      {/* Series Detail View */}
      <div className="max-w-7xl mx-auto px-8 pb-20 pt-8">
        {/* Header */}
        <div className="mb-10">
          <span className={`series-badge ${badge.color} text-white`}>{badge.label}</span>
          <h2 className="text-4xl font-bold tracking-tight mt-3 text-zinc-100">{series.title}</h2>
          <p className="text-white/60 mt-2 max-w-2xl">{series.description}</p>
        </div>
        
        {/* Characters Grid */}
        {isBeginningSeriesLayout && charactersByAgeTier ? (
          <div className="space-y-12">
            {charactersByAgeTier.map((tier) => (
              <div key={tier.label}>
                {/* Tier Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center border border-white/10">
                    <Clock className="w-5 h-5 text-rose-400" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-zinc-100">{tier.label}</h4>
                    <p className="text-sm text-white/50">{tier.description}</p>
                  </div>
                  <div className="flex-1 h-px bg-white/10 ml-4" />
                </div>

                {/* Characters */}
                <div className={`grid gap-6 ${
                  tier.characters.length === 1 
                    ? "grid-cols-1 max-w-md" 
                    : tier.characters.length === 2 
                    ? "grid-cols-1 md:grid-cols-2 max-w-3xl"
                    : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                }`}>
                  {tier.characters.map((character) => (
                    <div 
                      key={character.id}
                      onClick={() => handleCharacterClick(character.id)}
                      className={`character-card cursor-pointer rounded-2xl border border-white/10 bg-zinc-900 overflow-hidden group ${
                        clickedCharacterId === character.id ? "scale-95 opacity-80" : ""
                      }`}
                    >
                      <div className="h-40 relative">
                        <img 
                          src={character.thumbnailImage || "/placeholder.svg"} 
                          alt={character.name} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black/80"></div>
                        <div className="absolute bottom-4 left-4 right-4">
                          <div className="text-xs px-2.5 py-0.5 w-fit rounded bg-black/60 text-white/90 mb-1">{character.role}</div>
                          <div className="font-semibold text-xl tracking-tight text-white">{character.name}</div>
                        </div>
                      </div>
                      <div className="p-5 text-sm">
                        <p className="text-white/70 line-clamp-3">{character.shortDescription}</p>
                        <div className="mt-4 text-xs flex justify-end">
                          <span className="text-rose-400 group-hover:underline">Lihat Detail →</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {series.characters.map((character) => (
              <div 
                key={character.id}
                onClick={() => handleCharacterClick(character.id)}
                className={`character-card cursor-pointer rounded-2xl border border-white/10 bg-zinc-900 overflow-hidden group ${
                  clickedCharacterId === character.id ? "scale-95 opacity-80" : ""
                }`}
              >
                <div className="h-40 relative">
                  <img 
                    src={character.thumbnailImage || "/placeholder.svg"} 
                    alt={character.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black/80"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="text-xs px-2.5 py-0.5 w-fit rounded bg-black/60 text-white/90 mb-1">{character.role}</div>
                    <div className="font-semibold text-xl tracking-tight text-white">{character.name}</div>
                  </div>
                </div>
                <div className="p-5 text-sm">
                  <p className="text-white/70 line-clamp-3">{character.shortDescription}</p>
                  <div className="mt-4 text-xs flex justify-end">
                    <span className="text-rose-400 group-hover:underline">Lihat Detail →</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
