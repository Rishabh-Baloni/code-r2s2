export type TokenType =
  | "keyword"
  | "identifier"
  | "number"
  | "string"
  | "operator"
  | "symbol";

export interface Token {
  token: string;
  type: TokenType;
}

const keywords = new Set([
  // Common keywords across C, C++, Java, Python
  "int",
  "float",
  "char",
  "double",
  "return",
  "if",
  "else",
  "for",
  "while",
  "do",
  "break",
  "continue",
  "void",
  "public",
  "private",
  "class",
  "static",
  "def",
  "import",
  "from",
  "try",
  "except",
  "finally",
  "new",
  "this",
  "true",
  "false",
  "null",
  "None",
]);

const operators = [
  "==",
  "!=",
  "<=",
  ">=",
  "&&",
  "\\|\\|",
  "\\+\\+",
  "--",
  "\\+=",
  "-=",
  "\\*=",
  "/=",
  "=",
  "\\+",
  "-",
  "\\*",
  "/",
  "%",
  "<",
  ">",
  "!",
  "&",
  "\\|",
  "\\^",
  "~",
];

const symbols = [
  "\\(",
  "\\)",
  "\\{",
  "\\}",
  "\\[",
  "\\]",
  ";",
  ",",
  "\\.",
  ":",
];

const operatorRegex = new RegExp(`^(${operators.join("|")})`);
const symbolRegex = new RegExp(`^(${symbols.join("|")})`);

export function analyzeCode(code: string): Token[] {
  const tokens: Token[] = [];
  let pos = 0;

  const cleanCode = code.replace(/\/\/.*|\/\*[\s\S]*?\*\//g, ""); // remove comments

  while (pos < cleanCode.length) {
    const chunk = cleanCode.slice(pos);

    if (/^\s+/.test(chunk)) {
      pos += chunk.match(/^\s+/)![0].length;
      continue;
    }

    // String
    if (/^(['"])(?:\\.|[^\\])*?\1/.test(chunk)) {
      const match = chunk.match(/^(['"])(?:\\.|[^\\])*?\1/)!;
      tokens.push({token: match[0], type: "string"});
      pos += match[0].length;
      continue;
    }

    // Number
    if (/^\d+(\.\d+)?/.test(chunk)) {
      const match = chunk.match(/^\d+(\.\d+)?/)!;
      tokens.push({token: match[0], type: "number"});
      pos += match[0].length;
      continue;
    }

    // Operator
    if (operatorRegex.test(chunk)) {
      const match = chunk.match(operatorRegex)!;
      tokens.push({token: match[0], type: "operator"});
      pos += match[0].length;
      continue;
    }

    // Symbol
    if (symbolRegex.test(chunk)) {
      const match = chunk.match(symbolRegex)!;
      tokens.push({token: match[0], type: "symbol"});
      pos += match[0].length;
      continue;
    }

    // Identifier or Keyword
    if (/^[a-zA-Z_]\w*/.test(chunk)) {
      const match = chunk.match(/^[a-zA-Z_]\w*/)!;
      const tokenType: TokenType = keywords.has(match[0])
        ? "keyword"
        : "identifier";
      tokens.push({token: match[0], type: tokenType});
      pos += match[0].length;
      continue;
    }

    // Unrecognized character (skip it)
    pos++;
  }

  return tokens;
}
