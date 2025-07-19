/** @format */
import React, { useState, useEffect } from "react";
import { CalendarDays, List, AlertCircle } from "./icons";
import "../styles/MiniCalendarPreview.css"; // Import new CSS

const MiniCalendarPreview = ({ dates, isLoading }) => {
	const [groupedDates, setGroupedDates] = useState({});
	const [viewMode, setViewMode] = useState("calendar");

	useEffect(() => {
		setGroupedDates(
			dates.reduce((acc, rawDate) => {
				const d = new Date(rawDate);
				const m = d.toLocaleDateString(undefined, {
					year: "numeric",
					month: "long",
				});
				if (!acc[m]) acc[m] = [];
				acc[m].push(d);
				return acc;
			}, {})
		);
	}, [dates]);

	const renderMonthCalendar = (monthYear, monthDates) => {
		const firstDate = new Date(monthDates[0]);
		const y = firstDate.getFullYear();
		const m = firstDate.getMonth();
		const daysInMonth = new Date(y, m + 1, 0).getDate();
		const firstDay = new Date(y, m, 1).getDay();
		const days = Array.from({ length: firstDay }, (_, i) => (
			<div key={`e-${i}`} className="day-cell" />
		));
		for (let day = 1; day <= daysInMonth; day++) {
			const isSelected = monthDates.some(
				(d) =>
					d.getDate() === day &&
					d.getMonth() === m &&
					d.getFullYear() === y
			);
			days.push(
				<div
					key={`d-${day}`}
					className={`day-cell ${isSelected ? "selected" : ""}`}
				>
					{day}
				</div>
			);
		}
		return (
			<div className="calendar-month" key={monthYear}>
				<h4 className="calendar-month-title">{monthYear}</h4>
				<div className="calendar-grid">
					{["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
						<div key={`h-${i}`} className="day-header">
							{d}
						</div>
					))}
					{days}
				</div>
			</div>
		);
	};

	if (isLoading)
		return (
			<div className="state-container animate-fade-in">
				<div className="loading-spinner"></div>
				<p className="state-title">Generating Dates...</p>
			</div>
		);

	return (
		<div className="calendar-preview-container animate-fade-in">
			<div className="preview-header">
				<h3 className="preview-title">
					Preview{" "}
					{dates.length > 0 && (
						<span className="occurrence-count">
							({dates.length} occurrences)
						</span>
					)}
				</h3>
            </div>
            <div className="view-toggle-container">
				{dates.length > 0 && (
					<div className="view-toggle-group">
						<button
							onClick={() => setViewMode("calendar")}
							className={`view-toggle-button ${
								viewMode === "calendar" ? "active" : "inactive"
							}`}
						>
							<CalendarDays className="w-4 h-4" />
							Calendar
						</button>
						<button
							onClick={() => setViewMode("list")}
							className={`view-toggle-button ${
								viewMode === "list" ? "active" : "inactive"
							}`}
						>
							<List className="w-4 h-4" />
							List
						</button>
					</div>
                )}
            </div>
            
			{dates.length > 0 ? (
				<div className="preview-content custom-scrollbar">
					{viewMode === "calendar" ? (
						Object.entries(groupedDates).map(([m, d]) =>
							renderMonthCalendar(m, d)
						)
					) : (
						<div className="list-view">
							{Object.entries(groupedDates).map(([m, d]) => (
								<div key={m} className="list-month-group">
									<h4 className="list-month-title">{m}</h4>
									<ul className="list-date-items">
										{d.map((dt, i) => (
											<li
												key={i}
												className="list-date-item"
											>
												<span>
													{dt.toLocaleDateString(
														undefined,
														{ weekday: "long" }
													)}
												</span>
												<span>
													{dt.toLocaleDateString(
														undefined,
														{
															day: "numeric",
															month: "short",
															year: "numeric",
														}
													)}
												</span>
											</li>
										))}
									</ul>
								</div>
							))}
						</div>
					)}
				</div>
			) : (
				<div className="state-container">
					<AlertCircle className="h-12 w-12 text-gray-300 mb-3" />
					<p className="state-title">No Dates Generated</p>
					<p className="state-subtitle">
						Adjust your settings to see a preview.
					</p>
				</div>
			)}
		</div>
	);
};

export default MiniCalendarPreview;
