import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

export const generateCV = async (formData) => {
	if (!process.env.GEMINI_API_KEY) {
		throw new Error('GEMINI_API_KEY is not set')
	}

	const model = genAI.getGenerativeModel({ model: 'gemini-pro' })
	const prompt = `
    Generate a professional CV in HTML format based on the following information:
  
    Full Name: ${formData.firstName} ${formData.lastName}
    Title: ${formData.title}
    Email: ${formData.email}
    Phone: ${formData.phone}
  
    Summary:
    ${formData.summary}
  
    Experience:
    ${formData.experience}
  
    Education:
    ${formData.education}
  
    Skills:
    ${formData.skills}
  
    Instructions:
    1. Use proper HTML tags for structure (h1, h2, h3, p, ul, li, etc.).
    2. Use the following section headers exactly: "Summary", "Experience", "Education", "Skills".
    3. Ensure each section has relevant content based on the provided information.
    4. If any section is empty, still include the header but leave the content blank.
    5. Use a clean, professional layout.
  `

	try {
		const result = await model.generateContent(prompt)
		const response = await result.response
		return response.text()
	} catch (error) {
		console.error('Error generating CV:', error)
		throw new Error(`Failed to generate CV: ${error.message}`)
	}
}
