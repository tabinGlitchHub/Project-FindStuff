import React from "react";
import StarSVG from "./star-solid.svg";
import StarHollowSVG from "./star-regular.svg";

const StarRating = (prop) => {
	const stars = [];
	let choice = prop.choice;
	let size = "";

	//set size to be defined in class based on preferred props
	if (choice === 0) {
		size = "xtratinystar";
	} else {
		size = "tinystar";
	}

	//push a filled star for each rating else push empty star in stars array
	for (let i = 0; i < 5; i++) {
		if (i < prop.rating) {
			stars.push(
				<img key={i} className={size} src={StarSVG} alt='star' />
			);
		} else {
			stars.push(
				<img key={i} className={size} src={StarHollowSVG} alt='star' />
			);
		}
	}
	return <div key={prop.id}>{stars}</div>;
};

export default StarRating;
