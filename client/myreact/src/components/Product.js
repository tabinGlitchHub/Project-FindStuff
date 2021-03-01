import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import productApi from "../apis/productApi";
import { ProductsContext } from "../context/ProductsContext";
import Reviews from "../components/Reviews";
import reviewApi from "../apis/reviewApi";

function Product() {
	const { id } = useParams();
	const { selectedProduct, setSelectedProduct } = useContext(ProductsContext);
	const { reviews, setReviews } = useContext(ProductsContext);

	useEffect(() => {
		const fetchData = async () => {
			const response = await productApi.get(`/${id}`);
			setSelectedProduct(response.data.data);
		};
		const fetchReview = async () => {
			const responseR = await reviewApi.get(`/${id}`);
			setReviews(responseR.data.data);
		};
		fetchData();
		fetchReview();
	}, []);

	const averageRating = () => {
		let i = 0;
		let total = 0;
		let temp;
		reviews.forEach((review) => {
			temp = review.rating;
			total += temp;
			i += 1;
		});
		return total / i;
	};

	return (
		<main className='container'>
			<div className='row'>
				<div className='col'>
					<h2>{selectedProduct.name}</h2>
					<img
						className='img-fluid image'
						src={selectedProduct.imageurl}
						alt='dummy'
					/>
					<h4>₹ {selectedProduct.price}</h4>
				</div>
				<div className='col box'>
					<span className='text-center'>
						<Reviews rating={averageRating()} size={1}/>
					</span>
					<hr />
					<div>
						{reviews.map((review) => {
							return (
								<div
									key={review.id}
									className='card card-bg'
									style={{ margin: "10px" }}>
									<h6 className='card-header'>{review.review_title}</h6>
									<div className='card-body'>
										<Reviews rating={review.rating} id={review.id} size={0} />
										<p className='card-title'>{review.reviewer_name}</p>
										<p className='card-text'> {review.review_description}</p>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</main>
	);
}

export default Product;
