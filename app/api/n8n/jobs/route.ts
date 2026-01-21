import { NextRequest, NextResponse } from 'next/server';
import { createServiceRoleClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const interface_type = searchParams.get('interface');
        const status = searchParams.get('status') || 'approved';
        const limit = parseInt(searchParams.get('limit') || '10');

        const supabase = createServiceRoleClient();

        let query = supabase
            .from('applix_jobs')
            .select('*')
            .eq('status', status)
            .is('executed_at', null)
            .order('created_at', { ascending: true })
            .limit(limit);

        if (interface_type) {
            query = query.eq('interface', interface_type);
        }

        const { data, error } = await query;

        if (error) {
            console.error('Error fetching jobs:', error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ jobs: data });
    } catch (error) {
        console.error('Error in jobs endpoint:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
