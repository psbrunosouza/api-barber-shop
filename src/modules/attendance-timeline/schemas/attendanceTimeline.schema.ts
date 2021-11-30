import Joi from 'joi';

const attendanceTimelineSchema = Joi.object({
  end: Joi.date().allow(null),
  start: Joi.date().allow(null),
  status: Joi.string().allow(null),
  barber: Joi.object().required(),
});

export default attendanceTimelineSchema.options({
  abortEarly: false,
  allowUnknown: true,
  stripUnknown: true,
});
