import React from 'react';
import './App.css';
import {gql, useQuery} from "@apollo/client";
import {initMetric} from "web-vitals/dist/modules/lib/initMetric";

type Order = {
    order: string;
    origin: string;
    total: number;
    createdAt: string;
    items: [Item];
}

type Item = {
    name: string;
    image: string;
    qty: number;
    cost: number;
    currency: string;
}
const GET_ORDER = gql`query {
    placedOrders{
        order
        origin
        total
        createdAt
        items{
            name
            image
            qty
            cost
            currency
        }
    }
}
`
function App() {
    const {data} = useQuery<{placedOrders: Order[]}>(GET_ORDER)
    console.log(data)
    return (
        <ul>
            {data?.placedOrders?.map(order => {
                console.log(order)
                return(
                    <div>
                        <li key={order.order}>
                            <p>order: {order.order}</p>
                            <p>origin: {order.origin}</p>
                            <p>total: {order.total}</p>
                            <p>createdAt: {order.createdAt}</p>
                            {order.items.map(item => {
                                return(
                                    <li key={item.name} style={{marginLeft: 30}}>
                                        <p>name: {item.name}</p>
                                        <p>image: {item.image}</p>
                                        <p>qty: {item.qty}</p>
                                        <p>cost: {item.cost}</p>
                                        <p>currency: {item.currency}</p>
                                    </li>
                                    )
                            })}
                        </li>
                    </div>
                )
            })}
        </ul>
    )
}

export default App;
