/** @format */

import React, { useState, useEffect } from "react";
import DateRangePicker from "./DateRangePicker";
import RecurrenceOptions from "./RecurrenceOptions";
import MiniCalendarPreview from "./MiniCalendarPreview";
import { generateRecurringDates } from "../utils/recurrenceLogic";
import { Check, Calendar, Repeat, Eye, ArrowRight, ArrowLeft } from './Icons';
import '../styles/RecurringDatePicker.css'; // Import new CSS

const RecurringDatePicker = () => {
    const [dateRange, setDateRange] = useState({ start: new Date(), end: null });
    const [recurrence, setRecurrence] = useState({ frequency: "weekly", interval: 1, daysOfWeek: [new Date().getDay()], pattern: null });
    const [dates, setDates] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [activeTab, setActiveTab] = useState("dateRange");

    useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => {
            const generatedDates = generateRecurringDates(dateRange, recurrence);
            setDates(generatedDates);
            setIsLoading(false);
        }, 200);
        return () => clearTimeout(timer);
    }, [dateRange, recurrence]);

    const handleSave = () => {
        alert(`Saving ${dates.length} dates...`);
        console.log("Generated Dates:", dates);
    };

    const tabs = [
        { id: "dateRange", name: "Date Range", icon: Calendar },
        { id: "recurrence", name: "Recurrence", icon: Repeat },
        { id: "preview", name: "Preview", icon: Eye },
    ];
    const currentTabIndex = tabs.findIndex(tab => tab.id === activeTab);

    return (
		<div className="recurring-date-picker w-full mx-auto bg-white border border-gray-200 shadow-2xl shadow-blue-100/60 rounded-2xl">
			<div className="p-6 md:p-8">
				<h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-2">
					Create a Schedule
				</h2>
				<p className="text-gray-500 text-center mb-8">
					Follow the steps below to set up your recurring dates.
				</p>
				{/* This will now be styled by RecurringDatePicker.css */}
				<div className="stepper-container">
					{tabs.map((tab, idx) => (
						<React.Fragment key={tab.id}>
							<div
								className={`stepper-item ${
									idx <= currentTabIndex
										? "active"
										: "inactive"
								}`}
							>
								<button
									onClick={() => setActiveTab(tab.id)}
									className="stepper-icon"
								>
									<tab.icon className="w-6 h-6" />
								</button>
								<p className="stepper-label">{tab.name}</p>
							</div>
							{idx < tabs.length - 1 && (
								<div
									className={`stepper-line ${
										idx < currentTabIndex ? "active" : ""
									}`}
								/>
							)}
						</React.Fragment>
					))}
				</div>
			</div>
			<div className="bg-gray-50/70 px-6 md:px-8 py-8 rounded-b-2xl">
				{activeTab === "dateRange" && (
					<DateRangePicker
						dateRange={dateRange}
						setDateRange={setDateRange}
					/>
				)}
				{activeTab === "recurrence" && (
					<RecurrenceOptions
						recurrence={recurrence}
						setRecurrence={setRecurrence}
					/>
				)}
				{activeTab === "preview" && (
					<MiniCalendarPreview dates={dates} isLoading={isLoading} />
				)}
			</div>
			<div className="navigation-footer">
				<button
					onClick={() => setActiveTab(tabs[currentTabIndex - 1].id)}
					disabled={currentTabIndex === 0}
					className="nav-button nav-button--secondary"
				>
					<ArrowLeft className="w-4 h-4" /> Back
				</button>
				{currentTabIndex < tabs.length - 1 ? (
					<button
						onClick={() =>
							setActiveTab(tabs[currentTabIndex + 1].id)
						}
						className="nav-button nav-button--primary"
					>
						Next <ArrowRight className="w-4 h-4" />
					</button>
				) : (
					<button
						onClick={handleSave}
						disabled={dates.length === 0}
						className="nav-button nav-button--success"
					>
						<Check className="w-5 h-5" /> Save Schedule (
						{dates.length})
					</button>
				)}
			</div>
		</div>
	);
};

export default RecurringDatePicker;
