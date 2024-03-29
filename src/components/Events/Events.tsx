import EventCard from "./EventCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useRef, useState } from "react";
import EventModal from "./EventModal";
import { Event, EventFromList } from "../../models/Event";
import axios from "axios";

import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import Icon from "./Icon";
const Events = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [expandedEvent, setExpandedEvent] = useState<Event>(events[0]);
  const eventBaseUrl = "https://gdsc.community.dev/api/event/";

  const defImageUrl =
    "https://res.cloudinary.com/startup-grind/image/fetch/c_fill,w_500,h_500,g_center/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/https://res.cloudinary.com/startup-grind/image/upload/c_fill%2Cdpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-dsc/event_banners/gdev-eccosystems-bevy-chapters-thumbnail_fMd5BWp.png";

  let sliderRef = useRef(null);
  useEffect(() => {
    if (events.length > 0) {
      setExpandedEvent(events[0]);
    }
  }, [events]);
  async function getEvents() {
    try {
      const eventsListRes = await axios.get(eventBaseUrl + "?chapter=3432");
      const eventsList: EventFromList[] = eventsListRes.data.results;
      const eventDetailsPromises = eventsList.map(
        async (event: EventFromList) => {
          const eventRes = await axios.get(eventBaseUrl + event.id);

          return eventRes.data as Event;
        }
      );
      const eventDetails = await Promise.all(eventDetailsPromises);
      setEvents(eventDetails);
    } catch (error) {
      console.error(error);
    }
  }

  const handleReadMoreClick = (event: Event) => {
    setExpandedEvent(event);
    const modalElement = document.getElementById(
      "my_modal_3"
    ) as HTMLDialogElement;
    modalElement?.showModal();
  };

  useEffect(() => {
    getEvents();
  }, []);

  function formatDate(dateString: string) {
    const formattedDate = new Date(dateString).toUTCString().slice(0, 16);
    return formattedDate;
  }
  function formatTime(dateString: string) {
    const formattedTime = new Date(dateString).toLocaleTimeString("en-US", {
      timeStyle: "medium",
    });
    const time = formattedTime.split(":");
    return time[0] + ":" + time[1] + " " + time[2].split(" ")[1];
  }

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,

    rows: 1,
    slidesPerRow: 1,
    speed: 1000,
    initialSlide: 0,

    responsive: [
      {
        breakpoint: 1920,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          rows: 1,
        },
      },
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          rows: 1,
        },
      },

      {
        breakpoint: 1250,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          rows: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          rows: 1,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          rows: 1,
        },
      },

      {
        breakpoint: 650,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          slidesPerRow: 1,
          dots: false,
        },
      },
    ],
  };

  return (
    <div className='w-screen  flex flex-col items-center '>
      {expandedEvent && (
        <EventModal
          expandedEvent={expandedEvent}
          formatDate={formatDate}
          formatTime={formatTime}
        />
      )}
      <div className='text-6xl h-1/6 font-bold w-screen text-center text-white font-game1 align-bottom flex items-center'>
        <span className='pt-14 w-full text-6xl'>Events</span>
      </div>

      <div className='flex justify-center w-full h-full items-center align-middle'>
        <VerticalTimeline>
          <div className='slider-container lg:w-[70%] w-[80%] lg:m-4 h-min'>
            {/* <Slider ref={sliderRef} {...settings}>
            {events.map((event) => (
              <div key={event.id} className='p-4 l'>
                <EventCard
                  event={event}
                  handleReadMoreClick={handleReadMoreClick}
                  formatDate={formatDate}
                  formatTime={formatTime}
                />
              </div>
            ))}
          </Slider> */}

            {events.map((event) => (
              <VerticalTimelineElement
                className='vertical-timeline-element--work'
                contentStyle={{
                  background: "rgb(33, 150, 243)",
                  color: "#fff",
                }}
                contentArrowStyle={{
                  borderRight: "7px solid  rgb(33, 150, 243)",
                }}
                date='2011 - present'
                iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
                icon={<Icon url={event.picture.url || defImageUrl} />}
              >
                <EventCard
                  event={event}
                  handleReadMoreClick={handleReadMoreClick}
                  formatDate={formatDate}
                  formatTime={formatTime}
                />
              </VerticalTimelineElement>
            ))}
          </div>
        </VerticalTimeline>
      </div>
    </div>
  );
};

export default Events;
