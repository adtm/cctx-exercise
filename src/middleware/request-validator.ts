import * as Joi from "joi";

const validateObject = (object = {}, label, schema, options = {}) => {
  if (schema) {
    const { error } = Joi.validate(object, schema, options);
    if (error) {
      throw new Error(`Invalid ${label} - ${error.message}`);
    }
  }
};

const validate = validationObj => (ctx, next) => {
  try {
    validateObject(ctx.headers, "Headers", validationObj.headers, {
      allowUnknown: true,
    });
    validateObject(ctx.params, "URL Parameters", validationObj.params);
    validateObject(ctx.query, "URL Query", validationObj.query, {
      allowUnknown: true,
    });
    if (ctx.request.body) {
      validateObject(ctx.request.body, "Request Body", validationObj.body, {
        allowUnknown: true,
      });
    }

    return next();
  } catch (err) {
    ctx.throw(400, err.message);
  }
};

export default validate;
