import React from 'react';
import { Calculation } from '@/entities/Calculation';

interface HistoryProps {
  history: Calculation[];
  onClear: () => void;
}

const History: React.FC<HistoryProps> = ({ history, onClear }) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 w-full max-w-md mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">History</h2>
        {history.length > 0 && (
          <button
            onClick={onClear}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors"
          >
            Clear All
          </button>
        )}
      </div>
      {history.length === 0 ? (
        <div className="text-center py-8 text-slate-500 dark:text-slate-400">
          No calculations yet. Perform some operations to see history here.
        </div>
      ) : (
        <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
          {history.map((item) => (
            <div
              key={item.id}
              className="bg-slate-100 dark:bg-slate-700 rounded-lg p-4 flex justify-between items-center"
            >
              <div>
                <div className="font-mono text-slate-800 dark:text-white">
                  {item.expression} = {item.result}
                </div>
                <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  {new Date(item.timestamp).toLocaleString()}
                </div>
              </div>
              <div className="text-primary-600 dark:text-primary-400 font-bold">
                {item.result}
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="mt-6 text-sm text-slate-500 dark:text-slate-400 text-center">
        All calculations are stored in a SQLite database.
      </div>
    </div>
  );
};

export default History;