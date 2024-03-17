import { joiResolver } from '@hookform/resolvers/joi';
import { useForm } from 'react-hook-form';
import { RatingInput } from '../UI/RatingUI';
import Modal from '../UI/Modal';
import Joi from 'joi';
import { auth, db } from '../../firebase.config';
import {
	addDoc,
	collection,
	doc,
	getDoc,
	serverTimestamp,
	setDoc,
} from 'firebase/firestore';
import { toast } from 'react-toastify';
import Spinner from '../Spinner';

const reviewSchema = Joi.object({
	text: Joi.string().label('Description').allow(''),
	overallRating: Joi.number().min(0).max(5).required(),
	affordabilityRating: Joi.number().allow('').optional(),
	easeOfUseRating: Joi.number().allow('').optional(),
	rentingExperienceRating: Joi.number().allow('').optional(),
});

const ReviewForm = ({ closeModal, productId, authorId, imgUrl }) => {
	const {
		register,
		setError,
		handleSubmit,
		getValues,
		setValue,
		formState: { errors, isSubmitting },
	} = useForm({ resolver: joiResolver(reviewSchema) });

	function renderRatingInput(id) {
		return (
			<RatingInput setStar={setValue.bind(null, id)} options={register(id)} />
		);
	}

	async function submitForm(data, event) {
		// TODO: handle review post
		event.preventDefault();
		console.log('data: ', data);
		const feedbackData = {
			...data,
			authorId,
			productId,
			timestamp: serverTimestamp(),
			likeCount: 0,
		};
		const feedbackCollection = collection(db, 'feedback');
		try {
			await addDoc(feedbackCollection, feedbackData);
			const userDocRef = doc(db, 'users', authorId);
			const reviewsPosted = await getDoc(userDocRef).then(
				(user) => user.data().reviewsPosted ?? 0
			);
			await setDoc(
				userDocRef,
				{ reviewsPosted: reviewsPosted + 1 },
				{ merge: true }
			);
			toast.success('Review posted.');
		} catch (err) {
			console.error(err);
			toast.error('Error posting review.');
		} finally {
			closeModal();
		}
	}
	return (
		<form className='flex-grow' onSubmit={handleSubmit(submitForm)}>
			<div className='flex flex-col'>
				<span>1. Describe your experience?</span>
				<span className='text-sm mb-1 text-gray-600'>
					Your review will be public on the product details page.
				</span>
				<textarea
					rows={4}
					className='w-full outline-none border-2 rounded-md px-3 py-1.5 text-sm resize-none mt-1	'
					placeholder='How was the product and the experience of renting it?'
					{...register('text')}
				/>
			</div>
			<div className='flex flex-col mt-2'>
				<span>
					2. Overall rating
					{errors.overallRating && (
						<span className='text-red-400 text-sm'>*Required*</span>
					)}
				</span>

				{renderRatingInput('overallRating')}
			</div>
			<div className='flex flex-col mt-2'>
				<span>3. Affordability rating</span>
				{renderRatingInput('affordabilityRating')}
			</div>
			<div className='flex flex-col mt-2'>
				<span>4. Ease of use rating</span>
				{renderRatingInput('easeOfUseRating')}
			</div>
			<div className='flex flex-col mt-2'>
				<span>5. Renting experience rating</span>
				{renderRatingInput('rentingExperienceRating')}
			</div>
			<div className='flex-grow' />
			<div className='flex gap-2 justify-end mt-10'>
				<button
					className='bg-slate-200 px-3 py-1 rounded-md'
					type='button'
					onClick={closeModal}
					disabled={isSubmitting}
				>
					Cancel
				</button>
				<button
					className='bg-blue-500 px-3 py-1 rounded-md text-white hover:bg-blue-600'
					disabled={isSubmitting}
				>
					{isSubmitting ? 'Posting...' : 'Post'}
				</button>
			</div>
		</form>
	);
};

const WriteReview = ({ showReviewForm, product, closeModal }) => {
	return (
		<Modal status={showReviewForm} className='h-3/4 p-4'>
			<div className='px-4 py-2'>
				<h1 className='font-bold text-xl'>Leave a review</h1>
				<div className='flex mt-4 h-full'>
					<div className='flex flex-col gap-2'>
						<img
							className='h-52 aspect-[4/3] object-cover rounded-lg border'
							src={product.imageUrl}
							alt='Reviewer avatar'
						/>
						<h2 className='capitalize text-lg'>{product.title}</h2>
					</div>
					<div className='h-full w-6 bg-gray-400' />
					<ReviewForm
						closeModal={closeModal}
						authorId={auth.currentUser?.uid}
						productId={product.id}
					/>
				</div>
			</div>
		</Modal>
	);
};

export default WriteReview;
