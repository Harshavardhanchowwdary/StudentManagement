const express = require('express');
const {Register,getAllStudents,Deletestudent,UpdateStudent} = require('./Controllers/MainController')
const authRouter = express.Router();
authRouter.post('/StudentRegister',Register);
authRouter.get('/getAllstudents',getAllStudents);
authRouter.put('/UpdateStudent/:id',UpdateStudent)
authRouter.delete('/DeleteStudent/:id', Deletestudent);

module.exports = {
    authRouter
}