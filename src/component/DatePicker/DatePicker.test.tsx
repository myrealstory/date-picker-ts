import React from "react";
import {render, screen , fireEvent} from "@testing-library/react";
import {DatePicker} from "../DatePicker";

//Mock RenderCalendar function
jest.mock("../renderCalendar", () => ({
    RenderCalendar: jest.fn((selectedDate, currentMonth, setSelectedDate) => {
        return (
            <div data-testid="mockRenderCalendar">
                <button
                    data-testid="mockButton"
                    onClick={() => setSelectedDate({ startDate: new Date(2024, 10, 28), endDate: null })}
                >
                    mockButton
                </button>
            </div>
        );
    }),
}));

describe("DatePicker Component", () => {
    test("renders DatePicker component", () => {
        render(<DatePicker />);
        expect(screen.getByText("Start Date")).toBeInTheDocument();
        expect(screen.getByText("End Date")).toBeInTheDocument();
    });

    test("renders RenderCalendar component", () => {
        render(<DatePicker />);
        const currentMonth = new Date();
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
        const expectedText = `${currentMonth.getFullYear()}年 ${monthNames[currentMonth.getMonth()]}`;

        expect(screen.getByText(expectedText)).toBeInTheDocument();
    });

    test("navigates to previous and next months", ()=> {
        render(<DatePicker />);
        const previousButton = screen.getByText("<");
        const nextButton = screen.getByText(">");
        
        fireEvent.click(previousButton);
        const prevMonth = new Date();
        prevMonth.setMonth(prevMonth.getMonth() - 1);
        const prevMonthNames = `${prevMonth.getFullYear()}年 ${
            [
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
            ][prevMonth.getMonth()]
        }`;


        expect(screen.getByText(prevMonthNames)).toBeInTheDocument();

        fireEvent.click(nextButton);
        fireEvent.click(nextButton); // click twice to go forward to the original month + 1
        const nextMonth = new Date();
        nextMonth.setMonth(nextMonth.getMonth() + 1);
        const nextMonthNames = `${nextMonth.getFullYear()}年 ${
            [
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
            ][nextMonth.getMonth()]
        }`;
        expect(screen.getByText(nextMonthNames)).toBeInTheDocument();
    });
});