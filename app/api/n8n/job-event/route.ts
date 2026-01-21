import { NextRequest, NextResponse } from 'next/server';
import { createServiceRoleClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
    try {
        // Verify secret
        const authHeader = request.headers.get('authorization');
        const secret = authHeader?.replace('Bearer ', '');

        if (secret !== process.env.N8N_WEBHOOK_SECRET) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const { job_id, event, payload } = body;

        if (!job_id || !event) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const supabase = createServiceRoleClient();

        // Insert event
        const { data, error } = await supabase
            .from('applix_job_events')
            .insert({
                job_id,
                event,
                payload: payload || {},
            })
            .select()
            .single();

        if (error) {
            console.error('Error inserting event:', error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ success: true, data });
    } catch (error) {
        console.error('Error in job-event endpoint:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
