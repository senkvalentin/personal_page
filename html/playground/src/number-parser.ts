export function parseArgumentsToNumber(args: string[]): number[] {
    const results: number[] = [];
    
    for (let i = 0; i < args.length; i++) {
        results.push(Number.parseInt(args[i], 10));
    }

    return results;
}

export function parseExample(args: string[]): number[] {
    return args.map(Number.parseInt);
}