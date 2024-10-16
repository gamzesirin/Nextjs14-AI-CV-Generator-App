import React from 'react'

const ModernCV = ({ data }) => {
	const { firstName, lastName, title, email, phone, summary, experience, education, skills } = data || {}

	const renderHtmlContent = (content) => {
		return content ? <div dangerouslySetInnerHTML={{ __html: content }} /> : null
	}

	return (
		<div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
			<h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">{`${firstName} ${lastName}`}</h1>
			<h2 className="text-xl mb-2 text-gray-800 dark:text-gray-200">{title}</h2>
			<p className="mb-4 text-gray-700 dark:text-gray-300">
				{email} | {phone}
			</p>

			<section className="mb-6">
				<h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">Summary</h3>
				<div className="text-gray-700 dark:text-gray-300">{renderHtmlContent(summary)}</div>
			</section>

			<section className="mb-6">
				<h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">Experience</h3>
				<div className="text-gray-700 dark:text-gray-300">{renderHtmlContent(experience)}</div>
			</section>

			<section className="mb-6">
				<h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">Education</h3>
				<div className="text-gray-700 dark:text-gray-300">{renderHtmlContent(education)}</div>
			</section>

			<section className="mb-6">
				<h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">Skills</h3>
				<div className="text-gray-700 dark:text-gray-300">{renderHtmlContent(skills)}</div>
			</section>
		</div>
	)
}

export default ModernCV
