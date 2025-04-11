import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Check, RefreshCw, ChevronDown, ChevronUp, Code, Terminal } from 'lucide-react';

const languages = [
  {
    id: 'javascript',
    name: 'JavaScript',
    template: 'console.log("Hello, World!");',
    expectedOutput: 'Hello, World!',
    description: "JavaScript is a high-level, interpreted programming language that conforms to the ECMAScript specification. It's commonly used for web development."
  },
  {
    id: 'python',
    name: 'Python',
    template: 'print("Hello, World!")',
    expectedOutput: 'Hello, World!',
    description: "Python is an interpreted, high-level, general-purpose programming language known for its readability and simple syntax."
  },
  {
    id: 'java',
    name: 'Java',
    template: 'public class HelloWorld {\n  public static void main(String[] args) {\n    System.out.println("Hello, World!");\n  }\n}',
    expectedOutput: 'Hello, World!',
    description: "Java is a class-based, object-oriented programming language designed to have as few implementation dependencies as possible."
  }
];

const MainFeature = () => {
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const [code, setCode] = useState(languages[0].template);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [showExplanation, setShowExplanation] = useState(true);
  
  useEffect(() => {
    setCode(selectedLanguage.template);
    setOutput('');
    setIsCorrect(false);
  }, [selectedLanguage]);
  
  const handleRun = () => {
    setIsRunning(true);
    
    // Simulate code execution
    setTimeout(() => {
      let result;
      
      // Very simple simulation of execution
      if (selectedLanguage.id === 'javascript') {
        if (code.includes('console.log("Hello, World!")')) {
          result = 'Hello, World!';
        } else {
          result = 'Error: Expected output not found. Make sure you\'re printing "Hello, World!"';
        }
      } else if (selectedLanguage.id === 'python') {
        if (code.includes('print("Hello, World!")')) {
          result = 'Hello, World!';
        } else {
          result = 'Error: Expected output not found. Make sure you\'re printing "Hello, World!"';
        }
      } else if (selectedLanguage.id === 'java') {
        if (code.includes('System.out.println("Hello, World!")')) {
          result = 'Hello, World!';
        } else {
          result = 'Error: Expected output not found. Make sure you\'re printing "Hello, World!"';
        }
      }
      
      setOutput(result);
      setIsCorrect(result === selectedLanguage.expectedOutput);
      setIsRunning(false);
    }, 1000);
  };
  
  const handleReset = () => {
    setCode(selectedLanguage.template);
    setOutput('');
    setIsCorrect(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h3 className="font-bold">Hello World Tutorial</h3>
        
        <div className="relative">
          <button
            onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
            className="btn btn-outline flex items-center gap-2"
          >
            <Code size={18} />
            {selectedLanguage.name}
            {showLanguageDropdown ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
          
          <AnimatePresence>
            {showLanguageDropdown && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-0 mt-2 w-48 bg-white dark:bg-surface-800 rounded-lg shadow-soft border border-surface-200 dark:border-surface-700 z-10"
              >
                <ul>
                  {languages.map(language => (
                    <li key={language.id}>
                      <button
                        onClick={() => {
                          setSelectedLanguage(language);
                          setShowLanguageDropdown(false);
                        }}
                        className={`w-full text-left px-4 py-2 hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors rounded-lg ${
                          selectedLanguage.id === language.id ? 'text-primary dark:text-primary-light font-medium' : ''
                        }`}
                      >
                        {language.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-surface-100 dark:bg-surface-800 rounded-xl overflow-hidden"
      >
        <div className="flex justify-between items-center px-4 py-2 bg-surface-200 dark:bg-surface-700">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="text-sm font-medium">{selectedLanguage.name} Editor</div>
          <div></div>
        </div>
        
        <div className="p-4">
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full h-40 bg-surface-800 text-surface-100 font-mono text-sm p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            spellCheck="false"
          />
        </div>
        
        <div className="flex flex-wrap gap-2 p-4 border-t border-surface-200 dark:border-surface-700">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRun}
            disabled={isRunning}
            className="btn btn-primary flex items-center gap-2"
          >
            {isRunning ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                >
                  <RefreshCw size={18} />
                </motion.div>
                Running...
              </>
            ) : (
              <>
                <Play size={18} />
                Run Code
              </>
            )}
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleReset}
            className="btn btn-outline flex items-center gap-2"
          >
            <RefreshCw size={18} />
            Reset
          </motion.button>
        </div>
      </motion.div>
      
      {output && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-lg ${
            isCorrect 
              ? 'bg-green-100 dark:bg-green-900/20 border border-green-200 dark:border-green-800' 
              : 'bg-red-100 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
          }`}
        >
          <div className="flex items-start gap-3">
            <div className={`mt-1 p-1 rounded-full ${
              isCorrect ? 'bg-green-500' : 'bg-red-500'
            }`}>
              {isCorrect ? <Check size={16} className="text-white" /> : <Terminal size={16} className="text-white" />}
            </div>
            <div>
              <h4 className={`font-medium ${
                isCorrect ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'
              }`}>
                {isCorrect ? 'Success!' : 'Output:'}
              </h4>
              <pre className="mt-2 font-mono text-sm bg-white/50 dark:bg-black/20 p-3 rounded overflow-x-auto">
                {output}
              </pre>
              {isCorrect && (
                <p className="mt-2 text-green-700 dark:text-green-400">
                  Congratulations! You've successfully written your first "Hello World" program in {selectedLanguage.name}.
                </p>
              )}
            </div>
          </div>
        </motion.div>
      )}
      
      <div className="bg-white dark:bg-surface-800 rounded-xl shadow-card overflow-hidden">
        <button
          onClick={() => setShowExplanation(!showExplanation)}
          className="w-full flex justify-between items-center p-4 font-medium text-left"
        >
          <span>Explanation</span>
          {showExplanation ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
        
        <AnimatePresence>
          {showExplanation && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="p-4 pt-0 border-t border-surface-200 dark:border-surface-700">
                <h4 className="font-medium mb-3">What is "Hello World"?</h4>
                <p className="text-surface-600 dark:text-surface-300 mb-4">
                  "Hello World" is traditionally the first program developers write when learning a new programming language. It's a simple program that outputs the text "Hello, World!" to the screen.
                </p>
                
                <h4 className="font-medium mb-3">About {selectedLanguage.name}</h4>
                <p className="text-surface-600 dark:text-surface-300 mb-4">
                  {selectedLanguage.description}
                </p>
                
                <h4 className="font-medium mb-3">Code Breakdown</h4>
                <div className="bg-surface-100 dark:bg-surface-700 p-4 rounded-lg">
                  {selectedLanguage.id === 'javascript' && (
                    <>
                      <p className="mb-2"><code className="font-mono">console.log("Hello, World!");</code></p>
                      <ul className="list-disc list-inside text-sm text-surface-600 dark:text-surface-300 space-y-1">
                        <li><code className="font-mono">console.log()</code> is a function that prints output to the console</li>
                        <li>The text inside the quotes is the string that will be printed</li>
                        <li>The semicolon (;) marks the end of the statement (optional in JavaScript)</li>
                      </ul>
                    </>
                  )}
                  
                  {selectedLanguage.id === 'python' && (
                    <>
                      <p className="mb-2"><code className="font-mono">print("Hello, World!")</code></p>
                      <ul className="list-disc list-inside text-sm text-surface-600 dark:text-surface-300 space-y-1">
                        <li><code className="font-mono">print()</code> is a function that displays output</li>
                        <li>The text inside the quotes is the string that will be displayed</li>
                        <li>Python doesn't require semicolons at the end of statements</li>
                      </ul>
                    </>
                  )}
                  
                  {selectedLanguage.id === 'java' && (
                    <>
                      <p className="mb-2"><code className="font-mono">public class HelloWorld &#123;...&#125;</code></p>
                      <ul className="list-disc list-inside text-sm text-surface-600 dark:text-surface-300 space-y-1">
                        <li>In Java, code must be inside a class</li>
                        <li>The <code className="font-mono">main</code> method is the entry point of the program</li>
                        <li><code className="font-mono">System.out.println()</code> prints text and adds a new line</li>
                        <li>Java requires semicolons at the end of statements</li>
                      </ul>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <div className="flex justify-between items-center pt-4">
        <div className="text-sm text-surface-500">
          Lesson 1 of 10
        </div>
        <button className="btn btn-outline opacity-50 cursor-not-allowed">
          Next Lesson
        </button>
      </div>
    </div>
  );
};

export default MainFeature;