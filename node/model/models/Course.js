const Sequelize = require('sequelize')
const sequelize = require('../index')
const Course = sequelize.define(
    'course', 
    {
        cid: {
            type: Sequelize.BIGINT(50), 
            autoIncrement: true, 
            primaryKey: true, 
            unique: true
        },
        cname: {
            type: Sequelize.STRING,
            allowNull: false
        },
        teacher_name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        point: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        suit_grade: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        cancel_year: {
            type: Sequelize.INTEGER
        }
    }
);
module.exports = Course;