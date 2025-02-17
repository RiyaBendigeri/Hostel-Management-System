const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const Room = sequelize.define("Room", {
        roomNumber: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        isAvailable: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
    }, {
        // Enable timestamps
        timestamps: true,
        // Optionally customize the names of the fields
        createdAt: 'createdAt',  // Name of the createdAt field
        updatedAt: 'updatedAt'   // Name of the updatedAt field
    });
    return Room;
};
