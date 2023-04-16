import supertest from 'supertest';
import { connectDB, dropDB } from '../../../__jest__/helpers';
import reviewRouter from 'routers/review_router';
import { reviewService } from 'services';
import { IReview } from 'db/models/review_model';

const request = supertest(reviewRouter);

const reviewDataA: Omit<IReview, 'id'> = {
  bathroomId: '262e8092-4431-4c5c-a7bc-c96c9b46330e',
  userId: '632a4e30-fcac-46d8-af23-1016367377d7',
  rating: 1,
  comment: 'Comment A',
};

// const reviewDataB: Omit<IReview, 'id'> = {
//   bathroomId: '8b28b1bc-2352-4a5a-8ea8-1a2b6ce5f7da',
//   userId: 'a7a01625-5f7b-44ca-9449-b5f1b9aa99b5',
//   rating: -1,
//   comment: 'Comment B',
// };

let idReviewA = '';
const invalidId = 'invalidId';

// Mocks requireAuth server middleware
jest.mock('../../auth/requireAuth');
jest.mock('../../auth/requireScope');
jest.mock('../../auth/requireSelf');

describe('Working review router', () => {
  beforeAll(async () => {
    connectDB();
  });

  afterAll(async () => {
    dropDB();
  });

  describe('POST /', () => {
    it('requires valid permissions', async () => {
      const createSpy = jest.spyOn(reviewService, 'createReview');

      const res = await request
        .post('/')
        .send(reviewDataA);

      expect(res.status).toBe(403);
      expect(createSpy).not.toHaveBeenCalled();
    });

    it('blocks creation when missing field', async () => {
      const createSpy = jest.spyOn(reviewService, 'createReview');

      const attempts = Object.keys(reviewDataA).map(async (key) => {
        const review = { ...reviewDataA };
        delete review[key];

        const res = await request
          .post('/')
          .set('Authorization', 'Bearer dummy_token')
          .send(review);

        expect(res.status).toBe(400);
        expect(res.body.errors.length).toBe(1);
        expect(createSpy).not.toHaveBeenCalled();
      });
      await Promise.all(attempts);
    });

    it('blocks creation when field invalid', async () => {
      const createSpy = jest.spyOn(reviewService, 'createReview');

      const attempts = Object.keys(reviewDataA).map(async (key) => {
        const review = { ...reviewDataA };
        review[key] = typeof review[key] === 'number'
          ? 'some string'
          : 0;

        const res = await request
          .post('/')
          .set('Authorization', 'Bearer dummy_token')
          .send(review);

        expect(res.status).toBe(400);
        expect(res.body.errors.length).toBe(1);
        expect(createSpy).not.toHaveBeenCalled();
      });
      await Promise.all(attempts);
    });

    it('creates review when body is valid', async () => {
      const createSpy = jest.spyOn(reviewService, 'createReview');

      const res = await request
        .post('/')
        .set('Authorization', 'Bearer dummy_token')
        .send(reviewDataA);

      expect(res.status).toBe(201);
      Object.keys(reviewDataA).forEach((key) => {
        expect(res.body[key]).toBe(reviewDataA[key]);
      });
      expect(createSpy).toHaveBeenCalled();
      createSpy.mockClear();

      idReviewA = String(res.body.id);
    });
  });

  describe('GET /?...=...', () => {
    it('requires valid permissions', async () => {
      const getManySpy = jest.spyOn(reviewService, 'getReviews');

      const res = await request
        .get('/')
        .send(reviewDataA);

      expect(res.status).toBe(403);
      expect(getManySpy).not.toHaveBeenCalled();
    });

    it('returns empty array if no reviews found', async () => {
      const getSpy = jest.spyOn(reviewService, 'getReviews');

      const res = await request
        .get(`/?comment=${invalidId}`)
        .set('Authorization', 'Bearer dummy_token');

      expect(res.status).toBe(200);
      expect(res.body).toEqual([]);
      getSpy.mockClear();
    });

    it('returns reviews by query', async () => {
      const getSpy = jest.spyOn(reviewService, 'getReviews');

      const res = await request
        .get(`/?comment=${reviewDataA.comment}`)
        .set('Authorization', 'Bearer dummy_token');

      expect(res.status).toBe(200);

      Object.keys(reviewDataA)
        // .filter((key) => key)
        .map((key) => {
          expect(res.body[0][key]).toEqual(reviewDataA[key]);
        });
      expect(res.body[0].id).toBeDefined();
      expect(getSpy).toHaveBeenCalled();
      getSpy.mockClear();
    });
  });

  describe('GET /:id?...=...', () => {
    it('requires valid permissions', async () => {
      const getSpy = jest.spyOn(reviewService, 'getReviews');

      const res = await request
        .get(`/${idReviewA}`)
        .send(reviewDataA);

      expect(res.status).toBe(403);
      expect(getSpy).not.toHaveBeenCalled();
    });

    it('returns 404 when review not found', async () => {
      const getSpy = jest.spyOn(reviewService, 'getReviews');

      const res = await request
        .get(`/${invalidId}`)
        .set('Authorization', 'Bearer dummy_token');

      expect(res.status).toBe(404);
      getSpy.mockClear();
    });

    it('returns single review if found - generic', async () => {
      const getSpy = jest.spyOn(reviewService, 'getReviews');

      const res = await request
        .get(`/${idReviewA}`)
        .set('Authorization', 'Bearer dummy_token');

      expect(res.status).toBe(200);

      Object.keys(reviewDataA)
        // .filter((key) => key)
        .map((key) => {
          expect(res.body[key]).toEqual(reviewDataA[key]);
        });
      expect(res.body.id).toBeDefined();
      expect(getSpy).toHaveBeenCalled();
      getSpy.mockClear();
    });

    it('returns single review if found - specific query', async () => {
      const getSpy = jest.spyOn(reviewService, 'getReviews');

      const res = await request
        .get(`/${idReviewA}?comment=${reviewDataA.comment}`)
        .set('Authorization', 'Bearer dummy_token');

      expect(res.status).toBe(200);
      Object.keys(reviewDataA)
        // .filter((key) => key)
        .map((key) => {
          expect(res.body[key]).toEqual(reviewDataA[key]);
        });
      expect(res.body.id).toBeDefined();
      expect(getSpy).toHaveBeenCalled();
      getSpy.mockClear();
    });
  });

  describe('PATCH /:id', () => {
    it('requires valid permissions', async () => {
      const updateSpy = jest.spyOn(reviewService, 'updateReview');

      const res = await request
        .patch(`/${idReviewA}`)
        .send({ comment: '#ffffff' });

      expect(res.status).toBe(403);
      expect(updateSpy).not.toHaveBeenCalled();
    });

    it('returns 404 if review not found', async () => {
      const updateSpy = jest.spyOn(reviewService, 'updateReview');

      const res = await request
        .patch(`/${invalidId}`)
        .set('Authorization', 'Bearer dummy_token')
        .send({ comment: '#ffffff' });

      expect(res.status).toBe(404);
      expect(updateSpy).rejects.toThrowError();
      updateSpy.mockClear();
    });

    it('blocks creation when field invalid', async () => {
      const updateSpy = jest.spyOn(reviewService, 'updateReview');

      const attempts = Object.keys(reviewDataA).concat('otherkey').map(async (key) => {
        const ReviewUpdate = {
          [key]: typeof reviewDataA[key] === 'number'
            ? 'some string'
            : 0,
        };
  
        const res = await request
          .patch(`/${idReviewA}`)
          .set('Authorization', 'Bearer dummy_token')
          .send(ReviewUpdate);
  
        expect(res.status).toBe(400);
        expect(res.body.errors.length).toBe(1);
        expect(updateSpy).not.toHaveBeenCalled();
      });
      await Promise.all(attempts);
    });

    // it('updates review when body is valid', async () => {
    //   const updateSpy = jest.spyOn(reviewService, 'updateReview');

    //   const attempts = Object.keys(reviewDataB).map(async (key) => {
    //     const reviewUpdate = { [key]: reviewDataB[key] };

    //     const res = await request
    //       .patch(`/${idReviewA}`)
    //       .set('Authorization', 'Bearer dummy_token')
    //       .send(reviewUpdate);
  
    //     expect(res.status).toBe(200);
    //     expect(res.body[key]).toStrictEqual(reviewDataB[key]);
    //   });
    //   await Promise.all(attempts);

    //   expect(updateSpy).toHaveBeenCalledTimes(Object.keys(reviewDataB).length);
    //   updateSpy.mockClear();

    //   const res = await request
    //     .get(`/${idReviewA}`)
    //     .set('Authorization', 'Bearer dummy_token');

    //   Object.keys(reviewDataB)
    //     // .filter((key) => key)
    //     .map((key) => {
    //       expect(res.body[key]).toEqual(reviewDataB[key]);
    //     });
    // });
  });

  describe('DELETE /:id', () => {
    it('requires valid permissions', async () => {
      const deleteSpy = jest.spyOn(reviewService, 'deleteReview');

      const res = await request.delete(`/${idReviewA}`);

      expect(res.status).toBe(403);
      expect(deleteSpy).not.toHaveBeenCalled();
    });

    it('returns 404 if review not found', async () => {
      const deleteSpy = jest.spyOn(reviewService, 'deleteReview');

      const res = await request
        .delete(`/${invalidId}`)
        .set('Authorization', 'Bearer dummy_token');

      expect(res.status).toBe(404);
      expect(deleteSpy).rejects.toThrowError();
      deleteSpy.mockClear();
    });

    it('deletes review', async () => {
      const deleteSpy = jest.spyOn(reviewService, 'deleteReview');

      const res = await request
        .delete(`/${idReviewA}`)
        .set('Authorization', 'Bearer dummy_token');

      expect(res.status).toBe(200);
      expect(deleteSpy).toHaveBeenCalled();
      deleteSpy.mockClear();

      const getRes = await request
        .get(`/${idReviewA}`)
        .set('Authorization', 'Bearer dummy_token');

      expect(getRes.status).toBe(404);
    });
  });
});
