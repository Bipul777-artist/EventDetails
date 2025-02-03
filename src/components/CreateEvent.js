import { useEffect, useState } from "react";
import { bg_img, cursor_down, cursor_right, cursor_up, location_icon, write_icon } from "../constant";
import { useNavigate } from "react-router-dom";


const CreateEvent = () => {
    const navigate = useNavigate();
    const [aspectRatioValid, setAspectRatioValid] = useState(null);
    const [handleImage, setHandleImage] = useState(bg_img)
    const [buttonText, setButtonText] = useState("Add Photos");
    const [eventTitle, setEventTitle] = useState('')
    const [startTime, setStartTime] =useState('');
    const [endTime, setEndTime] =useState('');
    const [error, setError] = useState('');
    const [location, setLocation] = useState('');
    const [landMark, setLandMark] = useState('');
    const [visibility, setVisibility] = useState(cursor_right);
    const [description, setDescription] = useState(cursor_right);
    const [descriptionText, setDescriptionText]= useState('')
    const [cards, setCards] = useState([]);

    const validateDates = (start, end) => {
        if (!start || !end) return true;
        const startDate = new Date(start);
        const endDate = new Date(end);
        return startDate <= endDate;
    };

    const handleStartTime = (e) => {
        const value = e.target.value
        console.log(startTime);
       setStartTime(value);
       if (!validateDates(startTime, value)) {
        setError('Start date cannot be after end date');
      } else {
        setError('');
      }
    } 

    const handleEndTime = (e) => {

    const value = e.target.value;
       setEndTime(value);
        console.log(endTime)
       if (!validateDates(startTime, value)) {
        setError('End date cannot be before start date');
      } else {
        setError('');
      }
        
    } 

    const isFormValid = () => {
        const isTitleValid = eventTitle && eventTitle.trim() !== '';
        const isDateValid = startTime && endTime && !error;
        const isLocationValid = location && location.trim() !== '';
        const isValidImage = handleImage != bg_img;
        const isDescription = descriptionText && descriptionText.trim() !== '';
        console.log(isTitleValid);
        return isTitleValid && isDateValid && isLocationValid && isValidImage &&isDescription;
        localStorage.setItem()
    }

    const handleSubmit = (e) => {
        // e.preventDefault();
        setError('');
    
        if (!isFormValid()) {
            return;
        }
    
        const newCard = {eventTitle, startTime, landMark, handleImage }
        const updatedCards = [...cards, newCard]
        setCards(updatedCards);
        localStorage.setItem('cards', JSON.stringify(updatedCards));
        navigate("/events");
        
    }
    useEffect(() =>{
        const storedCards = JSON.parse(localStorage.getItem('cards')); 
        if (storedCards) { setCards(storedCards); }
    }, []);

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        
        const img = new Image();

    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      const width = img.width;
      const height = img.height;
      const aspectRatio = width / height;
      const targetAspectRatio = 4 / 5;

      let targetWidth, targetHeight;

      if (aspectRatio > targetAspectRatio) {
        targetWidth = height * targetAspectRatio;
        targetHeight = height;
      } else {
        targetWidth = width;
        targetHeight = width / targetAspectRatio;
      }

      canvas.width = targetWidth;
      canvas.height = targetHeight;
    

      // Draw the image on the canvas with calculated dimensions
      ctx.drawImage(img, (width - targetWidth) / 2, (height - targetHeight) / 2, targetWidth, targetHeight, 0, 0, targetWidth, targetHeight);

      const base64String = canvas.toDataURL('image/jpeg');
      
      setHandleImage(base64String);
      setButtonText("Replace Photos");
    };
        if (file) {
            const url = URL.createObjectURL(file);
            img.src = url;
          }
        
    }

    const handleVisibilty = () => {
        setVisibility(false);
    }

    const handleTitleChange = (e) => {
        setEventTitle(e.target.value);
        console.log({eventTitle});
    }

    return (
        <div className="min-w-2/3 relative overflow-hidden md:max-w-full">
            <div className="mx-10 w-full md:mx-20">
                <div className="relative ">
                    <h1 className="text-xl my-2 pl-10 md:text-3xl md:mx-96">Create New Event</h1>

                    <img className="w-4/5 h-full border-none rounded-md md:mx-20" src= {handleImage}  alt="Selected" />

                    <input id="file-input"  className="hidden" type="file" accept="image/*" onChange={handleFileChange}/>
                    <label className="absolute bottom-5 left-1/3 -translate-x-1/3 bg-white text-md py-2.5 px-1.5 cursor-pointer border-white border-2 rounded-md md:bottom-4 md:translate-x-28" htmlFor="file-input">
                        {buttonText}
                    </label>

                </div>
                <div className="min-w-2/3 md:w-full md:mx-20">
                    <div className="w-4/5 my-2 flex flex-col md:w-3/5 md:mx-20 md:flex-row md:items-center md:justify-around">
                        <label className="text-xl my-2 md:text-3xl">Event Title</label>
                        <input 
                            onChange={handleTitleChange} 
                            className=" border-2 px-1.5 py-2 border-slate-600 rounded-lg md:w-3/5" 
                            type="text" 
                            placeholder="Enter a Name"  
                            value={eventTitle}
                        />
                    </div>
                    <div className="h-2 my-4 w-4/5 bg-gray-200 border-y-2 border-gray-200 md:mx-20 md:w-3/5">

                    </div>
                    <form onSubmit={handleSubmit} className="w-4/5 md:w-3/5 md:mx-20 overflow-hidden">
                        <div className="grid grid-cols-6 mt-4">
                            <div className="flex flex-col col-span-1">
                                <img className="h-8 w-8" src={cursor_up} />
                                <div className="h-8 w-8 ml-4 border-l-2 border-gray-400 "></div>
                                <img className="h-8 w-8" src={cursor_down} />
                            </div>
                            <div className="col-span-5 h-24 flex flex-col justify-between">
                                <div className=" flex items-center justify-between">
                                    <label className="md:text-4xl" htmlFor="start">Start</label>
                                    <input
                                        className="py-2 px-1.5 w-2/3 text-sm border-2 border-gray-400 rounded-lg " 
                                        id="start"
                                        type="datetime-local"
                                        value={startTime}
                                        onChange={handleStartTime}
                                        required
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <label className="md:text-4xl" htmlFor="end">End</label>
    
                                    <input
                                        className="py-2 px-1.5 w-2/3 text-sm border-2  border-gray-400 rounded-lg " 
                                        id="end"
                                        type="datetime-local"
                                        value={endTime}
                                        onChange={handleEndTime}
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        {error && (
                            <div className="p-4 w-[300px] bg-red-100 rounded-md border border-red-300">
                            {error}
                            </div>
                        )}
                    
                
                    <div className="h-2 my-4 w-full bg-gray-200 border-y-2 border-gray-200">

                    </div>
                    <div>
                        <div className="mx-2 flex items-start justify-between">
                        <img className="w-8 h-8" src={location_icon} />
                        <label className="-ml-20 md:text-4xl">
                            Location
                        </label>
                        <img htmlFor="location" className="w-8 h-8" onClick={() => setVisibility(!visibility)} src = {visibility ? cursor_right : cursor_down} />
                        </div>
                        {!visibility && <input 
                            id="location"
                            className="my-4 border-2 w-full h-27 px-1.5 py-4 border-slate-600 rounded-lg text-wrap"
                            value={location}
                            placeholder="Give A Location"
                            onChange={(e) => setLocation(e.target.value)}
                            required
                        />}
                        {
                            <input 
                                id = "landmark"
                                className="my-4 w-full h-27 px-1.5 py-4 border-2 border-slate-600 rounded-lg text-wrap"
                                value={landMark}
                                placeholder="LandMark"
                                onChange={(e) => setLandMark(e.target.value)}
                            />
                        }
                    </div>

                    <div className="h-2 my-4 w-full bg-gray-200 border-y-2 border-gray-200">

                    </div>

                    <div className="">
                        <div className="mx-2 flex items-start justify-between ">
                            <img className="h-8 w-8" src= {write_icon} />
                            <label className="md:text-4xl">
                                Add a Description
                            </label>
                            <img htmlFor="description" className="w-8 h-8" onClick={() => setDescription(!description)} src = {description ? cursor_right : cursor_down} />
                        </div>
                        {!description && <input 
                            id="description"
                            placeholder="Add a brief description to let attendees know about your event"
                            className="my-4 w-full h-16 border-2 border-slate-600 rounded-lg text-wrap"
                            required
                            value={descriptionText}
                            onChange={(e) => setDescriptionText(e.target.value)}
                        />}
                    </div>

                    <button
                        type="submit" 
                        disabled={!isFormValid()}
                        className={`my-4 text-white px-3 py-2 w-full border-1 border-blue-400 rounded-lg
                            ${!isFormValid()    
                                ? 'bg-blue-400 cursor-not-allowed'      
                                : 'bg-blue-800 hover:bg-blue-700 transition-colors duration-200'  
                            }`
                        }
                        
                    > 
                        {isFormValid() ? 'Create Event' : 'Please Fill Required Fields'}
                         
                    </button>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateEvent;