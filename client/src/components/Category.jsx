import { useState } from "react";
import { Icon } from "@iconify/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { roomCategoryList } from "../data/PlaceFormData";
import "swiper/swiper-bundle.css";
import "./Category.css";

const Category = ({ initialCategory, onCategorySelect }) => {
	const initialIndex = roomCategoryList.findIndex(
		(slide) => slide.name === initialCategory
	);
	const [selectedSlide, setSelectedSlide] = useState(initialIndex);

	const handleSelect = (index) => {
		setSelectedSlide(index);
		onCategorySelect(roomCategoryList[index].name);
	};

	return (
		<div className="flex items-center h-full px-6 mt-4">
			<Swiper
				modules={[Navigation, Pagination]}
				navigation
				spaceBetween={4}
				slidesPerView={2}
				breakpoints={{
					768: {
						spaceBetween: 8,
						slidesPerView: 4,
					},
					992: {
						spaceBetween: 10,
						slidesPerView: 6,
					},
				}}
			>
				{roomCategoryList.map((slide, index) => (
					<SwiperSlide key={index}>
						<div
							className="flex flex-col items-center justify-center h-full gap-1 text-center cursor-pointer"
							onClick={() => handleSelect(index)}
						>
							<Icon icon={`mdi:${slide.icon}`} />
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
