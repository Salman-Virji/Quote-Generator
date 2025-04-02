import { useEffect, useState } from "react";

export default function App() {
  const [quote, setQuote] = useState({ content: "Loading quote... ", author: "Loading author... " });
  const [dailyQuote, setDailyQuote] = useState({ content: "Loading quote... ", author: "Loading author..." });

  async function getQuote() {
    try {
      const res = await fetch("/.netlify/functions/quote");
      const data = await res.json();
  
      setQuote({
        content: data.quote,
        author: data.author,
      });

      
    } catch (err) {
      console.error("Failed to fetch quote:", err);
      setQuote({
        content: "Failed to load quote.",
        author: "Error",
      });
    }
  }

  async function getDailyQuote() {
    try {
  
      const res = await fetch("/.netlify/functions/quote");
      const data = await res.json();
  
      setDailyQuote({
        content: data.quote,
        author: data.author,
      });

      
    } catch (err) {
      console.error("Failed to fetch quote:", err);
      setQuote({
        content: "Failed to load quote.",
        author: "Error",
      });
    }
  }
  

  useEffect(() => {
    getDailyQuote()
    
    getQuote();
  }, []);

  
  
  

  

  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-8 px-4 py-8 min-h-screen bg-gray-800 text-white">
      {/* Hero Section */}
      <section className="text-center md:text-left max-w-md">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
          Quote Generator
        </h1>
        <p className="text-lg sm:text-xl text-gray-400">
          "{dailyQuote.content}" - {dailyQuote.author}
        </p>
      </section>

      <div className="flex flex-col items-center">
        {/* Quote Card */}
        <div className="w-full max-w-md bg-gray-900 rounded-xl shadow-lg transition-all">
          <div className="h-40 overflow-auto px-6 py-4">
            <p className="text-gray-300 text-base mb-2">"{quote.content}"</p>
            <p className="text-gray-400 text-sm text-right">– {quote.author}</p>
          </div>
          <div className="flex justify-center px-6 pt-4 pb-6">
            <button
              onClick={getQuote}
              className="bg-gray-100 text-gray-900 text-sm font-semibold px-4 py-2 rounded-full hover:bg-gray-200 transition"
            >
              Generate
            </button>
          </div>
        </div>

        {/* Credit */}
        <div className="mt-2 text-xs text-gray-400 text-center w-full">
          Quotes provided by{" "}
          <a
            href="https://api.quotable.io"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-blue-400"
          >
            Quotable API
          </a>
        </div>
      </div>

      <footer className="fixed bottom-0 left-0 z-20 w-full p-4 bg-white border-t border-gray-200 shadow-sm md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800 dark:border-gray-600">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2025{" "}
          <a href="salmanvirji.com" className="hover:underline">
            Salman Virji
          </a>
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
          <li>
            <a
              href="https://salmanvirji.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              salmanvirji.com
            </a>
          </li>
        </ul>
      </footer>
    </div>
  );
}
