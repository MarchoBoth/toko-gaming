import React, { useEffect, useState } from 'react';
import Header from '../components/headers/light';
import Footer from '../components/footers/FiveColumnWithInputForm.js';
import AnimationRevealPage from 'helpers/AnimationRevealPage.js';
import tw from 'twin.macro';
import { useParams } from 'react-router-dom';
import { useCart } from 'react-use-cart';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { formatPrice } from 'helpers/helpers';
import { FaStar, FaStarHalf, FaCheck } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useProductsContext } from 'context/product_context';
import { data } from 'helpers/utils';

const DetailProduct = () => {
  const { id } = useParams();
  const { addItem, items, updateItemQuantity } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedItem, setSelectedItem] = useState(null);
  const { product, getProductById, setProduct } = useProductsContext();
  const [showModal, setShowModal] = useState(false);
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(null);
  const [loading, setLoading] = useState(false);
  const [maxQuantity, setMaxQuantity] = useState(0);
  const [selectedColorId, setSelectedColorId] = useState(null);
  console.log('product:', product);

  const handleColorClick = (color) => {
    setQuantity(1);
    setSelectedColor(color);
  };
  const changeMainImage = (index) => {
    setMainImageIndex(index);
  };

  const openModal = () => {
    setSelectedItem(product);
    setShowModal(true);
  };

  const navigate = useNavigate();
  const Container = tw.div`relative bg-gray-200 text-gray-700 -mb-8 -mx-8 px-8 py-20 lg:py-24`;
  const Content = tw.div`max-w-screen-xl mx-auto relative z-10 flex flex-col lg:flex-row items-center justify-between`;
  const ProductImage = tw.img`w-full lg:w-[500px] h-64 lg:h-[400px] object-cover rounded-md mb-8 lg:mb-0`;
  const ProductInfo = tw.div`text-center lg:text-left lg:w-1/2 my-auto`;
  const Title = tw.h2`text-3xl font-semibold mb-2`;
  const Description = tw.p`text-gray-600 mb-4`;
  const RatingReviews = tw.p`text-gray-500 mb-4`;
  const Price = tw.p`text-xl font-semibold mt-4`;
  const AddToCartButton = tw.button`bg-red-500 text-white px-6 py-3 rounded-md mt-4 hover:bg-red-700 transition duration-300`;
  const ModalContainer = tw.div`fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50`;
  const ModalContent = tw.div`bg-white p-8 rounded-lg text-center`;
  const QuantityControl = tw.div`flex space-x-4 my-4 items-center justify-center md:justify-normal`;
  const QuantityButton = tw.button`text-2xl font-bold focus:outline-none`;
  const QuantityDisplay = tw.div`text-2xl font-bold`;
  const CancelButton = tw.button`text-sm mt-4 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-md ml-5 focus:outline-none cursor-pointer`;

  const handleAddToCart = () => {
    // cari itemnya udah ada atau belum di cart, kalau ada tambahkan quantitiy yang ada di keranjang dan quantity yang akan masuk ke kerajang
    // jika hasilnya lebih besar dari max quantity di keranjang maka tampilkan error
    // buat jika item yang dimasukkan memiliki warna yang berbeda maka item pada cart harus tampil berdasarkan warna yang dipilih
    //ketika kita add, menambahkan property baru. kita simpen idnya ke property baru
    //jadi semua product akan unique berdasarkan warnanya.
    // jangan buat datanya ketumpuk
    if (!selectedItem) {
      toast.error('Sorry, product is unavailable.');
      return;
    }

    // Validasi jika produk memiliki variasi warna
    if (selectedItem.colors.length > 0 && !selectedColor) {
      toast.error('Please select a color.');
      return;
    }

    // Cari produk di keranjang
    const uniqueId = `${selectedItem.id}-${selectedColor || 'default'}`;

    // Cari produk di keranjang berdasarkan ID unik
    const existingItem = items.find((item) => item.id === uniqueId);

    if (existingItem) {
      // Hitung total kuantitas jika item sudah ada di keranjang
      const totalQuantity = existingItem.quantity + quantity;

      // Validasi kuantitas tidak melebihi stok maksimal
      if (totalQuantity > existingItem.maxQuantity) {
        toast.error(
          `Cannot add more items. Maximum quantity is ${existingItem.maxQuantity}.`
        );
        return;
      }

      // Perbarui kuantitas di keranjang
      updateItemQuantity(uniqueId, totalQuantity);
      toast.success(`${selectedItem.name} quantity updated in the cart.`);
      setShowModal(false);
    } else {
      // Validasi kuantitas untuk produk baru
      if (quantity > maxQuantity) {
        toast.error(`Quantity exceeds available stock. Max: ${maxQuantity}`);
        return;
      }

      // Tambahkan produk baru ke keranjang
      addItem(
        {
          ...selectedItem,
          color: selectedColor, // Warna yang dipilih
          maxQuantity: maxQuantity, // Stok maksimal
          id: uniqueId, // ID unik berdasarkan warna
          trueId: selectedItem.id, // ID asli produk
          colorId: selectedColorId, // ID warna
        },
        quantity
      );
      toast.success(`${selectedItem.name} added to the cart.`);
      setShowModal(false);
    }
  };

  //cek item apakah item udah ada di keranjang. jika ada jumlahkan quantity keranjang dan yg akan masuk ke keranjang , setelah dapat toal, jika hasil total lebih  banyak dari quantity, tampilkan eror
  useEffect(() => {
    // Your code here
    getProductById(id);
    // const findProduct = data.find((item) => item.id.toString() === id);
    // setProduct(findProduct);
  }, [id]);

  const handleChangePrice = () => {
    return product.price * quantity;
  };

  const handleQuantityChange = (newQuantity) => {
    //harus memilih warna terlebih dahulu
    //cek quantity yang ada, jika masih ada maka handlequantitychange bisa dijalankan
    //lalu cek quantity barang yang ada dan yang ada di cart.
    //handle quantity change hanya bisa menambahkan quantity sesuai quantity yang tersedia.
    //quantity yang tersedia adalah maxquantity di kurangi quantity di cart
    if (!selectedColor) {
      toast.warning('Please select a color first');
      return;
    }

    // setQuantity(Math.max(1, Math.min(maxQuantity, newQuantity))); //hanya bisa menambahkan sesuai stock yang ada
    // Cari item yang ada di keranjang berdasarkan ID dan warna
    const existingItem = items.find(
      (item) =>
        item.id === product.id &&
        (!selectedColor || item.color === selectedColor)
    );

    // Hitung stok yang tersedia: stok maksimal dikurangi jumlah di keranjang
    const availableStock = maxQuantity - (existingItem?.quantity || 0);

    if (newQuantity < 1) {
      toast.warning('Quantity cannot be less than 1.');
      setQuantity(1);
      return;
    }

    if (newQuantity > availableStock) {
      toast.error(`Stock is limited. Only ${availableStock} left.`);
      setQuantity(availableStock);
      return;
    }

    setQuantity(newQuantity); // Set kuantitas baru jika valid
  };

  useEffect(() => {
    const updatedPrice = handleChangePrice();
    setProduct((prevProduct) => ({ ...prevProduct, updatedPrice }));
  }, [quantity, product.price]);
  return (
    <AnimationRevealPage>
      <Header className={'mb-8'} />

      <Container>
        <Content>
          <div className="md:flex md:space-x-10 md:mx-auto">
            <div>
              <button
                className="bg-gray-500 p-2 text-white rounded mb-4"
                onClick={() => navigate(-1)}
              >
                Back to products
              </button>
              {Array.isArray(product.images) && product.images.length > 0 && (
                <>
                  <ProductImage
                    src={`https://pkdlvjkjcznmtmivzkqc.supabase.co/storage/v1/object/public/images/${product.images[mainImageIndex]}`}
                    alt={product.name}
                  />
                </>
              )}
              {Array.isArray(product.images) && product.images.length > 1 && (
                <div className="grid grid-cols-5 sm:gap-2 mt-4 ">
                  {product.images.map((image, index) => (
                    <img
                      key={index}
                      src={`https://pkdlvjkjcznmtmivzkqc.supabase.co/storage/v1/object/public/images/${product.images[index]}`}
                      alt={`${product.name} - ${index + 1}`}
                      className={`h-20 w-20 rounded cursor-pointer ${
                        index === mainImageIndex
                          ? 'border-2 border-red-500'
                          : ''
                      }`}
                      onClick={() => changeMainImage(index)}
                    />
                  ))}
                </div>
              )}
            </div>

            <ProductInfo>
              <Title>{product.name}</Title>
              <RatingReviews>
                {/* <div className="flex items-center justify-center md:justify-normal">
                  {product.stars}
                  <span className=" flex mx-2">
                    {[...Array(5)].map((_, index) => {
                      const starValue = index + 1;
                      const isHalfStar =
                        starValue - 0.5 === Math.floor(product.stars);

                      return (
                        <span key={index} className="my-auto ">
                          {starValue <= product.stars ? (
                            isHalfStar ? (
                              <FaStarHalf style={{ color: '#fbbf24' }} />
                            ) : (
                              <FaStar style={{ color: '#fbbf24' }} />
                            )
                          ) : (
                            <FaStar style={{ color: '#d1d5db' }} />
                          )}
                        </span>
                      );
                    })}
                  </span>
                  | Reviews:
                </div> */}
              </RatingReviews>
              <Description>Deskripsi</Description>
              <div>
                <p className="mb-2">Available : {product.description}</p>
                {/* <p className="mb-2">SKU : </p> */}
                <p className="mb-2">Company : {product.company}</p>
                <hr className="my-4 h-1 border bg-gray-500" />

                <div className="flex">
                  <p className="my-auto mr-4">Colors : </p>
                  {Array.isArray(product.colors) && (
                    <div className="flex space-x-2">
                      {product.colors.map((color, index) => (
                        <div
                          key={index}
                          className={`relative w-8 h-8 rounded-full cursor-pointer border-2 ${
                            selectedColor === color.color
                              ? 'border-red-500'
                              : 'border-transparent'
                          }`}
                          style={{ backgroundColor: color.color }}
                          onClick={() => {
                            handleColorClick(color.color);
                            setMaxQuantity(color.quantity);
                            setSelectedColorId(color.id);
                          }}
                        >
                          {selectedColor === color.color && (
                            <FaCheck
                              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white"
                              size={16}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <Price>{formatPrice(handleChangePrice())}</Price>
              <QuantityControl>
                <QuantityButton
                  onClick={() => handleQuantityChange(quantity - 1)}
                >
                  -
                </QuantityButton>
                <QuantityDisplay>{quantity}</QuantityDisplay>
                <QuantityButton
                  // tabahankan code untuk membatasi penambahan stock melebihi batas
                  onClick={() => handleQuantityChange(quantity + 1)}
                >
                  +
                </QuantityButton>
              </QuantityControl>
              <AddToCartButton onClick={openModal}>Add to Cart</AddToCartButton>
            </ProductInfo>
          </div>
        </Content>
      </Container>
      {showModal && (
        <>
          <ModalContainer>
            <ModalContent>
              <h2 tw="text-2xl font-semibold mb-4">
                Are you sure want add this item to cart?
              </h2>
              <p>Name : {selectedItem.name}</p>
              <p>Quantity : {quantity}</p>
              <div className="flex items-center justify-center">
                <p className="my-auto mr-3">Color : </p>
                <div
                  className={`relative w-8 h-8 rounded-full cursor-pointer border-2 `}
                  style={{ backgroundColor: selectedColor }}
                ></div>
              </div>
              <button
                className="text-sm cursor-pointer bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-700"
                onClick={() => handleAddToCart(product === 0)}
              >
                Add
              </button>
              <CancelButton onClick={() => setShowModal(false)}>
                Cancel
              </CancelButton>
            </ModalContent>
          </ModalContainer>
        </>
      )}

      <Footer background={'bg-white'} />
    </AnimationRevealPage>
  );
};

export default DetailProduct;
