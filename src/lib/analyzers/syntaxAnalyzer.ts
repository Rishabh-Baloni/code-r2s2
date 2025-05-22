import {Token, TokenType} from "./lexicalAnalyzer";

export type {Token, TokenType};

export interface ParseNode {
  label: string;
  children?: ParseNode[];
}

export interface SyntaxResult {
  root: ParseNode | null;
  errors: string[];
}

export function syntaxAnalyze(tokens: Token[]): SyntaxResult {
  const errors: string[] = [];
  const root: ParseNode = {
    label: "Program",
    children: [],
  };

  let index = 0;

  function current(): Token | null {
    return index < tokens.length ? tokens[index] : null;
  }

  function advance(): void {
    index++;
  }

  function matchToken(expectedToken: string): boolean {
    const token = current();
    if (token && token.token === expectedToken) {
      advance();
      return true;
    } else {
      errors.push(
        `Expected token '${expectedToken}' at position ${index}, found '${token?.token ?? "EOF"}'`
      );
      return false;
    }
  }

  function matchType(expectedType: TokenType): Token | null {
    const token = current();
    if (token && token.type === expectedType) {
      advance();
      return token;
    } else {
      errors.push(
        `Expected token type '${expectedType}' at position ${index}, found '${token?.type ?? "EOF"}'`
      );
      return null;
    }
  }

  function parseExpression(): ParseNode | null {
    return parseAdditive();
  }

  function parseAdditive(): ParseNode | null {
    let node = parseMultiplicative();
    while (current()?.token === "+" || current()?.token === "-") {
      const op = current()!;
      advance();
      const right = parseMultiplicative();
      node = {
        label: `Op: ${op.token}`,
        children: [node!, right!],
      };
    }
    return node;
  }

  function parseMultiplicative(): ParseNode | null {
    let node = parsePrimary();
    while (current()?.token === "*" || current()?.token === "/") {
      const op = current()!;
      advance();
      const right = parsePrimary();
      node = {
        label: `Op: ${op.token}`,
        children: [node!, right!],
      };
    }
    return node;
  }

  function parsePrimary(): ParseNode | null {
    const token = current();
    if (!token) return null;

    if (token.token === "(") {
      advance();
      const expr = parseExpression();
      if (!matchToken(")")) {
        errors.push("Expected ')' after expression");
      }
      return expr;
    }

    if (token.type === "identifier" || token.type === "number") {
      advance();
      return {label: `Value: ${token.token}`};
    }

    errors.push(`Unexpected token '${token.token}' in expression`);
    advance();
    return null;
  }

  function parseBlock(): ParseNode {
    const node: ParseNode = {label: "Block", children: []};
    if (!matchToken("{")) {
      errors.push("Expected '{' to start block");
      return node;
    }

    while (current() && current()?.token !== "}") {
      const stmt = parseStatement();
      if (stmt) node.children!.push(stmt);
    }

    if (!matchToken("}")) {
      errors.push("Expected '}' to close block");
    }

    return node;
  }

  function parseIfStatement(): ParseNode {
    const node: ParseNode = {label: "IfStatement", children: []};
    advance(); // consume 'if'

    if (!matchToken("(")) {
      errors.push("Expected '(' after 'if'");
    }

    const condition = parseExpression();
    node.children!.push({label: "Condition", children: [condition!]});

    if (!matchToken(")")) {
      errors.push("Expected ')' after condition");
    }

    const thenBlock = parseBlock();
    node.children!.push({label: "ThenBlock", children: thenBlock.children});

    if (current()?.token === "else") {
      advance();
      const elseBlock = parseBlock();
      node.children!.push({label: "ElseBlock", children: elseBlock.children});
    }

    return node;
  }

  function parseStatement(): ParseNode | null {
    const token = current();
    if (!token) return null;

    if (token.type === "keyword" && token.token === "if") {
      return parseIfStatement();
    }

    if (token.token === "{") {
      return parseBlock();
    }

    if (token.type === "identifier") {
      const stmt: ParseNode = {label: "Assignment", children: []};
      stmt.children!.push({label: `Identifier: ${token.token}`});
      advance();
      if (matchToken("=")) {
        const expr = parseExpression();
        if (expr) stmt.children!.push(expr);
        if (!matchToken(";")) {
          errors.push("Expected ';' after assignment");
        }
      }
      return stmt;
    }

    // Fallback: unknown token
    errors.push(`Unknown statement starting with '${token.token}'`);
    advance();
    return null;
  }

  // Main loop
  while (index < tokens.length) {
    const stmt = parseStatement();
    if (stmt) root.children!.push(stmt);
  }

  return {root, errors};
}
