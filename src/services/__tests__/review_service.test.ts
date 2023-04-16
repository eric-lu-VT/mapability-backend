import { reviewService } from 'services';
import { IReview } from '../../db/models/review_model';

import {
  connectDB, dropDB,
} from '../../../__jest__/helpers';

let idReviewA = '';
const invalidId = 'invalidId';

const reviewDataA: Omit<IReview, 'id'> = {
  bathroomId: '262e8092-4431-4c5c-a7bc-c96c9b46330e',
  userId: '632a4e30-fcac-46d8-af23-1016367377d7',
  rating: 1,
  comment: 'Comment A',
};

const reviewDataB: Omit<IReview, 'id'>  = {
  bathroomId: '8b28b1bc-2352-4a5a-8ea8-1a2b6ce5f7da',
  userId: 'a7a01625-5f7b-44ca-9449-b5f1b9aa99b5',
  rating: -1,
  comment: 'Comment B',
};

describe('reviewService', () => {
  beforeAll(async () => {
    connectDB();
  });

  afterAll(async () => {
    dropDB();
  });

  describe('createReview', () => {
    it('Can create review', async () => {
      const review = await reviewService.createReview(reviewDataA);
      
      Object.keys(reviewDataA)
        // .filter((key) => key)
        .map((key) => {
          expect(review[key]).toEqual(reviewDataA[key]);
        });
      expect(review.id).toBeDefined();
      idReviewA = String(review.id);
    });

    it('Can create second review', async () => {
      const review = await reviewService.createReview(reviewDataB);
      
      Object.keys(reviewDataB)
        // .filter((key) => key)
        .map((key) => {
          expect(review[key]).toEqual(reviewDataB[key]);
        });
      expect(review.id).toBeDefined();
    });
  });

  describe('getReviews', () => {
    it('Can get review', async () => {
      const review = await reviewService.getReviews({ id: idReviewA })
        .then((res) => res[0])
        .catch(() => undefined);

      if (review !== undefined) { // For TypeScript purposes, need to check again
        Object.keys(reviewDataA)
        // .filter((key) => key)
          .map((key) => {
            expect(review[key]).toEqual(reviewDataA[key]);
          });
      }
    });

    it('Rejects if review does not exist', async () => {
      const review = await reviewService.getReviews({ id : invalidId })
        .then((res) => res[0])
        .catch(() => undefined);
      expect(review).toBe(undefined);
    });
  });

  describe('updateReview', () => {
    const newComment = 'Test comment';
    
    it('Updates review field, returns updated review', async () => {
      const updatedReview1 = await reviewService.updateReview(idReviewA, { comment: newComment });
      expect(updatedReview1.comment).toBe(newComment);

      const updatedReview2 = await reviewService.getReviews({ id: idReviewA })
        .then((res) => res[0])
        .catch(() => undefined);
      expect(updatedReview2?.comment).toBe(newComment);
    });

    it('Rejects if review does not exist', async () => {
      expect(reviewService.updateReview(invalidId, { comment: '10000' })).rejects.toBeDefined();
    });
  });

  describe('deleteReview', () => {
    it('Deletes existing review', async () => {
      await reviewService.deleteReview(idReviewA);
      const review = await reviewService.getReviews({ id: idReviewA })
        .then((res) => res[0])
        .catch(() => undefined);
      expect(review).toBe(undefined);
    });

    it('Rejects if review does not exist', async () => {
      expect(reviewService.deleteReview(invalidId)).rejects.toBeDefined();
    });
  });
});
