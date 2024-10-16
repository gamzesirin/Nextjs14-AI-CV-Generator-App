export default function CVPreview({ cv }) {
	return (
		<div className="bg-white shadow-md rounded-lg p-6">
			{cv ? (
				<div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: cv }} />
			) : (
				<p className="text-gray-500 text-center">Your generated CV will appear here.</p>
			)}
		</div>
	)
}
