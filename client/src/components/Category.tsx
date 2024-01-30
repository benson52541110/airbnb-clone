import { useState } from "react";
import { Icon } from "@iconify/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { roomCategoryList } from "../data/PlaceFormData";
import { v4 as uuidv4 } from "uuid";
import "swiper/swiper-bundle.css";
import "./Category.css";

interface CategoryProps {
	onCategorySelect: (name: string) => void;
}

const Category: React.FC<CategoryProps> = ({ onCategorySelect }) => {
	const [selectedSlide, setSelectedSlide] = useState<string>("greenhouse");
	const handleSelect = (name: string) => {
		setSelectedSlide(name);
		onCategorySelect(name);
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
				{roomCategoryList.map((slide, index: number) => (
					<SwiperSlide key={slide.id}>
						<div
							className="flex flex-col items-center justify-center h-full gap-1 text-center cursor-pointer"
							onClick={() => handleSelect(slide.name)}
						>
							<Icon icon={`mdi:${slide.icon}`} />
							<div
								className={`text ${
									selectedSlide === slide.name
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
