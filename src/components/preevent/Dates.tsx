import cn from "../../lib/cn";

const dates = [
	9, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25,
];

export default function Dates({
	setDate,
}: {
	setDate: (date: number) => void;
}) {
	const today = new Date().getDate();

	const onDateClick = (date: number) => {
		if (date === today) setDate(date);
	};

	return (
		<div className="flex h-full w-full flex-wrap items-center justify-center">
			{dates.map((date, i) => (
				<div
					key={i}
					onClick={() => onDateClick(date)}
					className={cn("flex h-1/5 w-1/5 m-2 flex-col top-0 rounded-xl border shadow-sm border-gray-700 bg-slate-900 shadow-slate-700/[.7] hover:bg-slate-900/[.5]", date !== today ? "cursor-not-allowed" : "cursor-pointer")}
				>
					<div className="p-4">
						<h3 className={cn("text-lg font-bold", (date !== today ? "text-gray-600" : "text-white"))}>
							{date}
						</h3>
						<p className={cn("mt-2 ", (date !== today ? "text-gray-500" : "text-gray-300"))}>
							January, 2024
						</p>
					</div>
				</div>
			))}
		</div>
	);
}
