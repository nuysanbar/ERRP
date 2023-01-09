const express=require('express');
const router=express.Router();
const employeesController=require('../../controllers/employeesController.js')
const ROLES_LIST= require('../../config/rolesList');
const verifyRoles=require('../../middlewares/verifyRoles');
router.route('/')
    .get(employeesController.getAllEmployees)
    .post(verifyRoles(ROLES_LIST.admin,ROLES_LIST.editor),employeesController.createEmployee)
    .put(verifyRoles(ROLES_LIST.admin,ROLES_LIST.editor),employeesController.updateEmployee)
    .delete(verifyRoles(ROLES_LIST.admin),employeesController.deleteEmployee)

router.route('/:id')
    .get(employeesController.getEmployee)

module.exports=router;

