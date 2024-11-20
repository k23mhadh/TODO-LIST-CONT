import axios from 'axios'; 
import { IItem, ITodoList } from '../interfaces';

//import { ListsApi } from 'todo-list-client'
//const api = new ListsApi()


//const lists = ['Work Tasks', 'Personal Tasks', 'Shopping List']
//const listItems: Record<string, string[]> = {
 //   'Work Tasks': ['Buy groceries', 'Complete React project', 'Exercise for 30 minutes', 'Read a book chapter'],
 //   'Personal Tasks': ['Buy groceries', 'Complete React project', 'Exercise for 30 minutes', 'Read a book chapter'],
  //  'Shopping List': ['Buy groceries', 'Complete React project', 'Exercise for 30 minutes', 'Read a book chapter']
//}


export const apiClient = {
    getLists: async () => {
        return axios.get(`${process.env.REACT_APP_API_URL}/lists`).then(res=>res.data)
    },
    addList: async (listName: string) => {
        const addedList = axios.post(`${process.env.REACT_APP_API_URL}/lists`, {id: listName, description: listName,items:[]}).then(res=>res.data.data.id);
        return Promise.resolve(addedList)
    },
    getTodos: async (listName: string): Promise<IItem[]> => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/lists`);
            const lists = response.data.data; // Ensure this is an array
            const list = lists.find((list: ITodoList) => list.id === listName);
    
            if (!list || !list.items) {
                return [];
            }
            return list.items.map((item: IItem) => item);
        } catch (error) {
            console.error("Error fetching todos:", error);
            throw error; 
        }
    },
    addTodo: async (listName: string, todoVal: {todo:string, description:string,status:string}) => {
        //console.debug('-- addTodo', listName, todo, listItems);
        const addedtem = await axios.post(`${process.env.REACT_APP_API_URL}/lists/${listName}/items`, {id: todoVal.todo, nom: todoVal.todo, description: todoVal.description,status:todoVal.status}).then(res=>res.data.data.items);
        return Promise.resolve(addedtem);
    },
    delTodo: async (todoId: string, todoList: string) => {
        //console.debug('-- addTodo', listName, todo, listItems);
         
        const listItems = await axios.delete(`${process.env.REACT_APP_API_URL}/lists/${todoList}/items/${todoId}`).then(res=>res.data.data.items);
        return Promise.resolve(listItems);
    },editTodo: async (selectedList:string, todoId: string, newValues: { nom: string; description: string; status: import("../enum").Status; } ) => {
        //console.debug('-- addTodo', listName, todo, listItems);
         
        const listItems = await axios.put(`${process.env.REACT_APP_API_URL}/lists/${selectedList}/items/${todoId}`,newValues).then(res=>res.data.data.items);
        return Promise.resolve(listItems);
    }
}
