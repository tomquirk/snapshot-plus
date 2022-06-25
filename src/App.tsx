import { Button, Form, Input, Space } from "antd";
import { useState } from "react";
import { Proposals } from "./components/Proposals";

function App() {
  const [space, setSpace] = useState<string>();
  const [form] = Form.useForm();

  const onFormFinish = () => {
    setSpace(form.getFieldValue("space"));
  };

  return (
    <div className="App">
      <header></header>
      <main className="p-10">
        <h1>Search Snapshot spaces</h1>

        <Space direction="vertical" size="large">
          <Form form={form} layout="inline" onFinish={() => onFormFinish()}>
            <Form.Item name="space">
              <Input />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Load space
              </Button>
            </Form.Item>
          </Form>

          {space && <Proposals space={space} />}
        </Space>
      </main>
      <footer></footer>
    </div>
  );
}

export default App;
