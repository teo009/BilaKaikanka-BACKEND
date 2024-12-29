//This doesnt have to be any in type, check it later
interface regionalCenterSeed {
  name: string;
}

interface SeedRegionalCenterData {
  regionalCenters: regionalCenterSeed[];
}

export const regionalCentersSeed: SeedRegionalCenterData = {
  regionalCenters: [
    { name: 'Nueva Guinea' },
    { name: 'Bluefields' },
    { name: 'Bilwi' },
    { name: 'Las Minas' },
  ],
};
