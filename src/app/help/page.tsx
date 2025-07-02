export default function HelpPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-blue-700 mb-6">🆘 Help & Support</h1>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">📌 What does this app do?</h2>
          <p className="text-gray-600">
            This cryptocurrency tracker provides real-time prices, charts, and detailed information about various cryptocurrencies. You can also view your holdings after login.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">🔐 How do I create an account?</h2>
          <p className="text-gray-600">
            Click on <strong>Register</strong> from the login page and provide your name, date of birth, email, and password. After registration, you can log in to access full features.
          </p>
        </section>

    
          

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">🛠 Having issues?</h2>
          <p className="text-gray-600">
            If you face any bugs, contact our team at <a href="mailto:support@cryptotracker.com" className="text-blue-600 underline">support@cryptotracker.com</a>. We’re happy to help!
          </p>
        </section>

        <footer className="text-center text-sm text-gray-400 mt-10">
          © {new Date().getFullYear()} Crypto Tracker — All rights reserved.
        </footer>
      </div>
    </main>
  );
}
