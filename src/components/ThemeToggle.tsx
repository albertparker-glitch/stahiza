import React from 'react';
import { Sun, Moon, Sparkles } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'motion/react';

interface ThemeToggleProps {
  compact?: boolean;
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ 
  compact = false,
  className = '' 
}) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  if (compact) {
    return (
      <button
        onClick={toggleTheme}
        className={`p-2 rounded-xl border transition-all duration-300 flex items-center justify-center cursor-pointer ${
          isDark
            ? 'bg-[#0A192F] text-amber-300 border-slate-700 hover:bg-slate-800'
            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 shadow-xs'
        } ${className}`}
        title={`Switch to ${isDark ? 'Classic Light' : 'Midnight Navy'} Theme`}
        aria-label="Toggle Theme"
      >
        <motion.div
          key={theme}
          initial={{ rotate: -90, scale: 0.5, opacity: 0 }}
          animate={{ rotate: 0, scale: 1, opacity: 1 }}
          transition={{ duration: 0.25 }}
        >
          {isDark ? <Moon className="w-4 h-4 text-amber-300 fill-current" /> : <Sun className="w-4 h-4 text-amber-500 fill-current" />}
        </motion.div>
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className={`relative flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-bold transition-all duration-300 cursor-pointer shadow-xs ${
        isDark
          ? 'bg-[#060E1A] text-amber-300 border-slate-700 hover:border-amber-400/50'
          : 'bg-slate-100 text-[#0A192F] border-slate-200 hover:border-slate-300'
      } ${className}`}
      title={`Current: ${isDark ? 'Midnight Navy' : 'Classic Light'}. Click to toggle.`}
    >
      <div className="relative flex items-center justify-center w-5 h-5 rounded-full bg-amber-400/20 text-amber-300 shrink-0">
        <motion.div
          key={theme}
          initial={{ rotate: -90, scale: 0.5, opacity: 0 }}
          animate={{ rotate: 0, scale: 1, opacity: 1 }}
          transition={{ duration: 0.25 }}
        >
          {isDark ? (
            <Moon className="w-3.5 h-3.5 text-amber-300 fill-current" />
          ) : (
            <Sun className="w-3.5 h-3.5 text-amber-600 fill-current" />
          )}
        </motion.div>
      </div>

      <span className="hidden sm:inline font-['Montserrat'] tracking-wide">
        {isDark ? 'Midnight Navy' : 'Classic Light'}
      </span>

      <span className="text-[10px] uppercase font-extrabold px-1.5 py-0.5 rounded-full bg-[#800020] text-white">
        {isDark ? 'Dark' : 'Light'}
      </span>
    </button>
  );
};
