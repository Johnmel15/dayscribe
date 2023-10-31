import Form from "./Form/MainForm";
import List from "./List";

export default async function Logs() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row justify-between">
        <div className="mb-4 sm:mb-0">
          <h1 className="pt-5 text-2xl font-bold text-gray-600">Dayscribe</h1>
          <p className="text-sm font-300 text-gray-600">Your Digital Logbook</p>
        </div>
      </div>

      <hr className="mb-4" />
      <div className="flex flex-col sm:flex-row">
        <Form />
        <List />
      </div>
    </div>
  );
}
