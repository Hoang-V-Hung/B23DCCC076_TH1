import React, { useEffect, useState } from "react";
import { Card, Table, Button, Modal, Input, Progress, Select, Typography } from "antd";
import { saveToLocalStorage, getFromLocalStorage } from "../localStorage";

const { Title, Text } = Typography;
const { Option } = Select;

interface StudyGoal {
  subject: string;
  targetHours: number;
}

const StudyGoals: React.FC = () => {
  const [goals, setGoals] = useState<StudyGoal[]>([]);
  const [sessions, setSessions] = useState<any[]>([]);
  const [subjects, setSubjects] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newGoal, setNewGoal] = useState<StudyGoal>({ subject: "", targetHours: 0 });

  useEffect(() => {
    setGoals(getFromLocalStorage("study_goals", []));
    setSessions(getFromLocalStorage("study_sessions", []));
    setSubjects(getFromLocalStorage("subjects", ["Toán", "Văn", "Anh", "Khoa học", "Công nghệ"]));
  }, []);

  const handleSave = () => {
    if (!newGoal.subject || newGoal.targetHours <= 0) return;
    const updatedGoals = [...goals.filter((goal) => goal.subject !== newGoal.subject), newGoal];
    setGoals(updatedGoals);
    saveToLocalStorage("study_goals", updatedGoals);
    setIsModalOpen(false);
    setNewGoal({ subject: "", targetHours: 0 });
  };

  const calculateProgress = (subject: string) => {
    const totalHours = sessions
      .filter((session) => session.subject === subject)
      .reduce((sum, session) => sum + session.duration, 0);

    const target = goals.find((goal) => goal.subject === subject)?.targetHours || 0;
    return target ? Math.min((totalHours / target) * 100, 100) : 0;
  };

  const columns = [
    {
      title: "Môn học",
      dataIndex: "subject",
      key: "subject",
    },
    {
      title: "Mục tiêu (giờ)",
      dataIndex: "targetHours",
      key: "targetHours",
    },
    {
      title: "Tiến độ",
      key: "progress",
      render: (record: StudyGoal) => (
        <Progress percent={calculateProgress(record.subject)} status="active" />
      ),
    },
  ];

  return (
    <Card title="🎯 Mục tiêu học tập hàng tháng" style={{ marginTop: "20px", borderRadius: "10px" }}>
      <Button type="primary" onClick={() => setIsModalOpen(true)} style={{ marginBottom: "10px" }}>
        + Đặt mục tiêu
      </Button>
      <Table dataSource={goals} columns={columns} rowKey="subject" pagination={false} />

      <Modal
        title="Đặt mục tiêu học tập"
        visible={isModalOpen}
        onOk={handleSave}
        onCancel={() => setIsModalOpen(false)}
      >
        <Select
          style={{ width: "100%", marginBottom: "10px" }}
          placeholder="Chọn môn học"
          value={newGoal.subject}
          onChange={(value) => setNewGoal({ ...newGoal, subject: value })}
        >
          {subjects.map((subject) => (
            <Option key={subject} value={subject}>
              {subject}
            </Option>
          ))}
        </Select>
        <Input
          type="number"
          placeholder="Mục tiêu số giờ"
          value={newGoal.targetHours}
          onChange={(e) => setNewGoal({ ...newGoal, targetHours: Number(e.target.value) })}
        />
      </Modal>
    </Card>
  );
};

export default StudyGoals;
