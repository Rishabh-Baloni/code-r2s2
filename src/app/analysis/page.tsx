"use client"

import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Code2, BookOpen } from "lucide-react"
import NavigationHeader from "@/components/NavigationHeader"

const analysisPhases = [
  { title: "Lexical Analysis", description: "Convert code into tokens using a lexer.", route: "/analysis/lexical" },
  { title: "Syntax Analysis", description: "Build a syntax tree with parser logic.", route: "/analysis/syntax" },
  { title: "Semantic Analysis", description: "Validate type rules and meaning.", route: "/analysis/semantic" },
  { title: "Intermediate Code Generation", description: "Produces simplified, typed, and portable code.", route: "/analysis/intermediateCode" }
]

export default function CodeAnalysisHome() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <NavigationHeader />
      <div className="max-w-6xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-sm text-gray-400 mb-4">
            <Code2 className="w-4 h-4" /> Compiler Analysis Toolkit
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-100 to-gray-300 text-transparent bg-clip-text mb-4">
            Dive Into Compiler Phases
          </h1>
          <p className="text-lg text-gray-400">
            Choose a phase to explore how compilers break down, structure, and analyze code.
          </p>
        </motion.div>
        <div className="grid gap-6 md:grid-cols-3">
          {analysisPhases.map((phase, idx) => (
            <motion.div
              key={phase.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => router.push(phase.route)}
              className="cursor-pointer group p-6 rounded-2xl bg-[#1e1e2e] hover:bg-[#2a2a3a] border border-[#313244] hover:border-blue-500 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <BookOpen className="w-6 h-6 text-blue-400" />
                <h2 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors">
                  {phase.title}
                </h2>
              </div>
              <p className="text-sm text-gray-400">{phase.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
