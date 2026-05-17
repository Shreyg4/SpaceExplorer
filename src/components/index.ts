export interface NasaItemData {
    nasa_id: string;
    title: string;
    description?: string;
    date_created: string;
    photographer?: string;
    media_type: string;
}

export interface NasaItemLink {
    href: string;
    rel: string;
    render?: string;
}

export interface NasaItem {
    data: NasaItemData[];
    links?: NasaItemLink[];
}

export interface NasaResponse {
    collection: {
        items: NasaItem[];
        metadata: {
            total_hits: number;
        };
    };
}