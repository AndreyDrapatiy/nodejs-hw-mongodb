import { model, Schema } from 'mongoose';

export const sessionSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    accessToken: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
      required: true,
    },
    accessTokenValidUntil: {
      type: Date,
      required: true,
    },
    refreshTokenValidUntil: {
      type: Date,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

sessionSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

const Session = model('user', sessionSchema);
export default Session;
