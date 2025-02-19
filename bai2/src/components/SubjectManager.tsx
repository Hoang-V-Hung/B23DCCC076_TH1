import React, { useEffect, useState } from "react";
import { Input, Button, List, Modal, Select } from "antd";
import { saveToLocalStorage, getFromLocalStorage } from "../localStorage";

const { Option } = Select;

// Danh sách môn học mặc định
const defaultSubjects = ["Toán", "Văn", "Anh", "Khoa học", "Công nghệ"];

const SubjectManager: React.FC = () => {
  const [subjects, setSubjects] = useState<string[]>([]);
  const [subjectName, setSubjectName] = useState("");
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setSubjects(getFromLocalStorage("subjects", defaultSubjects));
  }, []);

  const handleAdd = () => {
    if (subjectName.trim() && !subjects.includes(subjectName)) {
      const newSubjects = [...subjects, subjectName];
      setSubjects(newSubjects);
      saveToLocalStorage("subjects", newSubjects);
      setSubjectName("");
    }
  };

  const handleEdit = (index: number) => {
    setSubjectName(subjects[index]);
    setEditIndex(index);
    setIsModalOpen(true);
  };

  const handleUpdate = () => {
    if (editIndex !== null) {
      const updatedSubjects = [...subjects];
      updatedSubjects[editIndex] = subjectName;
      setSubjects(updatedSubjects);
      saveToLocalStorage("subjects", updatedSubjects);
      setEditIndex(null);
      setSubjectName("");
      setIsModalOpen(false);
    }
  };

  const handleDelete = (index: number) => {
    const newSubjects = subjects.filter((_, i) => i !== index);
    setSubjects(newSubjects);
    saveToLocalStorage("subjects", newSubjects);
  };

  return (
    <div>
      <h2>Quản lý môn học</h2>
      <Select
        style={{ width: "100%", marginBottom: "10px" }}
        placeholder="Chọn môn học hoặc nhập mới"
        showSearch
        onChange={(value) => setSubjectName(value)}
        onSearch={(value) => setSubjectName(value)}
        value={subjectName || undefined}
        dropdownRender={(menu) => (
          <>
            {menu}
            <div style={{ padding: "8px", cursor: "pointer", color: "blue" }} onClick={handleAdd}>
              + Thêm "{subjectName}"
            </div>
          </>
        )}
      >
        {subjects.map((subject) => (
          <Option key={subject} value={subject}>
            {subject}
          </Option>
        ))}
      </Select>

      <Button type="primary" onClick={handleAdd} style={{ width: "100%", marginBottom: "10px" }}>
        Thêm môn học
      </Button>

      <List
        bordered
        dataSource={subjects}
        renderItem={(subject, index) => (
          <List.Item
            actions={[
              <Button onClick={() => handleEdit(index)}>Sửa</Button>,
              <Button danger onClick={() => handleDelete(index)}>Xóa</Button>,
            ]}
          >
            {subject}
          </List.Item>
        )}
      />

      <Modal
        title="Chỉnh sửa môn học"
        visible={isModalOpen}
        onOk={handleUpdate}
        onCancel={() => setIsModalOpen(false)}
      >
        <Input value={subjectName} onChange={(e) => setSubjectName(e.target.value)} />
      </Modal>
    </div>
  );
};

export default SubjectManager;
