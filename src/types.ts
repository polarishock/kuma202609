export interface Member {
  id: string;
  name: string;
  avatar: string;
}

export interface ItineraryItem {
  id: string;
  time: string;
  location: string;
  description: string;
  mapUrl: string;
}

export interface DayPlan {
  day: number;
  date: string;
  image: string;
  items: ItineraryItem[];
}

export interface Phrase {
  id: string;
  zh: string;
  jp: string;
  romaji: string;
  category: 'basic' | 'dining' | 'shopping' | 'transport' | 'emergency';
}

export interface PrepItem {
  id: string;
  text: string;
  completed: boolean;
  category: 'hand' | 'checked' | 'essential' | 'shopping' | 'notes' | 'apps';
  isHeader?: boolean;
}

export interface Expense {
  id: string;
  amount: number;
  item: string;
  category: 'transport' | 'food' | 'shopping' | 'other';
  payerId: string;
  date: string;
}

export interface LocationDetail {
  id: string;
  location: string;
  history: string;
  mustDo: string[];
  food: string[];
  image: string;
}
