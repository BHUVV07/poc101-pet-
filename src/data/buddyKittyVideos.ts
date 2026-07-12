export interface VideoItem {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  video: string;
  duration?: string;
}

export const buddyKittyVideoTitle = "Hospital Video Tour";

export const buddyKittyVideoSubtitle = "Explore our facilities through guided walkthrough videos of our treatment areas, consultation rooms, operation theatre, grooming studio, and more.";

export const buddyKittyVideoItems: VideoItem[] = [
  {
    id: "treatment-area-walkthrough",
    title: "Treatment Area Walkthrough",
    description: "Go behind the scenes of our busy triage desk and primary treatment station.",
    thumbnail: "https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=crop&q=80&w=1200",
    video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    duration: "2:15"
  },
  {
    id: "consultation-room-guided-tour",
    title: "Consultation Room Guided Tour",
    description: "A virtual walkthrough of our state-of-the-art diagnostic and exam rooms.",
    thumbnail: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&q=80&w=1200",
    video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    duration: "1:45"
  },
  {
    id: "operation-theatre-sterile-preview",
    title: "Operation Theatre Sterile Preview",
    description: "Explore our Class-100 clean surgical room prepared for operations.",
    thumbnail: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&q=80&w=1200",
    video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    duration: "3:10"
  },
  {
    id: "grooming-studio-spa-walkthrough",
    title: "Grooming Studio & Spa Walkthrough",
    description: "See where our medical grooming baths and pet pampering sessions happen.",
    thumbnail: "https://images.unsplash.com/photo-1516733725897-1aa73b87c8e8?auto=format&fit=crop&q=80&w=1200",
    video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    duration: "1:30"
  },
  {
    id: "reception-and-lobby-virtual-tour",
    title: "Reception & Lobby Virtual Tour",
    description: "A quick walkthrough of our check-in lobby and retail pharmaceutical section.",
    thumbnail: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1200",
    video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
    duration: "2:05"
  }
];
