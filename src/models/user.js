const { DataTypes } = require('sequelize');

const dbsequelize = require('../configs/db.config');

const SALT_ROUNDS = 5;

const User = dbsequelize.sequelize.define('User', {

    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4
    },

    userName: {
        type: DataTypes.STRING,
        allowNull: false
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false
    },

    createdAt: {
        type: DataTypes.DATE
    },

    updatedAt: {
        type: DataTypes.DATE
    }

});

module.exports = User;