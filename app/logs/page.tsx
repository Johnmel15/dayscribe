import { LogState } from "../types/state";
import Form from "./Form/MainForm";
import List from "./List";
import { create } from "zustand";

export const useLogs = create<LogState>((set) => ({
  id: "",
  title: "",
  action: "",
  date: new Date(),
  tagId: "0",
  setId: (value: string) => {
    set(() => ({ id: value }));
  },
  setTitle: (value: string) => {
    set(() => ({ title: value }));
  },
  setAction: (value: string) => {
    set(() => ({ action: value }));
  },
  setDate: (value: Date) => {
    set(() => ({ date: value }));
  },
  setTagId: (value: string) => {
    set(() => ({ tagId: value }));
  },
}));

export default async function Home() {
  return (
    <div className="container mx-auto ">
      <div className="flex justify-between">
        <div>
          <h1 className="pt-5 text-2xl font-bold text-gray-600">Dayscribe</h1>
          <p className="text-sm font-300 text-gray-600 mb-4">
            Your Digital Logbook
          </p>
        </div>
        <div>
          <h1 className="pt-5 text-md font-bold text-gray-600">John Doe</h1>
          <p className="text-right text-sm font-300 text-gray-600 mb-4 text-red-500">
            Logout
          </p>
        </div>
      </div>

      <hr className="mb-4" />
      <div className="flex">
        <Form />
        <List />
      </div>
    </div>
  );
}
