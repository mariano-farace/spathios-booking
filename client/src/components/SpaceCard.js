import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function MediaCard({
  listingID,
  listingName,
  pricePerHour,
  image,
  description,
  setSelectedSpace,
}) {
  return (
    <Card sx={{ maxWidth: 400, margin: "10px" }}>
      <CardMedia component="img" height="140" image={image} alt="space image" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {listingName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          {pricePerHour}€ / hora
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          onClick={() => {
            setSelectedSpace(listingID);
          }}
        >
          Make your Reservation
        </Button>
      </CardActions>
    </Card>
  );
}
