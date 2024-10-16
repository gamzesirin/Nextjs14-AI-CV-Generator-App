'use client'

import { useForm } from 'react-hook-form'

export default function CVForm({ onSubmit, isLoading }) {
	const { register, handleSubmit, reset } = useForm()

	const handleFormSubmit = (data) => {
		onSubmit(data)
		reset()
	}

	return (
		<form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
			{[
				{ name: 'firstName', label: 'First Name', type: 'text' },
				{ name: 'lastName', label: 'Last Name', type: 'text' },
				{ name: 'title', label: 'Title', type: 'text' },
				{ name: 'email', label: 'Email', type: 'email' },
				{ name: 'phone', label: 'Phone', type: 'tel' },
				{ name: 'summary', label: 'Summary', type: 'textarea' },
				{ name: 'experience', label: 'Experience', type: 'textarea' },
				{ name: 'education', label: 'Education', type: 'textarea' },
				{ name: 'skills', label: 'Skills', type: 'text' }
			].map((field) => (
				<div key={field.name}>
					<label htmlFor={field.name} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
						{field.label}
					</label>
					{field.type === 'textarea' ? (
						<textarea
							id={field.name}
							{...register(field.name)}
							rows="3"
							className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:text-white transition-colors duration-300"
						/>
					) : (
						<input
							type={field.type}
							id={field.name}
							{...register(field.name)}
							className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:text-white transition-colors duration-300"
						/>
					)}
				</div>
			))}
			<button
				type="submit"
				className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition-colors duration-300"
				disabled={isLoading}
			>
				{isLoading ? 'Generating...' : 'Generate CV'}
			</button>
		</form>
	)
}
