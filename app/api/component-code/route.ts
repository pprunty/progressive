import { type NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { getComponentByName } from '@/lib/registry';

// Cache duration in seconds (1 day)
const CACHE_MAX_AGE = 60 * 60 * 24;

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const name = searchParams.get('name');
  const filePath = searchParams.get('path');

  if (!name && !filePath) {
    return NextResponse.json(
      { error: 'Component name or file path is required' },
      { status: 400 },
    );
  }

  try {
    let componentPath: string;

    if (filePath) {
      // If a specific file path is provided, use it directly
      componentPath = path.join(process.cwd(), filePath);
    } else {
      // Otherwise, look up the component by name and use its main file
      const component = await getComponentByName(name!);

      if (!component || !component.files || component.files.length === 0) {
        return NextResponse.json(
          { error: 'Component not found' },
          { status: 404 },
        );
      }

      // Use the first file as the main component file
      componentPath = path.join(process.cwd(), component.files[0].path);
    }

    // Check if the file exists
    try {
      await fs.access(componentPath);
    } catch {
      return NextResponse.json(
        { error: 'Component file not found' },
        { status: 404 },
      );
    }

    // Read the component code
    const code = await fs.readFile(componentPath, 'utf-8');

    // Create response with cache headers
    const response = NextResponse.json({ code });

    // Set cache control headers
    response.headers.set(
      'Cache-Control',
      `public, max-age=${CACHE_MAX_AGE}, s-maxage=${CACHE_MAX_AGE}, stale-while-revalidate=${CACHE_MAX_AGE}`,
    );

    return response;
  } catch (error) {
    console.error(`Error fetching component code:`, error);
    return NextResponse.json(
      { error: 'Failed to fetch component code' },
      { status: 500 },
    );
  }
}
