module.exports = {
  async up(db) {
    // Write your migration here.
    // See https://github.com/seppevs/migrate-mongo/#creating-a-new-migration-script
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: true}});

    /**
       * User Data
       */
    const users = [
      {
        id: 'a05742a3-0b8c-4fc4-98a3-640e55d8f2ab',
        email: 'unverified@gmail.com',
        password: '12345',
        name: 'Unverified',
        role: 'UNVERIFIED',
      },
      {
        id: '68b0d858-9e75-49b0-902e-2b587bd9a996',
        email: 'user@gmail.com',
        password: '12345',
        name: 'User',
        role: 'USER',
      },
      {
        id: '62da2543-bf07-4b1a-9d45-a531493d37d9',
        email: 'admin@gmail.com',
        password: '12345',
        name: 'Admin',
        role: 'ADMIN',
      },
    ];
    await Promise.all(
      users.map(async (user) => {
        try {
          console.log(users);
          await db.collection('users').insert(user);
        } catch (e) {
          console.log(e);
        }
      }));

    /**
      * Resource Data
      */
    const resources = [
      {
        id: '5c0e8d61-9fc0-4803-ab48-cf1b8168b764',
        title: 'The Grapes of Wrath',
        description: 'John Steinbeck',
        value: 1,
      },
      {
        id: '05a5ab10-5ca0-426e-8091-c0800c26215b',
        title: 'The Great Gatsby',
        description: 'F. Scott Fitzgerald',
        value: 5,
      },
      {
        id: '575e8b36-9cb6-4098-9620-cd0ba1c3e585',
        title: 'Macbeth',
        description: 'William Shakespeare',
        value: 10,
      },
      {
        id: '909dee79-ac3f-49ff-9182-441b06de6a86',
        title: 'Heart of Darkness',
        description: 'Joseph Conrad',
        value: 15,
      },
    ];
    await Promise.all(
      resources.map(async (resource) => {
        try {
          console.log(resources);
          await db.collection('resources').insert(resource);
        } catch (e) {
          console.log(e);
        }
      }));

    /**
      * Bathroom Data
      */
    const bathrooms = [
      {
        id: '909dee79-ac3f-49ff-9182-441b06de6a86',
        name: 'Carson Hall',
        location: {
          type: 'Point',
          coordinates: [-72.2889982, 43.7057931],
        },
        description: '',
        unisex: true,
        levels: ['1', '2'],
        hasElevatorAccess: false,
        hasGrabBars: false,
        isSingleUse: true,
        buildingRampAccess: false,
        changingTable: false,
        accessibleDoor: false,
        hasMenstrualProducts: false,
        reviews: [],
      },
      {
        id: '028d46d0-43a8-48b0-ba01-ffcc6452757a',
        name: 'Fairchild Physical Sciences Center',
        location: {
          type: 'Point',
          coordinates: [-72.2863637, 43.7057719],
        },
        description: '',
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
      },
      {
        id: 'ddfc662f-1aaa-4f03-9fc8-38b22d1f38cb',
        name: 'Class of 1953 Commons',
        location: {
          type: 'Point',
          coordinates: [-72.2908152, 43.7030719],
        },
        description: '',
        unisex: true,
        levels: ['2'],
        hasElevatorAccess: true,
        hasGrabBars: false,
        isSingleUse: true,
        buildingRampAccess: true,
        changingTable: false,
        accessibleDoor: true,
        hasMenstrualProducts: false,
        reviews: [],
      },
      {
        id: '5c577c04-0f82-43f8-acca-3111b43d5849',
        name: 'Hood Museum of Art',
        location: {
          type: 'Point',
          coordinates: [-72.2873621, 43.701973],
        },
        description: '',
        unisex: true,
        levels: ['1', '2', '3', '4'],
        hasElevatorAccess: false,
        hasGrabBars: false,
        isSingleUse: false,
        buildingRampAccess: true,
        changingTable: false,
        accessibleDoor: false,
        hasMenstrualProducts: false,
        reviews: [],
      },
      {
        id: '19ad2f5a-39c2-4088-b887-46e94a0e1f6e',
        name: 'Rauner Library',
        location: {
          type: 'Point',
          coordinates: [-72.2881228, 43.704416],
        },
        description: '',
        unisex: true,
        levels: ['1', '4'],
        hasElevatorAccess: false,
        hasGrabBars: false,
        isSingleUse: false,
        buildingRampAccess: false,
        changingTable: true,
        accessibleDoor: false,
        hasMenstrualProducts: true,
        reviews: [],
      },
      {
        id: '3938b364-59be-43fc-b150-96d077d1a422',
        name: 'Collis Center',
        location: {
          type: 'Point',
          coordinates: [-72.2901321, 43.7028599],
        },
        description: '',
        unisex: true,
        levels: ['3'],
        hasElevatorAccess: false,
        hasGrabBars: false,
        isSingleUse: false,
        buildingRampAccess: true,
        changingTable: false,
        accessibleDoor: false,
        hasMenstrualProducts: false,
        reviews: [],
      },
      {
        id: '7c309b1e-24bb-48aa-a3e9-7e8204a90e35',
        name: 'Silsby Hall',
        location: {
          type: 'Point',
          coordinates: [-72.2900834, 43.7053819],
        },
        description: '',
        unisex: true,
        levels: ['4'],
        hasElevatorAccess: true,
        hasGrabBars: true,
        isSingleUse: true,
        buildingRampAccess: true,
        changingTable: true,
        accessibleDoor: true,
        hasMenstrualProducts: true,
        reviews: [],
      },
      {
        id: '0f77a4db-3612-49c3-839e-646f3fc7d229',
        name: 'Haldeman Center',
        location: {
          type: 'Point',
          coordinates: [-72.2893148, 43.7061383],
        },
        description: '',
        unisex: true,
        levels: ['3', '4'],
        hasElevatorAccess: false,
        hasGrabBars: true,
        isSingleUse: true,
        buildingRampAccess: false,
        changingTable: true,
        accessibleDoor: true,
        hasMenstrualProducts: false,
        reviews: [],
      },
      {
        id: '4ebb0a2b-5286-408d-847e-7caf3e9704b9',
        name: 'Buchanan Hall',
        location: {
          type: 'Point',
          coordinates: [-72.2931801, 43.7053779],
        },
        description: '',
        unisex: true,
        levels: ['1'],
        hasElevatorAccess: true,
        hasGrabBars: false,
        isSingleUse: false,
        buildingRampAccess: true,
        changingTable: false,
        accessibleDoor: false,
        hasMenstrualProducts: false,
        reviews: [],
      },
      {
        id: '8f2c08e7-2511-47ec-a038-6b9eadbc8e0c',
        name: 'McNutt Hall',
        location: {
          type: 'Point',
          coordinates: [-72.289905, 43.7035666],
        },
        description: '',
        unisex: false,
        levels: ['3'],
        hasElevatorAccess: false,
        hasGrabBars: false,
        isSingleUse: true,
        buildingRampAccess: false,
        changingTable: false,
        accessibleDoor: true,
        hasMenstrualProducts: false,
        reviews: [],
      },
    ];
    await Promise.all(
      bathrooms.map(async (resource) => {
        try {
          console.log(resources);
          await db.collection('bathrooms').insert(resource);
        } catch (e) {
          console.log(e);
        }
      }));
  },

  async down(db) {
    // Write the statements to rollback your migration (if possible)
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
    await db.collection('users').drop();
    await db.collection('resources').drop();
    await db.collection('bathrooms').drop();
  },
};
