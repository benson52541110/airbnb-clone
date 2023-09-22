import { useState } from "react";
import { Icon } from "@iconify/react";

const Category = () => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [selectedSlide, setSelectedSlide] = useState(null);
	const slideShift = 5; // 按一次箭頭滑動的數量
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

	const goNext = () => {
		if (currentIndex + slideShift < slides.length) {
			setCurrentIndex(currentIndex + slideShift);
		}
	};

	const goPrev = () => {
		if (currentIndex - slideShift >= 0) {
			setCurrentIndex(currentIndex - slideShift);
		}
	};

	return (
		<div className="flex items-center h-20">
			{currentIndex > 0 && (
				<button onClick={goPrev} className="p-1 border-2 rounded-full">
					<Icon icon="ri:arrow-left-s-line" className="text-2xl" />
				</button>
			)}
			<div className="flex w-full h-full space-x-2 overflow-hidden">
				<div
					className="flex transition-transform duration-300 ease-in-out"
					style={{
						transform: `translateX(-${(currentIndex * 100) / slides.length}%)`,
					}}
				>
					{slides.map((slide, index) => (
						<div
							className="flex-none w-[calc(100%/9)] flex items-center justify-center gap-2 cursor-pointer   "
							key={index}
							onClick={() => setSelectedSlide(index)}
						>
							<div
								className={`flex flex-col items-center justify-center h-full gap-1 text-center hover:border-b-2 hover:border-gray-600 hover:text-black ${
									selectedSlide === index
										? "border-b-2 text-black border-black"
										: "text-gray-600"
								}`}
							>
								{slide.icon}
								<div className="text">{slide.text}</div>
							</div>
						</div>
					))}
				</div>
			</div>
			{currentIndex <
				slides.length - (slides.length % slideShift || slideShift) && (
				<button onClick={goNext} className="p-1 border-2 rounded-full">
					<Icon icon="ri:arrow-right-s-line" className="text-2xl" />
				</button>
			)}
		</div>
	);
};

export default Category;
