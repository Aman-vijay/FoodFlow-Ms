export interface Restaurant {
    info: {
      id: string;
      name: string;
      cloudinaryImageId?: string;
      locality?: string;
      areaName?: string;
      costForTwo?: string;
      cuisines?: string[];
      avgRating?: string;
      deliveryTime?: number;
    };
    analytics?: any;
    cta?: any;
  }
  