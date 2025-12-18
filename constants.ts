
import { User } from './types';

export const CATEGORIES = [
  "Home Maintenance",
  "Education",
  "Technology",
  "Culinary",
  "Arts & Crafts",
  "Wellness",
  "Pet Care",
  "Gardening"
];

export const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
export const SLOTS = ["Morning", "Afternoon", "Evening"] as const;

export const MOCK_USERS: User[] = [
  {
    id: "u1",
    name: "Sarah Jenkins",
    avatar: "https://picsum.photos/id/64/200/200",
    bio: "Passionate urban gardener and math tutor. Happy to help with algebra or setting up your raised beds!",
    location: { lat: 40.7128, lng: -74.0060, neighborhood: "Greenwich Village" },
    skillsOffered: [
      { id: "s1", category: "Gardening", name: "Raised Bed Setup", description: "Helping plan and build small vegetable gardens.", level: "Expert" },
      { id: "s2", category: "Education", name: "Algebra Tutoring", description: "High school level math help.", level: "Intermediate" }
    ],
    skillsNeeded: ["Plumbing", "Graphic Design"],
    rating: 4.9,
    swapsCompleted: 12,
    verified: true,
    availability: {
      "Monday": ["Morning"],
      "Wednesday": ["Afternoon"],
      "Saturday": ["Morning", "Afternoon"]
    }
  },
  {
    id: "u2",
    name: "Marcus Chen",
    avatar: "https://picsum.photos/id/91/200/200",
    bio: "Full-stack developer looking to trade tech help for some homemade sourdough or cooking lessons.",
    location: { lat: 40.7135, lng: -74.0050, neighborhood: "SoHo" },
    skillsOffered: [
      { id: "s3", category: "Technology", name: "Web Debugging", description: "Helping fix pesky website bugs.", level: "Expert" }
    ],
    skillsNeeded: ["Culinary", "Furniture Assembly"],
    rating: 4.7,
    swapsCompleted: 8,
    verified: true,
    availability: {
      "Tuesday": ["Evening"],
      "Thursday": ["Evening"],
      "Friday": ["Afternoon", "Evening"]
    }
  },
  {
    id: "u3",
    name: "Elena Rodriguez",
    avatar: "https://picsum.photos/id/102/200/200",
    bio: "Yoga instructor and pet lover. I can watch your furry friends or guide you through a morning flow.",
    location: { lat: 40.7145, lng: -74.0075, neighborhood: "TriBeCa" },
    skillsOffered: [
      { id: "s4", category: "Wellness", name: "Vinyasa Yoga", description: "60-minute private yoga sessions.", level: "Expert" },
      { id: "s5", category: "Pet Care", name: "Dog Walking", description: "Active walks in the park.", level: "Intermediate" }
    ],
    skillsNeeded: ["Math Tutoring", "Baking"],
    rating: 5.0,
    swapsCompleted: 24,
    verified: true,
    availability: {
      "Monday": ["Morning", "Afternoon", "Evening"],
      "Tuesday": ["Morning"],
      "Thursday": ["Morning"],
      "Sunday": ["Afternoon"]
    }
  }
];

export const CURRENT_USER: User = {
  id: "me",
  name: "Alex Rivera",
  avatar: "https://picsum.photos/id/177/200/200",
  bio: "DIY enthusiast and baker. I can build shelves or bake the perfect baguette.",
  location: { lat: 40.7110, lng: -74.0040, neighborhood: "Financial District" },
  skillsOffered: [
    { id: "s6", category: "Culinary", name: "Artisan Baking", description: "Sourdough and pastry baking lessons.", level: "Expert" },
    { id: "s7", category: "Home Maintenance", name: "Shelf Installation", description: "Basic carpentry and drilling.", level: "Intermediate" }
  ],
  skillsNeeded: ["Gardening", "Web Debugging", "Yoga"],
  rating: 4.8,
  swapsCompleted: 5,
  verified: true,
  availability: {
    "Saturday": ["Morning", "Afternoon"],
    "Sunday": ["Morning", "Afternoon"]
  }
};
