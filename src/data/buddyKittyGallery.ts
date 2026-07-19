export interface GalleryItem {
  id: string;
  image: string;
  title: string;
  description: string;
}

import { hospitalImages } from './hospitalImages';

export const buddyKittyGalleryTitle = "Hospital Gallery";

export const buddyKittyGallerySubtitle = "Take a virtual tour of our modern facilities and experience our world-class veterinary care.";

export const buddyKittyGalleryItems: GalleryItem[] = hospitalImages.map((image, index) => ({
  id: `hospital-image-${index + 1}`,
  image: image,
  title: "",
  description: "",
}));
