import * as Joi from "joi";

const validations = {
  getBalance: {
    query: {
      id: Joi.string().required(),
      apiKey: Joi.string().required(),
      secret: Joi.string().required(),
    },
  },
};

export default validations;
