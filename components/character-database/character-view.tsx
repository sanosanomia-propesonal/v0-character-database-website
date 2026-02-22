"use client"

import { Character, Series, DivineCondition } from "@/lib/character-data"
import { ArrowLeft, Calendar, Images, Quote, Ruler, Scale, Sparkles, User, Sword, Wind, Shield, Brain, Zap, X, Atom } from "lucide-react"
import { useState, useRef, useCallback, useEffect } from "react"
import { ThemeToggle } from "@/components/theme-toggle"

const DIVINE_CONDITION_INFO: Record<DivineCondition, { title: string; description: string; color: string }> = {
  "Zero-Entropy": {
    title: "Zero-Entropy",
    description: "Hukum fisik dimana penderitanya tidak memiliki Astral Energy dan tidak akan mampu menguasai Astral Tecnique, sebagai gantinya fisik penderita akan absolut, tidak dapat ditarget Astral Technique dengan efek 'pasti-kena'.",
    color: "bg-gradient-to-r from-amber-500 to-yellow-400",
  },
  "Primal-Axiomatic": {
    title: "Primal-Axiomatic",
    description: "Hukum Ilahi yang hanya terdapat pada primordite khusus yang menjadi akar sebuah Astral Energy dan Astral Technique. Penciptaan, Efisiensi, pengolahan Energy dan Output teknik dalam level tak terbatas.",
    color: "bg-gradient-to-r from-violet-600 to-purple-500",
  },
  "Axiomatic": {
    title: "Axiomatic",
    description: "Hukum Ilahi berupa efisiensi, pengolahan Energy dan output teknik yang dapat meningkat tanpa batas. Sangat mengikat fisiologis dan mental penderita. Hanya akan ada SATU penderita hingga penderita terkait telah tiada",
    color: "bg-gradient-to-r from-blue-600 to-cyan-500",
  },
  "Morphogen": {
    title: "Morphogen",
    description: "Hukum Ilahi yang mengizinkan transformasi dan pembentukan entitas ciptaannya sendiri, ini bergantung pada Astral Energy mereka. Hanya akan ada SATU penderita hingga penderita terkait telah tiada.",
    color: "bg-gradient-to-r from-emerald-500 to-teal-400",
  },
}

interface CharacterViewProps {
  character: Character
  series: Series
  onBack: () => void
  onSelectCharacter: (characterId: string) => void
}

const CHARACTER_CLICK_DELAY = 300 // ms

export function CharacterView({
  character,
  series,
  onBack,
  onSelectCharacter,
}: CharacterViewProps) {
  const [clickedCharacterId, setClickedCharacterId] = useState<string | null>(null)
  const [selectedGalleryImage, setSelectedGalleryImage] = useState<string | null>(null)
  const [showDivineModal, setShowDivineModal] = useState<DivineCondition | null>(null)
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Reset gallery and modal state when character changes
  useEffect(() => {
    setSelectedGalleryImage(null)
    setShowDivineModal(null)
    setClickedCharacterId(null)
  }, [character.id])

  const otherCharacters = series.characters.filter((c) => c.id !== character.id)
  const themeClasses = series.themeColors

  const handleCharacterClick = useCallback((characterId: string) => {
    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current)
    }
    
    setClickedCharacterId(characterId)
    
    clickTimeoutRef.current = setTimeout(() => {
      onSelectCharacter(characterId)
      setClickedCharacterId(null)
    }, CHARACTER_CLICK_DELAY)
  }, [onSelectCharacter])

  const stats = [
    {
      icon: Calendar,
      label: "Usia",
      value: `${character.details.age} tahun`,
    },
    {
      icon: User,
      label: "Gender",
      value: character.details.gender,
    },
    {
      icon: Ruler,
      label: "Tinggi",
      value: `${character.details.height} cm`,
    },
    {
      icon: Scale,
      label: "Berat",
      value: `${character.details.weight} kg`,
    },
  ]

  const statCap = series.statCap || 100

  const advancedStats = character.details.stats ? [
    { icon: Sword, label: "Strength", value: character.details.stats.strength },
    { icon: Wind, label: "Agility", value: character.details.stats.agility },
    { icon: Shield, label: "Resilience", value: character.details.stats.resilience },
    { icon: Brain, label: "Intelligence", value: character.details.stats.intelligence },
    { icon: Zap, label: "Astral Technique", value: character.details.stats.astralTechnique },
  ] : []

  const getStatBarColor = (value: number, cap: number) => {
    const percentage = (value / cap) * 100
    if (percentage >= 90) return "bg-gradient-to-r from-amber-500 to-yellow-400"
    if (percentage >= 70) return "bg-gradient-to-r from-emerald-500 to-green-400"
    if (percentage >= 50) return "bg-gradient-to-r from-blue-500 to-cyan-400"
    return "bg-gradient-to-r from-slate-500 to-slate-400"
  }

  const formatStatValue = (value: number) => {
    if (value >= 1000) {
      return value.toLocaleString()
    }
    return value.toString()
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      {/* Header */}
      <header
        className={`bg-gradient-to-r ${themeClasses.primary} py-6 px-4`}
      >
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
              <h1 className="text-white font-bold text-lg">{series.title}</h1>
              <p className="text-white/80 text-sm">Character Profile</p>
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
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Character Profile Card */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="flex flex-col md:flex-row">
            {/* Character Image */}
            <div className="md:w-1/3 relative">
              <div className="aspect-square md:aspect-auto md:h-full bg-gradient-to-br from-slate-700 to-slate-800">
                <img
                  src={character.thumbnailImage || "/placeholder.svg"}
                  alt={character.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Character Info */}
            <div className="md:w-2/3 p-6 md:p-8 flex flex-col justify-center">
              <div className="mb-4">
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

              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-slate-100 mb-4">
                {character.name}
              </h2>

              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                {character.details.fullBio}
              </p>
            </div>
          </div>
        </div>

        {/* Stats Card */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 md:p-8">
          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-6">
            Informasi Dasar
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-slate-50 dark:bg-slate-700 rounded-xl p-4 text-center"
              >
                <div
                  className={`w-10 h-10 ${themeClasses.light} rounded-lg flex items-center justify-center mx-auto mb-3`}
                >
                  <stat.icon className={`w-5 h-5 ${themeClasses.accent}`} />
                </div>
                <p className="text-slate-500 dark:text-slate-400 text-sm mb-1">{stat.label}</p>
                <p className="text-slate-800 dark:text-slate-100 font-semibold">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Divine Conditions Section */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 md:p-8 mt-8">
          <div className="flex items-center gap-3 mb-6">
            <div
              className={`w-10 h-10 ${themeClasses.light} rounded-lg flex items-center justify-center`}
            >
              <Atom className={`w-5 h-5 ${themeClasses.accent}`} />
            </div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">Divine Conditions</h3>
          </div>

          {character.details.divineCondition ? (
            <>
              <div className="flex flex-wrap gap-3">
                {(["Zero-Entropy", "Primal-Axiomatic", "Axiomatic", "Morphogen"] as DivineCondition[]).map((condition) => {
                  const isActive = character.details.divineCondition === condition
                  const info = DIVINE_CONDITION_INFO[condition]
                  return (
                    <button
                      key={condition}
                      onClick={() => setShowDivineModal(condition)}
                      className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                        isActive
                          ? `${info.color} text-white shadow-lg scale-105`
                          : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                      }`}
                    >
                      {condition}
                    </button>
                  )
                })}
              </div>
              <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
                Klik pada kondisi untuk melihat penjelasan
              </p>

              {/* Inline Divine Condition Info */}
              {showDivineModal && (
                <div className="mt-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                  <div className={`${DIVINE_CONDITION_INFO[showDivineModal].color} rounded-xl p-6`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <Atom className="w-7 h-7 text-white" />
                        <h4 className="text-lg font-bold text-white">
                          {DIVINE_CONDITION_INFO[showDivineModal].title}
                        </h4>
                      </div>
                      <button
                        onClick={() => setShowDivineModal(null)}
                        className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
                      >
                        <X className="w-5 h-5 text-white" />
                      </button>
                    </div>
                    <p className="text-white/90 leading-relaxed">
                      {DIVINE_CONDITION_INFO[showDivineModal].description}
                    </p>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-4">
              <span className="text-3xl font-bold text-slate-300 dark:text-slate-600">-</span>
              <p className="mt-2 text-sm text-slate-400 dark:text-slate-500">Tidak memiliki Divine Condition</p>
            </div>
          )}
        </div>

        {/* Quote Section */}
        {character.details.quote && (
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 md:p-8 mt-8">
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 ${themeClasses.light} rounded-full flex items-center justify-center shrink-0`}>
                <Quote className={`w-6 h-6 ${themeClasses.accent}`} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-2">Quote</h3>
                <p className="text-slate-600 dark:text-slate-300 italic text-lg leading-relaxed">
                  &quot;{character.details.quote}&quot;
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Special Ability Section */}
        {character.details.specialAbility && (
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 md:p-8 mt-8">
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 ${themeClasses.light} rounded-full flex items-center justify-center shrink-0`}>
                <Sparkles className={`w-6 h-6 ${themeClasses.accent}`} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-2">Kemampuan Spesial</h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  {character.details.specialAbility}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Advanced Stats - Informasi Lanjut */}
        {character.details.stats && (
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 md:p-8 mt-8">
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-6">
              Informasi Lanjut
            </h3>

            <div className="space-y-5">
              {advancedStats.map((stat, index) => {
                const percentage = Math.min((stat.value / statCap) * 100, 100)
                return (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 ${themeClasses.light} rounded-lg flex items-center justify-center`}>
                          <stat.icon className={`w-4 h-4 ${themeClasses.accent}`} />
                        </div>
                        <span className="text-slate-700 dark:text-slate-300 font-medium">{stat.label}</span>
                      </div>
                      <span className="text-slate-800 dark:text-slate-100 font-bold">
                        {formatStatValue(stat.value)}/{formatStatValue(statCap)}
                      </span>
                    </div>
                    <div className="h-3 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-700 ease-out ${getStatBarColor(stat.value, statCap)}`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Character Shortcuts */}
        {otherCharacters.length > 0 && (
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 md:p-8 mt-8">
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-6 text-center">
              Karakter Lainnya
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              {otherCharacters.map((otherChar) => (
                <button
                  key={otherChar.id}
                  onClick={() => handleCharacterClick(otherChar.id)}
                  className={`group flex flex-col items-center transition-all duration-300 ${
                    clickedCharacterId === otherChar.id
                      ? "scale-90 opacity-50"
                      : "hover:scale-105"
                  }`}
                >
                  <div
                    className={`w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-3 border-slate-200 dark:border-slate-600 transition-all duration-300 shadow-md group-hover:shadow-lg ${
                      clickedCharacterId === otherChar.id
                        ? "ring-4 ring-opacity-50"
                        : ""
                    }`}
                  >
                    <img
                      src={otherChar.thumbnailImage || "/placeholder.svg"}
                      alt={otherChar.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span
                    className={`mt-2 text-xs md:text-sm text-slate-600 dark:text-slate-400 font-medium transition-colors max-w-20 truncate ${
                      clickedCharacterId === otherChar.id
                        ? themeClasses.accent
                        : ""
                    }`}
                  >
                    {otherChar.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Gallery Section */}
        {character.details.gallery && character.details.gallery.length > 0 && (
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 md:p-8 mt-8">
            <div className="flex items-center gap-3 mb-6">
              <div
                className={`w-10 h-10 ${themeClasses.light} rounded-lg flex items-center justify-center`}
              >
                <Images className={`w-5 h-5 ${themeClasses.accent}`} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">Galeri</h3>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {character.details.gallery.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedGalleryImage(selectedGalleryImage === image ? null : image)}
                  className={`group relative aspect-square rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-700 transition-all duration-300 hover:shadow-lg ${
                    selectedGalleryImage === image 
                      ? "ring-4 ring-offset-2 dark:ring-offset-slate-800 scale-[0.98]" 
                      : "hover:scale-[1.02]"
                  }`}
                  style={{
                    ["--tw-ring-color" as string]: selectedGalleryImage === image ? "rgb(100 116 139)" : undefined
                  }}
                >
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`${character.name} gallery ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className={`absolute inset-0 transition-colors ${
                    selectedGalleryImage === image ? "bg-black/30" : "bg-black/0 group-hover:bg-black/20"
                  }`} />
                </button>
              ))}
            </div>

            {/* Inline Image Preview */}
            {selectedGalleryImage && (
              <div 
                className="mt-6 animate-in fade-in slide-in-from-bottom-4 duration-300"
              >
                <div className="relative rounded-xl overflow-hidden bg-slate-900">
                  <img
                    src={selectedGalleryImage || "/placeholder.svg"}
                    alt="Gallery preview"
                    className="w-full h-auto max-h-[70vh] object-contain mx-auto"
                  />
                </div>
                <button
                  onClick={() => setSelectedGalleryImage(null)}
                  className={`mt-4 mx-auto block text-sm ${themeClasses.accent} hover:opacity-70 transition-opacity`}
                >
                  Tutup preview
                </button>
              </div>
            )}
          </div>
        )}

        {/* Back to Series Link */}
        <div className="text-center mt-8">
          <button
            onClick={onBack}
            className={`inline-flex items-center gap-2 ${themeClasses.accent} hover:opacity-80 font-medium transition-colors`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke {series.title}</span>
          </button>
        </div>
      </main>
    </div>
  )
}
