const Joi = require('joi');
const passwordComplexity = require('joi-password-complexity');

const validateLogin = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required().label("Email"),
        password: passwordComplexity().required().label("Password"),
    });
    return schema.validate(data);
}

module.exports = validateLogin;