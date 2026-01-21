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
        const { job_id, status, raw, json, artifacts } = body;

        if (!job_id) {
            return NextResponse.json({ error: 'Missing job_id' }, { status: 400 });
        }

        const supabase = createServiceRoleClient();

        // Update job status
        if (status) {
            const updates: any = { status, updated_at: new Date().toISOString() };

            if (status === 'executed') {
                updates.executed_at = new Date().toISOString();
            }

            if (raw !== undefined) {
                updates.parse_ok = !!json;
            }

            const { error: jobError } = await supabase
                .from('applix_jobs')
                .update(updates)
                .eq('id', job_id);

            if (jobError) {
                console.error('Error updating job:', jobError);
                return NextResponse.json({ error: jobError.message }, { status: 500 });
            }
        }

        // Insert artifacts if provided
        if (artifacts && Array.isArray(artifacts)) {
            for (const artifact of artifacts) {
                const { type, raw: artifactRaw, json: artifactJson } = artifact;

                let parsedJson = null;
                let parseOk = false;

                if (artifactRaw) {
                    try {
                        parsedJson = JSON.parse(artifactRaw);
                        parseOk = true;
                    } catch (e) {
                        // Parse failed, store as raw text only
                        parseOk = false;
                    }
                } else if (artifactJson) {
                    parsedJson = artifactJson;
                    parseOk = true;
                }

                await supabase.from('applix_job_artifacts').insert({
                    job_id,
                    type,
                    raw: artifactRaw || (artifactJson ? JSON.stringify(artifactJson) : null),
                    json: parsedJson,
                    parse_ok: parseOk,
                });
            }
        }

        // Create event for this update
        await supabase.from('applix_job_events').insert({
            job_id,
            event: 'job_updated',
            payload: { status, has_artifacts: artifacts?.length > 0 },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error in job-update endpoint:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
