const express = require('express')
const { isAuthenticated } = require('../middleware/auth')
const { createDocument, getDocumentById, getMyDocument, updateDocument, deleteDocument, getShareDocument, shareDocument, removeCollaborator } = require('../controller/documentController')

const documentRouter = express.Router()

documentRouter.post('/',isAuthenticated,createDocument);
documentRouter.get('/',isAuthenticated,getMyDocument);
documentRouter.get('/shared', isAuthenticated, getShareDocument)
documentRouter.get('/:id',isAuthenticated,getDocumentById);
documentRouter.put('/:id',isAuthenticated,updateDocument);
documentRouter.delete('/:id',isAuthenticated,deleteDocument);
documentRouter.post('/:id/share', isAuthenticated,shareDocument);
documentRouter.post('/:id/unshare',isAuthenticated,removeCollaborator)

module.exports = documentRouter