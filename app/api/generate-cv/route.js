import { generateCV } from '@/features/home/services/CVServices'
import { NextResponse } from 'next/server'

export async function POST(request) {
	try {
		const formData = await request.json()
		const generatedCV = await generateCV(formData)
		return NextResponse.json({ cv: generatedCV })
	} catch (error) {
		console.error('Error in API route:', error)
		return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 })
	}
}
