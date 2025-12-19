import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createDiaryEntry } from "./rtk/diarySlice";

function Diary() {
    const dispatch = useDispatch();
    const status = useSelector(state => state.diary.status);

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [mood, setMood] = useState("");
    const [tags, setTags] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const tagsArray = tags.split(",").map(tag => tag.trim()).filter(tag => tag);
        
        dispatch(createDiaryEntry({
            title,
            content,
            mood,
            tags: tagsArray
        }));

        setTitle("");
        setContent("");
        setMood("");
        setTags("");
    };

    return (
        <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
            <h1>Write Diary Entry</h1>
            
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: "15px" }}>
                    <label>Title:</label><br/>
                    <input 
                        type="text" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        style={{ width: "100%", padding: "8px", marginTop: "5px" }}
                    />
                </div>

                <div style={{ marginBottom: "15px" }}>
                    <label>Content:</label><br/>
                    <textarea 
                        value={content} 
                        onChange={(e) => setContent(e.target.value)}
                        required
                        rows="10"
                        style={{ width: "100%", padding: "8px", marginTop: "5px", resize: "vertical" }}
                    />
                </div>

                <div style={{ marginBottom: "15px" }}>
                    <label>Mood:</label><br/>
                    <select 
                        value={mood} 
                        onChange={(e) => setMood(e.target.value)}
                        required
                        style={{ width: "100%", padding: "8px", marginTop: "5px" }}
                    >
                        <option value="">Select Mood</option>
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

                <div style={{ marginBottom: "15px" }}>
                    <label>Tags (comma separated):</label><br/>
                    <input 
                        type="text" 
                        value={tags} 
                        onChange={(e) => setTags(e.target.value)}
                        placeholder="work, personal, travel"
                        style={{ width: "100%", padding: "8px", marginTop: "5px" }}
                    />
                </div>

                <button 
                    type="submit" 
                    disabled={status === "loading"}
                    style={{ 
                        padding: "10px 20px", 
                        backgroundColor: "#007bff", 
                        color: "white", 
                        border: "none", 
                        borderRadius: "4px",
                        cursor: status === "loading" ? "not-allowed" : "pointer"
                    }}
                >
                    {status === "loading" ? "Saving..." : "Save Entry"}
                </button>
            </form>
        </div>
    );
}

export default Diary;