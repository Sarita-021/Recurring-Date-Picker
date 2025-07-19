/** @format */

import React from "react";
import "./styles/App.css"; // Import the new CSS file
import RecurringDatePicker from "./components/RecurringDatePicker";
import { CalendarClock, BarChart3, Wand2 } from "./components/Icons";

export default function App() {
    return (
		<div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 font-sans antialiased">
			<div className="container mx-auto px-4 py-12 md:py-16">
				<header className="mb-12 text-center">
					<h1 className="text-5xl md:text-6xl font-extrabold bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-700 tracking-tight">
						Recurring Date Picker
					</h1>
					<p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
						Easily set up recurring schedules and preview your
						selected dates in a clean, minimal interface.
					</p>
					<div className="mt-6 text-center choose-recurrence">
						<p className="text-sm text-gray-500 mb-2">
							Choose your recurrence frequency:
						</p>
						<div className="flex justify-center flex-wrap gap-3 mb-4 ">
							<span
								className="span"
								style={{
									backgroundColor: "#dbeafe",
									color: "#1e40af",
								}}
							>
								Daily
							</span>
							<span
								className="span"
								style={{
									backgroundColor: "#fcdddcff",
									color: "#651616ff",
								}}
							>
								Weekly
							</span>
							<span
								className="span"
								style={{
									backgroundColor: "#dcfce7",
									color: "#166534",
								}}
							>
								Monthly
							</span>
							<span
								className="span"
								style={{
									backgroundColor: "#fef9c3",
									color: "#854d0e",
								}}
							>
								{" "}
								Yearly{" "}
							</span>
						</div>
					</div>
				</header>

				<main className="w-full max-w-5xl mx-auto px-4 md:px-8">
					<RecurringDatePicker />
				</main>

				<section className="w-full max-w-6xl mx-auto mt-24 text-center">
					<h2 className="text-4xl font-bold text-gray-800 mb-12">
						Powerful Features
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						{/* These will now be styled by App.css */}
						<div className="feature-card">
							<div
								className="icon-wrapper"
								style={{
									backgroundColor:
										"var(--primary-color-light)",
								}}
							>
								<CalendarClock className="w-8 h-8 text-blue-600" />
							</div>
							<h3>Flexible Recurrence</h3>
							<p>
								Set daily, weekly, monthly, or yearly recurrence
								patterns with custom intervals.
							</p>
						</div>
						<div className="feature-card">
							<div
								className="icon-wrapper"
								style={{ backgroundColor: "#dcfce7" }}
							>
								{" "}
								{/* green-100 */}
								<BarChart3 className="w-8 h-8 text-green-600" />
							</div>
							<h3>Visual Preview</h3>
							<p>
								See all generated dates in an intuitive calendar
								view or list format.
							</p>
						</div>
						<div className="feature-card">
							<div
								className="icon-wrapper"
								style={{ backgroundColor: "#f3e8ff" }}
							>
								{" "}
								{/* purple-100 */}
								<Wand2 className="w-8 h-8 text-purple-600" />
							</div>
							<h3>Easy to Use</h3>
							<p>
								Intuitive interface with quick selection options
								and helpful presets.
							</p>
						</div>
					</div>
				</section>

				<footer className="mt-24 mb-8 text-center text-gray-500">
					<div className="mb-2">
						Built with <span className="text-pink-500">❤️</span> by{" "}
						<span className="font-semibold text-gray-700">
							Sarita
						</span>
					</div>
					<div className="text-xs text-gray-400">
						Powered by React + Tailwind CSS
					</div>
				</footer>
			</div>
		</div>
	);
}