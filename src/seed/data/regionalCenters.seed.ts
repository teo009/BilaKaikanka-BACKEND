//This doesnt have to be any in type, check it later
interface regionalCenterInterface {
  name: string;
}

interface SeedRegionalCenterData {
  regionalCenters: regionalCenterInterface[];
}

export const regionalCentersSeed: SeedRegionalCenterData = {
  regionalCenters: [
    { name: 'Nueva Guinea' },
    { name: 'Bluefields' },
    { name: 'Bilwi' },
    { name: 'Las Minas' },
  ],
};
