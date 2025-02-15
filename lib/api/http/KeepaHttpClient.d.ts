export type KeepaHttpClient = (params: {
    method: 'get' | 'post';
    url: string;
    data?: string;
    timeout?: number;
}) => Promise<{
    status: number;
    payload: Record<string, unknown>;
} | never>;
