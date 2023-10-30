import Form from "./Form/MainForm";
import List from "./List";

export default async function Home() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row justify-between">
        <div className="mb-4 sm:mb-0">
          <h1 className="pt-5 text-2xl font-bold text-gray-600">Dayscribe</h1>
          <p className="text-sm font-300 text-gray-600">Your Digital Logbook</p>
        </div>
        <div>
          <h1 className="pt-5 text-md font-bold text-gray-600">John Doe</h1>
          <p className="text-right text-sm font-300 text-gray-600 mb-4 sm:mb-0 text-red-500">
            Logout
          </p>
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
