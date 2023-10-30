export interface LogState {
  id: string;
  title: string;
  action: string;
  date: Date;
  tagId: string;
  setId: (id: string) => void;
  setTitle: (title: string) => void;
  setAction: (action: string) => void;
  setDate: (date: Date) => void;
  setTagId: (tagId: string) => void;
}
