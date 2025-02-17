const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const users = sequelize.define("users", {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true // Ensure emails are unique
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: { // Add role attribute
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'student', // Default role is 'student'
        }
    });
    return users;
};
