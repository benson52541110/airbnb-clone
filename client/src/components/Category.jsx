import { useState } from "react";
import { Icon } from "@iconify/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/swiper-bundle.css";
import "./Category.css";

const Category = () => {
	const [selectedSlide, setSelectedSlide] = useState(null);
	const slides = [
		{ icon: <Icon icon="carbon:home" className="text-2xl" />, text: "Minsus" },
		{
			icon: <Icon icon="ic:sharp-meeting-room" className="text-2xl" />,
			text: "Rooms",
		},
		{
			icon: <Icon icon="game-icons:island" className="text-2xl" />,
			text: "Views",
		},
		{ icon: <Icon icon="tdesign:money" className="text-2xl" />, text: "Luxe" },
		{
			icon: <Icon icon="game-icons:windmill" className="text-2xl" />,
			text: "Windmills",
		},
		{ icon: <Icon icon="tabler:beach" className="text-2xl" />, text: "Beach" },
		{
			icon: <Icon icon="clarity:container-line" className="text-2xl" />,
			text: "Container",
		},
		{
			icon: (
				<Icon icon="material-symbols:camping-outline" className="text-2xl" />
			),
			text: "Camping",
		},
		{ icon: <Icon icon="gg:piano" className="text-2xl" />, text: "Piano" },
		{ icon: <Icon icon="iconoir:city" className="text-2xl" />, text: "City" },
		{ icon: <Icon icon="mdi:chef-hat" className="text-2xl" />, text: "Chef" },
		{
			icon: <Icon icon="ic:baseline-cabin" className="text-2xl" />,
			text: "Cabins",
		},
		{ icon: <Icon icon="mdi:pool" className="text-2xl" />, text: "Pools" },
		{ icon: <Icon icon="mdi:pool" className="text-2xl" />, text: "Play" },
		{
			icon: <Icon icon="ic:outline-home" className="text-2xl" />,
			text: "Home",
		},
		{
			icon: <Icon icon="arcticons:arcticons" className="text-2xl" />,
			text: "arctics",
		},
		{
			icon: (
				<Icon
					icon="material-symbols:temple-buddhist-outline"
					className="text-2xl"
				/>
			),
			text: "temples",
		},
		{ icon: <Icon icon="ph:park" className="text-2xl" />, text: "Park" },
		{ icon: <Icon icon="mdi:fire" className="text-2xl" />, text: "Trending" },
		{
			icon: <Icon icon="fluent:water-48-regular" className="text-2xl" />,
			text: "Lake",
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
