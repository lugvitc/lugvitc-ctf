import "./GlitchEffect.css";

const Background = () => {
	return (
		<div className='sect-1 absolute left-0 top-0 z-0 flex h-[150vh] w-full flex-1 flex-wrap items-center justify-center overflow-hidden bg-black before:absolute before:h-full before:w-full before:rotate-45 before:animate-animateToptoBottom before:content-[""]'>
			{Array.from({ length: 2800 }).map((_, i) => (
				<div
					key={i}
					className=" animation-pulse z-10 m-[1px] h-[30px] w-[30px] rounded-sm bg-[#080808] text-[#181818] transition-all hover:bg-[#0f0] hover:text-[#0f0] hover:duration-1000"
				></div>
			))}
		</div>
	);
};

export default Background;
