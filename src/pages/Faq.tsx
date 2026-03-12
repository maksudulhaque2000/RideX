import { useState } from 'react';

const faqData = [
    { q: 'How do I request a ride?', a: 'You can request a ride from your dashboard after logging in as a rider. Navigate to the "Request a Ride" page and fill in your pickup and destination details.' },
    { q: 'How do I become a driver?', a: 'You can register as a driver from our registration page. Your account will need to be approved by an admin before you can start accepting rides.' },
    { q: 'Is RideX safe?', a: 'Yes, safety is our top priority. All our drivers are verified, and we offer in-ride safety features and support.' },
    { q: 'What are the payment methods?', a: 'We currently support cash payments directly to the driver. Credit card and digital wallet options are coming soon.' },
    { q: 'Can I cancel a ride?', a: 'Yes, you can cancel a ride before it is accepted by a driver. Please check your ride history for cancellation options.'},
];

const Faq = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFaqs = faqData.filter(faq => 
    faq.q.toLowerCase().includes(searchTerm.toLowerCase()) || 
    faq.a.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
        <div className="container mx-auto px-4 py-16">
            <div className="max-w-3xl mx-auto text-center">
                <h1 className="text-4xl font-bold mb-8">Frequently Asked Questions</h1>
                <div className="mb-8">
                    <input 
                    type="text"
                    placeholder="Search questions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-700"
                    />
                </div>
            </div>
            <div className="max-w-3xl mx-auto space-y-6">
                {filteredFaqs.map((faq, index) => (
                <div key={index} className="border-b dark:border-gray-700 pb-4">
                    <h3 className="font-semibold text-lg text-indigo-600 dark:text-indigo-400">{faq.q}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mt-2">{faq.a}</p>
                </div>
                ))}
            </div>
        </div>
    </div>
  );
};

export default Faq;