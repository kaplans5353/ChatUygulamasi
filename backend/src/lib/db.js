import {ENV} from "./env.js"
import mongoose from "mongoose"; // MongoDB ile iletişim kurmak için mongoose kütüphanesini import ediyoruz
import dotenv from "dotenv";      // .env dosyasındaki ortam değişkenlerini kullanmak için dotenv
dotenv.config();                  // .env dosyasını yükleyip process.env içine alıyoruz

// MongoDB bağlantısını yapan asenkron fonksiyon
const connectDB = async () => {
  try {

    //tavşandan sonra
    // .env dosyasındaki MONGO_URI değişkenini alıyoruz
    const { MONGO_URI } =ENV;

    // Eğer MONGO_URI tanımlı değilse hata fırlatıyoruz
    if(!MONGO_URI) throw new Error("MONGO_URI is not set"); // MONGO_URI yoksa çalışmayı durdur

    // Mongoose ile MongoDB'ye bağlanıyoruz
    const conn = await mongoose.connect(ENV.MONGO_URI);

    // Başarılı bağlantı mesajı konsola yazdırılır
    console.log("✅ MongoDB Bağlantısı Başarılı");
  } catch (err) {
    // Bağlantı hatası varsa hata mesajını yazdır ve uygulamayı durdur
    console.error("❌ MongoDB Bağlantı Hatası:", err.message);
    process.exit(1); // uygulamayı sonlandır
  }
};

// Bu fonksiyonu başka dosyalarda kullanabilmek iç
// in export ediyoruz
export default connectDB;
