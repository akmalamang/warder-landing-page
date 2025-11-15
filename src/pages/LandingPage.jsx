import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ayamGoreng from '/public/makanan/ayam-goreng.png';
import esTeh from '/public/minuman/es-teh.png';
import chef from '/chef.png';
import rightArrow from '/arrow-right1.png';
import matcha from '/minuman/matcha.png';
import logo from '/warteg-der-logo.png';
import instagramIcon from '/social-media/instagram-icon.png';
import facebookIcon from '/social-media/facebook-icon.png';
import youtubeIcon from '/social-media/youtube-icon.png';
import tiktokIcon from '/social-media/tiktok-icon.png';
import lineRise from '/line-rise.png';

const Gelombang = ({ isScrolled }) => {
  return (
    <div
      className={`absolute w-[200px] sm:w-[411px] h-[350px] sm:h-[585px] rounded-[50%] top-[-50px] left-[-120px] sm:left-[-220px] bg-[#FADA7A] transition-all duration-500 ${isScrolled ? 'z-0 opacity-90' : 'z-0 sm:z-50  opacity-100'}`}
    ></div>
  );
};

const Navbar = ({ isOpen, setIsOpen, isScrolled }) => {
  return (
    <nav className={`flex justify-between items-center px-3 sm:px-6 py-3 fixed top-0 left-0 right-0 transition-all duration-300  ${isScrolled ? 'bg-white/70 shadow-md backdrop-blur-lg' : 'bg-transparent shadow-none'} z-90`}>
      <h1 className="text-[18px] sm:text-2xl font-bold text-gray-800">Warung Derrr.</h1>

      {/* Desktop Menu */}
      <ul className="hidden md:flex gap-8 text-gray-700 font-medium">
        <li>
          <a href="#menu" className="hover:text-yellow-600 transition">
            Menu
          </a>
        </li>
        <li>
          <a href="#about" className="hover:text-yellow-600 transition">
            About
          </a>
        </li>
        <li>
          <a href="#best" className="hover:text-yellow-600 transition">
            Best Seller
          </a>
        </li>
        <li>
          <a href="#service" className="hover:text-yellow-600 transition">
            Service
          </a>
        </li>
      </ul>

      {/* Tombol Kirim Pesan (desktop) */}
      <a
        href="https://wa.me/6281234567890"
        target="_blank"
        rel="noopener noreferrer"
        className={`hidden md:inline-block px-4 py-2 rounded-lg shadow-md transition-all duration-300 ${
          isScrolled ? 'bg-yellow-500 text-white hover:bg-yellow-600' : 'bg-white/80 text-yellow-600 border border-yellow-500 hover:bg-yellow-100'
        }`}
      >
        Kirim Pesan
      </a>

      {/* Hamburger Button */}
      <button className="md:hidden flex flex-col justify-center items-center w-8 h-8 focus:outline-none" onClick={() => setIsOpen(!isOpen)}>
        <span className={`h-1 w-6 bg-gray-800 rounded transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
        <span className={`h-1 w-6 bg-gray-800 rounded my-1 transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
        <span className={`h-1 w-6 bg-gray-800 rounded transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
      </button>
    </nav>
  );
};

const MobileMenu = ({ isOpen, setIsOpen }) => {
  return (
    <div className={`md:hidden fixed top-14 left-0 w-full bg-white shadow-lg transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'} z-100`}>
      <ul className="flex flex-col items-center gap-6 py-6 text-gray-700 font-medium">
        <li>
          <a href="#menu" onClick={() => setIsOpen(false)}>
            Menu
          </a>
        </li>
        <li>
          <a href="#about" onClick={() => setIsOpen(false)}>
            About
          </a>
        </li>
        <li>
          <a href="#best" onClick={() => setIsOpen(false)}>
            Best Seller
          </a>
        </li>
        <li>
          <a href="#service" onClick={() => setIsOpen(false)}>
            Service
          </a>
        </li>
        <li>
          <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer" className="bg-yellow-500 text-white px-4 py-2 rounded-lg shadow hover:bg-yellow-600 transition">
            Kirim Pesan
          </a>
        </li>
      </ul>
    </div>
  );
};

// Modal Detail Produk
const ModalDetailProduk = ({ produk, isOpen, onClose }) => {
  const [quantity, setQuantity] = useState(1);

  if (!isOpen || !produk) return null;

  const handleQuantityChange = (type) => {
    if (type === 'increment') {
      setQuantity((prev) => prev + 1);
    } else if (type === 'decrement' && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const getImageSrc = () => {
    if (!produk.img) return '/makanan/ayam-goreng.png';
    if (produk.img.startsWith('http')) return produk.img;
    return produk.img.replace('/public', '');
  };

  const totalPrice = produk.harga * quantity;

  return (
    <>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>

      <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm animate-fadeIn" onClick={onClose}>
        <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto transform transition-all animate-slideUp" onClick={(e) => e.stopPropagation()}>
          {/* Header Image */}
          <div className="relative h-64 sm:h-80 bg-gradient-to-br from-orange-100 to-green-100 rounded-t-3xl overflow-hidden">
            <button onClick={onClose} className="absolute top-4 right-4 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors">
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <img
              src={getImageSrc()}
              alt={produk.nama}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = '/makanan/ayam-goreng.png';
              }}
            />
          </div>

          {/* Content */}
          <div className="p-6 sm:p-8">
            {/* Product Name & Category */}
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 bg-orange-100 text-orange-600 text-xs font-semibold rounded-full capitalize">{produk.kategori}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">{produk.nama}</h2>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">{produk.deskripsi || 'Produk berkualitas dengan cita rasa yang lezat dan menggugah selera.'}</p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 fill-yellow-400" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-gray-600">(5.0)</span>
            </div>

            {/* Quantity Selector */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-slate-900 mb-3">Jumlah</h3>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleQuantityChange('decrement')}
                  disabled={quantity === 1}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${quantity === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                  </svg>
                </button>

                <span className="text-xl font-bold text-slate-900 w-12 text-center">{quantity}</span>

                <button onClick={() => handleQuantityChange('increment')} className="w-10 h-10 rounded-full bg-orange-500 hover:bg-orange-600 flex items-center justify-center transition-colors">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Price & Add to Cart */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-gray-200">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Harga</p>
                <p className="text-2xl sm:text-3xl font-bold text-slate-900">Rp {totalPrice.toLocaleString('id-ID')}</p>
              </div>

              <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all">
                Tambah ke Keranjang
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const CardProduk = ({ produk, onClick }) => {
  const getImageSrc = () => {
    if (!produk.img) return '/makanan/ayam-goreng.png';
    if (produk.img.startsWith('http')) return produk.img;
    return produk.img.replace('/public', '');
  };

  return (
    <div
      className="min-w-[150px] max-w-[150px] sm:min-w-[200px] sm:max-w-[200px] bg-[#F3F3F3] rounded-2xl shadow pb-4 pt-2 px-2 shrink-0 mt-4 cursor-pointer hover:shadow-xl transition-all transform hover:scale-105"
      onClick={() => onClick(produk)}
    >
      {/* Bintang Rating */}
      <div className="flex gap-0.5 mb-2">
        {[...Array(5)].map((_, i) => (
          <img key={i} src="/star-warteg.png" alt="star" className="w-2.5 h-2.5 sm:w-4 sm:h-4" />
        ))}
      </div>

      {/* Gambar Produk */}
      <div className="w-full h-24 sm:h-[150px] overflow-hidden rounded-lg bg-gray-100 mb-2">
        <img
          src={getImageSrc()}
          alt={produk.nama}
          onError={(e) => {
            e.target.src = '/makanan/ayam-goreng.png';
          }}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      {/* Nama & Deskripsi */}
      <div className="mb-3">
        <p className="text-center font-semibold text-sm sm:text-[16px] truncate">{produk.nama}</p>
        <p className="text-[9px] sm:text-base text-center text-gray-600 line-clamp-2 mt-1">{produk.deskripsi || 'Deskripsi produk'}</p>
      </div>

      {/* Button Harga & Beli */}
      <div className="flex justify-between gap-2">
        <button className="bg-[#B1C29E] rounded-2xl  text-[8px] sm:text-[10px] font-medium flex-1">Rp {parseInt(produk.harga).toLocaleString()}</button>
        <button className="bg-[#F0A04B] rounded-2xl px-2 py-1 sm:px-2 sm:py-2 text-[8px] sm:text-[10px] font-medium flex-1 hover:bg-[#e89535] transition cursor-pointer">Buy Now</button>
      </div>
    </div>
  );
};

const BulatPink = () => {
  return <div className="w-[300px] sm:w-[900px] h-[200px] sm:h-[400px] rounded-[50%]  bg-[#FCE7C8] absolute z-[-2] top-[300px] sm:top-[350px] left-[50%] translate-x-[-50%] "></div>;
};

const LandingPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [produkList, setProdukList] = useState([]);
  const [selectedProduk, setSelectedProduk] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New best seler rotation state
  const [bestSellers, setBestSellers] = useState([]);
  const [bestIndex, setBestIndex] = useState(0);

  useEffect(() => {
    if (bestSellers.length === 0) return;

    const interval = setInterval(() => {
      setBestIndex((prev) => (prev + 1) % bestSellers.length);
    }, 5000); // ganti setiap 5 detik

    return () => clearInterval(interval);
  }, [bestSellers]);

  // helper to normalize image src ( same logic used elsewhere)
  const getImageSrc = (img) => {
    if (!img) return '/makanan/ayam-goreng.png';
    if (img.startsWith('http')) return img;
    return img.replace('/public', '');
  };

  // ...existing code...
  // ...existing code...
  // Ambil data produk dari backend
  useEffect(() => {
    const fetchBestSellers = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/products/best-seller');
        setBestSellers(res.data);
      } catch (err) {
        console.error('Gagal ambil best seller:', err);
      }
    };
    fetchBestSellers();
  }, []);

  // NEW: derive best sellers from produkList (expects an attribute like `bestSeller: true`
  // or kategori === 'best'; fallback to first few products)

  // 🔥 Efek shadow & transparan saat scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Ambil data produk dari backend
  useEffect(() => {
    const fetchProduk = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/products');
        setProdukList(res.data);
      } catch (err) {
        console.error('Gagal ambil produk:', err);
      }
    };
    fetchProduk();
  }, []);

  // Handler untuk membuka modal
  const handleProdukClick = (produk) => {
    setSelectedProduk(produk);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  // Handler untuk menutup modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'unset';
    setTimeout(() => setSelectedProduk(null), 300);
  };

  // Pisahkan produk berdasarkan kategori
  const makanan = produkList.filter((produk) => produk.kategori === 'makanan');
  const minuman = produkList.filter((produk) => produk.kategori === 'minuman');

  return (
    <div className="relative overflow-hidden min-h-screen font-poppins ">
      {/* Gelombang */}
      <Gelombang isScrolled={isScrolled} />

      {/* Navbar */}
      <Navbar isOpen={isOpen} setIsOpen={setIsOpen} isScrolled={isScrolled} />

      {/* Mobile Menu */}
      <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} />

      <div className="flex mt-20 items-center flex-col-reverse">
        {/* Hero Text */}
        <div className="mt-4 sm:absolute top-[120px] sm:left-20 font-bold z-60">
          <h1 className="text-[20px] sm:text-[23px] md:text-[25px] lg:text-[30px]  xl:text-[40px] font-bold text-slate-900 leading-snug">Mau Makan Enak</h1>
          <h1 className="text-[20px] sm:text-[23px] md:text-[25px] lg:text-[30px]  xl:text-[40px] ml-[50px] sm:ml-[70px] md:ml-[100px] lg:ml-[150px] mt-[5px] sm:mt-5 text-[#F0A04B]">Di Warder aja gasii</h1>
        </div>

        {/* Gambar Produk */}
        <div className="flex flex-row justify-center sm:absolute sm:left-[390px] md:left-[420px] lg:left-[500px] xl:left-[590px] top-[100px] z-10">
          <img src={ayamGoreng} alt="" className="w-[150px] sm:w-[200px] md:w-[250px] lg:w-[398px] xl:w-[498px] h-[121px] sm:h-[200px] md:h-[142px] lg:h-[301px] xl:h-[332px]" />
          <img
            src={esTeh}
            alt=""
            className="w-[100px] sm:w-[150px] md:w-[180px] lg:w-[242px] h-[100px] sm:h-[150px] md:h-[180px] lg:h-[242px] sm:absolute left-60 sm:left-[150px] md:left-[200px] lg:left-[299px] xl:left-[370px] sm:-ml-5 -ml-[50px]"
          />
        </div>
      </div>

      {/* Gelombang kanan */}
      <div className="absolute w-[200px] sm:w-[400px] h-[200px] sm:h-[400px] rounded-full bg-[#F0A04B] right-[-100px] sm:right-[-150px] top-[-50px] sm:top-[-150px] z-0"></div>

      {/* Button Klik Disini */}
      <div className="sm:absolute sm:top-[350px] sm:left-[100px] z-60  text-center mt-8">
        <button className="bg-[#B1C29E] px-[1.5em] rounded-2xl py-2 cursor-pointer transition hover:bg-[#8f9f7d] text-[14px] sm:text-[20px] shadow-md hover:shadow-xl">Klik disini</button>
      </div>

      <BulatPink />

      {/* SECTION MAKANAN */}
      <div className="mt-10 sm:mt-[500px]" id="menu">
        <div className="ml-4 text-slate-900 font-semibold text-[18px] sm:text-[24px] mb-4">
          <h1>🍛 Menu Makanan</h1>
        </div>

        {makanan.length === 0 ? (
          <p className="ml-4 text-gray-500">Belum ada menu makanan...</p>
        ) : (
          <div className="flex overflow-x-auto no-scrollbar gap-4 sm:gap-8 px-4 pb-4">
            {makanan.map((produk) => (
              <CardProduk key={produk._id} produk={produk} onClick={handleProdukClick} />
            ))}
          </div>
        )}
      </div>

      {/* SECTION MINUMAN */}
      <div className="mt-10">
        <div className="ml-4 text-slate-900 font-semibold text-[18px] sm:text-[24px] mb-4">
          <h1>🥤 Menu Minuman</h1>
        </div>

        {minuman.length === 0 ? (
          <p className="ml-4 text-gray-500">Belum ada menu minuman...</p>
        ) : (
          <div className="flex overflow-x-auto no-scrollbar gap-4 sm:gap-8 px-4 pb-4">
            {minuman.map((produk) => (
              <CardProduk key={produk._id} produk={produk} onClick={handleProdukClick} />
            ))}
          </div>
        )}
      </div>

      {/* SECTION WARDER */}
      <div className="WARDER flex flex-col gap-4 sm:gap-0  mt-20 bg-[#F0A04B] sm:grid sm:grid-cols-3 sm:justify-center sm:items-center p-8 " id="about">
        <div className="flex flex-col gap-1 ml-4 order-2 sm:order-1">
          <p className="text-[18px] sm:text-[20px] md:text-[25px] lg:text-[30px] text-[#4A4242] font-semibold text-center sm:text-start ">Kenapa harus</p>
          <p className="text-[18px] sm:text-[20px] md:text-[25px] lg:text-[30px] text-[#4A4242] font-semibold text-center sm:text-start"> mampir ke</p>
          <h1 className="text-[30px] text-center sm:text-start sm:text-[50px] md:text-[60px] lg:text-[90px] text-slate-900 font-bold">Warder</h1>
        </div>
        <div className="garisTengah flex justify-center items-center gap-2 order-3 sm:order-2">
          <img src={lineRise} alt="" className="hidden sm:inline-block" />
          <img src={rightArrow} alt="" className="w-[45px] h-10 cursor-pointer transition hover:translate-y-[-5px]" />
          <p className="font-medium text-[12px] sm:text-[18px]">Click here</p>
        </div>
        <div className="gambar-koki order-1 sm:order-3 ">
          <img src={chef} alt="" className="w-[220px] sm:w-[350px] mx-auto " />
        </div>
      </div>

      {/* SECTION BEST SELLER*/}
      <div className="px-4 sm:px-8 lg:px-10 py-10 lg:pb-20" id="best">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Best Seller</h1>
        </div>

        {/* NEW: show rotating best seller from database */}
        <div className="relative bg-[#B4C7A4] rounded-3xl p-8 sm:p-10 flex items-center justify-between max-w-2xl lg:mx-auto">
          {bestSellers.length > 0 ? (
            (() => {
              const current = bestSellers[bestIndex] || {};
              return (
                <>
                  {/* Gambar Ayam (left) */}
                  <div className="w-[180px] sm:w-[220px]">
                    <img src={getImageSrc(current.img)} alt={current.nama || 'Best Seller'} className="w-full h-auto" />
                  </div>

                  {/* Rating Bintang */}
                  <div className="absolute top-1 sm:top-2 left-1/2 -translate-x-1/2 flex ">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 sm:w-6 sm:h-6 fill-[#faf600]" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>

                  {/* Text */}
                  <div className="text-center flex-1">
                    <p className="text-sm sm:text-xl font-medium text-slate-900">{current.kategori || 'Combo'}</p>
                    <p className="text-sm sm:text-xl font-medium text-slate-900 mb-2">{current.nama || 'Pluss'}</p>
                    <h2 className="text-[12 px] sm:text-4xl font-bold text-slate-900">{current.harga ? `Rp ${parseInt(current.harga).toLocaleString()}` : '18K'}</h2>
                  </div>

                  {/* Gambar Minuman (right) */}
                  <div className="w-[120px] sm:w-[150px]">
                    {/* if product has a second image field use it, otherwise reuse same */}
                    <img src={getImageSrc(current.img2 || current.img)} alt={current.nama || 'Best Seller'} className="w-full h-auto" />
                  </div>
                </>
              );
            })()
          ) : (
            // fallback original static content while no data
            <>
              <div className="w-[180px] sm:w-[220px]">
                <img src={ayamGoreng} alt="Ayam Goreng" className="w-full h-auto" />
              </div>

              <div className="absolute top-1 sm:top-2 left-1/2 -translate-x-1/2 flex ">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 sm:w-6 sm:h-6 fill-[#faf600]" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>

              <div className="text-center flex-1">
                <p className="text-sm sm:text-xl font-medium text-slate-900">Combo</p>
                <p className="text-sm sm:text-xl font-medium text-slate-900 mb-2">Pluss</p>
                <h2 className="text-3xl sm:text-6xl font-bold text-slate-900">18K</h2>
              </div>

              <div className="w-[120px] sm:w-[150px]">
                <img src={matcha} alt="Es Hijau" className="w-full h-auto" />
              </div>
            </>
          )}
        </div>
      </div>
      {/* Akhir SECTION BEST SELLER */}

      {/* FOOTER */}
      <div className="footer bg-[#FADA7A] lg:grid lg:grid-cols-2 pb-8" id="service">
        <div className="page-1 ml-4">
          <div className="flex items-center gap-2 mb-2 ml-2 sm:justify-center-safe lg:justify-stretch">
            <img src={logo} alt="logo-warder" className="w-[70px]" />
            <h1 className="text-lg sm:font-semibold">Warung der</h1>
          </div>
          <div className="ml-2 mb-2 ">
            <p className="text-[14px] p-2 sm:w-[300px] sm:mx-auto sm:text-center lg:mx-0 lg:text-start">Warung Der, di mana setiap suapan punya cerita — rasa yang jujur, hangat, dan selalu ingin kamu datangi lagi.</p>
          </div>
          <div className="social-media flex items-center gap-2 ml-4 sm:justify-center-safe mt-4 lg:justify-start">
            <img src={instagramIcon} alt="instagram" className="w-[30px]" />
            <img src={tiktokIcon} alt="tiktok" className="w-[30px]" />
            <img src={facebookIcon} alt="Facebook" className="w-[25px]" />
            <img src={youtubeIcon} alt="Youtube" className="w-[30px]" />
          </div>
        </div>

        {/* Kategori Footer */}
        <div className="grid grid-cols-2 ml-4 lg:ml-0 sm:grid-cols-3 gap-4 lg:gap-0 mt-4 sm:justify-items-center lg:justify-items-start">
          <div className="ml-2 mt-8">
            <h1 className="font-semibold text-[20px]">Food</h1>
            <div className="text-[12px] sm:text-[14px] lg:text-[12px] flex flex-col gap-1 mt-2">
              <p>Ayam goreng</p>
              <p>Nasi Goreng</p>
              <p>Mie Goreng</p>
              <p>Gado Gado</p>
            </div>
          </div>
          <div className="ml-2 mt-8">
            <h1 className="font-semibold text-[20px]">Drink</h1>
            <div className="text-[12px] sm:text-[14px] lg:text-[12px] flex flex-col gap-1 mt-2">
              <p>Ayam goreng</p>
              <p>Nasi Goreng</p>
              <p>Mie Goreng</p>
              <p>Gado Gado</p>
            </div>
          </div>
          <div className="ml-2 mt-8">
            <h1 className="font-semibold text-[20px]">Contact</h1>
            <div className="text-[12px] sm:text-[14px] lg:text-[12px] flex flex-col gap-1 mt-2">
              <p>
                <a href="">Customer Komplain</a>
              </p>
              <p>
                <a href="">62866732233</a>
              </p>
              <p>
                <a href="">akmlamanggg</a>
              </p>
              <p>
                <a href="">Gejala_Makanan</a>
              </p>
              <p>
                <a href="">Warungder@gmail.com</a>
              </p>
            </div>
          </div>
        </div>
        {/* akhir kategori Footer */}
      </div>
      {/*Akhir FOOTER */}

      {/* Copyright */}
      <div className="text-center  bg-[#B1C29E] py-2">
        <p className="text-[10px]">hak cipta Warder copyright@2025 </p>
      </div>

      {/* MODAL DETAIL PRODUK */}
      <ModalDetailProduk produk={selectedProduk} isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default LandingPage;
