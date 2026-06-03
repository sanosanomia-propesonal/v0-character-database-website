"use client"

import { ArrowLeft } from "lucide-react"
import { useState } from "react"

interface PowerSystemViewProps {
  onBack: () => void
}

interface PrimordiumFamily {
  id: string
  name: string
  description: string
}

const PRIMORDIUM_FAMILIES: PrimordiumFamily[] = [
  {
    id: "vennamyseus",
    name: "Vennamyseus",
    description: "Keluarga dari Primordium 'Vespheria Vennamyseus', merupakan pendiri Godversal utusan ilahi ke dua dengan bentuk Astral - Grand Alien. Diutus untuk merintis Omniverse Pertama sejak awal mula big bang",
  },
  {
    id: "eviessal",
    name: "Eviessal",
    description: "???",
  },
  {
    id: "aretheia",
    name: "Aretheia",
    description: "???",
  },
  {
    id: "asterion",
    name: "Asterion",
    description: "???",
  },
  {
    id: "serafhym",
    name: "Serafhym",
    description: "???",
  },
]

interface Omniverse {
  id: string
  name: string
  description: string
}

const OMNIVERSES: Omniverse[] = [
  {
    id: "omnivenna",
    name: "OmniVenna",
    description: "Merupakan Omniverse 1 yang dirintis oleh Primordium Vennamyseus Family. Bentuk kehidupan yang erat dengan Hukum Alam dan Biologis.",
  },
  {
    id: "omnievitheia",
    name: "OmniEvitheia",
    description: "Merupakan Omniverse 4 dan 5 yang secara bersamaan dirintis oleh Primordium Eviessal dan Aretheia Family. Bentuk kehidupan paling variatif dan multi fantasi",
  },
  {
    id: "omnirion",
    name: "OmniRion",
    description: "Omniverse 2 yang dirintis oleh Primordium Asterion. Bentuk kehidupan makhluk kosmik dengan fragmen multi dimensi.",
  },
  {
    id: "omnisera",
    name: "OmniSera",
    description: "Merupakan Omniverse 3 yang dirintis oleh Primordium Serafhym. Bentuk kehidupan yang khusus bagi para entitas Malaikat-Ilahi dan paling tidak variatif dimana hanya terdapat 1 jenis kehidupan.",
  },
]

const DIVINE_CONDITIONS = [
  {
    name: "Zero-Entropy",
    description: "Hukum fisik dimana penderitanya tidak memiliki Astral Energy dan tidak akan mampu menguasai Astral Tecnique, sebagai gantinya fisik penderita akan absolut, tidak dapat ditarget Astral Technique dengan efek 'pasti-kena'.",
  },
  {
    name: "Primal-Axiomatic",
    description: "Hukum Ilahi yang hanya terdapat pada primordite khusus yang menjadi akar sebuah Astral Energy dan Astral Technique. Penciptaan, Efisiensi, pengolahan Energy dan Output teknik dalam level tak terbatas.",
  },
  {
    name: "Axiomatic",
    description: "Hukum Ilahi berupa efisiensi, pengolahan Energy dan output teknik yang dapat meningkat tanpa batas. Sangat mengikat fisiologis dan mental penderita. Hanya akan ada SATU penderita hingga penderita terkait telah tiada.",
  },
  {
    name: "Morphogen",
    description: "Hukum Ilahi yang mengizinkan transformasi dan pembentukan entitas ciptaannya sendiri, ini bergantung pada Astral Energy mereka. Hanya akan ada SATU penderita hingga penderita terkait telah tiada.",
  },
]

export function PowerSystemView({ onBack }: PowerSystemViewProps) {
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

            <div className="hidden md:flex items-center gap-x-8 text-sm">
              <button onClick={onBack} className="nav-link px-3 py-1.5 text-white/70 hover:text-white font-medium">Beranda</button>
              <button className="nav-link active px-3 py-1.5 text-white font-medium">Power System</button>
            </div>

            <button 
              onClick={onBack} 
              className="text-sm flex items-center gap-x-2 px-5 py-2.5 rounded-full border border-white/10 hover:bg-white/5 text-zinc-300"
            >
              <ArrowLeft className="w-4 h-4 mr-1" /> Kembali
            </button>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-8 py-16">
        <h2 className="section-header mb-3 text-zinc-100">Power System</h2>
        <p className="text-xl text-white/60 max-w-2xl">Sistem kekuatan yang mengatur seluruh semesta Schism. Dari Astral Energy hingga Divine Conditions yang mengikat takdir.</p>

        <div className="mt-12 space-y-10">
          {/* Astral Energy */}
          <div className="border-l-2 border-rose-900 pl-8">
            <div className="detail-label mb-2">Core Energy</div>
            <h3 className="text-3xl font-semibold tracking-tight mb-4 text-zinc-100">Astral Energy</h3>
            <p className="text-white/75 leading-relaxed">Energi dasar yang mengalir di seluruh omniverses. Setiap karakter memiliki afinitas berbeda terhadap Astral Energy, yang menentukan kekuatan dan batas mereka.</p>
          </div>

          {/* Astral Technique */}
          <div className="border-l-2 border-rose-900 pl-8">
            <div className="detail-label mb-2">Combat &amp; Ability</div>
            <h3 className="text-3xl font-semibold tracking-tight mb-4 text-zinc-100">Astral Technique</h3>
            <p className="text-white/75 leading-relaxed">Teknik lanjutan yang memanfaatkan Astral Energy. Beberapa teknik bersifat turunan keluarga (seperti keluarga ven Belladonna), sementara yang lain adalah hasil latihan atau anomali.</p>
          </div>

          {/* Divine Conditions */}
          <div className="border-l-2 border-rose-900 pl-8">
            <div className="detail-label mb-2">Binding Rules</div>
            <h3 className="text-3xl font-semibold tracking-tight mb-4 text-zinc-100">Divine Conditions</h3>
            <p className="text-white/75 leading-relaxed">Aturan ilahi yang mengikat karakter tertentu. Melanggar condition ini dapat menyebabkan konsekuensi berat, termasuk hilangnya kekuatan atau perubahan eksistensi.</p>
          </div>

          {/* Divine Conditions Detail */}
          <div className="pt-6 border-t border-white/10">
            <div className="detail-label mb-6">4 DIVINE CONDITIONS</div>
            <div className="grid sm:grid-cols-2 gap-4">
              {DIVINE_CONDITIONS.map((condition) => (
                <div 
                  key={condition.name}
                  className="bg-zinc-900 border border-white/10 rounded-2xl p-5"
                >
                  <h4 className="font-bold mb-2 text-zinc-100">{condition.name}</h4>
                  <p className="text-sm text-white/60 leading-relaxed">{condition.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Primordium Families & Omniverses */}
          <div className="pt-6 border-t border-white/10">
            <div className="grid md:grid-cols-2 gap-8 text-sm">
              <div>
                <div className="detail-label mb-3">5 Primordium Families</div>
                <ul className="space-y-1.5 text-white/70">
                  {PRIMORDIUM_FAMILIES.map((family) => (
                    <li key={family.id}>
                      <span className="text-white/90 font-medium">• {family.name}</span>
                      {family.description !== "???" && (
                        <span className="text-white/50"> — {family.description.substring(0, 50)}...</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="detail-label mb-3">4 Omniverses</div>
                <p className="text-white/70">{OMNIVERSES.map(o => o.name).join(' • ')}</p>
                <p className="text-xs text-white/50 mt-4">Setiap omniverses memiliki aturan Astral yang sedikit berbeda.</p>
              </div>
            </div>
          </div>

          {/* Omniverses Detail */}
          <div className="pt-6 border-t border-white/10">
            <div className="detail-label mb-6">OMNIVERSE DETAILS</div>
            <div className="grid sm:grid-cols-2 gap-4">
              {OMNIVERSES.map((omniverse) => (
                <div 
                  key={omniverse.id}
                  className="bg-zinc-900 border border-white/10 rounded-2xl p-5"
                >
                  <h4 className="font-bold mb-2 text-zinc-100">{omniverse.name}</h4>
                  <p className="text-sm text-white/60 leading-relaxed">{omniverse.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Primordium Families Detail */}
          <div className="pt-6 border-t border-white/10">
            <div className="detail-label mb-6">PRIMORDIUM FAMILIES</div>
            <div className="space-y-3">
              {PRIMORDIUM_FAMILIES.map((family) => (
                <div 
                  key={family.id}
                  className="bg-zinc-900 border border-white/10 rounded-2xl p-5"
                >
                  <h4 className="font-bold mb-2 text-zinc-100">{family.name}</h4>
                  <p className="text-sm text-white/60 leading-relaxed">{family.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-16 text-center">
          <button 
            onClick={onBack} 
            className="inline-flex items-center gap-2 text-white/60 hover:text-white font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Beranda</span>
          </button>
        </div>
      </div>
    </div>
  )
}
