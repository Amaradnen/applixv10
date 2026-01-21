"use client";

import { useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';

export function useRealtimeOrders(onUpdate: (payload: any) => void) {
    useEffect(() => {
        const supabase = createClient();

        const channel = supabase
            .channel('orders-changes')
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'orders',
                },
                (payload) => {
                    console.log('Order change:', payload);
                    onUpdate(payload);
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [onUpdate]);
}

export function useRealtimeJobs(onUpdate: (payload: any) => void) {
    useEffect(() => {
        const supabase = createClient();

        const channel = supabase
            .channel('jobs-changes')
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'applix_jobs',
                },
                (payload) => {
                    console.log('Job change:', payload);
                    onUpdate(payload);
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [onUpdate]);
}

export function useRealtimeTemplates(onUpdate: (payload: any) => void) {
    useEffect(() => {
        const supabase = createClient();

        const channel = supabase
            .channel('templates-changes')
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'nfc_templates',
                },
                (payload) => {
                    console.log('Template change:', payload);
                    onUpdate(payload);
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [onUpdate]);
}
