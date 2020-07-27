export const handler = async (event: any): Promise<any> => {
    const status = Math.random() > 0.1 ? 'SUCCEEDED' : 'FAILED'
    return { statusCode: 201, body: JSON.stringify({ status }) };
};