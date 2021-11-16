import Joi from 'joi';

const scheduleSchema = Joi.object({
  name: Joi.string().required(),
});

export default scheduleSchema.options({
  abortEarly: false,
  allowUnknown: true,
  stripUnknown: true,
});
