export interface LogState {
  id: string;
  title: string;
  action: string;
  date: Date | string;
  tagId: string;
  setId: (id: string) => void;
  setTitle: (title: string) => void;
  setAction: (action: string) => void;
  setDate: (date: Date | string) => void;
  setTagId: (tagId: string) => void;
}
