const Joi = require('joi');
const passwordComplexity = require('joi-password-complexity');

const validateRegister = (data) => {
    const schema = Joi.object({
        username: Joi.string().alphanum().min(3).max(30).required().label("Username"),
        email: Joi.string().email().required().label("Email"),
        password: passwordComplexity().required().label("Password"),
        role: Joi.string().valid('employee', 'admin').default('employee').label("Role"),
    });
    return schema.validate(data);
}

module.exports = validateRegister;