import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchDiaryEntries,
    deleteDiaryEntry,
    searchDiaryEntries,
    filterEntriesByMood,
    filterEntriesByDateRange,
    getEntriesOnThisDay,
    setSearchQuery,
    setMoodFilter,
    setDateRangeFilter,
    clearFilters
} from "./rtk/diarySlice";

function ViewDiary() {
    const dispatch = useDispatch();
    const {
        entries,
        filteredEntries,
        onThisDayEntries,
        status,
        searchQuery,
        moodFilter,
        dateRangeFilter
    } = useSelector(state => state.diary);

    const [expandedEntry, setExpandedEntry] = useState(null);
    const [searchInput, setSearchInput] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    useEffect(() => {
        dispatch(fetchDiaryEntries());
        dispatch(getEntriesOnThisDay());
    }, [dispatch]);

    const displayEntries = filteredEntries.length > 0 || searchQuery || moodFilter || dateRangeFilter ? filteredEntries : entries;

    const handleSearch = () => {
        if (searchInput.trim()) {
            dispatch(searchDiaryEntries(searchInput.trim()));
            dispatch(setSearchQuery(searchInput.trim()));
        } else {
            dispatch(clearFilters());
            dispatch(fetchDiaryEntries());
        }
    };

    const handleMoodFilter = (mood) => {
        if (mood) {
            dispatch(filterEntriesByMood(mood));
            dispatch(setMoodFilter(mood));
        } else {
            dispatch(clearFilters());
            dispatch(fetchDiaryEntries());
        }
    };

    const handleDateFilter = () => {
        if (startDate && endDate) {
            dispatch(filterEntriesByDateRange({ startDate, endDate }));
            dispatch(setDateRangeFilter({ startDate, endDate }));
        } else {
            dispatch(clearFilters());
            dispatch(fetchDiaryEntries());
        }
    };

    const handleClearFilters = () => {
        dispatch(clearFilters());
        dispatch(fetchDiaryEntries());
        setSearchInput("");
        setStartDate("");
        setEndDate("");
    };

    const toggleExpanded = (id) => {
        setExpandedEntry(expandedEntry === id ? null : id);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
            <h1>My Diary</h1>

            {/* Filters and Search */}
            <div style={{ marginBottom: "20px", padding: "15px", border: "1px solid #ddd", borderRadius: "8px" }}>
                <h3>Filters & Search</h3>

                {/* Search */}
                <div style={{ marginBottom: "10px" }}>
                    <input
                        type="text"
                        placeholder="Search by title or content..."
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        style={{ padding: "8px", width: "200px", marginRight: "10px" }}
                    />
                    <button onClick={handleSearch} style={{ padding: "8px 15px" }}>Search</button>
                </div>

                {/* Mood Filter */}
                <div style={{ marginBottom: "10px" }}>
                    <label>Mood Filter:</label>
                    <select
                        value={moodFilter}
                        onChange={(e) => handleMoodFilter(e.target.value)}
                        style={{ padding: "8px", marginLeft: "10px" }}
                    >
                        <option value="">All Moods</option>
                        <option value="happy">Happy</option>
                        <option value="neutral">Neutral</option>
                        <option value="sad">Sad</option>
                        <option value="stressed">Stressed</option>
                        <option value="productive">Productive</option>
                        <option value="excited">Excited</option>
                        <option value="angry">Angry</option>
                        <option value="anxious">Anxious</option>
                    </select>
                </div>

                {/* Date Range Filter */}
                <div style={{ marginBottom: "10px" }}>
                    <label>Date Range:</label>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        style={{ padding: "8px", marginLeft: "10px" }}
                    />
                    <span style={{ margin: "0 10px" }}>to</span>
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        style={{ padding: "8px" }}
                    />
                    <button onClick={handleDateFilter} style={{ padding: "8px 15px", marginLeft: "10px" }}>Filter</button>
                </div>

                <button onClick={handleClearFilters} style={{ padding: "8px 15px", backgroundColor: "#dc3545", color: "white", border: "none", borderRadius: "4px" }}>
                    Clear All Filters
                </button>
            </div>

            {/* On This Day Section */}
            {onThisDayEntries.length > 0 && (
                <div style={{ marginBottom: "20px", padding: "15px", backgroundColor: "#f8f9fa", borderRadius: "8px" }}>
                    <h3>On This Day</h3>
                    {onThisDayEntries.map(entry => (
                        <div key={entry._id} style={{ marginBottom: "10px", padding: "10px", border: "1px solid #ddd", borderRadius: "4px" }}>
                            <h4>{entry.title}</h4>
                            <p><strong>Date:</strong> {formatDate(entry.date)}</p>
                            <p><strong>Mood:</strong> {entry.mood}</p>
                            <p>{entry.content.substring(0, 100)}...</p>
                        </div>
                    ))}
                </div>
            )}

            {/* Diary Entries */}
            <div>
                <h2>Diary Entries ({displayEntries.length})</h2>
                {status === "loading" && <p className="loading">Loading...</p>}
                {status === "failed" && <p className="error">Unable to connect to server. Please start the backend.</p>}
                {displayEntries.length === 0 && status !== "loading" && status !== "failed" && <p>No entries found.</p>}

                {displayEntries.map(entry => (
                    <div key={entry._id} style={{ marginBottom: "15px", padding: "15px", border: "1px solid #ddd", borderRadius: "8px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <h3>{entry.title}</h3>
                            <div>
                                <button
                                    onClick={() => toggleExpanded(entry._id)}
                                    style={{ padding: "5px 10px", marginRight: "10px" }}
                                >
                                    {expandedEntry === entry._id ? "Collapse" : "Expand"}
                                </button>
                                <button
                                    onClick={() => dispatch(deleteDiaryEntry(entry._id))}
                                    style={{ padding: "5px 10px", backgroundColor: "#dc3545", color: "white", border: "none", borderRadius: "4px" }}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>

                        <p><strong>Date:</strong> {formatDate(entry.date)}</p>
                        <p><strong>Mood:</strong> {entry.mood}</p>
                        {entry.tags && entry.tags.length > 0 && (
                            <p><strong>Tags:</strong> {entry.tags.join(", ")}</p>
                        )}
                        <p><strong>Word Count:</strong> {entry.content.trim().split(/\s+/).filter(word => word).length}</p>

                        {expandedEntry === entry._id && (
                            <div style={{ marginTop: "10px", padding: "10px", backgroundColor: "#f8f9fa", borderRadius: "4px" }}>
                                <p>{entry.content}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ViewDiary;
