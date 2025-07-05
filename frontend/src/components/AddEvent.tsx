import Sidebar from "./Sidebar"
import { Link } from "react-router-dom";
import { useState } from "react";
import api from '../lib/api';

const AddEvent = () => {
     const [eventType, setEventType] = useState<string>('');
  const [eventDate, setEventDate] = useState<string>('11-09-2019');
  const [repeatOption, setRepeatOption] = useState<string>('');
  const [sendTime, setSendTime] = useState<string>('08:00');
  const [timezone, setTimezone] = useState<string>('IST');
  const [photo, setPhoto] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!eventType || !eventDate || !repeatOption) {
    alert("Please fill out all required fields.");
    return;
  }

  const formData = new FormData();
  formData.append('name', eventType);
  formData.append('date', eventDate);
  formData.append('repeat', repeatOption);
  formData.append('message', `Scheduled for ${sendTime} ${timezone}`);
  if (photo) {
    formData.append('photo', photo);
  }

  try {
    const response = await api.post('/api/events', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log('Event created:', response.data);
    console.log({ eventType, eventDate, repeatOption, sendTime, timezone, photo });
    alert('Event successfully added!');
    
    setEventType('');
    setEventDate('');
    setRepeatOption('');
    setSendTime('08:00');
    setTimezone('IST');
    setPhoto(null);
  } catch (err) {
    console.error('Error submitting event:', err);
    alert('Failed to add event.');
  }
};

   return (
     <div className="h-screen w-full flex flex-col bg-white">
      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        
        {/* Dashboard Content */}
        <div className="flex-1 h-full w-full flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-white w-full flex justify-center py-2 md:py-4">
            <h1 className="text-lg  md:text-2xl font-bold text-gray-800 px-4 text-center">Om Jwellery</h1>
          </div>
          
          {/* Customers Section - Takes remaining height and scrollable */}
          <div className="flex-1 flex flex-col items-center w-full px-2 md:px-10 bg-rose-50 mx-1 md:mx-2 pb-10 md:pb-10 shadow-md overflow-y-auto">
            {/* Customers Header */}
            <div className="flex flex-col md:flex-row justify-between items-start w-full md:items-center p-3 md:p-6 gap-3 md:gap-0">
              <h2 className="text-lg md:text-2xl   font-bold text-black">Add Promotion Event</h2>
              <Link to={"/events/addEvent"} >
              
              </Link>
            </div>
            <div className=" h-full w-full  bg-white rounded-lg">
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto flex flex-col ">
        {/* Photo Upload Section */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Upload Photo to be sent with Message
          </h2>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
            <input
              type="file"
              id="photo-upload"
              accept="image/*"
              onChange={(e) => setPhoto(e.target.files?.[0] || null)}
              className="hidden"
            />
            <label
              htmlFor="photo-upload"
              className="cursor-pointer block text-gray-500 hover:text-gray-700"
            >
              Click to upload or drag and drop
              <p className="text-sm text-gray-400 mt-1">PNG, JPG, GIF up to 5MB</p>
            </label>
            {photo && (
              <p className="text-sm text-gray-600 mt-2">{photo.name}</p>
            )}
          </div>
        </div>

        {/* Event Type Section */}
        <div className="mb-6">
          <div className="flex items-center mb-2">
            <div className="w-2 h-5 bg-gray-400 mr-2"></div>
            <label className="font-medium text-gray-700">Event Type</label>
          </div>
          <select
            value={eventType}
            onChange={(e) => setEventType(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select the event type</option>
            <option value="birthday">Birthday</option>
            <option value="anniversary">Anniversary</option>
            <option value="promotion">Promotion</option>
          </select>
          <div className="mt-2">
            <input
              type="text"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Date"
            />
          </div>
        </div>

        {/* Repeat Section */}
        <div className="mb-6">
          <div className="flex items-center mb-2">
            <div className="w-2 h-5 bg-gray-400 mr-2"></div>
            <label className="font-medium text-gray-700">Repeat</label>
          </div>
          <select
            value={repeatOption}
            onChange={(e) => setRepeatOption(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">When to repeat this event</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>

        {/* Time Section */}
        <div className="mb-8">
          <div className="flex items-center mb-2">
            <div className="w-2 h-5 bg-gray-400 mr-2"></div>
            <label className="font-medium text-gray-700">Time to send message</label>
          </div>
          <div className="flex gap-2">
            <input
              type="time"
              value={sendTime}
              onChange={(e) => setSendTime(e.target.value)}
              className="w-24 p-2 border border-gray-300 rounded-md"
            />
            <select
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              className="p-2 border border-gray-300 rounded-md"
            >
              <option value="IST">IST</option>
              <option value="UTC">UTC</option>
              <option value="EST">EST</option>
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <div className="  border-gray-200 pt-6 mb-4 w-full flex justify-center">
            <button
          type="submit"
          className="   w-1/2 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Add Event
        </button>
        </div>
        
      </form>
            </div>
         
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddEvent