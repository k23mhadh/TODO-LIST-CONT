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
    getTodos: async (listName: string): Promise<string[]> => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/lists`);
            const lists = response.data.data; // Ensure this is an array
            const list = lists.find((list: ITodoList) => list.id === listName);
    
            if (!list || !list.items) {
                return [];
            }
            return list.items.map((item: IItem) => item.nom);
        } catch (error) {
            console.error("Error fetching todos:", error);
            throw error; 
        }
    },
    addTodo: async (listName: string, todo: string) => {
        //console.debug('-- addTodo', listName, todo, listItems);
        const addedtem = await axios.post(`${process.env.REACT_APP_API_URL}/lists/${listName}/items`, {id: todo, nom: todo}).then(res=>res.data.data.items);
        return Promise.resolve(addedtem);
    }
}
