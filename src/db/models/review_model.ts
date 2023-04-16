import mongoose, { Schema } from 'mongoose';

export interface IReview {
  id: string;
  bathroomId: string;
  rating: number;
  comment: string;
}

export const ReviewSchema = new Schema<IReview>({
  id: { type: String, required: true, unique: true },
  bathroomId: {  type: String, required: true },
  rating: { type: Number, required: true },
  comment: { type: String },
}, {
  timestamps: true,
  toJSON: {
    transform: (doc, { __v, ...resource }) => resource,
  },
});

const ReviewModel = mongoose.model<IReview>('Review', ReviewSchema);

export default ReviewModel;