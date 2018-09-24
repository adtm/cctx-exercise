import * as Joi from "joi";

const validations = {
  getSymbol: {
    query: {
      id: Joi.string().required(),
    },
  },
};

export default validations;
