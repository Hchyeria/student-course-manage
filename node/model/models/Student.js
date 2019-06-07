const Sequelize = require('sequelize')
const sequelize = require('../index')
const Student = sequelize.define(
    'student', 
    {
        sid: {
            type: Sequelize.BIGINT(50), 
            autoIncrement: true, 
            primaryKey: true, 
            unique: true
        },
        sname: {
            type: Sequelize.STRING
        },
        gender: {
            type: Sequelize.CHAR(5)
        },
        entrance_age: {
            type: Sequelize.INTEGER
        },
        entrance_year: {
            type: Sequelize.INTEGER
        },
        class_id: {
            type: Sequelize.INTEGER
        }
    }
);
module.exports = Student;