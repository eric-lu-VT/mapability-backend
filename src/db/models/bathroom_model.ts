import mongoose, { Schema } from 'mongoose';

export interface IBathroom {
  id: string;
  name: string,
  location: {
    type: string,
    coordinates: number[], // longitude, latitude
  };
  description: string,
  unisex: boolean;
  levels: string[];
  hasElevatorAccess: boolean;
  hasGrabBars: boolean;
  isSingleUse: boolean;
  buildingRampAccess: boolean;
  changingTable: boolean;
  accessibleDoor: boolean;
  hasMenstrualProducts: boolean;
}

export const BathroomSchema = new Schema<IBathroom>({
  id: { type: String, required: true, unique: true },
  name: { type: String },
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
  description: { type: String },
  unisex: { type: Boolean },
  levels: { type: [String] },
  hasElevatorAccess: { type: Boolean, required: true },
  hasGrabBars: { type: Boolean, required: true },
  isSingleUse: { type: Boolean },
  buildingRampAccess: { type: Boolean },
  changingTable: { type: Boolean },
  accessibleDoor: { type: Boolean },
  hasMenstrualProducts: { type: Boolean },
}, {
  timestamps: true,
  toJSON: {
    transform: (doc, { __v, ...resource }) => resource,
  },
});

const BathroomModel = mongoose.model<IBathroom>('Bathroom', BathroomSchema);

export default BathroomModel;