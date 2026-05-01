import React, { useEffect, useMemo, useState } from 'react';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
      const apiUrl = `https://${codespaceName}-8000.app.github.dev/api/leaderboard/`;
      console.log('Fetching from:', apiUrl);

      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Fetched data:', data);

        const leaderboardData = data.results || data;
        setLeaderboard(leaderboardData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  const filteredLeaderboard = useMemo(() => {
    const searchLower = searchQuery.toLowerCase();
    return leaderboard.filter((entry) => {
      return (
        entry.team?.toLowerCase().includes(searchLower) ||
        entry.points?.toString().includes(searchLower)
      );
    });
  }, [leaderboard, searchQuery]);

  if (loading) return <div className="alert alert-info">Loading leaderboard...</div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div className="card content-card p-4">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4">
        <div>
          <h2 className="card-title">Leaderboard</h2>
          <p className="text-muted mb-0">Track team scores and compare performance in your Octofit network.</p>
        </div>
        <div className="d-flex gap-2 mt-3 mt-md-0">
          <button className="btn btn-primary" type="button" onClick={() => setModalOpen(true)}>
            API Details
          </button>
          <a className="btn btn-outline-secondary api-link" href="/api/leaderboard/" target="_blank" rel="noreferrer">
            Open API
          </a>
        </div>
      </div>

      <form className="row g-2 align-items-end mb-4" onSubmit={(e) => e.preventDefault()}>
        <div className="col-md-8">
          <label htmlFor="leaderboardSearch" className="form-label">
            Search leaderboard
          </label>
          <input
            id="leaderboardSearch"
            type="search"
            className="form-control"
            placeholder="Filter by team or points"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="col-md-4 d-flex gap-2">
          <button type="button" className="btn btn-secondary w-100" onClick={() => setSearchQuery('')}>
            Clear Search
          </button>
        </div>
      </form>

      <div className="table-responsive">
        <table className="table table-striped table-hover align-middle">
          <thead>
            <tr>
              <th>ID</th>
              <th>Team</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeaderboard.length > 0 ? (
              filteredLeaderboard.map((entry, index) => (
                <tr key={entry.id || index}>
                  <td>{entry.id || '—'}</td>
                  <td>{entry.team || '—'}</td>
                  <td>{entry.points != null ? entry.points : '—'}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center text-muted py-4">
                  No leaderboard entries found matching "{searchQuery}".
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <>
          <div className="modal-backdrop-custom" onClick={() => setModalOpen(false)} />
          <div className="modal-custom" role="dialog" aria-modal="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Leaderboard API</h5>
                  <button type="button" className="btn-close" aria-label="Close" onClick={() => setModalOpen(false)} />
                </div>
                <div className="modal-body">
                  <p className="mb-2">Endpoint:</p>
                  <code>https://&lt;codespace&gt;-8000.app.github.dev/api/leaderboard/</code>
                  <p className="mt-3 mb-0 text-muted">This endpoint returns leaderboard records from the Django backend.</p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setModalOpen(false)}>
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Leaderboard;
