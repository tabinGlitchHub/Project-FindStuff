import React, { useContext, useEffect, useState } from "react";
import StarSVG from "./star-solid.svg";
import StarHollowSVG from "./star-regular.svg";
import reviewApi from "../apis/reviewApi";
import { ProductsContext } from "../context/ProductsContext";

const AddReviewForm = (props) => {
	const [reviewTitle, setReviewTitle] = useState("");
	const [reviewDescription, setReviewDescription] = useState("");
	const [reviewRating, setReviewRating] = useState(0);
	const [clickedStar, setClickedStar] = useState(0);
	const { id } = props;
	const { currentUserName, reviews, setReviews } = useContext(ProductsContext);

	const onStarClick = (pos) => {
		setClickedStar(pos);
		setReviewRating(pos);
	};

	const ratingInput = (pos) => {
		if (clickedStar >= pos) {
			return (
				<img
					className='tinystar'
					onClick={() => onStarClick(pos)}
					src={StarSVG}
					alt='star'
				/>
			);
		} else {
			return (
				<img
					className='tinystar'
					onClick={() => onStarClick(pos)}
					src={StarHollowSVG}
					alt='star'
				/>
			);
		}
	};

	const postRating = async (e) => {
		e.preventDefault();
		try {
			const response = await reviewApi.post("/post", {
				product_id: id,
				reviewer_name: currentUserName,
				review_title: reviewTitle,
				review_description: reviewDescription,
				rating: reviewRating,
            });
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div>
			<h6>Add a Review.</h6>
			<form>
				<div>
					<label>Title</label>
					<br />
					<input
						type='text'
						placeholder='Short Title'
						onChange={(e) => setReviewTitle(e.target.value)}
					/>
				</div>
				<div>
					<label>Description</label>
					<br />
					<input
						type='text'
						placeholder='Describe your experience'
						onChange={(e) => setReviewDescription(e.target.value)}
					/>
				</div>
				<div>
					{ratingInput(1)}
					{ratingInput(2)}
					{ratingInput(3)}
					{ratingInput(4)}
					{ratingInput(5)}
				</div>
				<br />
				<button className='btn btn-primary' onClick={postRating}>
					Submit
				</button>
			</form>
		</div>
	);
};

export default AddReviewForm;
