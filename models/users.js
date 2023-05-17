



module.exports = (sequelize, DataTypes) => {
    const users = sequelize.define("users", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            // after: 'email'
        },
        admin: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0,
            // after: "password"
        }

    }, {
        modelName: 'users'
    }
    )

    return users
}