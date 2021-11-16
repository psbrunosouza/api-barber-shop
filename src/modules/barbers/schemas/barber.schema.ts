import Joi from 'joi';

const barberSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  document: Joi.string().required(),
  zipcode: Joi.string().required(),
  street: Joi.string().required(),
  state: Joi.string().required(),
  city: Joi.string().required(),
  streetNumber: Joi.string(),
  user: Joi.object().required(),
});

export default barberSchema.options({
  abortEarly: false,
  allowUnknown: true,
  stripUnknown: true,
});
