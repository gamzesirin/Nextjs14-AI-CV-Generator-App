'use client'
import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'
import ModernCV from './ModernCV'
import CVForm from './CVForm'
import { useEffect, useState } from 'react'

function parseHTMLToCV(html) {
	const parser = new DOMParser()
	const doc = parser.parseFromString(html, 'text/html')

	const extractSection = (heading) => {
		const h2 = Array.from(doc.querySelectorAll('h2')).find(
			(el) => el.textContent.trim().toLowerCase() === heading.toLowerCase()
		)
		if (h2) {
			let content = ''
			let nextElement = h2.nextElementSibling
			while (nextElement && nextElement.tagName !== 'H2') {
				content += nextElement.outerHTML
				nextElement = nextElement.nextElementSibling
			}
			return content
		}
		return ''
	}

	return {
		firstName: doc.querySelector('h1')?.textContent.split(' ')[0] || '',
		lastName: doc.querySelector('h1')?.textContent.split(' ').slice(1).join(' ') || '',
		title: doc.querySelector('h2')?.textContent || '',
		summary: extractSection('summary'),
		experience: extractSection('experience'),
		education: extractSection('education'),
		skills: extractSection('skills'),
		coreCompetencies: extractSection('core competencies'),
		keyAchievements: extractSection('key achievements'),
		professionalDevelopment: extractSection('professional development'),
		interests: extractSection('interests')
	}
}
export default function CVGenerator() {
	const [generatedCV, setGeneratedCV] = useState(null)
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState(null)
	const [mounted, setMounted] = useState(false)
	const { theme, setTheme } = useTheme()

	useEffect(() => {
		setMounted(true)
	}, [])

	const generateCV = async (formData) => {
		if (!formData.firstName || !formData.lastName) {
			setError('Please provide at least your first and last name.')
			return
		}

		setIsLoading(true)
		setError(null)

		try {
			const response = await fetch('/api/generate-cv', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(formData)
			})

			if (!response.ok) {
				throw new Error('Failed to generate CV')
			}

			const data = await response.json()
			console.log('Received CV data:', data)

			const parsedCV = parseHTMLToCV(data.cv)
			console.log('Parsed CV data:', parsedCV)
			setGeneratedCV({ ...formData, ...parsedCV })
		} catch (err) {
			console.error('Error generating CV:', err)
			setError(err.message)
		} finally {
			setIsLoading(false)
		}
	}

	if (!mounted) return null

	return (
		<div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
			<div className="container mx-auto px-4 py-8">
				<div className="flex justify-between items-center mb-8">
					<h1 className="text-3xl font-bold text-gray-900 dark:text-white">CV Generator</h1>
					<button
						onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
						className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white"
					>
						{theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
					</button>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					<div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
						<h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Enter Your Information</h2>
						<CVForm onSubmit={generateCV} isLoading={isLoading} />
					</div>
					<div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
						<h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Generated CV</h2>
						{isLoading && (
							<div className="flex justify-center items-center h-64">
								<div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
							</div>
						)}
						{error && <p className="text-red-500">{error}</p>}
						{!generatedCV && !isLoading && !error && (
							<p className="text-gray-700 dark:text-gray-300">
								Fill in your information and click Generate CV to see your CV here.
							</p>
						)}
						{generatedCV && <ModernCV data={generatedCV} />}
					</div>
				</div>
			</div>
		</div>
	)
}
