import Unit from "./Unit";

export const downloadUnits: ReadonlyArray<any> = [
    {
        label: 'Mb',
        value: Unit.MEGABIT
    },
    {
        label: 'MB',
        value: Unit.MEGABYTE
    },
    {
        label: 'Gb',
        value: Unit.GIGABIT
    },
    {
        label: 'GB',
        value: Unit.GIGABYTE
    }
];

export const convertToMegaBytes = (number: number, unit: Unit): number => {
    switch (unit) {
        case Unit.MEGABYTE:
            return number;
        case Unit.MEGABIT:
            return number / 8;
        case Unit.GIGABIT:
            return number / 125;
        case Unit.GIGABYTE:
            return number * 1000;
        default:
            return 0;
    }
}

export const getTimeToDownload = (downloadRate: string, downloadRateUnits: Unit, totalSize: string, totalSizeUnits: Unit) => {
    const downloadRateNumber: number = Number(downloadRate);
    const totalSizeNumber: number = Number(totalSize);

    if (isNaN(downloadRateNumber) || isNaN(totalSizeNumber) || downloadRateNumber <= 0 || totalSizeNumber <= 0) {
        return null;
    }

    const convertedDownloadRate: number = convertToMegaBytes(downloadRateNumber, downloadRateUnits);
    const convertedTotalSize: number = convertToMegaBytes(totalSizeNumber, totalSizeUnits);

    const secondsToDownload = convertedTotalSize / convertedDownloadRate;

    const hours = Math.floor(secondsToDownload / 3600);

    const minutes = Math.floor((secondsToDownload % 3600) / 60);

    const seconds = Math.floor((secondsToDownload % 3600) % 60);

    return { hours: hours.toFixed(), minutes: minutes, seconds: seconds };
}