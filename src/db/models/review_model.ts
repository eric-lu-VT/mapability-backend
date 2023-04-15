import mongoose, { Schema } from 'mongoose';

export interface IReview {
  bathroomId: string;
  userId: string;
  rating: number;
  comment?: string;
}

export const ReviewSchema = new Schema<IReview>({
  bathroomId: {  type: Schema.Types.ObjectId, ref: 'Bathroom', required: true },
  userId: {  type: Schema.Types.ObjectId, ref: 'User', required: true },
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