interface identityTypeInterface {
  name: string;
}

interface identityTypeData {
  identityType: identityTypeInterface[];
}

export const identityTypeSeed: identityTypeData = {
  identityType: [
    { name: 'Cédula de identidad nicaragüense' },
    { name: 'Pasaporte' },
  ],
};
