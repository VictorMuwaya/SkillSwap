
import React from 'react';
import { DAYS, SLOTS } from '../constants';
import { Availability, TimeSlot } from '../types';

interface AvailabilityPickerProps {
  availability: Availability;
  onChange?: (newAvailability: Availability) => void;
  readOnly?: boolean;
}

const AvailabilityPicker: React.FC<AvailabilityPickerProps> = ({ availability, onChange, readOnly = false }) => {
  const toggleSlot = (day: string, slot: TimeSlot) => {
    if (readOnly || !onChange) return;
    
    const currentSlots = availability[day] || [];
    const newSlots = currentSlots.includes(slot)
      ? currentSlots.filter(s => s !== slot)
      : [...currentSlots, slot];
    
    onChange({
      ...availability,
      [day]: newSlots
    });
  };

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[600px]">
        <div className="grid grid-cols-8 gap-2 mb-2">
          <div className="col-span-1"></div>
          {DAYS.map(day => (
            <div key={day} className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest py-2">
              {day.slice(0, 3)}
            </div>
          ))}
        </div>
        
        {SLOTS.map(slot => (
          <div key={slot} className="grid grid-cols-8 gap-2 mb-2 items-center">
            <div className="text-[10px] font-bold text-slate-500 uppercase pr-2">
              {slot}
            </div>
            {DAYS.map(day => {
              const isActive = availability[day]?.includes(slot as TimeSlot);
              return (
                <button
                  key={`${day}-${slot}`}
                  disabled={readOnly}
                  onClick={() => toggleSlot(day, slot as TimeSlot)}
                  className={`h-10 rounded-xl border transition-all flex items-center justify-center
                    ${isActive 
                      ? 'bg-indigo-600 border-indigo-600 text-white shadow-sm shadow-indigo-100' 
                      : 'bg-white border-slate-100 text-slate-200 hover:border-slate-300'}
                    ${readOnly ? 'cursor-default' : 'hover:scale-105 active:scale-95 cursor-pointer'}
                  `}
                >
                  <i className={`fa-solid ${isActive ? 'fa-check' : 'fa-plus'} text-[10px]`}></i>
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvailabilityPicker;
