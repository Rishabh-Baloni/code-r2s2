"use client";

type TokenType =
  | "keyword"
  | "identifier"
  | "number"
  | "string"
  | "operator"
  | "symbol";

interface Token {
  token: string;
  type: TokenType;
}

interface TokenTableProps {
  tokens: Token[];
}

const colorMap: Record<TokenType, string> = {
  keyword: "text-red-600",
  identifier: "text-purple-700",
  number: "text-blue-700",
  string: "text-amber-700",
  operator: "text-green-700",
  symbol: "text-pink-700",
};

export default function TokenTable({tokens}: TokenTableProps) {
  if (!tokens.length)
    return (
      <p className="text-gray-400 text-center mt-20 text-lg font-semibold">
        No tokens to display.
      </p>
    );

  return (
    <div className="overflow-x-auto max-h-[600px] rounded-xl border border-gray-400 shadow bg-white">
      <table className="min-w-full text-base font-mono text-gray-900">
        <thead className="bg-gray-100 text-gray-800 border-b border-gray-400">
          <tr>
            <th className="px-4 py-3 text-left font-bold border-b border-gray-400">
              #
            </th>
            <th className="px-4 py-3 text-left font-bold border-b border-gray-400">
              Token
            </th>
            <th className="px-4 py-3 text-left font-bold border-b border-gray-400">
              Type
            </th>
          </tr>
        </thead>
        <tbody>
          {tokens.map(({token, type}, i) => (
            <tr
              key={i}
              className={
                i % 2 === 0
                  ? "bg-white hover:bg-gray-50"
                  : "bg-gray-50 hover:bg-gray-100"
              }>
              <td className="px-4 py-2 text-gray-600 font-semibold border-b border-gray-300">
                {i + 1}
              </td>
              <td
                className={`px-4 py-2 font-bold border-b border-gray-300 ${colorMap[type]}`}>
                {token}
              </td>
              <td className="px-4 py-2 text-gray-700 font-semibold border-b border-gray-300 capitalize">
                {type}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
