import { useState } from 'react';
import { Loader2, AlertCircle } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';
import { fetchAndOptimize } from '../services/api';

export default function Home() {
  const [asin, setAsin] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [data, setData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!asin.trim()) {
      setError('Please enter a valid ASIN');
      return;
    }

    setLoading(true);
    setError('');
    setData(null);

    try {
      const result = await fetchAndOptimize(asin);
      setData(result);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch and optimize product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12 hero-pattern rounded-3xl py-16 px-6">
        <h1 className="text-5xl font-bold text-slate-900 mb-4 tracking-tight">
          AI-Powered Amazon Optimizer
        </h1>
        <p className="text-slate-600 text-xl font-medium max-w-2xl mx-auto">
          Transform your product listings for maximum impact
        </p>
      </div>

      <div className="max-w-xl mx-auto mb-12">
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
          <label htmlFor="asin" className="block text-lg font-bold text-slate-700 mb-3">
            Enter ASIN
          </label>
          <input
            id="asin"
            type="text"
            value={asin}
            onChange={(e) => setAsin(e.target.value)}
            placeholder="e.g., B08N5WRWNW"
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none mb-3 font-medium text-slate-900"
            disabled={loading}
          />

          {/* Example ASINs */}
          <div className="mb-5 mt-3 text-base text-slate-700">
            <p>Example ASINs you can try:</p>
            <ul className="mt-1 list-disc ml-5">
              <li>Echo Dot - B09B8XJDW5</li>
              <li>Fire TV Stick - B0CQN2BHW8</li>
              <li>Apple AirPods Pro - B0FQFJBBVY</li>
              <li>Kindle Paperwhite - B0DKTZ6592</li>
            </ul>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2"
          >
            {/*showing loader when fetching*/}
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Processing...
              </>
            ) : (
              'Fetch & Optimize'
            )}
          </Button>
        </form>

        {error && (
          <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}
      </div>

      {data && (
        <div className="grid md:grid-cols-2 gap-6">
          <Card
            label="Original"
            title={data.original.title}
            bullets={data.original.bullets}
            description={data.original.description}
          />
          <Card
            label="Optimized"
            title={data.optimized.optimized_title}
            bullets={data.optimized.optimized_bullets}
            description={data.optimized.optimized_description}
            keywords={data.optimized.keywords}
          />
        </div>
      )}
    </div>
  );
}
