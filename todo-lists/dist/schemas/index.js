"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addListSchema = exports.listListsSchema = void 0;
exports.listListsSchema = {
    tags: ['lists'],
    summary: 'List all the lists',
    response: {
        200: {
            description: 'Successful response',
            type: 'array',
            items: {
                $ref: 'ITodoList#'
            }
        }
    }
};
exports.addListSchema = {
    tags: ['lists'],
    summary: 'Add a new list',
    body: {
        $ref: 'ITodoList#'
    }
};
//# sourceMappingURL=index.js.map