import { FastifyInstance } from 'fastify'
import * as listsController from '../../controllers/lists.controller'
import { addListSchema, listListsSchema } from '../../schemas'


// Define the lists routes for the Fastify instance
async function lists(fastify: FastifyInstance) {

  // Route to get all lists
  fastify.get('/', listsController.listLists)

  // TODO: Implement the addList function in the controller
  // Route to create a new list
  fastify.post('/', listsController.addLists)

  // Route to update an existing list by ID
  fastify.put('/:id', listsController.editLists)

  // Route to add an item to a specific list by list ID
  fastify.post('/:id/items', listsController.addListItem)

  // Route to remove an item from a specific list by list ID and item ID
  fastify.delete('/:id/items/:itemId', listsController.removeListItem)

  // Route to update an item in a specific list by list ID and item ID
  fastify.put('/:id/items/:itemId', listsController.editListItem)
}

export default lists