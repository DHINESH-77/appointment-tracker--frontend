import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createDiaryEntry = createAsyncThunk(
    "diary/createEntry",
    async (payload) => {
        const res = await axios.post("https://appointment-tracker-backend-cq46.onrender.com/diary", payload);
        return res.data;
    }
);

export const fetchDiaryEntries = createAsyncThunk(
    "diary/fetchEntries",
    async () => {
        const res = await axios.get("https://appointment-tracker-backend-cq46.onrender.com/diary");
        return res.data;
    }
);

export const updateDiaryEntry = createAsyncThunk(
    "diary/updateEntry",
    async ({ id, data }) => {
        const res = await axios.put(`https://appointment-tracker-backend-cq46.onrender.com/diary/${id}`, data);
        return res.data;
    }
);

export const deleteDiaryEntry = createAsyncThunk(
    "diary/deleteEntry",
    async (id) => {
        await axios.delete(`https://appointment-tracker-backend-cq46.onrender.com/diary/${id}`);
        return id;
    }
);

export const searchDiaryEntries = createAsyncThunk(
    "diary/searchEntries",
    async (query) => {
        const res = await axios.get(`https://appointment-tracker-backend-cq46.onrender.com/diary/search?q=${query}`);
        return res.data;
    }
);

export const filterEntriesByMood = createAsyncThunk(
    "diary/filterByMood",
    async (mood) => {
        const res = await axios.get(`https://appointment-tracker-backend-cq46.onrender.com/diary/filter/mood?mood=${mood}`);
        return res.data;
    }
);

export const filterEntriesByDateRange = createAsyncThunk(
    "diary/filterByDateRange",
    async ({ startDate, endDate }) => {
        const res = await axios.get(`https://appointment-tracker-backend-cq46.onrender.com/diary/filter/date?startDate=${startDate}&endDate=${endDate}`);
        return res.data;
    }
);

export const getEntriesOnThisDay = createAsyncThunk(
    "diary/getOnThisDay",
    async () => {
        const res = await axios.get("https://appointment-tracker-backend-cq46.onrender.com/diary/onthisday");
        return res.data;
    }
);

const diarySlice = createSlice({
    name: "diary",
    initialState: {
        entries: [],
        filteredEntries: [],
        onThisDayEntries: [],
        status: "idle",
        error: null,
        searchQuery: "",
        moodFilter: "",
        dateRangeFilter: null
    },
    reducers: {
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
        },
        setMoodFilter: (state, action) => {
            state.moodFilter = action.payload;
        },
        setDateRangeFilter: (state, action) => {
            state.dateRangeFilter = action.payload;
        },
        clearFilters: (state) => {
            state.searchQuery = "";
            state.moodFilter = "";
            state.dateRangeFilter = null;
            state.filteredEntries = [];
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createDiaryEntry.pending, (state) => {
                state.status = "loading";
            })
            .addCase(createDiaryEntry.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.entries.unshift(action.payload);
            })
            .addCase(createDiaryEntry.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(fetchDiaryEntries.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchDiaryEntries.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.entries = action.payload;
            })
            .addCase(fetchDiaryEntries.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(updateDiaryEntry.pending, (state) => {
                state.status = "loading";
            })
            .addCase(updateDiaryEntry.fulfilled, (state, action) => {
                state.status = "succeeded";
                const index = state.entries.findIndex(entry => entry._id === action.payload._id);
                if (index !== -1) {
                    state.entries[index] = action.payload;
                }
            })
            .addCase(updateDiaryEntry.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(deleteDiaryEntry.pending, (state) => {
                state.status = "loading";
            })
            .addCase(deleteDiaryEntry.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.entries = state.entries.filter(entry => entry._id !== action.payload);
            })
            .addCase(deleteDiaryEntry.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(searchDiaryEntries.pending, (state) => {
                state.status = "loading";
            })
            .addCase(searchDiaryEntries.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.filteredEntries = action.payload;
            })
            .addCase(searchDiaryEntries.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(filterEntriesByMood.pending, (state) => {
                state.status = "loading";
            })
            .addCase(filterEntriesByMood.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.filteredEntries = action.payload;
            })
            .addCase(filterEntriesByMood.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(filterEntriesByDateRange.pending, (state) => {
                state.status = "loading";
            })
            .addCase(filterEntriesByDateRange.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.filteredEntries = action.payload;
            })
            .addCase(filterEntriesByDateRange.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(getEntriesOnThisDay.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getEntriesOnThisDay.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.onThisDayEntries = action.payload;
            })
            .addCase(getEntriesOnThisDay.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    }
});

export const { setSearchQuery, setMoodFilter, setDateRangeFilter, clearFilters } = diarySlice.actions;
export default diarySlice.reducer;
