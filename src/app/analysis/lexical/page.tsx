"use client";

import {useState, useEffect} from "react";
import {useRouter} from "next/navigation";
import TokenTable from "../_components/TokenTable";
import {analyzeCode, type Token} from "../../../lib/analyzers/lexicalAnalyzer";
import AnalyzeHeader from "../_components/Header";
import {useCodeEditorStore} from "@/store/useCodeEditorStore";

export default function LexicalPage() {
  const language = useCodeEditorStore(state => state.language);
  const router = useRouter();
  const [code, setCode] = useState(`int main() {\n  return 0;\n}`);
  const [tokens, setTokens] = useState<Token[]>([]);

  useEffect(() => {
    const savedCode = localStorage.getItem(`editor-code-${language}`);
    if (savedCode) setCode(savedCode);
  }, []);

  function handleAnalyze() {
    const result = analyzeCode(code);
    setTokens(result);
  }

  return (
    <div className="min-h-screen px-4 py-3 flex flex-col relative">
      <AnalyzeHeader />

      <header className="max-w-6xl mx-auto mb-10 flex items-center justify-center">
        <h1 className="text-white text-4xl font-bold">Lexical Analysis</h1>
      </header>

      <main className="flex flex-col md:flex-row gap-10 flex-1 max-w-12xl mx-auto px-4 md:px-8 w-full">
        <section className="w-full md:w-[66.666vw] flex flex-col bg-[#1e1e2e] rounded-xl px- p-8 border border-[#313244] shadow-lg min-h-[600px]">
          <h2 className="text-white text-2xl font-semibold mb-6">Code Input</h2>
          <textarea
            spellCheck={false}
            className="flex-grow bg-[#2a2a3a] text-gray-100 font-mono text-lg p-5 rounded-md border border-[#444a66] resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            value={code}
            onChange={e => setCode(e.target.value)}
            rows={16}
          />
          <button
            onClick={handleAnalyze}
            className="mt-8 self-start bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-10 py-3 rounded-md font-semibold transition">
            Analyze Lexically
          </button>
        </section>

        <section className="w-full md:w-[33.333vw] flex flex-col bg-[#1e1e2e] rounded-xl px-6 p-8 border border-[#313244] shadow-lg overflow-auto min-h-[600px]">
          <h2 className="text-white text-3xl font-semibold mb-6">Tokens</h2>
          {tokens.length > 0 ? (
            <TokenTable tokens={tokens} />
          ) : (
            <p className="text-gray-500 text-center mt-24">
              No tokens to display. Enter code and analyze.
            </p>
          )}
        </section>
      </main>
    </div>
  );
}
