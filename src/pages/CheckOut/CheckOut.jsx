import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { useContext } from "react";

const CheckOut = () => {
    const service = useLoaderData();
    const { title, _id, price,img} = service;
    const {user}=useContext(AuthContext)


    const handleBookService=event=>{
        event.preventDefault();
        const form= event.target;
        const name= form.name.value;
        const date= form.date.value;
        const email=user?.email;
        const order= {
            customerName: name,
            email,
            img,
            date,
            service_id: _id,
            service: title,
            price: price
        }
        console.log(order);
        fetch('http://localhost:5000/checkout',{
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(order)
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            if(data.insertedId){
                alert('service checkout successfully');
            }
        })
    }
    return (
        <div className="md:w-3/4 mx-auto my-12">
            <h2 className="text-center text-3xl font-semibold">book services: {title}</h2>
            <form onSubmit={handleBookService}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text" name='name' defaultValue={user?.displayName} placeholder="Service name" className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Date</span>
                        </label>
                        <input type="date"
                        name="date" className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email"
                        name="email"  defaultValue={user?.email} placeholder="email" className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Due amount</span>
                        </label>
                        <input type="text" defaultValue={'$'+ price} className="input input-bordered" />
                    </div>
                </div>
                <div className="form-control mt-6">
                    <input className="btn btn-primary btn-block" type="submit" value="Order Confirm" />
                </div>
            </form>
        </div>
    );
};

export default CheckOut;