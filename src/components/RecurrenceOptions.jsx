/** @format */
import React, { useState, useEffect } from "react";
import "../styles/RecurrenceOptions.css"; // Make sure this CSS file is imported

const RecurrenceOptions = ({ recurrence, setRecurrence }) => {
	const [monthlyType, setMonthlyType] = useState(
		recurrence.pattern ? "weekday" : "day"
	);
	const [monthlyPattern, setMonthlyPattern] = useState({
		ordinal: "First",
		weekday: "Mon",
	});

	useEffect(() => {
		if (recurrence.frequency === "monthly") {
			const newPattern =
				monthlyType === "day"
					? null
					: `${monthlyPattern.ordinal} ${monthlyPattern.weekday}`;
			setRecurrence((prev) => ({ ...prev, pattern: newPattern }));
		}
	}, [monthlyType, monthlyPattern, recurrence.frequency, setRecurrence]);

	const handleFrequencyChange = (e) => {
		const newFrequency = e.target.value;
		setRecurrence((prev) => ({
			...prev,
			frequency: newFrequency,
			pattern: newFrequency !== "monthly" ? null : prev.pattern,
		}));
	};

	const handleDayToggle = (index) => {
		const currentDays = recurrence.daysOfWeek || [];
		const newDays = currentDays.includes(index)
			? currentDays.filter((d) => d !== index)
			: [...currentDays, index];
		if (newDays.length > 0) {
			setRecurrence({ ...recurrence, daysOfWeek: newDays });
		}
	};

	return (
		<div className="recurrence-options animate-fade-in">
			<div className="option-card">
				<div className="form-grid">
					<div>
						<label className="form-label">Frequency</label>
						<select
							value={recurrence.frequency}
							onChange={handleFrequencyChange}
							className="form-select"
						>
							<option value="daily">Daily</option>
							<option value="weekly">Weekly</option>
							<option value="monthly">Monthly</option>
							<option value="yearly">Yearly</option>
						</select>
					</div>
					<div>
						<label className="form-label">Repeat Every</label>
						<div className="input-group">
							<input
								type="number"
								min="1"
								value={recurrence.interval}
								onChange={(e) =>
									setRecurrence({
										...recurrence,
										interval: parseInt(e.target.value) || 1,
									})
								}
								className="form-input"
							/>
							<span>
								{recurrence.frequency}
								{recurrence.interval > 1 ? "s" : ""}
							</span>
						</div>
					</div>
				</div>
			</div>

			{recurrence.frequency === "weekly" && (
				<div className="option-card animate-fade-in">
					<label
						className="form-label"
						style={{ marginBottom: "0.75rem" }}
					>
						Repeat On
					</label>
					<div className="weekly-days-container">
						{["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
							(day, index) => (
								<button
									key={index}
									type="button"
									onClick={() => handleDayToggle(index)}
									className={`day-toggle-button ${
										recurrence.daysOfWeek?.includes(index)
											? "selected"
											: "unselected"
									}`}
								>
									{day}
								</button>
							)
						)}
					</div>
				</div>
			)}

			{recurrence.frequency === "monthly" && (
				<div className="option-card animate-fade-in">
					<div>
						<label
							className="form-label"
							style={{ marginBottom: "0.5rem" }}
						>
							Monthly Pattern
						</label>
						<select
							value={monthlyType}
							onChange={(e) => setMonthlyType(e.target.value)}
							className="form-select"
						>
							<option value="day">
								On the same day of the month
							</option>
							<option value="weekday">
								On a specific day of the week
							</option>
						</select>
					</div>
					{monthlyType === "weekday" && (
						<div
							className="form-grid animate-fade-in"
							style={{ marginTop: "1rem" }}
						>
							<select
								value={monthlyPattern.ordinal}
								onChange={(e) =>
									setMonthlyPattern((p) => ({
										...p,
										ordinal: e.target.value,
									}))
								}
								className="form-select"
							>
								{[
									"First",
									"Second",
									"Third",
									"Fourth",
									"Last",
								].map((o) => (
									<option key={o} value={o}>
										{o}
									</option>
								))}
							</select>
							<select
								value={monthlyPattern.weekday}
								onChange={(e) =>
									setMonthlyPattern((p) => ({
										...p,
										weekday: e.target.value,
									}))
								}
								className="form-select"
							>
								{[
									"Sun",
									"Mon",
									"Tue",
									"Wed",
									"Thu",
									"Fri",
									"Sat",
								].map((d) => (
									<option key={d} value={d}>
										{d}
									</option>
								))}
							</select>
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default RecurrenceOptions;
