import Joi from 'joi';

const scheduleSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
});

export default scheduleSchema.options({
  abortEarly: false,
  allowUnknown: true,
  stripUnknown: true,
});
