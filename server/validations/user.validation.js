const Joi = require("joi");

function validateRegisterInput(input) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .required(),
    password: Joi.string().min(6).required(),
  });

  return schema.validate(input);
}

function vailidateLoginInput(input) {
  const schema = Joi.object({
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .required(),
    password: Joi.string().min(6).required(),
  });

  return schema.validate(input);
}

function validateEmail(input) {
  const schema = Joi.object({
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .required(),
  });

  return schema.validate(input);
}
function validatePassword(input) {
  const schema = Joi.object({
    password: Joi.string().min(6).required(),
  });

  return schema.validate(input);
}

module.exports = {
  validateRegisterInput,
  vailidateLoginInput,
  validateEmail,
  validatePassword,
};
