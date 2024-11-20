import { Form, Input, Button, Select } from 'antd';
import { useEffect } from 'react';
import { Status } from '../enum';
import './Styles/Style.css';

interface TodoFormProps {
  initialValues?: { nom: string; description: string; status: Status };
  onTodoSubmit?: (todoValue: { nom: string; description: string; status: Status }) => void;
  onCancel?: () => void; 
}

export const EditForm = ({ initialValues, onTodoSubmit, onCancel }: TodoFormProps) => {
  const [form] = Form.useForm();

  // Populate the form with initial values when they are provided
  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [initialValues, form]);

  const handleSubmit = (values: { nom: string; description: string; status: Status }) => {
    if (onTodoSubmit) {
      onTodoSubmit(values);
    }
  };

  const handleCancel = () => {
    form.resetFields(); 
    if (onCancel) {
      onCancel(); // Trigger the parent cancel handler if provided
    }
  };

  return (
    <Form
      form={form}
      onFinish={handleSubmit}
      layout="inline"
    >
      <Form.Item
        name="nom"
        rules={[{ required: true, message: 'Please enter a todo item name' }]}
      >
        <Input placeholder="Enter todo item name" />
      </Form.Item>

      <Form.Item
        name="description"
        rules={[{ required: false, message: 'Please enter a description' }]}
      >
        <Input placeholder="Enter todo description" />
      </Form.Item>

      <Form.Item
        name="status"
        rules={[{ required: true, message: 'Please select a status' }]}
      >
        <Select placeholder="Select status">
          <Select.Option value="pending">PENDING</Select.Option>
          <Select.Option value="done">DONE</Select.Option>
          <Select.Option value="inprogress">IN PROGRESS</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item>
        <div className='ed-button-container'>
          <Button type="primary" htmlType="submit">
            {initialValues ? 'Update Todo' : 'Add Todo'}
          </Button>
          <Button type="default" onClick={handleCancel}>
            Cancel
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
};
