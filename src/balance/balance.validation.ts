import * as Joi from "joi";

const validations = {
  getBalance: {
    query: {
      id: Joi.string().required(),
      apiKey: Joi.string(),
      secret: Joi.string(),
      uid: Joi.string(),
      password: Joi.string(),
    },
  },
};

export default validations;
