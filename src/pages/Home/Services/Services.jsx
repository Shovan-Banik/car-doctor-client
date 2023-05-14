import { useEffect, useState } from "react";
import ServiceCard from "./ServiceCard";

const Services = () => {
    const [services,setServices]=useState([]);
    useEffect(()=>{
        fetch('http://localhost:5000/services')
        .then(res=>res.json())
        .then(data=>setServices(data));
    },[])
    return (
        <div className="mt-12 ">
            <div className="text-center space-y-5 mb-12">
                <h3 className="text-2xl font-bold text-orange-500">Service</h3>
                <h2 className="text-5xl font-semibold">Our Service Area</h2>
                <p>the majority have suffered alteration in some form, by injected humour, or randomised <br /> words which do not look even slightly believable. </p>
            </div>
            <div className="md:grid md:grid-cols-3 gap-12">
               {
                services.map(service=><ServiceCard
                key={service._id}
                service={service}
                ></ServiceCard>)
               }
            </div>
        </div>
    );
};

export default Services;