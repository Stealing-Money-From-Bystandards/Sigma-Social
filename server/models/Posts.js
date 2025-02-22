module.exports = (sequelize, DataTypes) => {
    const Posts = sequelize.define("Posts",{

        postbody: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        }

    })
    return Posts
}