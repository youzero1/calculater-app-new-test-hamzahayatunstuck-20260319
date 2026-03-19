import React from 'react';

interface CalculatorProps {
  input: string;
  result: string;
  onButtonClick: (value: string) => void;
  loading: boolean;
}

const Calculator: React.FC<CalculatorProps> = ({ input, result, onButtonClick, loading }) => {
  const buttons = [
    '7', '8', '9', '/',
    '4', '5', '6', '*',
    '1', '2', '3', '-',
    '0', '.', '=', '+',
    'C'
  ];

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6 text-center">
        Calculator
      </h2>
      <div className="mb-6">
        <div className="bg-slate-100 dark:bg-slate-700 rounded-lg p-4 mb-2">
          <div className="text-slate-600 dark:text-slate-300 text-sm font-medium">Input</div>
          <div className="text-2xl font-mono text-slate-800 dark:text-white truncate">
            {input || '0'}
          </div>
        </div>
        <div className="bg-slate-100 dark:bg-slate-700 rounded-lg p-4">
          <div className="text-slate-600 dark:text-slate-300 text-sm font-medium">Result</div>
          <div className="text-3xl font-bold font-mono text-primary-600 dark:text-primary-400 truncate">
            {loading ? 'Calculating...' : result || '0'}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-3">
        {buttons.map((btn) => (
          <button
            key={btn}
            onClick={() => onButtonClick(btn)}
            className={`
              h-14 rounded-lg font-bold text-lg transition-all duration-200
              ${btn === '=' ? 'col-span-2 bg-primary-600 hover:bg-primary-700 text-white' : 
                btn === 'C' ? 'col-span-4 bg-red-500 hover:bg-red-600 text-white' :
                'bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-white'
              }
              ${loading && btn === '=' ? 'opacity-50 cursor-not-allowed' : ''}
            `}
            disabled={loading && btn === '='}
          >
            {btn}
          </button>
        ))}
      </div>
      <div className="mt-6 text-sm text-slate-500 dark:text-slate-400 text-center">
        Use the buttons to input an expression and press "=" to calculate.
      </div>
    </div>
  );
};

export default Calculator;