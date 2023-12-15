import { ThreeDots } from "react-loader-spinner";

function Loading() {
	return (
		<div className="flex items-center justify-center w-full h-screen">
			<ThreeDots
				height="80"
				width="80"
				radius="9"
				color="#FF000"
				ariaLabel="three-dots-loading"
				wrapperStyle={{}}
				wrapperClassName=""
				visible={true}
			/>
		</div>
	);
}

export default Loading;
