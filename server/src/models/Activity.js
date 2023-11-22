const {DataTypes} = require('sequelize');

module.exports=(sequelize) => {
    sequelize.define('Activity', {
        id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        difficulty: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        duration: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        season: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        timestamps: true,
    }
    )
};