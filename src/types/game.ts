export class Game {
    id!: string;
    title!: string;
    description!: string;
    shortDescription!: string;
    status!: {
        id: number;
        name: string;
        color: string;
    };
    trailer!: string;
    cover!: string;
    gallery!: string[];
    tags!: string[];
    history!: {
        title: string;
        description: string;
    };
    studio!: string;
    platforms!: {
        id: string,
        name: string
    }[];
    date!: string;
    stores!: {
        id: string;
        name: string;
        link: string
    }[];
}

