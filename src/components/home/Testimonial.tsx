import { useRef } from "react";
import type { Swiper as SwiperType } from "swiper";
import { Apostrophe } from "@/assets/icons/svg";
import { Button } from "../ui/button";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface TestimonialType {
  id: number;
  name: string;
  image: string;
  stars: number;
  text: string;
}

const testimonials: TestimonialType[] = [
  {
    id: 1,
    name: "Nisikak Umoren",
    image: "/images/testimonial1.jpg",
    stars: 5,
    text: "Gigsta made everything so easy and smooth. Highly recommended!",
  },
  {
    id: 2,
    name: "Nora Bisong",
    image: "/images/testimonial1.jpg",
    stars: 4,
    text: "Very professional service. I’ll definitely use it again.",
  },
  {
    id: 3,
    name: "Ebube Anyanwu",
    image: "/images/testimonial1.jpg",
    stars: 5,
    text: "Quick and reliable. Loved the experience!",
  },
  {
    id: 4,
    name: "Emmanuel Effiong",
    image: "/images/testimonial1.jpg",
    stars: 5,
    text: "The best platform for finding skilled professionals.",
  },
  {
    id: 5,
    name: "Abasiama Okon",
    image: "/images/testimonial1.jpg",
    stars: 4,
    text: "Everything went smoothly. Great communication!",
  },
  {
    id: 6,
    name: "Ita Enang",
    image: "/images/testimonial1.jpg",
    stars: 5,
    text: "Highly efficient and easy to use. Loved it!",
  },
];

const Testimonial = () => {

const swiperRef = useRef<SwiperType | null>(null);
  return (
    // <section className="bg-gray-50 w-full min-h-screen py-20 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-17.5">
    //   <div className="max-w-7xl mx-auto">
         <section className="py-20  bg-gray-50 min-h-screen w-full">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> 

             {/* <section className="py-20 bg-[#F0A500] min-h-screen w-full">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> */}
        <div className="text-center mb-14">
          <div className="inline-block bg-[#F0A500]/12 px-6 py-3 rounded-4xl mx-auto mb-6">
            <h3 className="text-2xl font-medium text-[#F0A500] tracking-wide">
              TESTIMONIALS
            </h3>
          </div>
          <h2 className="text-4xl sm:text-5xl  md:text-[50px] font-bold text-[#0D0F11]  leading-[1.2] ">
            Our Happy Clients
          </h2>

          <p className="mt-4.5 text-[#0D0F11]  mx-auto font-medium text-lg md:text-xl leading-relaxed">
            We value our clients and take pride in delivering exceptional
            services. Here’s what they have to say about working with us.
          </p>
        </div>

      <Swiper
        modules={[Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
      
        loop
        autoplay={{ delay: 3000 }}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {testimonials.map((t) => (
          <SwiperSlide key={t.id}>
            <div
              className="bg-white  rounded-xl shadow-md h-full flex flex-col items-center text-center px-8 pt-10
                         transform transition-transform duration-500 hover:scale-105
                         opacity-0 animate-fadeIn"
              style={{ animationDelay: `${t.id * 0.2}s` }}
            >
              <img
                src={t.image}
                alt={t.name}
                className="w-20 h-20 rounded-full object-cover mb-6"
              />
              
              <h4 className="font-semibold text-xl mb-2 text-[#0D0F11]">
                {t.name}
              </h4>
              <div className="flex items-center justify-center mt-2 mb-4">
                {Array.from({ length: t.stars }).map((_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 text-[#F0A500]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.945a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.286 3.945c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.176 0l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.285-3.945a1 1 0 00-.364-1.118L2.064 9.372c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.285-3.945z" />
                  </svg>
                ))}
              </div>
              <p className="text-[#0D0F11]  mb-6">{t.text}</p>

              <div className="text-[#0D0F11]  font-bold text-xl bg-[#F0A500]/12  mt-auto py-4.5 px-5.5 rounded-tl-[48px] rounded-tr-[48px]">
                <p>
                  <Apostrophe className="w-6 h-6 text-[#F0A500]" />
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

<div className="mt-8 flex justify-between items-center max-w-7xl mx-auto px-4">
  <button
    onClick={() => swiperRef.current?.slidePrev()}
    className="rounded-full w-10 h-10 border border-[#0D0F11] flex items-center justify-center hover:bg-gray-100 transition"
  >
    <ChevronLeft />
  </button>

  <button
    onClick={() => swiperRef.current?.slideNext()}
    className="rounded-full w-10 h-10 border border-[#0D0F11] flex items-center justify-center hover:bg-gray-100 transition"
  >
    <ChevronRight />
  </button>
</div>

      <div className="text-center mt-8">
        <Button className="shadow-[0_4px_4px_0_rgba(0,0,0,0.15)]  bg-[#F0A500] inline-flex items-center gap-2 text-white font-semibold text-base hover:gap-3 transition-all duration-300">
          Read More Success Story
        </Button>
      </div>
 
      <style>{`
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(15px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s forwards;
        }
      `}</style>
      </div>

    </section>
  );
};

export default Testimonial;
