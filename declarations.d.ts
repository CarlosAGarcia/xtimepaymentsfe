declare module '@tiptap/starter-kit' ;
declare module '@tiptap/extension-link';
declare module '@tiptap/extension-youtube';

type Section = {
    _id: string;
    enabled: boolean;
    name: string;
    order: number;
    content: string;
    createdAt: Date;
    updatedAt: Date;
}

// org is a ref to the org, sections is an array of Section types
type SiteSettings = {
    org: any;
    sections: Section[];
}