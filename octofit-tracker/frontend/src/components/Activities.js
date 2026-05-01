import React, { useEffect, useMemo, useState } from 'react';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchActivities = async () => {
      const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
      const apiUrl = `https://${codespaceName}-8000.app.github.dev/api/activities/`;
      console.log('Fetching from:', apiUrl);

      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Fetched data:', data);

        const activitiesData = data.results || data;
        setActivities(activitiesData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  const filteredActivities = useMemo(() => {
    const searchLower = searchQuery.toLowerCase();
    return activities.filter((activity) => {
      return (
        activity.activity_type?.toLowerCase().includes(searchLower) ||
        activity.user?.toLowerCase().includes(searchLower) ||
        activity.date?.toLowerCase().includes(searchLower) ||
        activity.duration?.toString().includes(searchLower)
      );
    });
  }, [activities, searchQuery]);

  if (loading) return <div className="alert alert-info">Loading activities...</div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div className="card content-card p-4">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4">
        <div>
          <h2 className="card-title">Activities</h2>
          <p className="text-muted mb-0">Browse activities pulled from the Octofit Tracker backend.</p>
        </div>
        <div className="d-flex gap-2 mt-3 mt-md-0">
          <button className="btn btn-primary" type="button" onClick={() => setModalOpen(true)}>
            API Details
          </button>
          <a className="btn btn-outline-secondary api-link" href="/api/activities/" target="_blank" rel="noreferrer">
            Open API
          </a>
        </div>
      </div>

      <form className="row g-2 align-items-end mb-4" onSubmit={(e) => e.preventDefault()}>
        <div className="col-md-8">
          <label htmlFor="activitySearch" className="form-label">
            Search activities
          </label>
          <input
            id="activitySearch"
            type="search"
            className="form-control"
            placeholder="Filter by user, activity type, date, or duration"
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
              <th>User</th>
              <th>Activity</th>
              <th>Duration</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredActivities.length > 0 ? (
              filteredActivities.map((activity, index) => (
                <tr key={activity.id || index}>
                  <td>{activity.id || '—'}</td>
                  <td>{activity.user || '—'}</td>
                  <td>{activity.activity_type || '—'}</td>
                  <td>{activity.duration != null ? `${activity.duration} min` : '—'}</td>
                  <td>{activity.date || '—'}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center text-muted py-4">
                  No activities found matching "{searchQuery}".
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
                  <h5 className="modal-title">Activities API</h5>
                  <button type="button" className="btn-close" aria-label="Close" onClick={() => setModalOpen(false)} />
                </div>
                <div className="modal-body">
                  <p className="mb-2">Endpoint:</p>
                  <code>https://&lt;codespace&gt;-8000.app.github.dev/api/activities/</code>
                  <p className="mt-3 mb-0 text-muted">This view renders all activity records from the Django REST API.</p>
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

export default Activities;
