"use client"

import { ArrowLeft, Zap, Sparkles, Atom, Users, Globe } from "lucide-react"
import { useState } from "react"
import { ThemeToggle } from "@/components/theme-toggle"

interface PowerSystemViewProps {
  onBack: () => void
}

interface PrimordiumFamily {
  id: string
  name: string
  description: string
  themeColors: {
    gradient: string
    bg: string
    text: string
    border: string
  }
}

const PRIMORDIUM_FAMILIES: PrimordiumFamily[] = [
  {
    id: "vennamyseus",
    name: "Vennamyseus",
    description: "Keluarga dari Primordium 'Vespheria Vennamyseus', merupakan pendiri Godversal utusan ilahi ke dua dengan bentuk Astral - Grand Alien. Diutus untuk merintis Omniverse Pertama sejak awal mula big bang",
    themeColors: {
      gradient: "from-zinc-800 to-zinc-900",
      bg: "bg-zinc-800",
      text: "text-zinc-300",
      border: "border-zinc-600",
    },
  },
  {
    id: "eviessal",
    name: "Eviessal",
    description: "???",
    themeColors: {
      gradient: "from-emerald-700 to-emerald-900",
      bg: "bg-emerald-800",
      text: "text-emerald-300",
      border: "border-emerald-500",
    },
  },
  {
    id: "aretheia",
    name: "Aretheia",
    description: "???",
    themeColors: {
      gradient: "from-amber-600 to-amber-800",
      bg: "bg-amber-700",
      text: "text-amber-200",
      border: "border-amber-400",
    },
  },
  {
    id: "asterion",
    name: "Asterion",
    description: "???",
    themeColors: {
      gradient: "from-purple-700 to-purple-900",
      bg: "bg-purple-800",
      text: "text-purple-300",
      border: "border-purple-500",
    },
  },
  {
    id: "serafhym",
    name: "Serafhym",
    description: "???",
    themeColors: {
      gradient: "from-slate-300 to-slate-400",
      bg: "bg-slate-200",
      text: "text-slate-700",
      border: "border-slate-400",
    },
  },
]

interface Omniverse {
  id: string
  name: string
  description: string
  themeColors: {
    gradient: string
    text: string
  }
}

const OMNIVERSES: Omniverse[] = [
  {
    id: "omnivenna",
    name: "OmniVenna",
    description: "Merupakan Omniverse 1 yang dirintis oleh Primordium Vennamyseus Family. Bentuk kehidupan yang erat dengan Hukum Alam dan Biologis.",
    themeColors: {
      gradient: "from-zinc-700 to-zinc-900",
      text: "text-zinc-200",
    },
  },
  {
    id: "omnievitheia",
    name: "OmniEvitheia",
    description: "Merupakan Omniverse 4 dan 5 yang secara bersamaan dirintis oleh Primordium Eviessal dan Aretheia Family. Bentuk kehidupan paling variatif dan multi fantasi",
    themeColors: {
      gradient: "from-emerald-600 via-amber-500 to-emerald-700",
      text: "text-white",
    },
  },
  {
    id: "omnirion",
    name: "OmniRion",
    description: "Omniverse 2 yang dirintis oleh Primordium Asterion. Bentuk kehidupan makhluk kosmik dengan fragmen multi dimensi.",
    themeColors: {
      gradient: "from-purple-700 to-indigo-900",
      text: "text-purple-200",
    },
  },
  {
    id: "omnisera",
    name: "OmniSera",
    description: "Merupakan Omniverse 3 yang dirintis oleh Primordium Serafhym. Bentuk kehidupan yang khusus bagi para entitas Malaikat-Ilahi dan paling tidak variatif dimana hanya terdapat 1 jenis kehidupan.",
    themeColors: {
      gradient: "from-slate-200 to-slate-400",
      text: "text-slate-800",
    },
  },
]

const DIVINE_CONDITIONS = [
  {
    name: "Zero-Entropy",
    description: "Hukum fisik dimana penderitanya tidak memiliki Astral Energy dan tidak akan mampu menguasai Astral Tecnique, sebagai gantinya fisik penderita akan absolut, tidak dapat ditarget Astral Technique dengan efek 'pasti-kena'.",
    color: "bg-gradient-to-r from-amber-500 to-yellow-400",
  },
  {
    name: "Primal-Axiomatic",
    description: "Hukum Ilahi yang hanya terdapat pada primordite khusus yang menjadi akar sebuah Astral Energy dan Astral Technique. Penciptaan, Efisiensi, pengolahan Energy dan Output teknik dalam level tak terbatas.",
    color: "bg-gradient-to-r from-violet-600 to-purple-500",
  },
  {
    name: "Axiomatic",
    description: "Hukum Ilahi berupa efisiensi, pengolahan Energy dan output teknik yang dapat meningkat tanpa batas. Sangat mengikat fisiologis dan mental penderita. Hanya akan ada SATU penderita hingga penderita terkait telah tiada.",
    color: "bg-gradient-to-r from-blue-600 to-cyan-500",
  },
  {
    name: "Morphogen",
    description: "Hukum Ilahi yang mengizinkan transformasi dan pembentukan entitas ciptaannya sendiri, ini bergantung pada Astral Energy mereka. Hanya akan ada SATU penderita hingga penderita terkait telah tiada.",
    color: "bg-gradient-to-r from-emerald-500 to-teal-400",
  },
]

export function PowerSystemView({ onBack }: PowerSystemViewProps) {
  const [expandedFamily, setExpandedFamily] = useState<string | null>(null)
  const [expandedDivine, setExpandedDivine] = useState<string | null>(null)
  const [expandedOmniverse, setExpandedOmniverse] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 transition-colors duration-300">
      {/* Header */}
      <header className="bg-gradient-to-r from-slate-800 to-slate-700 py-6 px-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center">
              <img src="/favicon.png" alt="Schism Base" className="w-10 h-10 object-cover" />
            </div>
            <div>
              <h1 className="text-white font-bold text-lg">POWER SYSTEM</h1>
              <p className="text-white/80 text-sm">Schism Base</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={onBack}
              className="flex items-center gap-2 px-3 py-2 text-sm text-white/70 hover:text-white border border-white/20 hover:border-white/40 rounded-lg transition-all duration-200 hover:bg-white/5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Kembali</span>
            </button>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 space-y-12">
        {/* Page Title */}
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-slate-100 mb-2 animate-fade-in-up">
            POWER SYSTEM
          </h2>
          <p className="text-slate-600 dark:text-slate-400 animate-fade-in-up-delay">
            Sistem kekuatan dalam Schism Series
          </p>
        </div>

        {/* Astral Energy Section */}
        <section className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 md:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-xl flex items-center justify-center">
              <Zap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Astral Energy</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm">Sumber kekuatan fundamental</p>
            </div>
          </div>
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Astral Energy adalah energi fundamental yang mengalir di seluruh semesta  Schism Series. 
              Energi yang merupakan dasar dari semua kekuatan supranatural dan kemampuan yang dimiliki oleh 
              entitas dalam cerita. Setiap yang hidup memiliki Astral Energy kecuali yang gak punya, energy ini juga mengikat Genetik-Bentuk Kehidupan Biologis bagi makhluk fana (non-kosmik).
            </p>
          </div>
        </section>

        {/* Astral Technique Section */}
        <section className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 md:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/50 rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Astral Technique</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm">Manifestasi kemampuan</p>
            </div>
          </div>
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Astral Technique adalah manifestasi Astral Energy
              agar dapat digunakan. Setiap Astral Technique
              ber-akar dari Primordium hingga kemudian menjadi cabang serta variasi unik mereka sendiri, Astral Technique dapat mencangkup segala hal dan tidak terikat hanya pada kekuatan bertarung saja.
            </p>
          </div>
        </section>

        {/* Divine Conditions Section */}
        <section className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 md:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/50 rounded-xl flex items-center justify-center">
              <Atom className="w-6 h-6 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Divine Conditions</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm">4 kondisi ilahi</p>
            </div>
          </div>
          
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
            Divine Conditions adalah Kondisi atau Penyakit Ilahi yang merupakan efek samping dari adanya Primordium itu sendiri, Hanya segelintir entitas yang terjangkit hukum kondisi ini.
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            {DIVINE_CONDITIONS.map((condition) => (
              <button
                key={condition.name}
                onClick={() => setExpandedDivine(expandedDivine === condition.name ? null : condition.name)}
                className={`text-left p-4 rounded-xl transition-all duration-300 ${
                  expandedDivine === condition.name 
                    ? `${condition.color} text-white shadow-lg` 
                    : "bg-slate-50 dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600"
                }`}
              >
                <h4 className={`font-bold mb-2 ${expandedDivine === condition.name ? "text-white" : "text-slate-800 dark:text-slate-100"}`}>
                  {condition.name}
                </h4>
                {expandedDivine === condition.name && (
                  <p className="text-sm text-white/90 animate-in fade-in slide-in-from-top-2 duration-200">
                    {condition.description}
                  </p>
                )}
                {expandedDivine !== condition.name && (
                  <p className="text-xs text-slate-500 dark:text-slate-400">Klik untuk detail</p>
                )}
              </button>
            ))}
          </div>
        </section>

        {/* Primordium Families Section */}
        <section className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 md:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-slate-200 dark:bg-slate-700 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-slate-600 dark:text-slate-400" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100">5 Primordium Family</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm">Keluarga pendiri semesta</p>
            </div>
          </div>
          
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
            Lima keluarga Primordium adalah entitas pertama yang ada sejak awal penciptaan. 
            Mereka adalah utusan ilahi yang membentuk dasar dari seluruh eksistensi.
          </p>

          <div className="space-y-4">
            {PRIMORDIUM_FAMILIES.map((family) => (
              <button
                key={family.id}
                onClick={() => setExpandedFamily(expandedFamily === family.id ? null : family.id)}
                className={`w-full text-left rounded-xl overflow-hidden transition-all duration-300 ${
                  expandedFamily === family.id ? "shadow-lg" : "shadow"
                }`}
              >
                <div className={`bg-gradient-to-r ${family.themeColors.gradient} p-4 md:p-6`}>
                  <div className="flex items-center justify-between">
                    <h4 className={`font-bold text-lg ${family.id === "serafhym" ? "text-slate-800" : "text-white"}`}>
                      {family.name}
                    </h4>
                    <span className={`text-sm ${family.id === "serafhym" ? "text-slate-600" : "text-white/70"}`}>
                      {expandedFamily === family.id ? "Tutup" : "Lihat detail"}
                    </span>
                  </div>
                  
                  {expandedFamily === family.id && (
                    <p className={`mt-4 text-sm leading-relaxed animate-in fade-in slide-in-from-top-2 duration-200 ${
                      family.id === "serafhym" ? "text-slate-700" : "text-white/90"
                    }`}>
                      {family.description}
                    </p>
                  )}
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Omniverse Section */}
        <section className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 md:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/50 rounded-xl flex items-center justify-center">
              <Globe className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100">4 Omniverse</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm">Semesta yang dirintis Primordium</p>
            </div>
          </div>
          
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
            Setiap Primordium Family merintis Omniverse mereka sendiri dengan karakteristik kehidupan yang unik. 
            Terdapat 4 Omniverse utama yang menjadi wadah bagi seluruh eksistensi.
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            {OMNIVERSES.map((omniverse) => (
              <button
                key={omniverse.id}
                onClick={() => setExpandedOmniverse(expandedOmniverse === omniverse.id ? null : omniverse.id)}
                className={`w-full text-left rounded-xl overflow-hidden transition-all duration-300 ${
                  expandedOmniverse === omniverse.id ? "shadow-lg scale-[1.02]" : "shadow hover:shadow-md"
                }`}
              >
                <div className={`bg-gradient-to-r ${omniverse.themeColors.gradient} p-4 md:p-5`}>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className={`font-bold text-lg ${omniverse.themeColors.text}`}>
                      {omniverse.name}
                    </h4>
                    <span className={`text-xs ${omniverse.themeColors.text} opacity-70`}>
                      {expandedOmniverse === omniverse.id ? "Tutup" : "Detail"}
                    </span>
                  </div>
                  
                  {expandedOmniverse === omniverse.id && (
                    <p className={`text-sm leading-relaxed animate-in fade-in slide-in-from-top-2 duration-200 ${omniverse.themeColors.text} opacity-90`}>
                      {omniverse.description}
                    </p>
                  )}
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Back Button */}
        <div className="text-center">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Home</span>
          </button>
        </div>
      </main>
    </div>
  )
}
