import React, { useState, useEffect } from "react";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { CheckCircle2, Flame, Trophy, Target, RotateCcw, Calendar } from "lucide-react";
import "./App.css";

export default function App() {
  const [progress, setProgress] = useLocalStorage("habit-pro-v2", {});
  const days = Array.from({ length: 30 }, (_, i) => i + 1);

  // Waxaan xisaabinaynaa taariikhda maanta si ay u noqoto barta bilowga
  const startDate = new Date(); 

  const toggleDay = (day) => {
    setProgress((prev) => ({ ...prev, [day]: !prev[day] }));
  };

  const handleReset = () => {
    if (window.confirm("Ma hubtaa inaad tirtirto dhammaan xogta?")) {
      setProgress({});
    }
  };

  const completed = Object.values(progress).filter(Boolean).length;
  const percentage = Math.round((completed / 30) * 100);

  // Function xisaabinaya taariikhda badhan kasta
  const getButtonDate = (dayNumber) => {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + (dayNumber - 1));
    return date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit' });
  };

  return (
    <div className="page-wrapper">
      <div className="main-container">
        
        {/* Sidebar Info */}
        <aside className="stats-card">
          <div className="header-badge">30 DAYS CHALLENGE</div>
          <h1 className="title">Habit Builder</h1>
          <p className="current-date">
             <Calendar size={14} /> {startDate.toLocaleDateString('so-SO', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <div className="progress-section">
            <div className="progress-info">
              <span>Horumarka</span>
              <span className="percent">{percentage}%</span>
            </div>
            <div className="progress-bar-bg">
              <div className="progress-bar-fill" style={{ width: `${percentage}%` }}></div>
            </div>
          </div>

          <div className="badges-grid">
            <div className="badge">
              <Flame className="icon-flame" />
              <div className="badge-text">
                <span className="count">{completed}</span>
                <span className="label">Maalmood</span>
              </div>
            </div>
            <div className="badge">
              <Trophy className="icon-trophy" />
              <div className="badge-text">
                <span className="count">{30 - completed}</span>
                <span className="label">Dhiman</span>
              </div>
            </div>
          </div>

          <button className="reset-btn" onClick={handleReset}>
            <RotateCcw size={16} /> Dib u bilow xogta
          </button>
        </aside>

        {/* Main Grid Card */}
        <main className="grid-card">
          <div className="grid-header">
            <Target size={20} />
            <h2>Dhammeystir Maalmaha</h2>
          </div>
          
          <div className="days-grid">
            {days.map((d) => {
              const buttonDate = getButtonDate(d);
              const isToday = d === 1; // Maalinta kowaad waa maanta mar walba markuu bilaabo

              return (
                <button
                  key={d}
                  onClick={() => toggleDay(d)}
                  className={`day-btn ${progress[d] ? "completed" : ""} ${isToday ? "is-today" : ""}`}
                >
                  <div className="btn-content">
                    <span className="day-num">Day {d}</span>
                    <span className="date-str">{buttonDate}</span>
                    {progress[d] && <CheckCircle2 size={18} className="check-icon" />}
                  </div>
                  {isToday && <span className="today-tag">Maanta</span>}
                </button>
              );
            })}
          </div>
        </main>

      </div>
    </div>
  );
}