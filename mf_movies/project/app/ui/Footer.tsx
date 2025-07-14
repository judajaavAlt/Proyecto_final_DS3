import {
  Facebook,
  Film,
  Instagram,
  Mail,
  MessageSquare,
  Monitor,
  Star,
  Twitter,
  Youtube,
} from "lucide-react";

export default function FooterMain() {
  return (
    <footer className="bg-gray-900 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div>
            <h4 className="text-xl font-bold mb-6">Sobre Nosotros</h4>
            <p className="text-gray-400 leading-relaxed">
              Tu fuente definitiva de reseñas cinematográficas. Descubre,
              explora y comparte tu pasión por el cine con nuestra comunidad de
              cinéfilos.
            </p>
          </div>
          <div>
            <h4 className="text-xl font-bold mb-6">Enlaces Útiles</h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2"
                >
                  <Star className="w-4 h-4" /> Reseñas
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2"
                >
                  <Film className="w-4 h-4" /> Peliculas
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" /> Contacto
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-bold mb-6">Newsletter</h4>
            <p className="text-gray-400 mb-4">
              Suscríbete para recibir las últimas noticias y reseñas.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Tu email"
                className="bg-gray-800 text-white px-4 py-3 rounded-l-lg flex-1 border border-gray-700 focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all duration-300"
              />
              <button className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-r-lg transition-colors duration-300">
                <Mail className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div>
            <h4 className="text-xl font-bold mb-6">Síguenos</h4>
            <div className="flex gap-4">
              <a
                href="#"
                className="bg-gray-800 p-3 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700 transition-all duration-300"
              >
                <Facebook className="w-6 h-6" />
              </a>
              <a
                href="#"
                className="bg-gray-800 p-3 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700 transition-all duration-300"
              >
                <Twitter className="w-6 h-6" />
              </a>
              <a
                href="#"
                className="bg-gray-800 p-3 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700 transition-all duration-300"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a
                href="#"
                className="bg-gray-800 p-3 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700 transition-all duration-300"
              >
                <Youtube className="w-6 h-6" />
              </a>
            </div>
            <div className="mt-6">
              <h5 className="font-semibold mb-4">Disponible en:</h5>{" "}
              <div className="grid grid-cols-3 gap-3">
                {["Netflix", "HBO Max", "Prime"].map((platform) => (
                  <div
                    key={platform}
                    className="bg-gray-800 p-3 rounded-lg flex items-center justify-center"
                  >
                    <Monitor className="w-5 h-5 text-gray-400" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">
              &copy; 2024 MovieReviews. Todos los derechos reservados.
            </p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                Privacidad
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                Términos
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
