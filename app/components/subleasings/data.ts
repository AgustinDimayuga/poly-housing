export type Sublease = {
  id: number;
  title: string;
  rent: number;
  address: string;
  duration: string;
  dates: string;
  room: string;
  utilities: string;
  student: string;
  image: string;
  imageAlt: string;
};

const bedroom =
  "https://images.unsplash.com/photo-1615874959474-d609969a20ed?auto=format&fit=crop&w=1000&q=85";
const livingRoom =
  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=85";
const kitchen =
  "https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?auto=format&fit=crop&w=1000&q=85";

// Static sample content; no backend requests are made.
export const subleases: Sublease[] = [
  {
    id: 1,
    title: "Sunny room at Cedar House",
    rent: 1200,
    address: "1248 Cedar St · Anholm",
    duration: "11 weeks",
    dates: "Jun 15 – Aug 31, 2027",
    room: "Private room · 2 student roommates",
    utilities: "Water & trash included · other utilities extra",
    student: "Maya R. · Environmental Engineering",
    image: bedroom,
    imageAlt:
      "Bright bedroom with neutral bedding and natural light"
  },
  {
    id: 2,
    title: "Foothill apartment room",
    rent: 1225,
    address: "680 Foothill Blvd · Foothill",
    duration: "10 weeks",
    dates: "Jun 20 – Sep 1, 2027",
    room: "Private room · 1 student roommate",
    utilities: "Water & trash included · other utilities extra",
    student: "Leo M. · Computer Science",
    image: livingRoom,
    imageAlt:
      "Comfortable living room with a sofa and warm natural finishes"
  },
  {
    id: 3,
    title: "Room near lower campus",
    rent: 1050,
    address: "312 Hathway Ave · Lower campus",
    duration: "12 weeks",
    dates: "Jun 15 – Sep 5, 2027",
    room: "Private room · 2 student roommates",
    utilities: "Utilities extra · est. $60–$90 / month",
    student: "Nina S. · Architecture",
    image: bedroom,
    imageAlt:
      "Airy bedroom with a large bed and soft neutral colors"
  },
  {
    id: 4,
    title: "Downtown studio for summer",
    rent: 1650,
    address: "845 Olive St · Downtown",
    duration: "2 months",
    dates: "Jul 1 – Aug 31, 2027",
    room: "Entire studio · furnished",
    utilities: "Water & internet included · electricity extra",
    student: "Owen L. · Business Administration",
    image: livingRoom,
    imageAlt:
      "Furnished studio living area with a sofa and coffee table"
  },
  {
    id: 5,
    title: "Bright room on Highland",
    rent: 1400,
    address: "1020 Highland Dr · Foothill",
    duration: "3 months",
    dates: "Jun 15 – Sep 15, 2027",
    room: "Private room & bath · 1 roommate",
    utilities: "Water, trash & parking included",
    student: "Sofia A. · Biology",
    image: bedroom,
    imageAlt: "Sunlit furnished bedroom with a comfortable bed"
  },
  {
    id: 6,
    title: "Palm Street summer room",
    rent: 1050,
    address: "560 Palm St · Downtown",
    duration: "2 months",
    dates: "Jun 25 – Aug 25, 2027",
    room: "Private room · 3 student roommates",
    utilities: "Utilities extra · est. $70–$100 / month",
    student: "Eli P. · Mechanical Engineering",
    image: kitchen,
    imageAlt:
      "Shared kitchen with white cabinets and wooden counters"
  }
];
