const Sequelize = require('sequelize')
const sequelize = require('./../index')
const Student = require('./../models/Student')
const Course = require('./../models/Course')
const Selection = sequelize.define(
    'selection', 
    {
        sltid: {
            type: Sequelize.INTEGER, 
            autoIncrement: true, 
            primaryKey: true, 
            unique: true
        },
        student_sid: {
            type: Sequelize.STRING,
            references:{
                model: 'students',
                key: 'sid'
            }
        },
        course_cid: {
            type: Sequelize.STRING,
            references:{
                model: 'courses',
                key: 'cid'
            }
        },
        select_year: {
            type: Sequelize.INTEGER
        },
        score: {
            type: Sequelize.INTEGER
        }
    }
);
Student.hasMany(Selection, { onDelete: 'cascade' });
Course.hasMany(Selection);

module.exports = Selection;