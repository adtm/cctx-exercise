import * as Joi from "joi";

const validations = {
  placeOrder: {
    query: {
      id: Joi.string().required(),
      symbol: Joi.string().required(),
      orderType: Joi.string().required(),
      side: Joi.string()
        .valid("sell", "buy")
        .required(),
      amount: Joi.number().required(),
      price: Joi.number().required(),

      apiKey: Joi.string(),
      secret: Joi.string(),
    },
  },
};

export default validations;
