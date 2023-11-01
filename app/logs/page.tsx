import { getCurrentUser } from "@/actions/getCurrentUser";
import Form from "./Form/MainForm";
import List from "./List";
import Header from "./Header";
import MainPage from "./MainPage";

export default async function Logs() {
  const currentUser = await getCurrentUser();

  return <MainPage currentUser={currentUser} />;
}
