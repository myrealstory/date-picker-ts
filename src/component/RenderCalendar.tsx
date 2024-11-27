
interface RenderCalendarProps {
    selectedDate: { startDate: Date | null; endDate: Date | null; };
    currentMonth: Date;
    setSelectedDate: React.Dispatch<React.SetStateAction<{
        startDate: Date | null;
        endDate: Date | null;
    }>>;
}

export const RenderCalendar = ({
    selectedDate, 
    currentMonth,
    setSelectedDate }: RenderCalendarProps
) => {

    const generatesDays = (): {dates: Date; isCurrentMonth: boolean}[] => {

        const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
        const lastDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);

        const startDayOfWeek = firstDayOfMonth.getDay();
        const endDayOfWeek = lastDayOfMonth.getDay();

        const dates: {dates: Date; isCurrentMonth: boolean}[] = [];

        // Fill in the previous month's days
        if(startDayOfWeek > 0) {
            const prevMonthLastDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 0);
            for(let i= startDayOfWeek -1; i >= 0; i--){
                dates.push({
                    dates: new Date(prevMonthLastDay.getFullYear(), prevMonthLastDay.getMonth(), prevMonthLastDay.getDate() - i),
                    isCurrentMonth: false,
                });
            }
        }

        for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
            dates.push({
                dates: new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day),
                isCurrentMonth: true,
            });
        }
        
        if( endDayOfWeek < 6) {
            for(let i = 1; i <= 6 - endDayOfWeek; i++) {
                dates.push({
                    dates: new Date(lastDayOfMonth.getFullYear(), lastDayOfMonth.getMonth(), lastDayOfMonth.getDate() + i),
                    isCurrentMonth: false,
                });
            }
        }

        return dates;
    };

    const isInRange = (date: Date): boolean => {
        if(!selectedDate.startDate || !selectedDate.endDate) {
            return false;
        }

        return date >= selectedDate.startDate && date <= selectedDate.endDate;
    }

    const handleDateClick = (date: Date) => {

    // compares two dates by getTime values
    const areaDatesEqual = (date1: Date|null, date2: Date|null):boolean => {
        return date1?.getTime() === date2?.getTime();
    }
        // Deselect if the clicked date matches the startDate
    if (areaDatesEqual(selectedDate.startDate, date)) {
        setSelectedDate((prevDate) => ({
            ...prevDate,
            startDate: null,
        }));
        return;
    }
    
        if(areaDatesEqual(selectedDate.endDate, date)) {
            setSelectedDate((prevDate) => ({
                ...prevDate,
                endDate: null,
            }));
            return
        }

        if(!selectedDate.startDate || (selectedDate.startDate && selectedDate.endDate)) {
            setSelectedDate({
                startDate: date,
                endDate: null,
            });
        } else {
            setSelectedDate({
                startDate: date < selectedDate.startDate ? date : selectedDate.startDate,
                endDate: date >= selectedDate.startDate ? date : selectedDate.startDate,
            });
        }
    };

    const dates = generatesDays();

    return dates.map(({dates: date, isCurrentMonth}, index) => {
        const isToday = date.toDateString() === new Date().toDateString();
        const isSelectedStart = selectedDate.startDate?.toDateString() === date.toDateString();
        const isSelectedEnd = selectedDate.endDate?.toDateString() === date.toDateString();
        const isInSelectedRange = isInRange(date);

        return (
            <button
                key={index}
                onClick={() => handleDateClick(date)}
                className={`day 
                    ${isToday ? 'today' : ''} 
                    ${isSelectedStart || isSelectedEnd || isInSelectedRange ? 'selected' : ''} 
                    ${isCurrentMonth ? '' : 'nonCurrent'}
                `}
            >
                {date.getDate()}
            </button>
        )
    });
}