"use client";

import {useEffect, useState} from "react";
import {analyzeCode} from "@/lib/analyzers/lexicalAnalyzer";
import {syntaxAnalyze, ParseNode} from "@/lib/analyzers/syntaxAnalyzer";
import {semanticAnalyze, SemanticError, SymbolInfo} from "@/lib/analyzers/semanticAnalyzer";
import {useCodeEditorStore} from "@/store/useCodeEditorStore";
import Tree from "react-d3-tree";
import AnalyzeHeader from "../_components/Header";

export default function SemanticPage() {
  const language = useCodeEditorStore(state => state.language);
  const [code, setCode] = useState("");
  const [errors, setErrors] = useState<SemanticError[]>([]);
  const [symbolTable, setSymbolTable] = useState<Record<string, SymbolInfo>>({});
  const [parseTree, setParseTree] = useState<ParseNode | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(`editor-code-${language}`);
    if (saved) setCode(saved);
  }, [language]);

  const handleAnalyze = () => {
    const lexicalTokens = analyzeCode(code);
    const result = syntaxAnalyze(
      lexicalTokens.map(t => ({...t, value: t.token}))
    );
    setParseTree(result.root);
    const semanticResult = semanticAnalyze(result.root);
    setErrors(semanticResult.errors);
    setSymbolTable(semanticResult.symbolTable);
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
        <h1 className="text-white text-4xl font-bold">Semantic Analysis</h1>
      </header>

      <main className="flex flex-col md:flex-row gap-10 flex-1 max-w-12xl mx-auto px-4 md:px-8 w-full">
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
            Analyze Semantics
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
                />
              </div>
            ) : (
              <p className="text-gray-500 text-center mt-10 italic">
                No parse tree available. Run semantic analysis.
              </p>
            )}
          </div>
        </section>

        <section className="w-full md:w-[33.333vw] flex flex-col bg-[#1e1e2e] rounded-xl p-8 border border-[#313244] shadow-lg overflow-auto min-h-[600px]">
          <h2 className="text-white text-3xl font-semibold mb-6">
            Semantic Errors
          </h2>
          <pre
            className={`p-4 rounded text-sm font-mono whitespace-pre-wrap h-[250px] overflow-auto leading-relaxed shadow-inner ${
              errors.length
                ? "bg-red-900 text-red-400"
                : "bg-green-900 text-green-400"
            }`}>
            {errors.length
              ? errors
                  .map(
                    (e, i) =>
                      `${i + 1}. ${e.message} (${e.severity})${e.suggestion ? `\nSuggestion: ${e.suggestion}` : ""}`
                  )
                  .join("\n\n")
              : "No semantic errors found."}
          </pre>

          <h2 className="text-white text-3xl font-semibold my-6">
            Symbol Table
          </h2>
          <div className="bg-[#2a2a3a] text-white p-4 rounded overflow-auto text-sm max-h-[300px]">
            {Object.keys(symbolTable).length ? (
              <table className="table-auto w-full border-collapse">
                <thead>
                  <tr className="text-left border-b border-gray-600">
                    <th className="pb-2">Variable</th>
                    <th className="pb-2">Type</th>
                    <th className="pb-2">Scope</th>
                    <th className="pb-2">Initialized</th>
                    <th className="pb-2">Used</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(symbolTable).map(([name, info]) => (
                    <tr key={name} className="border-t border-gray-700">
                      <td className="py-1 pr-4 font-semibold">{name}</td>
                      <td>{info.type}</td>
                      <td>{info.declaredInScope}</td>
                      <td>{info.initialized ? "Yes" : "No"}</td>
                      <td>{info.used ? "Yes" : "No"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-gray-500 italic">No symbols to display.</p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
