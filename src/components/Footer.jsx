const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start space-y-6 md:space-y-0">
          <div className="text-center md:text-left">
            <h2 className="text-white text-2xl font-bold">Cineverse</h2>
            <p className="text-sm mt-2">
              Your go-to destination for unlimited movie streaming. Watch
              anywhere, anytime.
            </p>
          </div>

          <div className="text-center md:text-left">
            <h3 className="text-white font-semibold text-lg">Contact Us</h3>
            <ul className="space-y-2 mt-2 text-sm">
              <li>
                Email:{" "}
                <a
                  href="mailto:support@streamflix.com"
                  className="text-indigo-400 hover:underline"
                >
                  support@cineverse.com
                </a>
              </li>
              <li>
                Phone:{" "}
                <a
                  href="tel:+123456789"
                  className="text-indigo-400 hover:underline"
                >
                  +1 (234) 567-89
                </a>
              </li>
              <li>Address: 123 Movie Lane, Hollywood, CA</li>
            </ul>
          </div>

          <div className="text-center md:text-left">
            <h3 className="text-white font-semibold text-lg">Follow Us</h3>
            <div className="flex justify-center md:justify-start space-x-4 mt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <i className="fab fa-facebook text-gray-400 hover:text-white text-2xl"></i>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
              >
                <i className="fab fa-twitter text-gray-400 hover:text-white text-2xl"></i>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <i className="fab fa-instagram text-gray-400 hover:text-white text-2xl"></i>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <i className="fab fa-linkedin text-gray-400 hover:text-white text-2xl"></i>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-4 text-center">
          <p className="text-sm">
            © {new Date().getFullYear()} Cineverse. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
