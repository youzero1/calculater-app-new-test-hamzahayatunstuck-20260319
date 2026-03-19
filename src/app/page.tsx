"use client";
import { useState, useEffect } from 'react';
import Calculator from '@/components/Calculator';
import History from '@/components/History';
import { Calculation } from '@/entities/Calculation';

export default function Home() {
  const [input, setInput] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [history, setHistory] = useState<Calculation[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchHistory = async () => {
    try {
      const response = await fetch('/api/history');
      if (response.ok) {
        const data = await response.json();
        setHistory(data);
      }
    } catch (error) {
      console.error('Error fetching history:', error);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleCalculate = async () => {
    if (!input.trim()) return;
    setLoading(true);
    try {
      const response = await fetch('/api/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ expression: input }),
      });
      const data = await response.json();
      if (response.ok) {
        setResult(data.result.toString());
        setInput('');
        fetchHistory();
      } else {
        setResult(`Error: ${data.error}`);
      }
    } catch (error) {
      setResult('Error: Calculation failed');
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setInput('');
    setResult('');
  };

  const handleButtonClick = (value: string) => {
    if (value === 'C') {
      handleClear();
    } else if (value === '=') {
      handleCalculate();
    } else {
      setInput((prev) => prev + value);
    }
  };

  const clearHistory = async () => {
    try {
      const response = await fetch('/api/history', {
        method: 'DELETE',
      });
      if (response.ok) {
        setHistory([]);
      }
    } catch (error) {
      console.error('Error clearing history:', error);
    }
  };

  return (
    <div className="w-full max-w-6xl flex flex-col md:flex-row gap-8 p-4">
      <div className="flex-1">
        <Calculator
          input={input}
          result={result}
          onButtonClick={handleButtonClick}
          loading={loading}
        />
      </div>
      <div className="flex-1">
        <History history={history} onClear={clearHistory} />
      </div>
    </div>
  );
}