"use client"

import { Character, Series, DivineCondition } from "@/lib/character-data"
import { ArrowLeft, X } from "lucide-react"
import { useState, useRef, useCallback, useEffect } from "react"

const DIVINE_CONDITION_INFO: Record<DivineCondition, { title: string; description: string }> = {
  "Zero-Entropy": {
    title: "Zero-Entropy",
    description: "Hukum fisik dimana penderitanya tidak memiliki Astral Energy dan tidak akan mampu menguasai Astral Tecnique, sebagai gantinya fisik penderita akan absolut, tidak dapat ditarget Astral Technique dengan efek 'pasti-kena'.",
  },
  "Primal-Axiomatic": {
    title: "Primal-Axiomatic",
    description: "Hukum Ilahi yang hanya terdapat pada primordite khusus yang menjadi akar sebuah Astral Energy dan Astral Technique. Penciptaan, Efisiensi, pengolahan Energy dan Output teknik dalam level tak terbatas.",
  },
  "Axiomatic": {
    title: "Axiomatic",
    description: "Hukum Ilahi berupa efisiensi, pengolahan Energy dan output teknik yang dapat meningkat tanpa batas. Sangat mengikat fisiologis dan mental penderita. Hanya akan ada SATU penderita hingga penderita terkait telah tiada",
  },
  "Morphogen": {
    title: "Morphogen",
    description: "Hukum Ilahi yang mengizinkan transformasi dan pembentukan entitas ciptaannya sendiri, ini bergantung pada Astral Energy mereka. Hanya akan ada SATU penderita hingga penderita terkait telah tiada.",
  },
}

interface CharacterViewProps {
  character: Character
  series: Series
  onBack: () => void
  onSelectCharacter: (characterId: string) => void
}

const CHARACTER_CLICK_DELAY = 300

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

  // Reset state when character changes
  useEffect(() => {
    setSelectedGalleryImage(null)
    setShowDivineModal(null)
    setClickedCharacterId(null)
  }, [character.id])

  const otherCharacters = series.characters.filter((c) => c.id !== character.id)

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

  const formatStatValue = (value: number) => {
    if (value >= 1000) {
      return value.toLocaleString()
    }
    return value.toString()
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

  return (
    <div className="min-h-screen bg-[#0a0a0b]">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#0a0a0b]/95 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-x-3">
              <span onClick={onBack} className="font-bold text-2xl tracking-[-1.5px] cursor-pointer text-zinc-100">SCHISM BASE</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-white/40 font-mono tracking-widest">v2</span>
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

      {/* Character Detail - Card Style */}
      <div className="max-w-3xl mx-auto px-8 py-10">
        <div className="bg-zinc-900 border border-white/10 rounded-3xl overflow-hidden">
          <div className="p-8 md:p-10">
            {/* Header */}
            <div className="mb-8">
              <div className="text-xs text-white/50 mb-1">{series.title}</div>
              <h3 className="text-3xl font-bold tracking-tight text-zinc-100">{character.name}</h3>
              <div className="inline-block mt-2 px-3 py-0.5 text-xs rounded-full bg-white/10 text-white/80">{character.role}</div>
            </div>

            <div className="grid md:grid-cols-5 gap-10">
              {/* Image */}
              <div className="md:col-span-2">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 bg-zinc-950">
                  <img 
                    src={character.thumbnailImage || "/placeholder.svg"} 
                    alt={character.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Badges */}
                <div className="mt-5 flex flex-wrap gap-2">
                  <div className="px-3 py-1 text-xs rounded-full border border-white/15 text-white/70">Astral Energy</div>
                  {character.details.divineCondition && (
                    <div className="px-3 py-1 text-xs rounded-full border border-white/15 text-white/70">Divine Condition</div>
                  )}
                </div>
              </div>

              {/* Info */}
              <div className="md:col-span-3">
                <div className="text-[15px] leading-relaxed text-white/85">
                  <p>{character.details.fullBio}</p>
                </div>
                
                {/* Extra Info Section */}
                <div className="mt-8 pt-8 border-t border-white/10">
                  <div className="detail-label mb-4">INFORMASI DASAR</div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-white/50">Usia</span>
                      <p className="text-white/90 font-medium">{character.details.age.toLocaleString()} tahun</p>
                    </div>
                    <div>
                      <span className="text-white/50">Gender</span>
                      <p className="text-white/90 font-medium">{character.details.gender}</p>
                    </div>
                    <div>
                      <span className="text-white/50">Tinggi</span>
                      <p className="text-white/90 font-medium">{character.details.height} cm</p>
                    </div>
                    <div>
                      <span className="text-white/50">Berat</span>
                      <p className="text-white/90 font-medium">{character.details.weight} kg</p>
                    </div>
                  </div>
                </div>

                {/* Divine Condition */}
                {character.details.divineCondition && (
                  <div className="mt-8 pt-8 border-t border-white/10">
                    <div className="detail-label mb-4">DIVINE CONDITION</div>
                    <button
                      onClick={() => setShowDivineModal(character.details.divineCondition!)}
                      className="px-4 py-2 rounded-lg bg-gradient-to-r from-rose-900 to-purple-900 text-white text-sm font-medium hover:from-rose-800 hover:to-purple-800 transition-all"
                    >
                      {character.details.divineCondition}
                    </button>
                    <p className="mt-3 text-xs text-white/50">Klik untuk melihat penjelasan</p>
                  </div>
                )}

                {/* Quote */}
                {character.details.quote && (
                  <div className="mt-8 pt-8 border-t border-white/10">
                    <div className="detail-label mb-4">QUOTE</div>
                    <p className="text-white/80 italic text-lg leading-relaxed">
                      &quot;{character.details.quote}&quot;
                    </p>
                  </div>
                )}

                {/* Special Ability */}
                {character.details.specialAbility && (
                  <div className="mt-8 pt-8 border-t border-white/10">
                    <div className="detail-label mb-4">KEMAMPUAN SPESIAL</div>
                    <p className="text-white/80">{character.details.specialAbility}</p>
                  </div>
                )}

                {/* Advanced Stats */}
                {character.details.stats && (
                  <div className="mt-8 pt-8 border-t border-white/10">
                    <div className="detail-label mb-4">INFORMASI LANJUT</div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-white/50">Strength</span>
                        <p className="text-white/90 font-medium">{formatStatValue(character.details.stats.strength)}</p>
                      </div>
                      <div>
                        <span className="text-white/50">Agility</span>
                        <p className="text-white/90 font-medium">{formatStatValue(character.details.stats.agility)}</p>
                      </div>
                      <div>
                        <span className="text-white/50">Resilience</span>
                        <p className="text-white/90 font-medium">{formatStatValue(character.details.stats.resilience)}</p>
                      </div>
                      <div>
                        <span className="text-white/50">Intelligence</span>
                        <p className="text-white/90 font-medium">{formatStatValue(character.details.stats.intelligence)}</p>
                      </div>
                      <div>
                        <span className="text-white/50">Astral Technique</span>
                        <p className="text-white/90 font-medium">{formatStatValue(character.details.stats.astralTechnique)}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Footer */}
          <div className="border-t border-white/10 px-8 md:px-10 py-5 bg-black/30 flex justify-end gap-x-3 text-sm">
            <button onClick={onBack} className="px-6 py-2.5 text-white/70 hover:text-white">Kembali</button>
          </div>
        </div>

        {/* Gallery Section */}
        {character.details.gallery && character.details.gallery.length > 0 && (
          <div className="mt-8 bg-zinc-900 border border-white/10 rounded-3xl p-8">
            <div className="detail-label mb-6">GALERI</div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {character.details.gallery.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedGalleryImage(selectedGalleryImage === image ? null : image)}
                  className={`group relative aspect-square rounded-xl overflow-hidden bg-zinc-950 border border-white/10 transition-all duration-300 hover:border-white/30 ${
                    selectedGalleryImage === image ? "ring-2 ring-rose-500 scale-[0.98]" : "hover:scale-[1.02]"
                  }`}
                >
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`${character.name} gallery ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </button>
              ))}
            </div>

            {/* Image Preview */}
            {selectedGalleryImage && (
              <div className="mt-6">
                <div className="relative rounded-xl overflow-hidden bg-zinc-950">
                  <img
                    src={selectedGalleryImage}
                    alt="Gallery preview"
                    className="w-full h-auto max-h-[70vh] object-contain mx-auto"
                  />
                </div>
                <button
                  onClick={() => setSelectedGalleryImage(null)}
                  className="mt-4 mx-auto block text-sm text-rose-400 hover:text-rose-300 transition-colors"
                >
                  Tutup preview
                </button>
              </div>
            )}
          </div>
        )}

        {/* Other Characters */}
        {otherCharacters.length > 0 && (
          <div className="mt-8 bg-zinc-900 border border-white/10 rounded-3xl p-8">
            <div className="detail-label mb-6 text-center">KARAKTER LAINNYA</div>
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
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 border-white/20 transition-all duration-300 group-hover:border-rose-500/50">
                    <img
                      src={otherChar.thumbnailImage || "/placeholder.svg"}
                      alt={otherChar.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="mt-2 text-xs md:text-sm text-white/60 font-medium max-w-20 truncate group-hover:text-white/90">
                    {otherChar.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Divine Condition Modal */}
      {showDivineModal && (
        <div 
          className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-6"
          onClick={() => setShowDivineModal(null)}
        >
          <div 
            className="modal-enter bg-zinc-900 border border-white/10 rounded-3xl max-w-lg w-full p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <div className="text-xs text-white/50 mb-1">Divine Condition</div>
                <h3 className="text-2xl font-bold text-zinc-100">{DIVINE_CONDITION_INFO[showDivineModal].title}</h3>
              </div>
              <button 
                onClick={() => setShowDivineModal(null)} 
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-white/80 leading-relaxed">
              {DIVINE_CONDITION_INFO[showDivineModal].description}
            </p>
            <button 
              onClick={() => setShowDivineModal(null)} 
              className="mt-6 w-full py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white/80 hover:text-white text-sm font-medium transition-colors"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
