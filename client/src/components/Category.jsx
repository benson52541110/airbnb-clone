import { useState } from "react";
import { Icon } from "@iconify/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/swiper-bundle.css";
import "./Category.css";

const Category = () => {
	const [selectedSlide, setSelectedSlide] = useState(null);
	const slides = [
		{ icon: <Icon icon="mdi:greenhouse" />, text: "民宿" },
		{
			icon: <Icon icon="mdi:house" />,
			text: "客房",
		},
		{
			icon: <Icon icon="mdi:island" />,
			text: "景觀",
		},
		{ icon: <Icon icon="mdi:money" />, text: "奢華" },
		{
			icon: <Icon icon="mdi:wind-turbine" />,
			text: "風車",
		},
		{ icon: <Icon icon="mdi:beach" />, text: "海灘" },
		{
			icon: <Icon icon="mdi:apps-box" />,
			text: "大型",
		},
		{
			icon: <Icon icon="mdi:campfire" />,
			text: "露營",
		},
		{ icon: <Icon icon="mdi:piano" />, text: "鋼琴" },
		{ icon: <Icon icon="mdi:city" />, text: "城市" },
		{ icon: <Icon icon="mdi:cook" />, text: "廚師" },
		{
			icon: <Icon icon="mdi:home-variant" />,
			text: "木屋",
		},
		{ icon: <Icon icon="mdi:pool" />, text: "泳池" },
		{
			icon: <Icon icon="mdi:baseball-bat" />,
			text: "娛樂",
		},

		{
			icon: <Icon icon="mdi:snowflake" />,
			text: "雪景",
		},
		{
			icon: <Icon icon="mdi:temple" />,
			text: "寺廟",
		},
		{ icon: <Icon icon="mdi:park" />, text: "公園" },
		{ icon: <Icon icon="mdi:fire" />, text: "篝火" },
		{
			icon: <Icon icon="mdi:lake" />,
			text: "湖泊",
		},
	];

	return (
		<div className="flex items-center h-full mt-4 px-6">
			<Swiper
				modules={[Navigation, Pagination]}
				navigation
				spaceBetween={4}
				slidesPerView={2}
				breakpoints={{
					// 當螢幕寬度小於 768px 時
					768: {
						spaceBetween: 8, // 或者您想要的數值
						slidesPerView: 4, // 或者您想要的數值
					},
					992: {
						spaceBetween: 10, // 或者您想要的數值
						slidesPerView: 6, // 或者您想要的數值
					},
				}}
			>
				{slides.map((slide, index) => (
					<SwiperSlide key={index}>
						<div
							className="flex flex-col items-center justify-center h-full gap-1 text-center cursor-pointer "
							onClick={() => setSelectedSlide(index)}
						>
							{slide.icon}
							<div
								className={`text ${
									selectedSlide === index
										? "border-b-2 text-black border-black"
										: "text-gray-600"
								}`}
							>
								{slide.text}
							</div>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
};

export default Category;
