import { NextResponse } from 'next/server';
import { readFileSync } from 'fs';
import { join } from 'path';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const category = searchParams.get('category');
    
    // Read JSON files at runtime
    const categoriesPath = join(process.cwd(), 'public', 'data', 'categories.json');
    const tipsPath = join(process.cwd(), 'public', 'data', 'tips.json');
    
    const categoriesData = JSON.parse(readFileSync(categoriesPath, 'utf8'));
    const tipsData = JSON.parse(readFileSync(tipsPath, 'utf8'));
    
    let result;
    
    switch (type) {
      case 'categories':
        result = categoriesData;
        break;
      case 'tips':
        if (category) {
          let categoryTips;
          switch (category.toLowerCase()) {
            case 'general':
              categoryTips = tipsData.generalTips;
              break;
            case 'seasonal':
              categoryTips = tipsData.seasonalTips;
              break;
            case 'budget':
              categoryTips = tipsData.budgetTips;
              break;
            case 'cultural':
              categoryTips = tipsData.culturalTips;
              break;
            case 'emergency':
              categoryTips = tipsData.emergencyContacts;
              break;
            default:
              if (tipsData.fortSpecificTips[category]) {
                categoryTips = tipsData.fortSpecificTips[category];
              } else {
                return NextResponse.json(
                  { success: false, error: 'Category not found' },
                  { status: 404 }
                );
              }
          }
          result = categoryTips;
        } else {
          result = tipsData;
        }
        break;
      case 'difficulty-levels':
        result = categoriesData.trekDifficulty;
        break;
      case 'seasons':
        result = categoriesData.seasons;
        break;
      case 'fort-types':
        result = categoriesData.fortTypes;
        break;
      case 'history':
        result = categoriesData.historicalPeriods;
        break;
      default:
        result = {
          categories: categoriesData,
          tips: tipsData
        };
    }
    
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error('Data API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch data' },
      { status: 500 }
    );
  }
}