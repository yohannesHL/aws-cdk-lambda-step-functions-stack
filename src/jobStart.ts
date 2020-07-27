export const handler = async (event: any): Promise<any> => {
    const input = JSON.parse(event.body)
    const waitTime = input?.waitTime ?? 3

    return { statusCode: 201, body: JSON.stringify({ uuid: '1234', waitTime }) };
};