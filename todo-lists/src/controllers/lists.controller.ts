import { FastifyReply, FastifyRequest } from "fastify"
import { IItem, ITodoList } from "../interfaces"
import { Status } from "../enum"

/* const staticLists: ITodoList[] = [
  {
	id: 'l-1',
	description: 'Dev tasks',
  items :[{
    id: "i-1",
    nom: "Task 1 ",
    description: "This is the desc1",
    status: Status.PENDING
  }]
  },
  {
	id: 'l-2',
	description: 'Test tasks',
  items:[{
    id: "i-2",
    nom: "Task  ",
    description: "This is the desc2",
    status: Status.DONE
  }]
  },
] */

// Function to list all todo lists
export async function listLists(
  request: FastifyRequest, 
  reply: FastifyReply
) {
  console.log('DB status', this.level.db.status)

  const listsIter = this.level.db.iterator()
  const result: ITodoList[] = []

  // Iterate through the database and push each list into the result array
  for await (const [key, value] of listsIter) {
    result.push(JSON.parse(value))
  }

  // Send the result back to the client
  reply.send({ data: result })
}




// Function to add a new todo list
export async function addLists(
  request: FastifyRequest, 
  reply: FastifyReply
) {
  const list = request.body as ITodoList
  
  // Store the new list in the database
    await this.level.db.put(
    list.id.toString(), JSON.stringify(list)
  )

  // Send the newly created list back to the client
  reply.send({ data: list })
}

// Function to edit an existing todo list
export async function editLists(
  request: FastifyRequest<{ Params: { id: string }; Body: { description: string } }>, 
  reply: FastifyReply
) {
  const { description } = request.body
  const { id } = request.params
  const existingListString = await this.level.db.get(id);
  const existingList: ITodoList = JSON.parse(existingListString);

  // Check if the list exists
  if (!existingList) {
    return reply.status(404).send({ error: 'List not found' });
  }

  // Update the list's description
  existingList.description = description;

  // Save the updated list back to the database
  await this.level.db.put(
    existingList.id.toString(), JSON.stringify(existingList)
  )

  // Send the updated list back to the client
  reply.send({ message: "Success", data: existingList })
}

// Function to add an item to a specific todo list
export async function addListItem(
  request: FastifyRequest<{ Params: { id: string }; Body: IItem }>, 
  reply: FastifyReply
) {
  const item = request.body
  const { id } = request.params
  const existingListString = await this.level.db.get(id);
  const existingList: ITodoList = JSON.parse(existingListString);

  // Check if the list exists
  if (!existingList) {
    return reply.status(404).send({ error: 'List not found' });
  }
  
  // Add the new item to the list
  existingList.items.push(item);

  // Save the updated list back to the database
  await this.level.db.put(
    existingList.id.toString(), JSON.stringify(existingList)
  )

  // Send the updated list back to the client
  reply.send({ message: "Success", data: existingList })
}

// Function to remove an item from a specific todo list
export async function removeListItem(
  request: FastifyRequest<{ Params: { id: string, itemId: string } }>, 
  reply: FastifyReply
) {
  const { id, itemId } = request.params
  const existingListString = await this.level.db.get(id);
  const existingList: ITodoList = JSON.parse(existingListString);

  // Check if the list exists
  if (!existingList) {
    return reply.status(404).send({ error: 'List not found' });
  }

  // Find the index of the item to be removed
  const itemIndex = existingList.items.findIndex(item => item.id === itemId);

  // Check if the item exists in the list
  if (itemIndex === -1) {
    return reply.status(404).send({ error: 'Item not found in the list' });
  }

  // Remove the item from the list
  existingList.items.splice(itemIndex, 1);

  // Save the updated list back to the database
  await this.level.db.put(
    existingList.id.toString(), JSON.stringify(existingList)
  )

  // Send the updated list back to the client
  reply.send({ message: "Success", data: existingList })
}

// Function to edit an item in a specific todo list
export async function editListItem(
  request: FastifyRequest<{ Params: { id: string, itemId: string }; Body: { nom?: string, description?: string, status?: Status } }>, 
  reply: FastifyReply
) {
  const { nom, description, status } = request.body // item fields
  const { id, itemId } = request.params
  const existingListString = await this.level.db.get(id);
  const existingList: ITodoList = JSON.parse(existingListString);

  // Check if the list exists
  if (!existingList) {
    return reply.status(404).send({ error: 'List not found' });
  }

  // Find the item to modify
  const itemToModify = existingList.items.find(item => item.id === itemId);

  // Check if the item exists in the list
  if (!itemToModify) {
    return reply.status(404).send({ error: 'Item not found in the list' });
  }

  // Update item fields if provided
  if (nom !== undefined) {
    itemToModify.nom = nom;
  }
  if (description !== undefined) {
    itemToModify.description = description;
  }
  if (status !== undefined) {
    itemToModify.status = status;
  }

  // Save the updated list back to the database
  await this.level.db.put(
    existingList.id.toString(), JSON.stringify(existingList)
  )

  // Send the updated list back to the client
  reply.send({ message: "Success", data: existingList })
}