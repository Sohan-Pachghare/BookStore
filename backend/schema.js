const Joi = require("joi");

const bookSchema = Joi.object({
  book: Joi.object({
    name: Joi.string().required(),
    author: Joi.string().required(),
    publishYear: Joi.number().required(),
  }).required(),
  timeStamp: Joi.boolean(),
});

module.exports = { bookSchema };
