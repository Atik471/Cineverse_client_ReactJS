import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ContactUs = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Message received. Thank you!');
    navigate('/');

  };

  return (
    <div className="py-16 md:w-[60%] w-[92%] mx-auto">
      <div className="md:w-[95%] mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6">
          Get in Touch
        </h2>
        <p className="text-lg text-gray-600 mb-12">
          Have any questions? Feel free to reach out to us by filling out the
          form below.
        </p>
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg">
          <div className="mb-6">
            <input
              type="text"
              id="subject"
              name="subject"
              placeholder="Subject"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>

          <div className="mb-6">
            <textarea
              id="message"
              name="message"
              placeholder="Provide more details"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg h-32"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-primary text-white rounded-lg font-semibold hover:bg-black transition-all duration-300"
          >Send Message
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ContactUs;
