import React, { useState } from 'react';
import Calendar from 'react-calendar';
import './App.css';

const App = () => {
  const [date, setDate] = useState(new Date());
  const [photo, setPhoto] = useState(null);
  const [comment, setComment] = useState('');
  const [savedData, setSavedData] = useState(() => {
    const data = localStorage.getItem('fashionData');
    return data ? JSON.parse(data) : {};
  });

  // 日付変更時の処理
  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);
    const formattedDate = selectedDate.toISOString().split('T')[0];
    setPhoto(savedData[formattedDate]?.photo || null);
    setComment(savedData[formattedDate]?.comment || '');
  };

  // 写真選択時の処理
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setPhoto(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // データ保存
  const handleSave = () => {
    const formattedDate = date.toISOString().split('T')[0];
    const updatedData = {
      ...savedData,
      [formattedDate]: { photo, comment },
    };
    setSavedData(updatedData);
    localStorage.setItem('fashionData', JSON.stringify(updatedData));
    alert('Data saved successfully!');
  };

  return (
    <div className="app">
      <h1>My Daily Fashion Coordinate</h1>
      <Calendar
        onChange={handleDateChange}
        value={date}
        locale="en-US"
        formatShortWeekday={(locale, date) =>
          ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][date.getDay()]
        }
        className="custom-calendar"
      />
      <p>Selected Date: {date.toDateString()}</p>
      <div className="photo-comment-section">
        {photo && <img src={photo} alt="Selected" className="preview-image" />}
        <input type="file" accept="image/*" onChange={handlePhotoChange} />
        <textarea
          placeholder="Add your comment here"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
        <button onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};

export default App;