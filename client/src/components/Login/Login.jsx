

export default function Login() {
  return (
    <div className="flex h-screen bg-primary">
    <div className="w-full max-w-xs m-auto bg-secondary rounded p-5">
      <header>
       <h1 className="text-center text-primary font-bold mb-4 ">Влезте в вашият акаунт</h1>
      </header>
      <form>
        <div>
          <label className="block mb-2 text-indigo-500" htmlFor="username">
            Потребителско име
          </label>
          <input
            className="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300"
            type="text"
            name="username"
          />
        </div>
        <div>
          <label className="block mb-2 text-indigo-500" htmlFor="password">
            Парола
          </label>
          <input
            className="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300"
            type="password"
            name="password"
          />
        </div>
        <div>
          <input
            className="w-full bg-indigo-700 hover:bg-pink-700 text-white font-bold py-2 px-4 mb-6 rounded"
            type="submit"
            value="Влизане"
          />
        </div>
      </form>
      <footer>
        <a
          className="text-indigo-700 hover:text-pink-700 text-sm float-left"
          href="#"
        >
         Забравена парола?
        </a>
        <a
          className="text-indigo-700 hover:text-pink-700 text-sm float-right"
          href="#"
        >
         Създай акаунт
        </a>
      </footer>
    </div>
  </div>
  
  )
}
