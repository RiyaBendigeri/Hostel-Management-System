const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const Student = sequelize.define("Student", {
        userId: {  // Reference to the User
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',  // Refers to the users table
                key: 'id'
            }
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        surname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        college: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        currentYearOfGraduation: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        bookingStartDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        bookingEndDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        roomId: { // Reference to the Room
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Rooms',  // Refers to the rooms table
                key: 'id'
            }
        },
    });
    
    return Student;
};
