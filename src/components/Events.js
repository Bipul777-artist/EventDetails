import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { clock_icon, location_icon } from "../constant";

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
                                <img className="w-4 h-4 pr-1 md:w-12 md:h-12" src = {clock_icon} />
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