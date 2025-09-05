import { NextResponse } from 'next/server';
import { databaseService } from '../../../services/databaseService';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Fort ID is required' },
        { status: 400 }
      );
    }

    const fort = databaseService.getFortById(id);
    
    if (!fort) {
      return NextResponse.json(
        { success: false, error: 'Fort not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      data: fort.getDetailedInfo() 
    });
  } catch (error) {
    console.error('Forts API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch fort data' },
      { status: 500 }
    );
  }
}