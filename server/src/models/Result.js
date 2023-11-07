module.exports = (sequelize, Sequelize) => {
    const Result = sequelize.define("result", {
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      published: {
        type: Sequelize.BOOLEAN
      }
    });
    return Result;
  };