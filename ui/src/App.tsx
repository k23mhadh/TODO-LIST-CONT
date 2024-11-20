import { Button, Layout, List, Menu, MenuProps } from "antd";
import { PlusOutlined } from '@ant-design/icons';
import { apiClient } from "./api-client";
import { useEffect, useState } from "react";
import { ListForm } from "./ListForm";
import { TodoForm } from "./TodoForm";
import { IItem, ITodoList } from '../interfaces';
import { EditForm } from "./EditForm";
import './Styles/Style.css';

const { Header, Content, Sider } = Layout;


type MenuItem = Required<MenuProps>['items'][number];

export default function App() {
  const [lists, setLists] = useState<string[]>([]);
  const [selectedList, setSelectedList] = useState<string | null>(null);
  const [showListForm, setShowListForm] = useState(false);
  const [showTodoForm, setShowTodoForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [selectedListItems, setSelectedListItems] = useState<IItem[]>([]);
  useEffect(() => {
    apiClient.getLists().then((response) => {
      const lists = response.data.map((list: ITodoList) => list.id);
      setLists(lists);
    });
  }, []);

  useEffect(() => {
    if (selectedList) {
      apiClient.getTodos(selectedList).then(setSelectedListItems);
    }
  }, [selectedList]);

  const handleItemClick = (key: string) => {
    if (key === 'add') {
      setSelectedList(null);
      setShowListForm(true);
    } else {
      setSelectedList(key);
    }
  }

  const handleButtonClick = (key: string, itemId: string, selectedList: string) => {
    if (key === 'edit') {
      setSelectedItem(itemId);
      setShowEditForm(true);
    } else if (key === 'delete') {
      // Show confirmation dialog for delete action
      const confirmDelete = window.confirm("Are you sure you want to delete this item?");

      if (confirmDelete) {
        // If confirmed, call the API to delete the item
        apiClient.delTodo(itemId, selectedList).then(setSelectedListItems);
      } else {
        console.log("Delete action was canceled.");
      }
    }
  }



  // TODO: fix any, use type from API
  const items: MenuItem[] = lists.map((list: string) => ({
    key: list,
    label: list
  }));

  function handleListAdded(listName: string): void {
    apiClient.addList(listName).then((result) => {
      setLists((prevItems) => [...prevItems, result])
    });
    setShowListForm(false);
  }

  function handleTodoAdded(todoVal: { todo: string, description: string, status: string }): void {
    if (selectedList) {
      apiClient.addTodo(selectedList, todoVal).then(setSelectedListItems);

    }
    setShowTodoForm(false);
  }

  function handleEditSubmit(itemId:string, newValues: { nom: string; description: string; status: import("../enum").Status; }): void {
    
    if (selectedList) {
      apiClient.editTodo(selectedList,itemId, newValues).then(setSelectedListItems);
      setSelectedItem(null);

    }
    setShowEditForm(false);

  }

  function handleCancel(): void {
    setShowEditForm(false);
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ display: 'flex', alignItems: 'center', color: 'white' }}>
        TODO LISTS
      </Header>
      <Layout>
        <Sider width={200} style={{ background: 'black' }}>
          <Menu
            theme="dark"
            mode="inline"
            items={[{ key: 'add', label: 'Add list', icon: <PlusOutlined /> }, ...items]}
            onClick={(e) => handleItemClick(e.key)}
          />
        </Sider>
        <Content
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
          }}
        >
          {showListForm && <ListForm onListAdded={handleListAdded} />}
          {selectedList &&
            <div>
              <Button onClick={() => setShowTodoForm(true)}>Add Todo</Button>
              <List
                dataSource={selectedListItems}
                renderItem={(item) => <List.Item>
                  <div className="item-container">
                    <div className="text-content">
                      <strong>Name:</strong> {item.nom} <br />
                      <strong>Description:</strong> {item.description}<br />
                      <strong>Status:</strong> {item.status}
                    </div>
                    <div className="button-container">
                      <Button className="edit-button" onClick={() => handleButtonClick("edit", item.id, selectedList)}>Edit</Button>
                      <Button className="delete-button" onClick={() => handleButtonClick("delete", item.id, selectedList)}>Delete</Button>
                    </div>

                    <div>
                  {showEditForm && item.id === selectedItem && <EditForm initialValues={{
                      nom: item.nom || '',
                      description: item.description || '',
                      status: item.status,
                    }} onTodoSubmit={(newValues) =>handleEditSubmit(item.id, newValues) } onCancel={handleCancel} />}
                  </div>
                    
                  </div>
                  
                  

                </List.Item>}
              />
            </div>
          }
          {!selectedList && !showListForm && <div>Select a list</div>}
          {showTodoForm && <TodoForm onTodoAdded={handleTodoAdded} />}

        </Content>
      </Layout>
    </Layout>
  )
}