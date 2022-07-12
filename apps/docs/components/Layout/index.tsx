import Menu from "../Menu";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen min-w-screen bg-gradient-to-r from-pink-600 to-sky-400">
      <div className="container mx-auto pt-8">
        <div className={"bg-black/40 p-8 rounded shadow-xl"}>
          <nav className="flex items-center space-x-4 bg-black/60 rounded p-2 shadow-xl mb-4">
            <ul className="flex items-center space-x-4 text-white font-medium uppercase">
              <li>Home</li>
              <li>API</li>
              <li>Examples</li>
              <li>Github</li>
            </ul>
          </nav>
          <div className="flex space-x-4">
            <main className="w-full">{children}</main>
          </div>
        </div>
      </div>
    </div>
  );
}
