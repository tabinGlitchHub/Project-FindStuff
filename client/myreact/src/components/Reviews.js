import React from "react";
import StarRating from "./StarRating";

const Reviews = (props) => {
	return (
		<div>
			<StarRating id={props.id} rating={props.rating} choice = {props.size} />
		</div>
	);
};

export default Reviews;
