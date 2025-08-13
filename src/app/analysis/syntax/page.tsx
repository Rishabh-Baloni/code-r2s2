"use client";

import {useEffect, useState} from "react";
import {analyzeCode} from "@/lib/analyzers/lexicalAnalyzer";
import {
  syntaxAnalyze,
  Token as SyntaxToken,
  ParseNode,
} from "@/lib/analyzers/syntaxAnalyzer";
import {useCodeEditorStore} from "@/store/useCodeEditorStore";
import Tree from "react-d3-tree";
import AnalyzeHeader from "../_components/Header"; // reused for uniform header

export default function SyntaxPage() {
  const language = useCodeEditorStore(state => state.language);
  const [code, setCode] = useState("");
  const [tokens, setTokens] = useState<SyntaxToken[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [parseTree, setParseTree] = useState<ParseNode | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(`editor-code-${language}`);
    if (saved) setCode(saved);
  }, [language]);

  const handleAnalyze = () => {
    const lexicalTokens = analyzeCode(code);
    const syntaxTokens: SyntaxToken[] = lexicalTokens.map(t => ({
      ...t,
      value: t.token,
    }));
    const result = syntaxAnalyze(syntaxTokens);

    setTokens(syntaxTokens);
    setErrors(result.errors);
    setParseTree(result.root);
  };

  interface TreeData {
    name: string;
    children: TreeData[];
  }
  
  const convertToTreeData = (node: ParseNode): TreeData => ({
    name: node.label,
    children: (node.children || []).filter(Boolean).map(convertToTreeData),
  });

  return (
    <div className="min-h-screen px-4 py-3 flex flex-col relative">
      <AnalyzeHeader />

      <header className="max-w-6xl mx-auto mb-10 flex items-center justify-center">
        <h1 className="text-white text-4xl font-bold">Syntax Analysis</h1>
      </header>

      <main className="flex flex-col md:flex-row gap-10 flex-1 max-w-12xl mx-auto px-4 md:px-8 w-full">
        {/* Left: Code input + Parse Tree */}
        <section className="w-full md:w-[66.666vw] flex flex-col bg-[#1e1e2e] rounded-xl p-8 border border-[#313244] shadow-lg min-h-[600px]">
          <h2 className="text-white text-2xl font-semibold mb-6">Code Input</h2>
          <textarea
            spellCheck={false}
            className="flex-grow bg-[#2a2a3a] text-gray-100 font-mono text-lg p-5 rounded-md border border-[#444a66] resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            value={code}
            onChange={e => setCode(e.target.value)}
            rows={12}
            placeholder="Enter code to analyze..."
          />
          <button
            onClick={handleAnalyze}
            className="mt-8 self-start bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-10 py-3 rounded-md font-semibold transition">
            Analyze Syntax
          </button>

          <div className="mt-10">
            <h2 className="text-white text-2xl font-semibold mb-4">
              Parse Tree
            </h2>
            {parseTree ? (
              <div
                className="bg-white rounded p-4 overflow-auto border border-[#3c3f62] shadow-inner"
                style={{height: "480px", width: "100%"}}>
                <Tree
                  data={convertToTreeData(parseTree)}
                  orientation="vertical"
                  translate={{x: 250, y: 180}}
                  pathFunc="step"
                  zoomable
                  scaleExtent={{min: 0.5, max: 1.5}}
                  nodeSize={{x: 250, y: 100}}
                  renderCustomNodeElement={({nodeDatum, toggleNode}) => (
                    <g
                      style={{cursor: "pointer"}}
                      onClick={toggleNode}
                      onMouseEnter={e =>
                        e.currentTarget
                          .querySelector("circle")
                          ?.setAttribute("filter", "url(#glow)")
                      }
                      onMouseLeave={e =>
                        e.currentTarget
                          .querySelector("circle")
                          ?.removeAttribute("filter")
                      }>
                      <defs>
                        <filter
                          id="glow"
                          height="250%"
                          width="250%"
                          x="-75%"
                          y="-75%">
                          <feDropShadow
                            dx="0"
                            dy="0"
                            stdDeviation="4"
                            floodColor="#a78bfa"
                            floodOpacity="0.9"
                          />
                        </filter>
                      </defs>
                      <circle
                        r={20}
                        fill={nodeDatum.children ? "#8b5cf6" : "#22c55e"}
                        stroke="#fff"
                        strokeWidth={2}
                      />
                      <text
                        fill="black"
                        stroke="black"
                        strokeWidth="0.25"
                        x={25}
                        y={-25}
                        textAnchor="start"
                        fontWeight="bold"
                        fontSize="16px"
                        style={{
                          userSelect: "none",
                          pointerEvents: "none",
                          paintOrder: "stroke",
                        }}>
                        {nodeDatum.name}
                      </text>
                    </g>
                  )}
                />
              </div>
            ) : (
              <p className="text-gray-500 text-center mt-10 italic">
                No parse tree available. Run syntax analysis.
              </p>
            )}
          </div>
        </section>

        {/* Right: Tokens and Syntax Errors */}
        <section className="w-full md:w-[33.333vw] flex flex-col bg-[#1e1e2e] rounded-xl p-8 border border-[#313244] shadow-lg overflow-auto min-h-[600px]">
          <h2 className="text-white text-3xl font-semibold mb-6">Tokens</h2>
          <pre className="bg-[#2a2a3a] p-4 rounded text-sm font-mono text-white h-[240px] overflow-auto leading-relaxed whitespace-pre-wrap mb-6">
            {tokens.length
              ? tokens
                  .map((t, i) => `${i + 1}. ${t.token} (${t.type})`)
                  .join("\n")
              : "No tokens found."}
          </pre>

          <h2 className="text-white text-3xl font-semibold mb-6">
            Syntax Errors
          </h2>
          <pre
            className={`p-4 rounded text-sm font-mono whitespace-pre-wrap h-[240px] overflow-auto leading-relaxed shadow-inner ${
              errors.length
                ? "bg-red-900 text-red-400"
                : "bg-green-900 text-green-400"
            }`}>
            {errors.length ? errors.join("\n") : "No syntax errors found."}
          </pre>
        </section>
      </main>
    </div>
  );
}
