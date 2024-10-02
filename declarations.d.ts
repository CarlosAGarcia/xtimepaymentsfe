declare module '@tiptap/starter-kit' ;
declare module '@tiptap/extension-link';
declare module '@tiptap/extension-youtube';
// declare module '@tiptap/extension-text-align';

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

// declare module '@tiptap/core' {
//     interface Commands<ReturnType> {
//         fontSize: {
//             /**
//              * Set the font size
//              */
//             setFontSize: (size: string) => ReturnType;
//             /**
//              * Unset the font size
//              */
//             unsetFontSize: () => ReturnType;
//         };
//     }
// }