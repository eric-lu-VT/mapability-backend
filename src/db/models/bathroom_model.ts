import mongoose, { Schema } from 'mongoose';
import { IReview } from './review_model'

export interface IBathroom {
  id: string;
  location: {
    type: string,
    coordinates: number[],
  };
  accessibilityFeatures: string[];
  reviews: IReview[];
}

export const BathroomSchema = new Schema<IBathroom>({
  id: { type: String, required: true, unique: true },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  description: { type: String, required: true },
  value: { type: Number, required: true },
  accessibilityFeatures: [{ type: String }],
  reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
}, {
  timestamps: true,
  toJSON: {
    transform: (doc, { __v, ...resource }) => resource,
  },
});

const BathroomModel = mongoose.model<IBathroom>('Resource', BathroomSchema);

export default BathroomModel;