import Category from "../components/Category";
import { Icon } from "@iconify/react";

const Main = () => {
	return (
		<div className="flex flex-col w-full">
			<Category></Category>
			<div className="flex flex-wrap gap-6">
				{Array.from({ length: 6 }).map((_, index) => (
					<div
						key={index}
						className="flex flex-col w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] xl:w-[calc(25%-18px)]  mt-4 gap-6 h-full"
					>
						<div
							className="bg-center bg-no-repeat bg-cover grow-[10] rounded-2xl aspect-[3/4]"
							style={{ backgroundImage: `url('/assets/item-1-1.webp')` }}
						></div>
						<div className="flex flex-col grow-[3]">
							<div className="flex justify-between">
								<div>Dongshan Township, Taiwan</div>
								<div className="flex">
									<div>3.5</div>
									<Icon icon="ic:baseline-star" />
								</div>
							</div>
							<div className="">Host by Benson</div>
							<div className="">23-28 June</div>
							<div className="">RS. 83,996 night</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Main;
