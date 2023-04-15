import { bathroomService } from 'services';
import { IBathroom } from '../../db/models/bathroom_model';

import {
  connectDB, dropDB,
} from '../../../__jest__/helpers';

let idBathroomA = '';
const invalidId = 'invalidId';

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
    coordinates: [-72.2863637, 43.7057719],
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

describe('bathroomService', () => {
  beforeAll(async () => {
    connectDB();
  });

  afterAll(async () => {
    dropDB();
  });

  describe('createBathroom', () => {
    it('Can create bathroom', async () => {
      const bathroom = await bathroomService.createBathroom(bathroomDataA);
      console.log(bathroom);

      Object.keys(bathroomDataA)
        // .filter((key) => key)
        .map((key) => {
          expect(bathroom[key]).toEqual(bathroomDataA[key]);
        });
      expect(bathroom.id).toBeDefined();
      idBathroomA = String(bathroom.id);
    });

    it('Can create second bathroom', async () => {
      const bathroom = await bathroomService.createBathroom(bathroomDataB);
      
      Object.keys(bathroomDataB)
        // .filter((key) => key)
        .map((key) => {
          expect(bathroom[key]).toEqual(bathroomDataB[key]);
        });
      expect(bathroom.id).toBeDefined();
    });
  });

  describe('getBathrooms', () => {
    it('Can get bathroom', async () => {
      const bathroom = await bathroomService.getBathrooms({ id: idBathroomA })
        .then((res) => res[0])
        .catch(() => undefined);

      if (bathroom !== undefined) { // For TypeScript purposes, need to check again
        Object.keys(bathroomDataA)
        // .filter((key) => key)
          .map((key) => {
            expect(bathroom[key]).toEqual(bathroomDataA[key]);
          });
      }
    });

    it('Filters out bathrooms by location', async () => {
      const bathroom = await bathroomService.getBathrooms({ searchLng: -122, searchLat: 37, searchRadius: 10 });
      expect(bathroom.length).toBe(1);
    });

    it('Rejects if bathroom does not exist', async () => {
      const bathroom = await bathroomService.getBathrooms({ id : invalidId })
        .then((res) => res[0])
        .catch(() => undefined);
      expect(bathroom).toBe(undefined);
    });
  });

  describe('updateBathroom', () => {
    const newDescription = '12345';
    
    it('Updates bathroom field, returns updated bathroom', async () => {
      const updatedBathroom1 = await bathroomService.updateBathroom(idBathroomA, { description: '12345' });
      expect(updatedBathroom1.description).toBe(newDescription);

      const updatedBathroom2 = await bathroomService.getBathrooms({ id: idBathroomA })
        .then((res) => res[0])
        .catch(() => undefined);
      expect(updatedBathroom2?.description).toBe(newDescription);
    });

    it('Rejects if bathroom does not exist', async () => {
      expect(bathroomService.updateBathroom(invalidId, { description: '10000' })).rejects.toBeDefined();
    });
  });

  describe('deleteBathroom', () => {
    it('Deletes existing bathroom', async () => {
      await bathroomService.deleteBathroom(idBathroomA);
      const bathroom = await bathroomService.getBathrooms({ id: idBathroomA })
        .then((res) => res[0])
        .catch(() => undefined);
      expect(bathroom).toBe(undefined);
    });

    it('Rejects if bathroom does not exist', async () => {
      expect(bathroomService.deleteBathroom(invalidId)).rejects.toBeDefined();
    });
  });
});