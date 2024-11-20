"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listLists = listLists;
exports.addLists = addLists;
exports.editLists = editLists;
exports.addListItem = addListItem;
exports.removeListItem = removeListItem;
exports.editListItem = editListItem;
async function listLists(request, reply) {
    console.log('DB status', this.level.db.status);
    const listsIter = this.level.db.iterator();
    const result = [];
    for await (const [key, value] of listsIter) {
        result.push(JSON.parse(value));
    }
    reply.send({ data: result });
}
async function addLists(request, reply) {
    const list = request.body;
    await this.level.db.put(list.id.toString(), JSON.stringify(list));
    reply.send({ data: list });
}
async function editLists(request, reply) {
    const { description } = request.body;
    const { id } = request.params;
    const existingListString = await this.level.db.get(id);
    const existingList = JSON.parse(existingListString);
    if (!existingList) {
        return reply.status(404).send({ error: 'List not found' });
    }
    existingList.description = description;
    await this.level.db.put(existingList.id.toString(), JSON.stringify(existingList));
    reply.send({ message: "Success", data: existingList });
}
async function addListItem(request, reply) {
    const item = request.body;
    const { id } = request.params;
    const existingListString = await this.level.db.get(id);
    const existingList = JSON.parse(existingListString);
    if (!existingList) {
        return reply.status(404).send({ error: 'List not found' });
    }
    existingList.items.push(item);
    await this.level.db.put(existingList.id.toString(), JSON.stringify(existingList));
    reply.send({ message: "Success", data: existingList });
}
async function removeListItem(request, reply) {
    const { id, itemId } = request.params;
    const existingListString = await this.level.db.get(id);
    const existingList = JSON.parse(existingListString);
    if (!existingList) {
        return reply.status(404).send({ error: 'List not found' });
    }
    const itemIndex = existingList.items.findIndex(item => item.id === itemId);
    if (itemIndex === -1) {
        return reply.status(404).send({ error: 'Item not found in the list' });
    }
    existingList.items.splice(itemIndex, 1);
    await this.level.db.put(existingList.id.toString(), JSON.stringify(existingList));
    reply.send({ message: "Success", data: existingList });
}
async function editListItem(request, reply) {
    const { nom, description, status } = request.body;
    const { id, itemId } = request.params;
    const existingListString = await this.level.db.get(id);
    const existingList = JSON.parse(existingListString);
    if (!existingList) {
        return reply.status(404).send({ error: 'List not found' });
    }
    const itemToModify = existingList.items.find(item => item.id === itemId);
    if (!itemToModify) {
        return reply.status(404).send({ error: 'Item not found in the list' });
    }
    if (nom !== undefined) {
        itemToModify.nom = nom;
    }
    if (description !== undefined) {
        itemToModify.description = description;
    }
    if (status !== undefined) {
        itemToModify.status = status;
    }
    await this.level.db.put(existingList.id.toString(), JSON.stringify(existingList));
    reply.send({ message: "Success", data: existingList });
}
//# sourceMappingURL=lists.controller.js.map