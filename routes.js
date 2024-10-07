const express = require('express');
const router = express.Router();
const contactController = require('./controllers');

// Define routes for contact actions
router.get('/', contactController.getAllContact);
router.get('/:id', contactController.getSingleContact);
router.post('/', contactController.createContact);
router.put('/:id', contactController.updateContact); // Use PUT for updates
router.delete('/:id', contactController.deleteContact); // Use DELETE for deletion

module.exports = router;
