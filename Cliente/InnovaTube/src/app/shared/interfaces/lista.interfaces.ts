export interface ListadoResponse {
    kind:          string;
    etag:          string;
    nextPageToken: string;
    regionCode:    string;
    pageInfo:      PageInfo;
    items:         Item[];
}

export interface Item {
    kind:    ItemKind;
    etag:    string;
    id:      ID;
    snippet: Snippet;
}

export interface ID {
    kind:    IDKind;
    videoId: string;
}

export interface IDKind {
    YoutubeVideo: string,
}

export interface ItemKind {
    YoutubeSearchResult: string,
}

export interface Snippet {
    publishedAt:          Date;
    channelId:            string;
    title:                string;
    description:          string;
    thumbnails:           Thumbnails;
    channelTitle:         string;
    liveBroadcastContent: LiveBroadcastContent;
    publishTime:          Date;
}

export enum LiveBroadcastContent {
    None = "none",
}

export interface Thumbnails {
    default: Default;
    medium:  Default;
    high:    Default;
}

export interface Default {
    url:    string;
    width:  number;
    height: number;
}

export interface PageInfo {
    totalResults:   number;
    resultsPerPage: number;
}

export interface User {
    id:           string;
    nameCompleto: string;
    nameUser:     string;
    email:        string;
    createdAt:    Date;
    updatedAt:    Date;
}
