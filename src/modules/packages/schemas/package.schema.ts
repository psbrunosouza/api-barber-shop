import Joi from 'joi';

const packageSchema = Joi.object({
  name: Joi.string().required(),
  value: Joi.number().required(),
  description: Joi.string().allow(null),
  tag: Joi.string().allow(null),
  image: Joi.string().required(),
  time: Joi.number().required(),
});

export default packageSchema.options({
  abortEarly: false,
  allowUnknown: true,
  stripUnknown: true,
});
