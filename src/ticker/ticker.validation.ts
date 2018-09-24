import * as Joi from "joi";

const validations = {
  getTicker: {
    query: {
      id: Joi.string().required(),
      symbol: Joi.string().required(),
    },
  },
};

export default validations;
