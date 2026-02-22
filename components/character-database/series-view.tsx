"use client"

import { Series, Character } from "@/lib/character-data"
import { ArrowLeft, ChevronRight, Clock } from "lucide-react"
import { useState, useMemo } from "react"
import { ThemeToggle } from "@/components/theme-toggle"

interface SeriesViewProps {
  series: Series
  onBack: () => void
  onSelectCharacter: (characterId: string) => void
}

// Age tier configuration for Fallen: The Beginning
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
}: SeriesViewProps) {
  const [clickedCharacterId, setClickedCharacterId] = useState<string | null>(null)

  const handleCharacterClick = (characterId: string) => {
    setClickedCharacterId(characterId)
    setTimeout(() => {
      onSelectCharacter(characterId)
      setClickedCharacterId(null)
    }, 300)
  }

  // Dynamic theme classes based on series
  const themeClasses = series.themeColors

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
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      {/* Header with gradient */}
      <header className={`relative bg-gradient-to-r ${themeClasses.primary} pt-6 pb-32 px-4`}>
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center">
                <img src="/favicon.png" alt="Schism Base" className="w-10 h-10 object-cover" />
              </div>
              <div>
                <h1 className="text-white font-bold text-lg">{series.title}</h1>
                <p className="text-white/80 text-sm">Schism Base</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={onBack}
                className="flex items-center gap-2 text-white/80 hover:text-white transition-colors bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Kembali</span>
              </button>
              <ThemeToggle />
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
              {series.title}
            </h2>
            <p className="text-sm leading-5 text-white">List Karakter (belom full update)</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 -mt-20">
        {/* About Section */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 md:p-8 mb-8">
          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-4">
            Tentang {series.title}
          </h3>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-sans font-semibold py-5 my-0 mx-0 px-0 mt-5 pt-10 leading-10">{series.description}</p>
        </div>

        {/* Characters Section */}
        <div className="mb-12">
          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-6">
            Karakter Utama
          </h3>

          {/* Special layout for Fallen: The Beginning - grouped by age tiers */}
          {isBeginningSeriesLayout && charactersByAgeTier ? (
            <div className="space-y-10">
              {charactersByAgeTier.map((tier, tierIndex) => (
                <div key={tier.label}>
                  {/* Tier Header */}
                  <div className="flex items-center gap-3 mb-5">
                    <div className={`w-10 h-10 ${themeClasses.light} rounded-lg flex items-center justify-center`}>
                      <Clock className={`w-5 h-5 ${themeClasses.accent}`} />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-slate-800 dark:text-slate-100">{tier.label}</h4>
                      <p className="text-sm text-slate-500 dark:text-slate-400">{tier.description}</p>
                    </div>
                    <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700 ml-4" />
                  </div>

                  {/* Characters Grid - adaptive layout based on count */}
                  <div className={`grid gap-6 ${
                    tier.characters.length === 1 
                      ? "grid-cols-1 max-w-md mx-auto" 
                      : tier.characters.length === 2 
                      ? "grid-cols-1 md:grid-cols-2 max-w-3xl mx-auto"
                      : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                  }`}>
                    {tier.characters.map((character, charIndex) => (
                      <div
                        key={character.id}
                        onClick={() => handleCharacterClick(character.id)}
                        className={`bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden group cursor-pointer transition-all duration-300 ${
                          clickedCharacterId === character.id
                            ? "scale-95 opacity-80"
                            : "hover:shadow-xl hover:scale-[1.02]"
                        } ${tierIndex === 0 ? "ring-2 ring-blue-200 dark:ring-blue-800" : ""}`}
                      >
                        {/* Character Image */}
                        <div className="relative aspect-square bg-gradient-to-br from-slate-700 to-slate-800">
                          <img
                            src={character.thumbnailImage || "/placeholder.svg"}
                            alt={character.name}
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                          
                          {/* Age Badge */}
                          <div className="absolute top-4 right-4">
                            <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-black/50 text-white backdrop-blur-sm opacity-0">
                              {character.details.age.toLocaleString()} tahun
                            </span>
                          </div>
                          
                          {/* Role Badge */}
                          <div className="absolute bottom-4 left-4">
                            <span
                              className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
                                character.role === "Protagonist"
                                  ? `${themeClasses.secondary} text-white`
                                  : character.role === "Alomani"
                                  ? "bg-red-500 text-white"
                                  : character.role === "Antagonist"
                                  ? "bg-purple-700 text-white"
                                  : "bg-slate-500 text-white"
                              }`}
                            >
                              {character.role}
                            </span>
                          </div>
                          {clickedCharacterId === character.id && (
                            <div className="absolute inset-0 bg-white/30 animate-pulse" />
                          )}
                        </div>

                        {/* Character Info */}
                        <div className="p-6">
                          <h4 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">
                            {character.name}
                          </h4>
                          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4 line-clamp-3">
                            {character.shortDescription}
                          </p>
                          <div
                            className={`flex items-center gap-2 ${themeClasses.accent} hover:opacity-80 font-medium text-lg sm:text-xl transition-colors group/btn`}
                          >
                            <span>Lihat Detail</span>
                            <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Default layout for other series */
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {series.characters.map((character) => (
                <div
                  key={character.id}
                  onClick={() => handleCharacterClick(character.id)}
                  className={`bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden group cursor-pointer transition-all duration-300 ${
                    clickedCharacterId === character.id
                      ? "scale-95 opacity-80"
                      : "hover:shadow-xl hover:scale-[1.02]"
                  }`}
                >
                  {/* Character Image */}
                  <div className="relative aspect-square bg-gradient-to-br from-slate-700 to-slate-800">
                    <img
                      src={character.thumbnailImage || "/placeholder.svg"}
                      alt={character.name}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <span
                        className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
                          character.role === "Protagonist"
                            ? `${themeClasses.secondary} text-white`
                            : character.role === "Alomani"
                            ? "bg-red-500 text-white"
                            : character.role === "Antagonist"
                            ? "bg-purple-700 text-white"
                            : "bg-slate-500 text-white"
                        }`}
                      >
                        {character.role}
                      </span>
                    </div>
                    {clickedCharacterId === character.id && (
                      <div className="absolute inset-0 bg-white/30 animate-pulse" />
                    )}
                  </div>

                  {/* Character Info */}
                  <div className="p-6">
                    <h4 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">
                      {character.name}
                    </h4>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4 line-clamp-3">
                      {character.shortDescription}
                    </p>
                    <div
                      className={`flex items-center gap-2 ${themeClasses.accent} hover:opacity-80 font-medium text-lg sm:text-xl transition-colors group/btn`}
                    >
                      <span>Lihat Detail</span>
                      <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
