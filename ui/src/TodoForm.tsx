import { Form, Input, Button, Select } from 'antd';

interface TodoFormProps {
  onTodoAdded?: (todoValue: { todo: string, description: string, status: string }) => void;
}

export const TodoForm = ({ onTodoAdded }: TodoFormProps) => {
  const [form] = Form.useForm();

  const handleSubmit = (values: { todo: string, description:string,status:string }) => {
    form.resetFields();
    if (onTodoAdded) {
      onTodoAdded(values);
    }
  };

  return (
    <Form
      form={form}
      onFinish={handleSubmit}
      layout="inline"
    >
      <Form.Item
        name="todo"
        rules={[{ required: true, message: 'Please enter a todo item' }]}
      >
        <Input placeholder="Enter todo item" />
      </Form.Item>

      <Form.Item
        name="description"
        rules={[{ required: false, message: 'Please enter description' }]}
      >
        <Input placeholder="Enter todo description" />
      </Form.Item>

      <Form.Item
      name="status"
      rules={[{ required: false, message: 'Please select a status' }]}
      >
  <Select placeholder="Select status">
    <Select.Option value="pending">PENDING</Select.Option>
    <Select.Option value="done">DONE</Select.Option>
    <Select.Option value="inprogress">INPROGRESS</Select.Option>
  </Select>
  </Form.Item>
  

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Add Todo
        </Button>
      </Form.Item>
    </Form>
  );
};
