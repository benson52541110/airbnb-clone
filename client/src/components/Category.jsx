import { useState } from "react";
import { Icon } from "@iconify/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/swiper-bundle.css";
import "./Category.css";

const Category = () => {
	const [selectedSlide, setSelectedSlide] = useState(null);
	const slides = [
		{ icon: <Icon icon="carbon:home" className="text-2xl" />, text: "民宿" },
		{
			icon: <Icon icon="ic:sharp-meeting-room" className="text-2xl" />,
			text: "客房",
		},
		{
			icon: <Icon icon="game-icons:island" className="text-2xl" />,
			text: "景觀",
		},
		{ icon: <Icon icon="tdesign:money" className="text-2xl" />, text: "奢華" },
		{
			icon: <Icon icon="game-icons:windmill" className="text-2xl" />,
			text: "風車",
		},
		{ icon: <Icon icon="tabler:beach" className="text-2xl" />, text: "海灘" },
		{
			icon: <Icon icon="clarity:container-line" className="text-2xl" />,
			text: "大型",
		},
		{
			icon: (
				<Icon icon="material-symbols:camping-outline" className="text-2xl" />
			),
			text: "露營",
		},
		{ icon: <Icon icon="gg:piano" className="text-2xl" />, text: "鋼琴" },
		{ icon: <Icon icon="iconoir:city" className="text-2xl" />, text: "城市" },
		{ icon: <Icon icon="mdi:chef-hat" className="text-2xl" />, text: "廚師" },
		{
			icon: <Icon icon="ic:baseline-cabin" className="text-2xl" />,
			text: "木屋",
		},
		{ icon: <Icon icon="mdi:pool" className="text-2xl" />, text: "泳池" },
		{ icon: <Icon icon="mdi:pool" className="text-2xl" />, text: "娛樂" },
		{
			icon: <Icon icon="ic:outline-home" className="text-2xl" />,
			text: "小屋",
		},
		{
			icon: <Icon icon="arcticons:arcticons" className="text-2xl" />,
			text: "雪景",
		},
		{
			icon: (
				<Icon
					icon="material-symbols:temple-buddhist-outline"
					className="text-2xl"
				/>
			),
			text: "寺廟",
		},
		{ icon: <Icon icon="ph:park" className="text-2xl" />, text: "公園" },
		{ icon: <Icon icon="mdi:fire" className="text-2xl" />, text: "篝火" },
		{
			icon: <Icon icon="fluent:water-48-regular" className="text-2xl" />,
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
