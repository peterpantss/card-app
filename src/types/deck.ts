export type Deck = {
  date_creation: string;
  date_update: string;
  description_md: string;
  heroes: NumberValuePair;
  id: string;
  is_published: boolean;
  name: string;
  sideslots: any[];
  slots: NumberValuePair;
  tags: string;
  user_id: number;
};

type NumberValuePair = {
  [key: number]: number;
};
