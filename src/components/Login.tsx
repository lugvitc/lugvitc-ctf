export default function Login() {
    return (
        <main className="flex h-screen flex-col items-center justify-center">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h1 className="text-black text-2xl font-semibold mb-6">Password Team Login</h1>

                <form action="#" method="POST">
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-black text-sm font-medium mb-2">Team Name</label>
                        <input type="text" id="username" name="username" className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500 text-black" required />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="block text-black text-sm font-medium mb-2">Password</label>
                        <input type="password" id="password" name="password" className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500 text-black" required />
                    </div>

                    <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Login</button>
                </form>

                <p className="mt-4 text-gray-600 text-sm">Don't have an account? <a href="#" className="text-blue-500 hover:underline">Sign up</a></p>
            </div>
        </main>
    );
}

