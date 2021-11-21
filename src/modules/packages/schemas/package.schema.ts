import Joi from 'joi';

const packageSchema = Joi.object({
  name: Joi.string().required(),
  value: Joi.number().required(),
  description: Joi.string().allow(null),
});

export default packageSchema.options({
  abortEarly: false,
  allowUnknown: true,
  stripUnknown: true,
});
