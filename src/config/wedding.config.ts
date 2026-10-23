export type WeddingEvent = {
  id: string;
  category: "Indian Wedding" | "Nikah & Islamic" | "Celebration";
  title: string;
  date: string;
  time: string;
  venue: string;
  address: string;
  description: string;
  image: string;
  dressCode?: string;
  mapsUrl?: string;
};

export const weddingConfig = {
  bride: "Ayesha",
  groom: "Rayyan",
  monogram: "A · R",
  dateLabel: "Saturday, 14 February 2027",
  weddingDate: "2027-02-14T18:00:00+05:30",
  location: "Jaipur, Rajasthan",
  invitation:
    "With the blessings of our families, we joyfully invite you to celebrate the beginning of our forever.",
  story:
    "Two hearts, two families, and one beautiful promise. We would be honoured to have you with us as we begin our next chapter.",
  venue: "The Garden Palace",
  address: "Jaipur, Rajasthan, India",
  mapUrl: "https://www.google.com/maps/search/?api=1&query=Jaipur%2C+Rajasthan",
  musicUrl: "",
  events: [
    {
      id: "roka",
      category: "Indian Wedding",
      title: "Roka Ceremony",
      date: "12 February 2027",
      time: "5:00 PM onwards",
      venue: "The Garden Palace",
      address: "Jaipur, Rajasthan",
      description: "An intimate evening celebrating the joining of two families.",
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=85",
      dressCode: "Pastel festive",
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=Jaipur%2C+Rajasthan"
    },
    {
      id: "haldi",
      category: "Indian Wedding",
      title: "Haldi & Mehendi",
      date: "13 February 2027",
      time: "11:00 AM onwards",
      venue: "The Garden Palace Courtyard",
      address: "Jaipur, Rajasthan",
      description: "Sunshine, marigolds, music and the sweetest pre-wedding traditions.",
      image: "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1000&q=85",
      dressCode: "Yellow, green & floral",
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=Jaipur%2C+Rajasthan"
    },
    {
      id: "nikah",
      category: "Nikah & Islamic",
      title: "Nikah Ceremony",
      date: "14 February 2027",
      time: "4:00 PM",
      venue: "The Garden Palace",
      address: "Jaipur, Rajasthan",
      description: "A sacred promise, heartfelt duas, and the blessings of our loved ones.",
      image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1000&q=85",
      dressCode: "Formal traditional",
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=Jaipur%2C+Rajasthan"
    },
    {
      id: "walima",
      category: "Nikah & Islamic",
      title: "Walima & Reception",
      date: "14 February 2027",
      time: "7:00 PM onwards",
      venue: "The Garden Palace Ballroom",
      address: "Jaipur, Rajasthan",
      description: "An evening of good company, warm wishes, and a celebration of our forever.",
      image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1000&q=85",
      dressCode: "Black tie or festive formal",
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=Jaipur%2C+Rajasthan"
    }
  ] satisfies WeddingEvent[],
  gallery: [
    { src: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=85", alt: "Elegant wedding table setting" },
    { src: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=1000&q=85", alt: "Romantic wedding floral details" },
    { src: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1000&q=85", alt: "Wedding ceremony arrangement" },
    { src: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1000&q=85", alt: "Warm reception lights and flowers" },
    { src: "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1000&q=85", alt: "Wedding celebration details" }
  ]
};