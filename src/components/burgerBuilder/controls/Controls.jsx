import React from "react";
import { Button, Card, CardBody, CardFooter, CardHeader } from "reactstrap";

const controls = [
  { label: "Cheese", type: "cheese" },
  { label: "Cucumber", type: "cucumber" },
  { label: "Tomato", type: "tomato" },
  { label: "Vegitable", type: "vegitable" },
  { label: "Onion", type: "onion" },
  { label: "Meat", type: "meat" },
];

const BuildControl = (props) => {
  return (
    <div style={{display: 'flex', alignItems: 'center', justifyContent: "space-between"}}>
      <div className="mr-auto ml-5" style={{fontSize: '20px', fontWeight: "600"}}>{props.label}</div>
      <div className="mt-2">
        <button onClick={()=> props.remove(props.type)} className="btn btn-sm-1 btn-secondary" style={{marginLeft: "5px", fontSize: "20px", fontWeight: "800", width: "40px"}}>–</button>
        <button onClick={()=> props.add(props.type)} className="btn btn-sm-1" style={{background: 'tomato', color: 'white', marginLeft: "5px", fontSize: "20px", fontWeight: "800", width: "40px"}}>+</button>
      </div>
    </div>
  );
};

const Controls = (props) => {
  return (
    <div className="container ml-md-5 " style={{ textAlign: "center" }}>
      <Card className="mt-4 mb-4" style={{ textAlign: "center" }}>
        <CardHeader
          style={{
            background: "tomato",
            color: "white",
            fontSize: "20px",
            fontWeight: "600",
          }}
        >
          Add Ingredients
        </CardHeader>
        <CardBody>
          {controls.map((item, index) => {
            return (
              <BuildControl key={index} label={item.label} type={item.type} add={props.add} remove={props.remove}/>
            );
          })}
          <Button onClick={props.reset} className="btn btn-danger">Reset</Button>
        </CardBody>
        <CardFooter>
          <h5>Price: <span style={{color:'gray', fontWeight: 700}}>{props.totalPrice}</span> BDT</h5>
          <Button disabled={props.disable} style={{width: '100%', background: "tomato", fontWeight: "700"}} onClick={props.toggle}>Order Now</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Controls;
