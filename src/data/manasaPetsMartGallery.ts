import { GalleryItem } from './buddyKittyGallery';
import { martImages } from './martImages';

export const manasaPetsMartGalleryTitle = "Store Gallery";

export const manasaPetsMartGallerySubtitle = "Explore our premium retail boutique, housing high-quality companion diets, organic pet treats, toys, supplements, and grooming essentials.";

export const manasaPetsMartGalleryItems: GalleryItem[] = martImages.map((image, index) => ({
  id: `mart-image-${index + 1}`,
  image: image,
  title: "",
  description: "",
}));
