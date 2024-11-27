import { useState } from "react";
import { RenderCalendar } from "./renderCalendar";


export const DatePicker: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState<{
        startDate: Date | null;
        endDate: Date | null;
    }>({
        startDate: null,
        endDate: null,
    });
    const [currentMonth, setCurrentMonth] = useState<Date>(new Date());

    const getMonthName = (month: number): string => {
        const monthNames = [
            '1月',
            '2月',
            '3月',
            '4月',
            '5月',
            '6月',
            '7月',
            '8月',
            '9月',
            '10月',
            '11月',
            '12月',
        ];
        return monthNames[month];
    };
    
    return (
        <div className="datePicker">
            <div className="displayBoard">
                <div>{
                    selectedDate.startDate === null ? "Start Date" :
                selectedDate.startDate?.toISOString().split("T")[0]
                }</div>
                <div>{
                    selectedDate.endDate === null ? "End Date" :
                selectedDate.endDate?.toISOString().split("T")[0]
                }</div>
            </div>
            <div className="calendarContent">
                {/* header */}
                <div className="header">
                    <button
                        onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))}
                    >
                        {"<"}
                    </button>
                    <span>{`${currentMonth.getFullYear()}年 ${getMonthName(currentMonth.getMonth())}`}</span>
                    <button
                        onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))}
                    >
                        {">"}
                    </button>
                </div>
                <div className="calendar">
                    <RenderCalendar
                        selectedDate={selectedDate}
                        currentMonth={currentMonth}
                        setSelectedDate={setSelectedDate}
                    />
                </div>
            </div>
        </div>
    );
};