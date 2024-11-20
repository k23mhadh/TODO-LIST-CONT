
import { Status } from "../enum"
export interface ITodoList {
    id: string
    description?: string
    items : [IItem]
  }

  export interface IItem {
    id: string
    nom?: string,
    description?:string,
    status: Status
  }

