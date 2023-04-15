import mongoose, { Schema } from 'mongoose';
import { IReview } from './review_model';

export interface IBathroom {
  id: string;
  name: string,
  location: {
    type: string,
    coordinates: number[], // longitude, latitude
  };
  unisex: boolean;
  levels: string[];
  hasElevatorAccess: boolean;
  hasGrabBars: boolean;
  isSingleUse: boolean;
  buildingRampAccess: boolean;
  changingTable: boolean;
  accessibleDoor: boolean;
  hasMenstrualProducts: boolean;
  reviews: IReview[];
}

export const BathroomSchema = new Schema<IBathroom>({
  id: { type: String, required: true, unique: true },
  name: String,
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
  unisex: { type: Boolean },
  levels: { type: [String] },
  hasElevatorAccess: { type: Boolean, required: true },
  hasGrabBars: { type: Boolean, required: true },
  isSingleUse: { type: Boolean },
  buildingRampAccess: { type: Boolean },
  changingTable: { type: Boolean },
  accessibleDoor: { type: Boolean },
  hasMenstrualProducts: { type: Boolean },
  reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
}, {
  timestamps: true,
  toJSON: {
    transform: (doc, { __v, ...resource }) => resource,
  },
});

const BathroomModel = mongoose.model<IBathroom>('Resource', BathroomSchema);

export default BathroomModel;