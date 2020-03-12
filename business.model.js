const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Joigoose = require('joigoose')(mongoose);
const Joi = require('@hapi/joi');

// Schema para Business com o Joi(joigoose)

var joiSchema = Joi.object({
  cpf: Joi.string().required(),
  model: Joi.string().alphanum().min(2).max(255).trim().required().error(errors => {
    errors.forEach(err => {
      switch (err.type){
        case "any.empty":
          err.message = "Value should not be empty!";
          break;
        case "string.min":
          err.message = `Value should have at least ${err.context.limit} characters!`;
          break;
        case "string.max":
          err.message = `Value should have at most ${err.context.limit} characters!`;
          break;
        default:
          break;
      }
    });
    return errors;
  }),
  brand: Joi.string().alphanum().min(2).max(255).trim().required(),
  price: Joi.number().positive().required().required(),
  // photo: Joi.string().min(1).max(255).trim().required(),
  date: Joi.date().min('12/26/2018').required(),
  endDate: Joi.date().required(),
  // endDate: Joi.date().greater(Joi.ref('date'))
  color: Joi.string().valid('White', 'Black', 'Gold', 'Pink').required(),
  code: Joi.array().unique().min(1).max(8).required()
  // code: Joi.array().unique().alphanum().min(1).max(8).required()
})

var Business = new Schema(Joigoose.convert(joiSchema))

module.exports = mongoose.model('Business', Business);