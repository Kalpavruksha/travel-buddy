import { NextResponse } from 'next/server';
import { databaseService } from '../../services/databaseService';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');
    const difficulty = searchParams.get('difficulty');
    const action = searchParams.get('action') || 'all';

    let result;

    switch (action) {
      case 'all':
        result = databaseService.getAllForts();
        break;
      case 'map':
        result = databaseService.getFortsForMap();
        break;
      case 'featured':
        result = databaseService.getFeaturedForts();
        break;
      case 'stats':
        result = databaseService.getStatistics();
        break;
      case 'difficulty':
        if (difficulty) {
          result = databaseService.getFortsByDifficulty(difficulty);
        } else {
          return NextResponse.json(
            { success: false, error: 'Difficulty parameter is required' },
            { status: 400 }
          );
        }
        break;
      case 'search':
        if (query) {
          result = databaseService.searchForts(query);
        } else {
          return NextResponse.json(
            { success: false, error: 'Query parameter is required' },
            { status: 400 }
          );
        }
        break;
      default:
        // Default action is to get all forts
        result = databaseService.getAllForts();
    }

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error('Forts API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch forts data' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { action, preferences } = await request.json();

    let result;

    switch (action) {
      case 'recommendations':
        result = databaseService.getRecommendations(preferences || {});
        break;
      default:
        return NextResponse.json(
          { success: false, error: 'Invalid action' },
          { status: 400 }
        );
    }

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error('Forts API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process request' },
      { status: 500 }
    );
  }
}