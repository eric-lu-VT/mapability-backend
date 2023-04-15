import mongoose, { Schema } from 'mongoose';
import { IReview } from './review_model'

export interface IBathroom {
  id: string;
  location: {
    type: string,
    coordinates: number[],
  };
  gender: string;
  level: number;
  hasElevatorAccess: boolean;
  hasGrabBars: number;
  singleUse?: boolean;
  buildingRampAccess?: boolean;
  changingTable?: boolean;
  accessibleDoor?: boolean;
  hasMenstrualProducts?: boolean;
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
  gender: {type: String},
  level: {type: String},
  hasElevatorAccess: {type: String, required: true},
  hasGrabBars: {type: String, required: true},
  singleUse: {type: String},
  buildingRampAccess: {type: String},
  changingTable: {type: String},
  accessibleDoor: {type: String},
  hasMenstrualProducts: {type: String},
  reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
}, {
  timestamps: true,
  toJSON: {
    transform: (doc, { __v, ...resource }) => resource,
  },
});

const BathroomModel = mongoose.model<IBathroom>('Resource', BathroomSchema);

export default BathroomModel;