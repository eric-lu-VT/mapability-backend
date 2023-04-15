import supertest from 'supertest';
import { connectDB, dropDB } from '../../../__jest__/helpers';
import bathroomRouter from 'routers/bathroom_router';
import { bathroomService } from 'services';
import { IBathroom } from 'db/models/bathroom_model';

const request = supertest(bathroomRouter);

const bathroomDataA: Omit<IBathroom, 'id'> = {
  name: 'Carson Hall',
  location: {
    type: 'Point',
    coordinates: [-72.2887446, 43.7053972],
  },
  description: 'na',
  unisex: true,
  levels: ['2', '3'],
  hasElevatorAccess: false,
  hasGrabBars: false,
  isSingleUse: true,
  buildingRampAccess: false,
  changingTable: false,
  accessibleDoor: false,
  hasMenstrualProducts: false,
  reviews: [],
};

const bathroomDataB: Omit<IBathroom, 'id'>  = {
  name: 'Fairchild Physical Sciences Center',
  location: {
    type: 'Point',
    coordinates: [-100, 100],
  },
  description: 'Only open to EARS after 5pm. Entire room locks',
  unisex: true,
  levels: ['4'],
  hasElevatorAccess: false,
  hasGrabBars: false,
  isSingleUse: false,
  buildingRampAccess: false,
  changingTable: false,
  accessibleDoor: false,
  hasMenstrualProducts: false,
  reviews: [],
};

let idBathroomA = '';
const invalidId = 'invalidId';

// Mocks requireAuth server middleware
jest.mock('../../auth/requireAuth');
jest.mock('../../auth/requireScope');
jest.mock('../../auth/requireSelf');

describe('Working bathroom router', () => {
  beforeAll(async () => {
    connectDB();
  });

  afterAll(async () => {
    dropDB();
  });

  describe('POST /', () => {
    it('requires valid permissions', async () => {
      const createSpy = jest.spyOn(bathroomService, 'createBathroom');

      const res = await request
        .post('/')
        .send(bathroomDataA);

      expect(res.status).toBe(403);
      expect(createSpy).not.toHaveBeenCalled();
    });

    it('blocks creation when missing field', async () => {
      const createSpy = jest.spyOn(bathroomService, 'createBathroom');

      const attempts = Object.keys(bathroomDataA).map(async (key) => {
        const bathroom = { ...bathroomDataA };
        delete bathroom[key];

        const res = await request
          .post('/')
          .set('Authorization', 'Bearer dummy_token')
          .send(bathroom);

        expect(res.status).toBe(400);
        expect(res.body.errors.length).toBe(1);
        expect(createSpy).not.toHaveBeenCalled();
      });
      await Promise.all(attempts);
    });

    it('creates bathroom when body is valid', async () => {
      const createSpy = jest.spyOn(bathroomService, 'createBathroom');

      const res = await request
        .post('/')
        .set('Authorization', 'Bearer dummy_token')
        .send(bathroomDataA);

      expect(res.status).toBe(201);
      Object.keys(bathroomDataA).forEach((key) => {
        expect(res.body[key]).toStrictEqual(bathroomDataA[key]);
      });
      expect(createSpy).toHaveBeenCalled();
      createSpy.mockClear();

      idBathroomA = String(res.body.id);
    });
  });

  describe('GET /?...=...', () => {
    it('requires valid permissions', async () => {
      const getManySpy = jest.spyOn(bathroomService, 'getBathrooms');

      const res = await request
        .get('/')
        .send(bathroomDataA);

      expect(res.status).toBe(403);
      expect(getManySpy).not.toHaveBeenCalled();
    });

    it('returns empty array if no bathrooms found', async () => {
      const getSpy = jest.spyOn(bathroomService, 'getBathrooms');

      const res = await request
        .get(`/?id=${invalidId}`)
        .set('Authorization', 'Bearer dummy_token');

      expect(res.status).toBe(200);
      expect(res.body).toEqual([]);
      getSpy.mockClear();
    });

    it('returns bathrooms by query', async () => {
      const getSpy = jest.spyOn(bathroomService, 'getBathrooms');

      const res = await request
        .get(`/?description=${bathroomDataA.description}`)
        .set('Authorization', 'Bearer dummy_token');

      expect(res.status).toBe(200);

      Object.keys(bathroomDataA)
        // .filter((key) => key)
        .map((key) => {
          expect(res.body[0][key]).toEqual(bathroomDataA[key]);
        });
      expect(res.body[0].id).toBeDefined();
      expect(getSpy).toHaveBeenCalled();
      getSpy.mockClear();
    });

    it('returns location query', async () => {
      const getSpy = jest.spyOn(bathroomService, 'getBathrooms');

      const res = await request
        .get(`/?searchLng=${-72.28}&searchLat=${43.705}&searchRadius=${10}`)
        .set('Authorization', 'Bearer dummy_token');

      expect(res.status).toBe(200);

      Object.keys(bathroomDataA)
        // .filter((key) => key)
        .map((key) => {
          expect(res.body[0][key]).toEqual(bathroomDataA[key]);
        });
      expect(res.body[0].id).toBeDefined();
      expect(getSpy).toHaveBeenCalled();
      getSpy.mockClear();
    });
  });

  describe('GET /:id?...=...', () => {
    it('requires valid permissions', async () => {
      const getSpy = jest.spyOn(bathroomService, 'getBathrooms');

      const res = await request
        .get(`/${idBathroomA}`)
        .send(bathroomDataA);

      expect(res.status).toBe(403);
      expect(getSpy).not.toHaveBeenCalled();
    });

    it('returns 404 when bathroom not found', async () => {
      const getSpy = jest.spyOn(bathroomService, 'getBathrooms');

      const res = await request
        .get(`/${invalidId}`)
        .set('Authorization', 'Bearer dummy_token');

      expect(res.status).toBe(404);
      getSpy.mockClear();
    });

    it('returns single bathroom if found - generic', async () => {
      const getSpy = jest.spyOn(bathroomService, 'getBathrooms');

      const res = await request
        .get(`/${idBathroomA}`)
        .set('Authorization', 'Bearer dummy_token');

      expect(res.status).toBe(200);

      Object.keys(bathroomDataA)
        // .filter((key) => key)
        .map((key) => {
          expect(res.body[key]).toEqual(bathroomDataA[key]);
        });
      expect(res.body.id).toBeDefined();
      expect(getSpy).toHaveBeenCalled();
      getSpy.mockClear();
    });

    it('returns single bathroom if found - specific query', async () => {
      const getSpy = jest.spyOn(bathroomService, 'getBathrooms');

      const res = await request
        .get(`/${idBathroomA}?description=${bathroomDataA.description}`)
        .set('Authorization', 'Bearer dummy_token');

      expect(res.status).toBe(200);
      Object.keys(bathroomDataA)
        // .filter((key) => key)
        .map((key) => {
          expect(res.body[key]).toEqual(bathroomDataA[key]);
        });
      expect(res.body.id).toBeDefined();
      expect(getSpy).toHaveBeenCalled();
      getSpy.mockClear();
    });
  });

  describe('PATCH /:id', () => {
    it('requires valid permissions', async () => {
      const updateSpy = jest.spyOn(bathroomService, 'updateBathroom');

      const res = await request
        .patch(`/${idBathroomA}`)
        .send({ description: '12345' });

      expect(res.status).toBe(403);
      expect(updateSpy).not.toHaveBeenCalled();
    });

    it('returns 404 if bathroom not found', async () => {
      const updateSpy = jest.spyOn(bathroomService, 'updateBathroom');

      const res = await request
        .patch(`/${invalidId}`)
        .set('Authorization', 'Bearer dummy_token')
        .send({ description: '12345' });

      expect(res.status).toBe(404);
      expect(updateSpy).rejects.toThrowError();
      updateSpy.mockClear();
    });

    it('updates bathroom when body is valid', async () => {
      const updateSpy = jest.spyOn(bathroomService, 'updateBathroom');

      const attempts = Object.keys(bathroomDataB).map(async (key) => {
        const bathroomUpdate = { [key]: bathroomDataB[key] };

        const res = await request
          .patch(`/${idBathroomA}`)
          .set('Authorization', 'Bearer dummy_token')
          .send(bathroomUpdate);
  
        if (res.status !== 200) {
          console.log(res.error);
        }
        expect(res.status).toBe(200);
        expect(res.body[key]).toStrictEqual(bathroomDataB[key]);
      });
      await Promise.all(attempts);

      expect(updateSpy).toHaveBeenCalledTimes(Object.keys(bathroomDataB).length);
      updateSpy.mockClear();

      const res = await request
        .get(`/${idBathroomA}`)
        .set('Authorization', 'Bearer dummy_token');

      Object.keys(bathroomDataB)
        // .filter((key) => key)
        .map((key) => {
          expect(res.body[key]).toEqual(bathroomDataB[key]);
        });
    });
  });

  describe('DELETE /:id', () => {
    it('requires valid permissions', async () => {
      const deleteSpy = jest.spyOn(bathroomService, 'deleteBathroom');

      const res = await request.delete(`/${idBathroomA}`);

      expect(res.status).toBe(403);
      expect(deleteSpy).not.toHaveBeenCalled();
    });

    it('returns 404 if bathroom not found', async () => {
      const deleteSpy = jest.spyOn(bathroomService, 'deleteBathroom');

      const res = await request
        .delete(`/${invalidId}`)
        .set('Authorization', 'Bearer dummy_token');

      expect(res.status).toBe(404);
      expect(deleteSpy).rejects.toThrowError();
      deleteSpy.mockClear();
    });

    it('deletes bathroom', async () => {
      const deleteSpy = jest.spyOn(bathroomService, 'deleteBathroom');

      const res = await request
        .delete(`/${idBathroomA}`)
        .set('Authorization', 'Bearer dummy_token');

      expect(res.status).toBe(200);
      expect(deleteSpy).toHaveBeenCalled();
      deleteSpy.mockClear();

      const getRes = await request
        .get(`/${idBathroomA}`)
        .set('Authorization', 'Bearer dummy_token');

      expect(getRes.status).toBe(404);
    });
  });
});