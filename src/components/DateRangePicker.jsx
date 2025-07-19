/** @format */
import React from "react";
import { Calendar } from './Icons';
import '../styles/DateRangePicker.css'; // Import new CSS

const DateRangePicker = ({ dateRange, setDateRange }) => {
    const formatDate = (date) => {
        if (!date) return "";
        const d = new Date(date);
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    };
    const handleEndDateChange = (e) => {
        const value = e.target.value;
        if (!value) { setDateRange({ ...dateRange, end: null }); return; }
        const endDate = new Date(`${value}T12:00:00`);
        if (endDate < dateRange.start) { alert("End date cannot be before start date"); return; }
        setDateRange({ ...dateRange, end: endDate });
    };
    const handleStartDateChange = (e) => setDateRange({ ...dateRange, start: new Date(`${e.target.value}T12:00:00`) });

    return (
		<div className="date-range-form animate-fade-in">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div className="form-group">
					<label htmlFor="start-date" className="form-label">
						Start Date
					</label>
					<div className="date-input-wrapper">
						<Calendar className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
						<input
							id="start-date"
							type="date"
							value={formatDate(dateRange.start)}
							onChange={handleStartDateChange}
							className="date-input"
						/>
					</div>
				</div>
				<div className="form-group">
					<label className="form-label">Quick Pick Start Date</label>
					{/* Use the new CSS class on this container div */}
					<div className="quick-pick-container">
						{[
							{ l: "Today", v: () => new Date() },
							{
								l: "Tomorrow",
								v: () => {
									const d = new Date();
									d.setDate(d.getDate() + 1);
									return d;
								},
							},
							{
								l: "Next Week",
								v: () => {
									const d = new Date();
									d.setDate(d.getDate() + 7);
									return d;
								},
							},
							{
								l: "Next Month",
								v: () => {
									const d = new Date();
									d.setMonth(d.getMonth() + 1);
									return d;
								},
							},
						].map((o) => (
							<button
								key={o.l}
								onClick={() =>
									setDateRange({ ...dateRange, start: o.v() })
								}
								className="quick-select-button"
							>
								{o.l}
							</button>
						))}
					</div>
				</div>
				<div className="form-group">
					<label htmlFor="end-date" className="form-label">
						End Date{" "}
						<span className="text-gray-400">(optional)</span>
					</label>
					<div className="date-input-wrapper">
						<Calendar className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
						<input
							id="end-date"
							type="date"
							value={formatDate(dateRange.end)}
							onChange={handleEndDateChange}
							min={formatDate(dateRange.start)}
							className="date-input"
						/>
					</div>
				</div>
			</div>
			<div className="form-group">
				<label className="form-label">Quick Pick End Date</label>
				{/* Use the new CSS class on this container div */}
				<div className="preset-buttons-container">
					{[
						{ l: "1 Month", m: 1 },
						{ l: "3 Months", m: 3 },
						{ l: "6 Months", m: 6 },
						{ l: "1 Year", y: 1 },
					].map(({ l, m = 0, y = 0 }) => (
						<button
							key={l}
							type="button"
							onClick={() => {
								const d = new Date(dateRange.start);
								if (m) d.setMonth(d.getMonth() + m);
								if (y) d.setFullYear(d.getFullYear() + y);
								setDateRange({ ...dateRange, end: d });
							}}
							className="preset-button"
						>
							{l}
						</button>
					))}
					<button
						type="button"
						onClick={() =>
							setDateRange({ ...dateRange, end: null })
						}
						/* Apply the base class and the danger modifier */
						className="preset-button preset-button--danger"
					>
						No End Date
					</button>
				</div>
			</div>
		</div>
	);
};

export default DateRangePicker;