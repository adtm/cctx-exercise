import * as mongoose from "mongoose";

export interface ICredential extends mongoose.Document {
  name: string;
  somethingElse?: number;
}

export const CredentialSchema = new mongoose.Schema({
  apiKey: { type: String, required: true },
  secret: { type: String, required: true },
  uid: String,
  password: String,
});

const ExchangeCredentials = mongoose.model<ICredential>(
  "ExchangeCredential",
  CredentialSchema,
);
export default ExchangeCredentials;
