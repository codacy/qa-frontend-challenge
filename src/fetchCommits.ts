export type Commit = {
    id: number,
    hash: string
}

const initialPageSize = 10;
const pageSize = 20;
const maxResponseDelayS = 20;
const maxItemNr = 1000;

export function fetchCommits(latestId?: number): Promise<Commit[]> {
    const currentId = latestId || 0;
    const responseDelayMs = Math.floor(Math.random() * Math.floor(maxResponseDelayS)) * 1000;

    const currentPageSize = latestId ? pageSize : initialPageSize;
    return new Promise((resolve) => {
        setTimeout(() =>
            resolve(
                currentId < maxItemNr ?
                    [...Array(currentPageSize).keys()].map(i => {
                        const id = i + currentId
                        return { id: id, hash: id.toString() }
                    }) : []
            ), responseDelayMs)
    });
}
