<h1 align="center">🚀 Code-R2S2 - Advanced Code Editor & Compiler Analyzer 🚀</h1>

![Demo App](/public/screenshot-for-readme.png)

**Code-R2S2** is a comprehensive web-based development platform that combines the power of a modern online IDE with advanced compiler analysis tools. It's designed for developers, students, and educators who want to understand how code is processed at every stage of compilation.

## ✨ Key Features

### 🎯 **Code Editor & Execution**
- 🚀 **Modern Online IDE** with multi-language support (10+ programming languages)
- 💻 **Real-time Code Execution** with instant feedback
- 🎨 **Customizable Experience** with 5 VSCode themes and font size controls
- ✨ **Smart Output Handling** with Success & Error states
- 🔄 **Code Persistence** across sessions with localStorage integration

### 🔍 **Compiler Phase Analysis**
- **Lexical Analysis**: Tokenize code and identify language constructs
- **Syntax Analysis**: Parse tokens into abstract syntax trees with visual representation
- **Semantic Analysis**: Detect semantic errors and build symbol tables
- **Intermediate Code Generation**: Generate Three-Address Code (TAC) instructions
- **Visual Parse Trees**: Interactive tree visualization for better understanding

### 💎 **Professional Features**
- 🤝 **Community-driven code sharing** system with snippets
- 🔍 **Advanced filtering & search** capabilities
- 👤 **Personal profile** with execution history tracking
- 📊 **Comprehensive statistics** dashboard
- ⚙️ **Customizable settings** and preferences
- 🔗 **Webhook integration** support

### 🏗️ **Tech Stack**
- **Frontend**: Next.js 15 + TypeScript + Tailwind CSS
- **Backend**: Convex (real-time database)
- **Authentication**: Clerk
- **State Management**: Zustand
- **UI Components**: Custom components with modern design
- **Data Visualization**: React D3 Tree for parse trees

## 🎓 **Perfect For**
- **Computer Science Students** learning compiler design
- **Educators** teaching programming concepts
- **Developers** wanting to understand code compilation
- **Researchers** studying language processing
- **Anyone** interested in how code is analyzed and executed

## 🚀 **Getting Started**

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Environment Setup

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd code-r2s2
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
Create a `.env.local` file:
```js
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
CLERK_SECRET_KEY=your_clerk_secret
CONVEX_DEPLOYMENT=your_convex_deployment
NEXT_PUBLIC_CONVEX_URL=your_convex_url
```

4. **Configure Convex Dashboard**
Add these environment variables to your Convex dashboard:
```js
CLERK_WEBHOOK_SECRET=your_webhook_secret
LEMON_SQUEEZY_WEBHOOK_SECRET=your_lemon_squeezy_secret
```

5. **Run the development server**
```bash
npm run dev
```

6. **Open your browser**
Navigate to `http://localhost:3000`

## 🔧 **Usage**

### **Code Editor**
1. Select your programming language from the dropdown
2. Write or paste your code in the editor
3. Click "Run Code" to execute
4. View real-time output and errors

### **Compiler Analysis**
1. Navigate to the Analysis section
2. Choose the analysis phase you want to explore:
   - **Lexical**: See how your code is tokenized
   - **Syntax**: View the parse tree structure
   - **Semantic**: Check for semantic errors and symbol tables
   - **Intermediate Code**: Generate TAC instructions
3. Input your code and click analyze
4. Explore the visual representations and detailed outputs

## 📱 **Supported Languages**
- JavaScript/TypeScript
- Python
- Java
- C++
- C#
- Go
- Rust
- Ruby
- Swift
- And more...

## 🎨 **Themes**
- Dark themes optimized for long coding sessions
- Light themes for daytime development
- Customizable color schemes
- Syntax highlighting for all supported languages

## 🔒 **Security & Privacy**
- Secure authentication with Clerk
- Code execution in isolated environments
- Privacy-focused design
- Secure webhook handling

## 🤝 **Contributing**
We welcome contributions! Please feel free to submit issues, feature requests, or pull requests.

## 📄 **License**
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 **Support**
If you encounter any issues or have questions:
- Check the existing issues
- Create a new issue with detailed information
- Reach out to the maintainers

---

**Built with ❤️ using Next.js 15, Convex, and modern web technologies**
