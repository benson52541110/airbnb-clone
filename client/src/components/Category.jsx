import { useState } from "react";
import { Icon } from "@iconify/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/swiper-bundle.css";
import "./Category.css";

const Category = () => {
	const [selectedSlide, setSelectedSlide] = useState(null);
	const slides = [
		{ icon: <Icon icon="mdi:greenhouse" className="text-2xl" />, text: "民宿" },
		{
			icon: <Icon icon="mdi:house" className="text-2xl" />,
			text: "客房",
		},
		{
			icon: <Icon icon="mdi:island" className="text-2xl" />,
			text: "景觀",
		},
		{ icon: <Icon icon="mdi:money" className="text-2xl" />, text: "奢華" },
		{
			icon: <Icon icon="mdi:wind-turbine" className="text-2xl" />,
			text: "風車",
		},
		{ icon: <Icon icon="mdi:beach" className="text-2xl" />, text: "海灘" },
		{
			icon: <Icon icon="mdi:apps-box" className="text-2xl" />,
			text: "大型",
		},
		{
			icon: <Icon icon="mdi:campfire" className="text-2xl" />,
			text: "露營",
		},
		{ icon: <Icon icon="mdi:piano" className="text-2xl" />, text: "鋼琴" },
		{ icon: <Icon icon="mdi:city" className="text-2xl" />, text: "城市" },
		{ icon: <Icon icon="mdi:cook" className="text-2xl" />, text: "廚師" },
		{
			icon: <Icon icon="mdi:home-variant" className="text-2xl" />,
			text: "木屋",
		},
		{ icon: <Icon icon="mdi:pool" className="text-2xl" />, text: "泳池" },
		{
			icon: <Icon icon="mdi:baseball-bat" className="text-2xl" />,
			text: "娛樂",
		},

		{
			icon: <Icon icon="mdi:snowflake" className="text-2xl" />,
			text: "雪景",
		},
		{
			icon: <Icon icon="mdi:temple" className="text-2xl" />,
			text: "寺廟",
		},
		{ icon: <Icon icon="mdi:park" className="text-2xl" />, text: "公園" },
		{ icon: <Icon icon="mdi:fire" className="text-2xl" />, text: "篝火" },
		{
			icon: <Icon icon="mdi:lake" className="text-2xl" />,
			text: "湖泊",
		},
	];

	return (
		<div className="flex items-center h-20">
			<Swiper
				modules={[Navigation, Pagination]}
				navigation
				spaceBetween={8}
				slidesPerView={15}
				onSlideChange={(swiper) => {}}
			>
				{slides.map((slide, index) => (
					<SwiperSlide key={index}>
						<div
							className={`flex flex-col items-center justify-center h-full gap-1 text-center cursor-pointer ${
								selectedSlide === index
									? "border-b-2 text-black border-black"
									: "text-gray-600"
							}`}
							onClick={() => setSelectedSlide(index)}
						>
							{slide.icon}
							<div className="text">{slide.text}</div>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
};

export default Category;
