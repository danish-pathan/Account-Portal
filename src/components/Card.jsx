import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useFirebase } from "../context/Firebase";

const ProductCard = (props) => {
  const firebase = useFirebase();
  const navigate = useNavigate();
  const [url, setURL] = useState(null);

  useEffect(() => {
    firebase.getImageURL(props.imageURL).then((url) => setURL(url));
  }, []);

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia component="img" height="140" image={url} alt={props.name} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          This product is sold by {props.distributor} and costs Rs.{" "}
          {props.price}
        </Typography>
      </CardContent>
      <Button
        onClick={(e) => navigate(`/product/view/${props.id}`)}
        variant="contained"
        color="primary"
      >
        View
      </Button>
    </Card>
  );
};

export default ProductCard;
