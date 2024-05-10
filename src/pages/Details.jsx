import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFirebase } from "../context/Firebase";

export default function Details() {
  //   const params = useParams();
  const params = useParams();
  const firebase = useFirebase();

  const [data, setData] = useState(null);
  const [url, setURL] = useState(null);

  //   console.log(data);

  useEffect(() => {
    firebase
      .getProductById(params.productId)
      .then((value) => setData(value.data()));
  }, []);

  useEffect(() => {
    if (data) {
      const imageURL = data.imageURL;
      firebase.getImageURL(imageURL).then((url) => setURL(url));
    }
  }, [data]);

  if (data == null) return <h1>Loading</h1>;

  return (
    <div className="container-details">
      <h1>{data.name}</h1>
      <img src={url} width="50%" style={{ borderRadius: "10px" }} />
      <h1>Details</h1>
      <p>Price: Rs. {data.price}</p>
      <h2>About the Product: </h2>
      <p>{data.description}</p>
      <h2>Distributer Details</h2>
      <p>{data.distributor}</p>
      <p>{data.contact}</p>
    </div>
  );
}
