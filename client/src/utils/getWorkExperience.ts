
export function getWorkExperience(startDate: Date): string {
    const start = new Date(startDate);
    const end = new Date();

    // Calculate the difference in milliseconds
    const timeDiff = Math.abs(end - start);

    // Calculate years and months
    const years = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 365));
    const months = Math.floor((timeDiff % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30));

    // Format the output
    let experience = '';
    if (years > 0) {
        experience += years + (years === 1 ? ' year ' : ' years ');
    }
    if (months > 0) {
        experience += months + (months === 1 ? ' month' : ' months');
    }

    return experience.trim() || 0;
}