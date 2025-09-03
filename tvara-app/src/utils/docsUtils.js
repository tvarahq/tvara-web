export const getLanguageColor = (language) => {
    const colors = {
      javascript: '#f7df1e',
      js: '#f7df1e',
      typescript: '#3178c6',
      ts: '#3178c6',
      python: '#3776ab',
      java: '#ed8b00',
      cpp: '#00599c',
      c: '#00599c',
      html: '#e34f26',
      css: '#1572b6',
      json: '#000000',
      bash: '#4eaa25',
      shell: '#4eaa25',
      sql: '#336791',
      php: '#777bb4',
      ruby: '#cc342d',
      go: '#00add8',
      rust: '#000000',
      swift: '#fa7343',
      kotlin: '#7f52ff',
      default: '#6b7280'
    };
    return colors[language.toLowerCase()] || colors.default;
  };

export const getSyntaxHighlighting = (code, language) => {
    const lang = language.toLowerCase();
    
    let highlighted = code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    
    if (lang === 'javascript' || lang === 'js' || lang === 'typescript' || lang === 'ts') {
      const lines = highlighted.split('\n');
      const processedLines = lines.map(line => {
        let processedLine = line;
        
        processedLine = processedLine.replace(
          /('([^'\\]|\\.)*'|"([^"\\]|\\.)*")/g,
          '<span style="color: #ce9178;">$1</span>'
        );
        
        // Handle comments
        processedLine = processedLine.replace(
          /(\/\/.*$)/,
          '<span style="color: #6a9955;">$1</span>'
        );
        
        // Only highlight keywords that are NOT inside spans
        if (!processedLine.includes('<span')) {
          processedLine = processedLine.replace(
            /\b(import|export|from|const|let|var|function|if|else|for|while|return|class|extends|new|this|async|await|try|catch|finally|typeof|instanceof)\b/g,
            '<span style="color: #569cd6;">$1</span>'
          );
          
          // Highlight numbers
          processedLine = processedLine.replace(
            /\b(\d+\.?\d*)\b/g,
            '<span style="color: #b5cea8;">$1</span>'
          );
        }
        
        return processedLine;
      });
      
      highlighted = processedLines.join('\n');
      
    } else if (lang === 'bash' || lang === 'shell') {
      highlighted = highlighted.replace(
        /(#.*$)/gm,
        '<span style="color: #6a9955;">$1</span>'
      );
      
      highlighted = highlighted.replace(
        /^([a-zA-Z][a-zA-Z0-9_-]*)/gm,
        '<span style="color: #4fc1ff;">$1</span>'
      );
      
      highlighted = highlighted.replace(
        /(-{1,2}[a-zA-Z0-9][a-zA-Z0-9_-]*)/g,
        '<span style="color: #c586c0;">$1</span>'
      );
      
    } else if (lang === 'json') {
      highlighted = highlighted.replace(
        /"([^"]+)"(\s*:)/g,
        '<span style="color: #9cdcfe;">"$1"</span>$2'
      );
      
      highlighted = highlighted.replace(
        /:\s*"([^"]*)"/g,
        ': <span style="color: #ce9178;">"$1"</span>'
      );
      
      highlighted = highlighted.replace(
        /:\s*(\d+\.?\d*)/g,
        ': <span style="color: #b5cea8;">$1</span>'
      );
      
      highlighted = highlighted.replace(
        /\b(true|false|null)\b/g,
        '<span style="color: #569cd6;">$1</span>'
      );
    }
    
    return highlighted;
  };