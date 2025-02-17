// models/Complaint.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Complaint = sequelize.define('Complaint', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        studentId: {
            type: DataTypes.INTEGER,
            allowNull: false, // Foreign key for the student who filed the complaint
        },
        complaintText: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
            defaultValue: 'not resolved',
        },
    });

    return Complaint;
};

  