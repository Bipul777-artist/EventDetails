import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { location_icon } from "../constant";

const Events = () => {
    const navigate = useNavigate();
    const [events, setEvents] = useState([]);

    const formatDateTime = (dateTimeString) => {
        const options = { 
          year: 'numeric', 
          month: 'short', 
          day: 'numeric', 
          hour: '2-digit', 
          minute: '2-digit' 
        };
        return new Date(dateTimeString).toLocaleString('en-US', options);
    }

    useEffect(() => {
        const storedCards = JSON.parse(localStorage.getItem('cards')); 
        if (storedCards) 
            { setEvents(storedCards) }
    },[])

    return (
        <div className="relative">
            <h1 className="my-2 mx-10 text-blue-500 font-bold underline text-xl md:text-4xl">Events</h1>
            <div className="flex flex-wrap gap-4 justify-center">
            {events.map((event, key) => {
                return (
                    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4 rounded-lg shadow-md" key={event.eventTitle}>
                    
                        <img className="h-[200px] w-full border-none rounded-md mb-4 " src= {event?.handleImage} />
                        <div className=" my-3 flex flex-col">
                            <h1 className=" ml-36 text-md font-bold md:text-3xl md:ml-24">{event?.eventTitle}</h1>
                            <div className="ml-2 flex items-center mt-2 md:w-3/5">
                                <img className="w-4 h-4 pr-1 md:w-12 md:h-12" src = "data:image/png;base64,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" />
                                <p className="text-xs md:text-md">{formatDateTime(event?.startTime)}</p>
                                
                            </div>
                           {event.landMark && <div className="flex mt-2 md:w-3/5 md:items-center">
                                <img className="w-6 h-6 md:w-12 md:h-12" src={location_icon} />
                                <p className="text-md">{event?.landMark}</p>
                            </div>}
                        </div>
                    </div>

                )

            })}
            </div>
 
            <button onClick={() => navigate("/")} className=" bg-blue-600 hover:bg-blue-700 w-3/5 transition-colors duration-200 px-3 py-2 text-white border-1 border-blue-400 rounded-lg my-4 md:w-1/4 absolute -md:bottom-4 left-1/2 -translate-x-1/2">
                Create More Events 
            </button>
        </div>
    )
};

export default Events;