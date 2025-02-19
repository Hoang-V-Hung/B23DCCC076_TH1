import React from "react";
import { Layout, Tabs } from "antd";
import SubjectManager from "./components/SubjectManager";
import StudyProgress from "./components/StudyProgress";
import StudyGoals from "./components/StudyGoals";

const { Content } = Layout;
const { TabPane } = Tabs;

const App: React.FC = () => {
  return (
    <Layout style={{ minHeight: "100vh", padding: "20px", background: "#f4f4f4" }}>
      <Content>
        <Tabs defaultActiveKey="1" centered>
          <TabPane tab="📚 Quản lý môn học" key="1">
            <SubjectManager />
          </TabPane>
          <TabPane tab="📅 Tiến độ học tập" key="2">
            <StudyProgress />
          </TabPane>
          <TabPane tab="🎯 Mục tiêu học tập" key="3">
            <StudyGoals />
          </TabPane>
        </Tabs>
      </Content>
    </Layout>
  );
};

export default App;
