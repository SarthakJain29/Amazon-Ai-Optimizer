import { useState, useEffect } from 'react';
import { Loader2, ChevronDown, ChevronUp, Calendar } from 'lucide-react';
import Card from '../components/Card';
import { fetchHistory } from '../services/api';

export default function History() {
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState([]);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const data = await fetchHistory();
      setHistory(data);
    } catch (err) {
      console.error('Failed to fetch history:', err);
    } finally {
      setLoading(false);
    }
  };

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (history.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-slate-900 mb-8 tracking-tight">Optimization History</h1>
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-12 text-center">
          <p className="text-slate-500 text-lg font-medium">No past optimizations found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-slate-900 mb-8 tracking-tight">Optimization History</h1>

      <div className="space-y-4">
        {history.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden hover:shadow-xl transition-shadow"
          >
            <div className="p-6">
              <div className="grid md:grid-cols-4 gap-4 items-center">
                <div>
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">ASIN</span>
                  <p className="text-slate-900 font-semibold mt-1">{item.asin}</p>
                </div>

                <div className="md:col-span-2">
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Title</span>
                  <p className="text-slate-900 mt-1 line-clamp-2 font-medium">{item.optimized_title}</p>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-4">
                  <div className="flex items-center gap-2 text-sm text-slate-600 font-medium">
                    <Calendar className="w-4 h-4" />
                    {formatDate(item.created_at)}
                  </div>
                  <button
                    onClick={() => toggleExpand(item.id)}
                    className="flex items-center gap-1 text-blue-600 hover:text-blue-700 font-semibold text-sm"
                  >
                    Details
                    {expandedId === item.id ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {expandedId === item.id && (
              <div className="border-t border-slate-200 p-6 bg-slate-50">
                <div className="grid md:grid-cols-2 gap-6">
                  <Card
                    label="Original"
                    title={item.original_title}
                    bullets={item.original_bullets}
                    description={item.original_description}
                  />
                  <Card
                    label="Optimized"
                    title={item.optimized_title}
                    bullets={item.optimized_bullets}
                    description={item.optimized_description}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
