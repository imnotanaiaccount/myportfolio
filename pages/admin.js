import { useEffect, useState } from 'react';
import Layout from '../components/Layout';

export default function Admin() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredSubmissions = statusFilter === 'all'
    ? submissions
    : submissions.filter(s => s.status === statusFilter);

  // Get unique statuses for filter dropdown
  const statusOptions = ['all', ...Array.from(new Set(submissions.map(s => s.status).filter(Boolean)))];

  const fetchSubmissions = async () => {
    setLoading(true);
    const res = await fetch('/.netlify/functions/contact');
    const data = await res.json();
    setSubmissions(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <div className="flex gap-4 items-center">
          <label htmlFor="statusFilter" className="text-sm font-medium text-gray-300 mr-2">Status:</label>
          <select
            id="statusFilter"
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
          >
            {statusOptions.map(opt => (
              <option key={opt} value={opt}>{opt === 'all' ? 'All' : opt}</option>
            ))}
          </select>
          <button
            onClick={fetchSubmissions}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold ml-4"
          >
            Refresh
          </button>
        </div>
      </div>
      {loading ? (
        <div>Loading submissions...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-800 rounded-lg">
            <thead>
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Plan</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Phone</th>
                <th className="px-4 py-2">Message</th>
                <th className="px-4 py-2">Submitted</th>
                <th className="px-4 py-2">Metadata</th>
              </tr>
            </thead>
            <tbody>
              {filteredSubmissions.map((s) => (
                <tr key={s.id} className="border-b border-gray-700">
                  <td className="px-4 py-2">{s.name}</td>
                  <td className="px-4 py-2">{s.email}</td>
                  <td className="px-4 py-2">{s.plan}</td>
                  <td className="px-4 py-2">{s.status}</td>
                  <td className="px-4 py-2">{s.phone}</td>
                  <td className="px-4 py-2">{s.message}</td>
                  <td className="px-4 py-2">{new Date(s.created_at).toLocaleString()}</td>
                  <td className="px-4 py-2 text-xs whitespace-pre-wrap">
                    {s.metadata ? JSON.stringify(s.metadata, null, 2) : ''}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
} 