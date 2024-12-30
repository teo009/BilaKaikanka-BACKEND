interface trackingStatusInterface {
  name: string;
}

interface trackingStatusData {
  trackingStatus: trackingStatusInterface[];
}

export const trackingStatusSeed: trackingStatusData = {
  trackingStatus: [
    { name: 'pending' },
    { name: 'in' },
    { name: 'remited' },
    { name: 'done' },
    { name: 'unsolved' },
  ],
};
