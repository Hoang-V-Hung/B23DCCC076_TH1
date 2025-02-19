import React, { useEffect, useState } from "react";
import { List, Button, Input, DatePicker, Modal, Select } from "antd";
import dayjs from "dayjs";
import { saveToLocalStorage, getFromLocalStorage } from "../localStorage";

const { Option } = Select;

interface StudySession {
  id: number;
  subject: string;
  date: string;
  duration: number;
  content: string;
  notes: string;
}

const StudyProgress: React.FC = () => {
  const [sessions, setSessions] = useState<StudySession[]>([]);
  const [subjects, setSubjects] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [newSession, setNewSession] = useState<StudySession>({
    id: 0,
    subject: "",
    date: dayjs().format("YYYY-MM-DD"),
    duration: 0,
    content: "",
    notes: "",
  });

  useEffect(() => {
    setSessions(getFromLocalStorage("study_sessions"));
    setSubjects(getFromLocalStorage("subjects", ["Toán", "Văn", "Anh", "Khoa học", "Công nghệ"]));
  }, []);

  const handleSave = () => {
    if (!newSession.subject) return;

    let updatedSessions;
    if (editId !== null) {
      updatedSessions = sessions.map((session) =>
        session.id === editId ? { ...newSession, id: editId } : session
      );
      setEditId(null);
    } else {
      updatedSessions = [...sessions, { ...newSession, id: Date.now() }];
    }

    setSessions(updatedSessions);
    saveToLocalStorage("study_sessions", updatedSessions);
    setIsModalOpen(false);
    resetForm();
  };

  const handleEdit = (session: StudySession) => {
    setNewSession(session);
    setEditId(session.id);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    const updatedSessions = sessions.filter((session) => session.id !== id);
    setSessions(updatedSessions);
    saveToLocalStorage("study_sessions", updatedSessions);
  };

  const resetForm = () => {
    setNewSession({
      id: 0,
      subject: "",
      date: dayjs().format("YYYY-MM-DD"),
      duration: 0,
      content: "",
      notes: "",
    });
  };

  return (
    <div>
      <h2>Tiến độ học tập</h2>
      <Button type="primary" onClick={() => setIsModalOpen(true)}>
        Thêm buổi học
      </Button>
      <List
        bordered
        dataSource={sessions}
        renderItem={(session) => (
          <List.Item
            actions={[
              <Button onClick={() => handleEdit(session)}>Sửa</Button>,
              <Button danger onClick={() => handleDelete(session.id)}>Xóa</Button>,
            ]}
          >
            <strong>{session.subject}</strong> - {session.date} - {session.duration} giờ
            <br />
            📚 {session.content}
            <br />
            📝 {session.notes || "Không có ghi chú"}
          </List.Item>
        )}
      />
      <Modal
        title={editId !== null ? "Chỉnh sửa buổi học" : "Thêm buổi học"}
        visible={isModalOpen}
        onOk={handleSave}
        onCancel={() => {
          setIsModalOpen(false);
          resetForm();
        }}
      >
        <Select
          style={{ width: "100%", marginBottom: "10px" }}
          placeholder="Chọn môn học"
          value={newSession.subject}
          onChange={(value) => setNewSession({ ...newSession, subject: value })}
        >
          {subjects.map((subject) => (
            <Option key={subject} value={subject}>
              {subject}
            </Option>
          ))}
        </Select>
        <DatePicker
          style={{ width: "100%", marginBottom: "10px" }}
          value={dayjs(newSession.date)}
          onChange={(date) =>
            setNewSession({ ...newSession, date: date ? date.format("YYYY-MM-DD") : "" })
          }
        />
        <Input
          type="number"
          placeholder="Thời gian học (giờ)"
          value={newSession.duration}
          onChange={(e) =>
            setNewSession({ ...newSession, duration: Number(e.target.value) })
          }
        />
        <Input.TextArea
          placeholder="Nội dung đã học"
          value={newSession.content}
          onChange={(e) => setNewSession({ ...newSession, content: e.target.value })}
        />
        <Input.TextArea
          placeholder="Ghi chú"
          value={newSession.notes}
          onChange={(e) => setNewSession({ ...newSession, notes: e.target.value })}
          style={{ marginTop: "10px" }}
        />
      </Modal>
    </div>
  );
};

export default StudyProgress;
