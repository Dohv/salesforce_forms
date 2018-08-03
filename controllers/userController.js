const controller = {};

controller.signUp = async (req, res, next) => {
  console.log('user signUp() has been called');
}

controller.signIn = async (req, res, next) => {
  console.log('user signin() has been called');
}

controller.secret = async (req, res, next) => {
  console.log('user secret() has been called');
}

module.exports = controller;