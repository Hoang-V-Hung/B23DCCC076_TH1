import React, { useEffect, useState } from "react";
import { Button, Input } from "antd";
import { saveToLocalStorage, getFromLocalStorage } from "../localStorage";

const StudyPlan: React.FC = () => {
  const [notes, setNotes] = useState<string>("");

  useEffect(() => {
    const savedNotes = getFromLocalStorage("study_notes");
    if (savedNotes) setNotes(savedNotes);
  }, []);

  const handleSave = () => {
    saveToLocalStorage("study_notes", notes);
  };

  return (
    <div>
      <h2>Tiến độ học tập</h2>
      <Input.TextArea
        rows={4}
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />
      <Button type="primary" onClick={handleSave} style={{ marginTop: "10px" }}>
        Lưu
      </Button>
    </div>
  );
};

export default StudyPlan;
