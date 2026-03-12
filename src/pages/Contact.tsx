import { useForm } from 'react-hook-form';
import type { FieldValues } from 'react-hook-form';
import { toast } from 'react-hot-toast';

const Contact = () => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data: FieldValues) => {
    toast.success(`Thank you for your message! We will get back to you soon. ${data.message}`);
    reset();
  };

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Have a question or feedback? Fill out the form below.
          </p>
        </div>
        <div className="max-w-2xl mx-auto">
          <form 
            onSubmit={handleSubmit(onSubmit)} 
            className="space-y-6 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Your Name</label>
              <input
                type="text"
                {...register('name', { required: true })}
                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Your Email</label>
              <input
                type="email"
                {...register('email', { required: true })}
                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Message</label>
              <textarea
                rows={4}
                {...register('message', { required: true })}
                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              ></textarea>
            </div>
            <button type="submit" className="w-full px-4 py-2 font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;