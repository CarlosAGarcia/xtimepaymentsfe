declare module '@tiptap/starter-kit' ;
declare module '@tiptap/extension-link';
declare module '@tiptap/extension-youtube';
declare module '@tiptap/extension-text-align';
declare module '@tiptap/extension-underline';
// declare module '@tiptap/extension-text-align';

type Section = {
    _id?: string;
    enabled: boolean;
    name: string;
    order?: number;
    backgroundColor: string;
    content: string;
    createdAt?: Date;
    updatedAt?: Date;
}

// org is a ref to the org, sections is an array of Section types
type SiteSettings = {
    org: any;
    isActive: boolean;
    backgroundColor: string;
    sections: Section[];
}
