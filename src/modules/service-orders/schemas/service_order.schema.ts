import Joi from 'joi';

const serviceOrderSchema = Joi.object({
  requested: Joi.object().required(),
  provider: Joi.object().required(),
  initial_service_time: Joi.date().required(),
  final_service_time: Joi.date().required(),
  packages: Joi.array().allow(null),
  status: Joi.string().required(),
});

export default serviceOrderSchema.options({
  abortEarly: false,
  allowUnknown: true,
  stripUnknown: true,
});
